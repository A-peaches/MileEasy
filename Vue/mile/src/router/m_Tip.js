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
    path: '/m_TipGuideDetailView',
    name: 'm_TipGuideDetailView',
    component: () => import('../views/m_Tip/M_TipGuideDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : m-tip 메인 화면
    path: '/m_TipMainAdminView',
    name: 'm_TipMainAdminView',
    component: () => import('../views/m_Tip/admin/M_TipMainAdminView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : m-tip 가이드 작성
    path: '/m_TipGuideWriteAdminView',
    name: 'm_TipGuideWriteAdminView',
    component: () => import('../views/m_Tip/M_TipGuideWriteAdminView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : m-tip 가이드 수정
    path: '/m_TipGuideModifyAdminView',
    name: 'm_TipGuideModifyAdminView',
    component: () => import('../views/m_Tip/M_TipGuideModifyAdminView.vue'),
    meta: { requiresAuth: true },
  },
];
