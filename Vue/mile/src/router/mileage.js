export default [
  //🚨마일리지 관련 라우터
  {
    // 나의 마일리지 화면
    path: '/myMileageView',
    name: 'myMileageView',
    component: () =>
      import('../views/user/mileage/myMileage/MyMileageView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // hrd 마일리지 상세 화면
    path: '/hrdView',
    name: 'hrdView',
    component: () => import('../views/user/mileage/hrd/HrdView.vue'),
    meta: { requiresAuth: true }
  },
  {
    //Monthly Best 마일리지 상세 화면
    path: '/monthlyBestView',
    name: 'monthlyBestView',
    component: () =>
      import('../views/user/mileage/monthlyBest/MonthlyBestView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // Monthly Base 마일리지 상세 화면
    path: '/monthlyBaseView',
    name: 'monthlyBaseView',
    component: () =>
      import('../views/user/mileage/monthlyBase/MonthlyBaseView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // Best PG 마일리지 상세 화면
    path: '/bestPgView',
    name: 'bestPgView',
    component: () => import('../views/user/mileage/bestPG/BestPgView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // Best 지점 마일리지 상세 화면
    path: '/bestBranchView',
    name: 'bestBranchView',
    component: () =>
      import('../views/user/mileage/bestBranch/BestBranchView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // 리그테이블 마일리지 상세 화면
    path: '/leagueTableView',
    name: 'leagueTableView',
    component: () =>
      import('../views/user/mileage/leagueTable/LeagueTableView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // HOT Tip 마일리지 상세 화면
    path: '/hotTipView',
    name: 'hotTipView',
    component: () => import('../views/user/mileage/hotTip/HotTipView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // 소비자 지원 마일리지 상세 화면
    path: '/consumerSupportView',
    name: 'consumerSupportView',
    component: () =>
      import('../views/user/mileage/consumerSupport/ConsumerSupportView.vue'),
    meta: { requiresAuth: true }
  },
];
