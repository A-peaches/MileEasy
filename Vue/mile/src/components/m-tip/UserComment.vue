<!-- UserComment.vue -->
<template>
  <div class="comments-section">
    <div class="comments-header">
      <i
        class="bi bi-chat-right-text"
        style="font-size: 20px; margin-right: 10px"
      ></i>
      <h3
        style="
          font-size: 17px;
          font-family: 'KB_C2', sans-serif;
          text-align: left;
          margin: 0;
        "
      >
        댓글 ({{ comments.length }})
      </h3>
    </div>
    <div class="comment-input" style="width: 100%">
      <textarea
        class="input-base"
        placeholder="댓글을 입력해주세요"
        v-model="newComment"
        @keydown.enter.prevent="addComment"
        style="
          font-family: 'KB_C2', sans-serif;
          font-size: 18px;
          width: 100%;
          height: 80px;
          resize: none;
          padding: 10px;
          text-align: left;
        "
      ></textarea>
      <button
        class="btn-yellow btn-yellow:hover"
        @click="addComment"
        @keydown.enter.prevent="addComment"
        style="
          font-family: 'KB_C2', sans-serif;
          font-size: 18px;
          width: 100px;
          height: 80px;
          color: #4b4a4a;
        "
      >
        등록
      </button>
    </div>

    <div v-if="comments && comments.length">
      <div
        class="comment"
        v-for="comment in comments"
        :key="comment.mtip_reply_no"
      >
        <img
          v-if="comment && comment.user_no"
          :src="profileImageUrl(comment.user_no)"
          class="profile-small my-3"
          alt="Profile Picture"
          @error="setDefaultImage"
        />
        <div class="comment-content">
          <div class="comment-meta">
            <span
              class="comment-user"
              style="
                font-family: 'KB_C2', sans-serif;
                font-size: 18px;
                margin-right: 15px;
              "
              >{{ comment.user_name }}</span
            >
            <span
              class="comment-date"
              style="font-family: 'KB_C2', sans-serif; font-size: 14px"
              >{{ formatDate(comment.mtip_reply_date) }}</span
            >
            <div class="comment-actions" style="margin-left: 50px">
              <div v-if="comment.user_no === loginInfo.user_no">
                <button
                  v-if="!comment.isEditing"
                  class="edit-button"
                  @click="startEditing(comment)"
                  style="color: #714319"
                >
                  수정
                </button>
                <button
                  v-if="comment.isEditing"
                  class="edit-button"
                  @click="finishEditing(comment)"
                  style="color: #714319"
                >
                  수정완료
                </button>
                &nbsp;
                <button
                  class="delete-button"
                  @click="deleteComment(comment.mtip_reply_no)"
                  style="color: red"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
          <div v-if="comment.isEditing">
            <textarea
              v-model="comment.editingContent"
              class="input-base"
              style="
                font-family: 'KB_C2', sans-serif;
                min-height: 30px;
                height: auto;
                font-size: 18px;
                width: 100%;
                resize: none;
                overflow-y: hidden;
                line-height: 2;
                text-align: left;
                box-sizing: border-box;
              "
            ></textarea>
          </div>
          <div
            v-else
            class="comment-text"
            style="
              font-family: 'KB_C2', sans-serif;
              font-size: 18px;
              margin-right: 1%;
              text-align: left;
            "
          >
            {{ comment.mtip_reply_content || comment.editingContent }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      style="
        font-family: 'KB_C2', sans-serif;
        font-size: 15px;
        margin-top: 100px;
      "
    >
      해당 게시글의 댓글이 없습니다.
    </div>
  </div>
</template>

<script>
// import api from '@/api/axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserComment',
  props: {
    loginInfo: {
      type: Object,
      required: true,
    },
    mtip_board_no: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // comments: [], // 수정된 부분
      newComment: '',
      // editingCommentId: null, // 추가된 부분
    };
  },

  created() {
    this.fetchComments(this.mtip_board_no);
  },

  computed: {
    ...mapGetters('mtipReply', ['getComments']),
    comments() {
      return this.getComments;
    },
  },
  watch: {
    comments: {
      deep: true,
      
    },
  },

  methods: {
    ...mapActions('mtipReply', [
      'fetchComments',
      'addComment',
      'updateComment',
      'deleteComment',
    ]),

    //프로필 사진 불러오기
    profileImageUrl(user_no) {
      if (user_no != null) {
        if (process.env.NODE_ENV === 'development') {
          return `${process.env.VUE_APP_API_URL}/profile/${user_no}.jpg`;
        } else {
          return `/profile/${user_no}.jpg`;
        }
      }
      return ''; // 또는 기본 이미지 URL
    },

    getInitials(name) {
      return name ? name.charAt(0).toUpperCase() : '?';
    },

    startEditing(comment) {
      comment.isEditing = true;
      comment.editingContent = comment.mtip_reply_content;
    },

    async fetchComments(mtip_board_no) {
      await this.$store.dispatch('mtipReply/fetchComments', mtip_board_no);
    },

    async addComment() {
      if (!this.newComment.trim()) return;
      const commentData = {
        user_no: this.loginInfo.user_no,
        user_name: this.loginInfo.user_name,
        mtip_board_no: this.mtip_board_no,
        mtip_reply_content: this.newComment.trim(),
      };
      try {
        await this.$store.dispatch(
          'mtipReply/addComment',
          commentData
        );
        this.newComment = '';
        // window.location.reload()

        // fetchComments 호출하여 댓글 목록을 다시 불러옵니다.
        await this.fetchComments(this.mtip_board_no);
      } catch (error) {
        console.error('댓글 등록 중 오류가 발생했습니다:', error); // 에러 발생 시 로그
      }
    },

    // 기본 프로필 사진
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    //날짜 변형
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      return new Date(dateString).toLocaleString('ko-KR', options);
    },
    goToModifyView(comment) {
      // 수정 기능 구현, 필요에 따라 매개변수 전달
      this.newComment = comment.mtip_reply_content;
      this.editingCommentId = comment.mtip_reply_no;
    },
    async finishEditing(comment) {
      if (!comment.editingContent.trim()) return;

      const commentData = {
        mtip_reply_no: comment.mtip_reply_no,
        mtip_reply_content: comment.editingContent.trim(),
      };

      try {
        const updatedComment = await this.$store.dispatch(
          'mtipReply/updateComment',
          commentData
        );

        // 서버에서 반환된 데이터로 댓글 내용 업데이트
        comment.mtip_reply_content =
          updatedComment.mtip_reply_content || comment.editingContent.trim();
        comment.isEditing = false;
      } catch (error) {
        console.error('댓글 수정 중 오류가 발생했습니다:', error);
        // 오류 처리 (예: 사용자에게 알림)
      }
    },
    async deleteComment(mtip_reply_no) {
      try {
        await this.$store.dispatch('mtipReply/deleteComment', mtip_reply_no);
      } catch (error) {
        console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      }
    },
  },
};
</script>

