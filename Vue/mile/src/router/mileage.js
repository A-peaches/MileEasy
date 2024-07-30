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
  {
    // 나의 마일리지 화면
    path: '/mileageDetail/:mile_no',
    name: 'mileageDetail',
    component: () =>
      import('../views/user/mileage/myMileage/MileageDetailView.vue'),
    meta: { requiresAuth: true },
    props: true // 이 부분이 중요합니다.
  },
];
