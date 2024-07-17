<!--🚨 사용자 m-tip 리스트 화면(best,기본 둘다 이 화면에서 할 예정 쿼리로 조정!!-->
<template>
  <div class="about">
    <h1>M-TIP 리스트</h1>

    <button button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>

    <h3>카테고리 검색기능</h3>
    <h3>검색기능</h3>
    <hr />
    <a href="/m_TipWriteView"><h3>글작성</h3></a>
    <a href="/m_TipDetailView"><h3>m-tip 상세보기</h3></a>
    <!--좋아요, 조회수 보여야댐-->
  </div>
</template>

<script>
export default {
  name: 'M_TipListView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
