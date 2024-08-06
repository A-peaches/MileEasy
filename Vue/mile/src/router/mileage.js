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
  {
    // 리포트 화면
    path: '/AI_Report',
    name: 'AI_Report',
    component: () =>
      import('../views/user/mileage/AI_ReportView.vue'),
    meta: { requiresAuth: true },
  },
  
  {
    // 마일리지 목표 설정 화면
    path: '/myMileagetarget',
    name: 'myMileagetarget',
    component: () =>
      import('../views/user/mileage/MyMileageTarget.vue'),
    meta: { requiresAuth: true },
    props: true // 이 부분이 중요합니다.
  },
];
