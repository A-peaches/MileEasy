export default [
  //🚨마일리지 관련 라우터
  {
    // 나의 마일리지 화면
    path: '/myMileageView',
    name: 'myMileageView',
    component: () =>
      import('../views/user/mileage/MyMileageView.vue'),
    meta: { requiresAuth: true }
  },

];
