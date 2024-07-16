<template>
  <div class="about">
    <h1>사용자 qna 작성하기</h1>
    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>
    <h3>제목</h3>
    <h3>내용</h3>
    <h3>첨부파일</h3>
    <h3>조회수</h3>
  </div>
</template>

<script>
export default {
  name: 'QnaWriteView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
