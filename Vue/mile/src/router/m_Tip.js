export default [
  //🚨M-Tip 관련 라우터
  {
    //사용자 :  m-tip 메인 화면
    path: '/M-Tip',
    name: 'M-TipMainView',
    component: () => import('../views/m_Tip/user/M_TipMainView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : m-tip  전체화면
    path: '/M_TipListView',
    name: 'M_TipListView',
    component: () => import('../views/m_Tip/M_TipListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : 나의 m-tip  메인 화면
    path: '/myM_TipView',
    name: 'myM_TipView',
    component: () => import('../views/m_Tip/MyM_TipView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : m-tip 상세보기 화면
    path: '/m_TipDetailView/:mtip_board_no',
    name: 'm_TipDetailView',
    component: () => import('../views/m_Tip/M_TipDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : m-tip 작성화면
    path: '/m_TipWriteView',
    name: 'm_TipWriteView',
    component: () => import('../views/m_Tip/M_TipWriteView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : m-tip 수정화면
    path: '/m_TipModifyView/:mtip_board_no',
    name: 'm_TipModifyView',
    props: true,
    component: () => import('../views/m_Tip/M_TipModifyView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : 나만의 좋아요 m-tip 화면
    path: '/MyM_TipBestView',
    name: 'MyM_TipBestView',
    props: true,
    component: () => import('../views/m_Tip/MyM_TipBestView.vue'),
    meta: { requiresAuth: true },
  },

  //관리자,사용자 : m-tip 가이드 상세보기
  {
    path: '/mTipGuideDetail:mtipGuideNo',
    name: 'mTipGuideDetail',
    component: () =>
      import('../views/adminMileEasy/mTipManagement/mTipGuideDetail.vue'),
    props: true,
    meta: { requiresAuth: true },
  },

  {
    //관리자 : m-tip 메인 화면
    path: '/mTipMainAdminView',
    name: 'm_TipMainAdminView',
    component: () =>
      import('../views/adminMileEasy/mTipManagement/mTipMainAdmin.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : m-tip 가이드 작성
    path: '/mTipWrite',
    name: 'mTipWrite',
    component: () =>
      import('../views/adminMileEasy/mTipManagement/mTipGuideWrite.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : m-tip 가이드 수정
    path: '/mTipGuideModify/:mtipGuideNo',
    name: 'mTipGuideModify',
    component: () =>
      import('../views/adminMileEasy/mTipManagement/mTipGuideModify.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
];
