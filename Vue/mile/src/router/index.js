// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user';
import store from '@/store'; // store import 추가

const routes = [
  ...userRoutes,

  // 여기에 모듈추가.

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'LoginView', // LoginPage 대신 LoginView 사용
    component: () => import('../views/LoginView.vue')
  }
];

// 반응형 웹앱 설정을 위함.
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loginInfo = store.state.login.loginInfo;

  if (requiresAuth && !loginInfo) {
    next({ name: 'LoginView' }); // LoginPage 대신 LoginView 사용
  } else {
    next();
  }
});

export default router;
