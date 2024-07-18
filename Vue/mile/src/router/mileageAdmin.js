export default [
  //🚨마일리지 담당자 관련 라우터

  {
    // 마일리지 소개 수정 화면
    path: '/introduceMileageModifyAdminView',
    name: 'introduceMileageModifyAdminView',
    component: () =>
      import(
        '../views/adminMileage/intruduceMileage/IntroduceMileageModifyAdminView.vue'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 소개관리 화면
    path: '/introduceMileageAdminView',
    name: 'introduceMileageAdminView',
    component: () =>
      import(
        '../views/adminMileage/intruduceMileage/IntroduceMileageAdminView.vue'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 소개추가 화면
    path: '/introduceMileageAddAdminView',
    name: 'introduceMileageAddAdminView',
    component: () =>
      import(
        '../views/adminMileage/intruduceMileage/IntroduceMileageAddAdminView'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 추천멘트 화면
    path: '/commentMieageeAdminView',
    name: 'commentMieageeAdminView',
    component: () =>
      import('../views/adminMileage/commentMileage/CommentMieageeAdminView'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 문서 화면
    path: '/documentsMileageAdminView',
    name: 'documentsMileageAdminView',
    component: () =>
      import(
        '../views/adminMileage/documentsMileage/DocumentsMileageAdminView'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
];
