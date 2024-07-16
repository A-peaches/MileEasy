export default [
  //🚨USER 관련 라우터
  {
    path: '/allUser',
    name: 'AllUser',
    component: () => import('../views/AllUserView.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 라우트에 메타 필드 추가
  },
  {
    path: '/SelectUser',
    name: 'SelectUser',
    component: () => import('../views/SelectUserView.vue'),
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
];
