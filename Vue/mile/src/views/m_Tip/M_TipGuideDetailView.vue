<!--🚨관리자 m-tip 가이드 상세보기-->
<template>
  <div class="about">
    <h1>관리자 M-TIP 가이드 상세보기</h1>

    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>

    <h3>가이드 내용</h3>

    <!--마일 easy담당자일경우 -->
    <a href="/m_TipGuideModifyAdminView"><h3>수정</h3></a>
    <h3>삭제</h3>
  </div>
</template>

<script>
export default {
  name: 'M_TipGuideDetailView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
