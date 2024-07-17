<template>
  <div class="about">
    <h1>공지사항 리스트 보기</h1>
    <h3>카테고리</h3>
    <h3>검색기능</h3>
    <a href="/noticeDetailView"><h3>공지사항 상세보기</h3></a>
    <hr />
    <!--관리자일 경우-->
    <a href="/noticeWriteAdminView"><h3>글작성</h3></a>
  </div>
</template>

<script>
export default {
  name: 'NoticeListView',
};
</script>
