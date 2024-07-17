<template>
  <div class="about">
    <h1>qna 리스트</h1>
    <h3>카테고리 검색기능</h3>
    <h3>검색기능</h3>

    <a href="/qnaDetailView"><h3>qna상세 보기</h3></a>
    <h3>조회수</h3>

    <hr />
    <!--사용자일 경우-->
    <a href="/qnaWriteView"><h3>글작성</h3></a>
  </div>
</template>

<script>
export default {
  name: 'QnaListlView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
