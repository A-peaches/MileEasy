export default [
  //🚨마일리지 담당자 관련 라우터

  {
    //마일리지 담당자 메인 화면
    path: '/mana',
    name: 'mana',
    component: () =>
      import('../views/user/main/ManagerMainView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
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
    //마일리지 문서 업로드 화면
    path: '/documentsMileageAdminView',
    name: 'documentsMileageAdminView',
    component: () =>
      import(
        '../views/adminMileage/documentsMileage/DocumentsMileageAdminView'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 점수 업로드 화면
    path: '/scoreMileageAdminView',
    name: 'scoreMileageAdminView',
    component: () =>
      import(
        '../views/adminMileage/documentsMileage/ScoreMileageAdminView'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 목표설정 화면
    path: '/mileageTargetView',
    name: 'mileageTargetView',
    component: () =>
      import(
        '../views/adminMileage/targetMileage/TargetMileageAdminView'
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    //마일리지 목표설정 화면
    path: '/promotion/',
    name: 'promotion',
    component: () =>
      import(
        '../views/adminMileage/MileagePromotion'
      ),
    props: route => ({ mile_name: route.query.mile_name }),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  
];
