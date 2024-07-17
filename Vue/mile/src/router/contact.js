export default [
  //🚨연락처 관련 라우터
  {
    // 업무별 연락처
    path: '/mileEasyContactView',
    name: 'mileEasyContactView',
    component: () => import('../views/desk/contact/MileEasyContactView.vue'),
    meta: { requiresAuth: true },
  },
  {
    // 마일리지 연락처
    path: '/mileageContactView',
    name: 'mileageContactView',
    component: () => import('../views/desk/contact/MileageContactView.vue'),
    meta: { requiresAuth: true },
  },
];
