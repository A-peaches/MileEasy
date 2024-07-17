<!--🚨마일리지 관리자 :  마일리지 추가화면-->
<template>
  <div class="about">
    <h1>마일리지 관리자 : 마일리지 추가하기</h1>
    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>
    <hr />
    <h3>제목</h3>
    <h3>내용</h3>
    <h3>상세보기 추가하기</h3>

    <h3>등록하기</h3>
  </div>
</template>

<script>
export default {
  name: 'IntroduceMileageAddAdminView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