<style scoped>
.comments-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-start; /* 왼쪽 정렬 */
  width: 100%; /* 전체 너비를 사용 */
}
.comment-input {
  display: flex;
  margin-bottom: 20px;
  gap: 10px; /* 텍스트 영역과 버튼 사이의 간격 */
}

.comment-input textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
}

.comment {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}
.profile-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  align-self: flex-start; /* 이미지를 왼쪽으로 정렬 */
}
.profile-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fff;
}
.comment-content {
  flex-grow: 1; /* 0.05에서 1로 변경 */
  width: calc(100% - 55px); /* 프로필 이미지 너비와 마진을 고려한 너비 설정 */
}
.comment-meta {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px; /* 이름/날짜와 내용 사이의 간격 */
}

@media (max-width: 768px) {
  .comment-meta {
    display: flex;
    flex-wrap: wrap; /* 줄바꿈을 허용하도록 변경 */
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;
  }

  .comment-actions {
    margin-left: 0; /* 마진을 제거하여 줄바꿈될 때 영향을 받지 않도록 함 */
    margin-top: 5px; /* 버튼들 사이의 간격 추가 */
    display: flex;
    justify-content: flex-start;
    width: 100%; /* 버튼들이 새로운 줄에서 100% 너비를 가지도록 함 */
  }

  .comment-actions button {
    margin-right: 10px; /* 버튼 사이의 간격 */
  }
}
</style>
