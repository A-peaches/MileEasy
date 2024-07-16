import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user';
import MileageRoutes from './mileage';
import DocumentsRoutes from './documents';

const routes = [
  ...userRoutes,
  ...MileageRoutes,
  ...DocumentsRoutes,
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
  },
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

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   await store.dispatch('login/checkLogin'); // 로그인 상태 체크
//   const loginInfo = store.state.login.loginInfo;

//   if (requiresAuth && !loginInfo) {
//     next({ name: 'LoginView' });
//   } else {
//     next();
//   }
// });

export default router;
