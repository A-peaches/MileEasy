export default [
  //🚨공지사항 관련 라우터
  {
    // 공지사항 리스트
    path: '/noticeListView',
    name: 'noticeListView',
    component: () => import('../views/desk/notice/NoticeListView.vue'),
    meta: { requiresAuth: true },
    props: true // props를 NoticeListView에 전달하도록 설정
  },
  {
    // 공지사항 상세보기
    path: '/noticeDetailView/:id',
    name: 'noticeDetailView',
    component: () => import('../views/desk/notice/NoticeDetailView.vue'),
    meta: { requiresAuth: true },
    props: true, // props를 통해 id를 컴포넌트에 전달
  },
  {
    //관리자 : 공지사항 수정하기
    path: '/oticeModifyAdminView/:id',
    name: 'noticeModifyAdminView',
    component: () => import('../views/desk/notice/NoticeModifyAdminView.vue'),
    meta: { requiresAuth: true },
    props : true,
  },
  {
    //관리자 : 공지사항 작성하기
    path: '/noticeWriteAdminView',
    name: 'noticeWriteAdminView',
    component: () => import('../views/desk/notice/NoticeWriteAdminView.vue'),
    meta: { requiresAuth: true },
  },
];
