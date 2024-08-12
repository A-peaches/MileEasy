export default [
  //🚨운영관리자 : 마왕 관련 라우터
  {
    //마왕 채택하기
    path: '/kingPickView',
    name: 'kingPickView',
    component: () => import('../views/adminMileEasy/king/KingPickView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  //마왕관리
  {
    path: '/kingMain',
    name: 'kingMain',
    component: () => import('../views/adminMileEasy/king/KingMain.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },

  //🚨운영관리자 : 마일리지 관리
  //마일리지 추가
  {
    path: '/mileageManagementView',
    name: 'mileageManagementView',
    component: () =>
      import(
        '../views/adminMileEasy/mileageManagement/MileageManagementView.vue'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
];
