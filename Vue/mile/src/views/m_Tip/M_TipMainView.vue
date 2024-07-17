<!--🚨사용자 m-tip 메인 화면-->
<template>
  <div class="about">
    <h1>사용자 M-TIP 메인 화면</h1>

    <h3>배너</h3>

    <a href="/m_TipWriteView"><h3>글작성</h3></a>
    <a href="/myM_TipView"><h3>나의 M-TIP</h3></a>

    <hr />
    <a href="/m_TipGuideDetailView"><h3>M-TIP 가이드 - 상세보기</h3></a>
    <hr />

    <a href="/m_TipListView"><h3>M-TIP 리스트 전체보기</h3></a>
    <!--좋아요, 조회수 보여야댐-->
    <a href="/m_TipDetailView"><h3>M-TIP 리스트 상세보기</h3></a>

    <a href="/m_TipListView"><h3>M-TIP Best 리스트 전체보기</h3></a>
    <!--좋아요, 조회수 보여야댐-->
    <a href="/m_TipDetailView"><h3>M-TIP Best 리스트 상세보기</h3></a>
  </div>
</template>

<script>
export default {
  name: 'M_TipMainView',
};
</script>
