<!-- UserComment.vue -->
<template>
  <div class="comments-section">
    <div class="comments-header">
      <h3>댓글 ({{ comments.length }})</h3>
    </div>
    <div class="comment-form">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea>
      <button @click="postComment">댓글 작성</button>
    </div>
    <div v-if="comments && comments.length">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <p>{{ comment.text }}</p>
      </div>
    </div>
    <div v-else>
      댓글이 없습니다.
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserComment',
  props: {
    comments: {
      type: Array,
      required: true,
    },
    loginInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newComment: '',
    };
  },
  methods: {
    postComment() {
      if (!this.newComment.trim()) return;
      this.$emit('post-comment', {
        text: this.newComment.trim(),
        user_no: this.loginInfo.user_no,
      });
      this.newComment = '';
    },
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 30px;
  padding: 20px;
  border-top: 1px solid #ccc;
}

.comments-header {
  margin-bottom: 20px;
}

.comment-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.comment-form textarea {
  flex-grow: 1;
  margin-left: 10px;
  padding: 10px;
}

.comment-form button {
  margin-left: 10px;
  padding: 10px 20px;
}

.comment {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}
</style>
