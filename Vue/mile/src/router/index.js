// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './user';
import MileageRoutes from './Mileage';

const routes = [
  ...userRoutes,
  ...MileageRoutes,
  //여기에 모듈추가.

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
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

export default router;
