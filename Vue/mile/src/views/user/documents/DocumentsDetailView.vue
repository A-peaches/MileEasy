<template>
  <div class="about">
    <h1>문서모아 상세보기</h1>
    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>
    <h3>제목/내용/작성자/작성일</h3>
    <h3>파일 다운로드 기능</h3>
  </div>
</template>

<script>
export default {
  name: 'DocumentsDetailView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
