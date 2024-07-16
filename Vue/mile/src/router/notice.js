export default [
  //🚨공지사항 관련 라우터
  {
    // 공지사항 리스트
    path: '/noticeListView',
    name: 'noticeListView',
    component: () => import('../views/desk/notice/NoticeListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    // 공지사항 상세보기
    path: '/noticeDetailView',
    name: 'noticeDetailView',
    component: () => import('../views/desk/notice/NoticeDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : 공지사항 수정하기
    path: '/noticeModifyAdminView',
    name: 'noticeModifyAdminView',
    component: () => import('../views/desk/notice/NoticeModifyAdminView.vue'),
    meta: { requiresAuth: true },
  },
  {
    //관리자 : 공지사항 작성하기
    path: '/noticeWriteAdminView',
    name: 'noticeWriteAdminView',
    component: () => import('../views/desk/notice/NoticeWriteAdminView.vue'),
    meta: { requiresAuth: true },
  },
];
