export default [
  //🚨M-Tip 관련 라우터
  {
    // 문서모아 리스트 보기
    path: '/documentsView',
    name: 'documentsView',
    component: () => import('../views/user/documents/DocumentsView.vue'),
  },
];
