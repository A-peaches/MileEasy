<template>
  <div class="about">
    <h1>qna 상세보기</h1>
    <button type="button" class="btn btn-primary" @click="goBack">
      이전버튼
    </button>
    <h3>제목</h3>
    <h3>내용</h3>
    <h3>첨부파일</h3>
    <h3>조회수</h3>
    <h3>댓글 내용</h3>

    <!--작성자 사용자일 경우-->
    <a href="/qnaModifyView"><h3>수정</h3></a>
    <h3>삭제</h3>

    <hr />
    <!--관리자일 경우-->
    <h3>댓글 작성</h3>
    <!--관리자 본인 작성자 일 경우-->
    <h3>수정</h3>
    <h3>삭제</h3>
  </div>
</template>

<script>
export default {
  name: 'QnaDetailView',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
