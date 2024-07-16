import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user';
<<<<<<< HEAD
import MileageRoutes from './Mileage';

const routes = [
  ...userRoutes,
  ...MileageRoutes,
  //여기에 모듈추가.
=======
import store from '@/store'; // store import 추가

const routes = [
  ...userRoutes,

  // 여기에 모듈추가.
>>>>>>> 8642fc6bee95acb11af8b8a1417d4c1445fc0f09

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
<<<<<<< HEAD
=======
    meta: { requiresAuth: true } // 인증이 필요한 라우트에 메타 필드 추가
>>>>>>> 8642fc6bee95acb11af8b8a1417d4c1445fc0f09
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
<<<<<<< HEAD
  },
=======
    meta: { requiresAuth: true } // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  }
>>>>>>> 8642fc6bee95acb11af8b8a1417d4c1445fc0f09
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  await store.dispatch('login/checkLogin'); // 로그인 상태 체크
  const loginInfo = store.state.login.loginInfo;

  if (requiresAuth && !loginInfo) {
    next({ name: 'LoginView' });
  } else {
    next();
  }
});

export default router;
