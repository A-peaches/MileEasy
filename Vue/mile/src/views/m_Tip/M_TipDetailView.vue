<!--🚨사용자 m-tip 상세보기 화면 -->
<template>
  <div class="about">
    <h1>M-TIP 상세보기</h1>

    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>

    <h3>M-tip 내용</h3>

    <!--사용자일 경우-->
    <h3>댓글 달기</h3>
    <h3>좋아요</h3>
    <h3>수정</h3>
    <h3>삭제</h3>

    <hr />

    <!-- 내 글일 경우-->
    <a href="/m_TipModifyView"><h3>수정</h3></a>
    <h3>삭제</h3>

    <hr />

    <!--마일easy 관리자 일 경우-->
    <h3>🚨삭제</h3>
  </div>
</template>

<script>
export default {
  name: 'M_TipDetailView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
