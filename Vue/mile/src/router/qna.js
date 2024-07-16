export default [
  //🚨qna 관련 라우터
  {
    // qna 리스트
    path: '/qnaListView',
    name: 'qnaListView',
    component: () => import('../views/desk/qna/QnaListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    // qna 상세보기
    path: '/qnaDetailView',
    name: 'qnaDetailView',
    component: () => import('../views/desk/qna/QnaDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : qna 수정하기
    path: '/qnaModifyView',
    name: 'qnaModifyView',
    component: () => import('../views/desk/qna/QnaModifyView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //사용자 : qna 작성하기
    path: '/qnaWriteView',
    name: 'qnaWriteView',
    component: () => import('../views/desk/qna/QnaWriteView.vue'),
    meta: { requiresAuth: true },
  },
];
