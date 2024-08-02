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
    //사용자 : 나의 m-tip  메인 화면
    path: '/myM_TipView',
    name: 'myM_TipView',
    component: () => import('../views/m_Tip/MyM_TipView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : m-tip 상세보기 화면
    path: '/m_TipDetailView',
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
    path: '/m_TipModifyView',
    name: 'm_TipModifyView',
    component: () => import('../views/m_Tip/M_TipModifyView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자,사용자 : m-tip 가이드 상세보기
    path: '/mTipGuideDetail',
    name: 'mTipGuideDetail',
    component: () =>
      import('../views/adminMileEasy/mTipManagement/mTipGuideDetail.vue'),
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
    path: '/mTipModify',
    name: 'mTipModify',
    component: () =>
      import('../views/adminMileEasy/mTipManagement/mTipGuideModify.vue'),
    meta: { requiresAuth: true },
  },
];
