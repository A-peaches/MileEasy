import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user';
import MileageRoutes from './mileage';
import DocumentsRoutes from './documents';
import Test from './test';
// import store from '@/store'; // store import 추가


const routes = [
  ...userRoutes,
  ...MileageRoutes,
  ...DocumentsRoutes,
  ...Test,
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/user/login/LoginView.vue'),
    meta: {hideHeader: true},
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
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   await store.dispatch('login/checkLogin');
//   const loginInfo = store.state.login.loginInfo;

//   console.log('Login Info:', loginInfo); // 로그인 정보 확인

//   if (requiresAuth && !loginInfo) {
//     next({ name: 'LoginView' });
//   } else {
//     next();
//   }
// });

export default router;
