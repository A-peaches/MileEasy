export default [
  //🚨문서모아 관련 라우터
  {
    // 문서모아 리스트 보기
    path: '/documentsView',
    name: 'documentsView',
    component: () => import('../views/user/documents/DocumentsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // 문서모아 상세보기
    path: '/documentsDetailView',
    name: 'documentsDetailView',
    component: () => import('../views/user/documents/DocumentsDetailView.vue'),
    meta: { requiresAuth: true }
  },
];
