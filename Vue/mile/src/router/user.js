export default [
  //🚨USER 관련 라우터
  {
    path: '/allUser',
    name: 'AllUser',
    component: () => import('../views/test/AllUserView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/selectUser',
    name: 'SelectUser',
    component: () => import('../views/test/SelectUserView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },

  // 여기서 부터 위에는 실험

  //사용자 MAIN 화면
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/user/main/UserMainView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/user/main/UserMainView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/user/main/AdminMainView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  //비밀번호 찾기
  {
    path: '/password',
    name: 'password',
    component: () => import('../views/user/login/PasswordReissueView.vue'),
     meta: { hideFooter: true },
  },
  //비밀번호 변경
  {
    path: '/passwordChange',
    name: 'passwordChange',
    component: () => import('../views/user/login/PasswordChangeView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/badgeStatusView',
    name: 'badgeStatusView',
    component: () => import('../views/user/documents/BadgeStatusView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/group',
    name: 'groupManagement',
    component: () => import('../views/user/group/GroupManagement.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  }
];
