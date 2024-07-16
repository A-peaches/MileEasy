<!--🚨 사용자 m-tip 작성 화면-->
<template>
  <div class="about">
    <h1>M-TIP 작성하기</h1>
    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>
    <h3>제목</h3>
    <h3>첨부파일</h3>
    <h3>내용</h3>
    <h3>등록</h3>
  </div>
</template>

<script>
export default {
  name: 'MTipWriteView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
