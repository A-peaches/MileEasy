export default [
  //🚨운영관리자 : 마왕 관련 라우터
  {
    //마왕 채택하기
    path: '/kingSelectAdminView',
    name: 'kingSelectAdminView',
    component: () =>
      import('../views/adminMileEasy/king/KingSelectAdminView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마왕 배지 디자인 변경
    path: '/kingBadgeOptionAdminView',
    name: 'kingBadgeOptionAdminView',
    component: () =>
      import('../views/adminMileEasy/king/KingBadgeOptionAdminView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },

  //마왕 top
  {
    path: '/kingTopAdminView',
    name: 'kingTopAdminView',
    component: () => import('../views/adminMileEasy/king/KingTopAdminView.vue'),
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
  //마일리지 수정
  {
    path: '/mileageModifyAdminView',
    name: 'mileageModifyAdminView',
    component: () =>
      import(
        '../views/adminMileEasy/mileageManagement/MileageModifyAdminView.vue'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  //마일리지 수정 상세
  {
    path: '/mileageModifyDetailAdminView',
    name: 'mileageModifyDetailAdminView',
    component: () =>
      import(
        '../views/adminMileEasy/mileageManagement/MileageModifyDetailiAdminView.vue'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
];
