<!--🚨관리자 m-tip 가이드 작성화면 -->
<template>
  <div class="about">
    <h1>관리자 M-TIP 가이드 작성</h1>
    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>
    <h3>제목</h3>
    <h3>카테고리</h3>
    <h3>첨부파일</h3>
    <h3>내용</h3>
    <h3>등록하기</h3>
  </div>
</template>

<script>
export default {
  name: 'M_TipGuideWriteAdminView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
