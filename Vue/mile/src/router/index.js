import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user';
import MileageRoutes from './mileage';
import DocumentsRoutes from './documents';
import store from '@/store'; // store import 추가
import M_TipRoutes from './m_Tip';
import NoticeRoutes from './notice';
import ContactRoutes from './contact';
import MileEasyAdminRoutes from './mileEasyAdmin';
import MileageAdminRoutes from './mileageAdmin';
import RequestRoutes from './request';

const routes = [
  ...userRoutes,
  ...MileageRoutes,
  ...DocumentsRoutes,
  ...M_TipRoutes,
  ...NoticeRoutes,
  ...ContactRoutes,
  ...MileEasyAdminRoutes,
  ...MileageAdminRoutes,
  ...RequestRoutes,
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/user/login/LoginView.vue'),
    meta: { hideHeader: true },
  },
  {
    path: '/error',
    name: 'ErrorPageView',
    component: () => import('../views/common/ErrorPage.vue'),
    meta: { hideHeader: true },
  },
  {
    path: '/noAccess',
    name: 'AlertView',
    component: () => import('../views/common/AlretView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/common/NotFound.vue'),
    meta: { hideHeader: true },
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  await store.dispatch('login/checkLogin');
  const loginInfo = store.state.login.loginInfo;

  console.log('Login Info:', loginInfo); // 로그인 정보 확인

  if (requiresAuth && !loginInfo) {
    next({ name: 'LoginView' });
  } else {
    next();
  }
});
export default router;
