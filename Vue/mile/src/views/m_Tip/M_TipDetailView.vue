<template>
  <div class="app-container">
    <div v-if="notice" class="content cards">
      <div class="header">
        <div class="back-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
          </button>
        </div>
        <div class="actions">
          <!-- 로그인한 사용자가 글 작성자인 경우 -->
          <div
            v-if="
              isLoggedIn && notice.user_no === loginInfo.user_no && !isChecked
            "
          >
            <button class="edit-button mr-3" @click="goToModifyView">
              수정
            </button>
            <button class="delete-button mr-3" @click="deleteNotice">
              삭제
            </button>
          </div>
          <div
            v-if="
              isLoggedIn &&
              loginInfo.user_is_admin &&
              !loginInfo.user_is_manager &&
              isChecked
            "
          >
            <button class="revoke-button" @click="mtip_complainBack">
              신고취하
            </button>
            &nbsp;&nbsp;
            <button class="delete-button" @click="deleteNoticeAdmin">
              삭제
            </button>
          </div>
        </div>
      </div>
      <div class="content">
        <span v-if="isNew(notice?.mtip_board_date)" class="new-label">NEW</span>
        <h1 class="title">{{ notice?.mtip_board_title }}</h1>
        <div class="meta">
          <span class="author">{{ notice?.user_name }}</span>
          <span class="date">{{ formatDate(notice?.mtip_board_date) }}</span>
        </div>
        <div class="main-content">
          <div class="body">
            <pre><p>{{ notice?.mtip_board_content }}</p></pre>
            <!-- 줄 바꿈 -->
          </div>
          <div class="file cards">
            <div style="display: flex; align-items: center">
              <h2 style="margin-right: 10px">첨부파일</h2>
              <span
                v-if="!notice.mtip_board_file"
                style="
                  color: #4b4a4a;
                  font-family: 'KB_C2', sans-serif;
                  margin-left: 2%;
                  white-space: nowrap;
                "
                >파일이 존재하지 않습니다.</span
              >
            </div>
            <div v-if="notice.mtip_board_file" style="margin-top: 10px">
              <a
                @click.prevent="downloadFile"
                href="#"
                class="file-download-link"
              >
                {{ getDisplayFileName(notice?.mtip_board_file) }}
              </a>
            </div>
          </div>
        </div>
        <div class="stats-container">
          <div class="icon-container">
            <div class="views-icon">
              <i class="bi bi-eye"></i>
            </div>
            <div class="views-text">{{ notice?.mtip_board_hit }}</div>
          </div>
          <div class="icon-container" @click="toggleLike">
            <div class="heart-icon">
              <i
                :class="['bi', isLiked ? 'bi-heart-fill' : 'bi-heart']"
                :style="{ color: isLiked ? '#dc3545' : 'inherit' }"
              ></i>
            </div>
            <div class="views-text">{{ notice?.mtip_board_like }}</div>
          </div>
        </div>
      </div>
      <div class="content-container mx-auto">
        <div class="actions">
          <div v-if="isLoggedIn && loginInfo.user_is_admin && isChecked"></div>
          <div v-else>
            <span class="alert-icon">🚨</span>
            <button class="report-button" @click="mtip_complain">
              신고하기
            </button>
          </div>
        </div>
        <hr class="divider" />

        <UserComment
          v-if="isNoticeLoaded"
          :login-info="loginInfo"
          :mtip_board_no="notice.mtip_board_no"
        />
      </div>
    </div>
    <div v-else>
      <p v-if="isLoading">Loading...</p>
      <p v-else>No data available</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import { mapActions, mapGetters, mapState } from 'vuex';
import Swal from 'sweetalert2';
import UserComment from '@/components/m-tip/UserComment';
import mtipReply from '@/store/mtip/mtipReply';

export default {
  name: 'M_TipDetailView',
  props: ['mtip_board_no'],
  modules: {
    mtipReply,
  },
  data() {
    return {
      isLoading: true,
      isNoticeLoaded: false,
      comments: [], // comments를 초기화
    };
  },
  watch: {
    '$route.params.mtip_board_no': {
      immediate: true,
      handler(newId, oldId) {
        if (newId && newId !== oldId) {
          this.fetchNoticeDetail(newId);
          this.$store.commit('mtipReply/CLEAR_COMMENTS');
          this.$store.dispatch('mtipReply/fetchComments', newId);
        }
      },
    },
  },
  components: {
    UserComment,
  },
  methods: {
    ...mapActions('mtipBoard', [
      'fetchNoticeDetail',
      'likePost',
      'unlikePost',
      'checkLikeStatus',
    ]),

    async toggleLike() {
      console.log('여기까지오긴옴');
      if (!this.loginInfo) {
        alert('로그인이 필요합니다.');
        return;
      }
      console.log('로그인확인완룡');
      if (!this.notice) {
        console.error('Notice data is not available');
        return;
      }
      console.log('노티스확인완룡!');
      try {
        const action = this.isLiked ? 'unlikePost' : 'likePost';
        console.log('이제 엑시오스 갈거임.');
        const result = await this.$store.dispatch(`mtipBoard/${action}`, {
          mtip_board_no: this.notice.mtip_board_no,
          user_no: this.loginInfo.user_no,
        });

        console.log('서버에서 받은 좋아요 상태:', result);

        // 좋아요 상태 업데이트
        await this.$store.dispatch('mtipBoard/checkLikeStatus', {
          mtip_board_no: this.notice.mtip_board_no,
          user_no: this.loginInfo.user_no,
        });

        // 서버에서 받아온 좋아요 수를 직접 설정
        if (result !== -1) {
          this.notice.mtip_board_like = result.isLiked; // 서버에서 받은 좋아요 수를 그대로 반영
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },
    async deleteNotice() {
      Swal.fire({
        title: '경고',
        text: '정말로 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b4a4a',
        cancelButtonColor: '#bd2c3a',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false,
        allowOutsideClick: false,
        scrollbarPadding: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.delete(`/mtip/delete/${this.notice.mtip_board_no}`);
            Swal.fire({
              title: '게시글 삭제 완료',
              text: '게시글이 삭제 되었습니다.',
              icon: 'success',
              allowOutsideClick: false,
              scrollbarPadding: false,
            }).then(() => {
              this.$router.push('/M_TipListView');
            });
          } catch (error) {
            console.error('게시글 삭제 중 오류가 발생했습니다.', error);
            Swal.fire({
              title: '게시글 삭제 중 오류가 발생했습니다.',
              icon: 'error',
              allowOutsideClick: false,
              scrollbarPadding: false,
            });
          }
        }
      });
    },

    async deleteNoticeAdmin() {
      Swal.fire({
        title: '경고',
        text: '정말로 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b4a4a',
        cancelButtonColor: '#bd2c3a',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false,
        allowOutsideClick: false,
        scrollbarPadding: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.delete(`/mtip/delete/${this.notice.mtip_board_no}`);
            Swal.fire({
              title: '게시글 삭제 완료',
              text: '게시글이 삭제 되었습니다.',
              icon: 'success',
              allowOutsideClick: false,
              scrollbarPadding: false,
            }).then(() => {
              this.$router.push('/mTipMainAdminView');
            });
          } catch (error) {
            console.error('게시글 삭제 중 오류가 발생했습니다.', error);
            Swal.fire({
              title: '게시글 삭제 중 오류가 발생했습니다.',
              icon: 'error',
              allowOutsideClick: false,
              scrollbarPadding: false,
            });
          }
        }
      });
    },

    mtip_complain() {
      if (
        this.notice.mtip_complain === 1 ||
        this.notice.mtip_complain === true
      ) {
        Swal.fire({
          title: '경고',
          text: '이미 신고된 게시글 입니다.',
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#4b4a4a',
          cancelButtonColor: '#bd2c3a',
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          reverseButtons: false,
        });
        return;
      }

      Swal.fire({
        title: '신고',
        text: '정말로 이 게시글을 신고하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b4a4a',
        cancelButtonColor: '#bd2c3a',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.post(`/mtip/complain/${this.notice.mtip_board_no}`);
            Swal.fire(
              '신고완료',
              '정상적으로 게시글 신고가 완료되었습니다.',
              'success'
            ).then(() => {
              this.$router.push('/M_TipListView');
            });
          } catch (error) {
            console.error('신고하기 중 오류가 발생했습니다.', error);
            Swal.fire('신고하기 중 오류가 발생했습니다.', '', 'error');
          }
        }
      });
    },

    mtip_complainBack() {
      Swal.fire({
        title: '신고취하',
        text: '정말로 이 게시글을 신고취하 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b4a4a',
        cancelButtonColor: '#bd2c3a',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.post(`/mtip/complainBack/${this.notice.mtip_board_no}`);
            Swal.fire(
              '성공',
              '정상적으로 게시글 신고취하가 완료되었습니다.',
              'success'
            ).then(() => {
              this.$router.push('/mTipMainAdminView'); //여기 변경해야댐
            });
          } catch (error) {
            console.error('신고취하 중 오류가 발생했습니다.', error);
            Swal.fire('신고취하 중 오류가 발생했습니다.', '', 'error');
          }
        }
      });
    },

    showAlert(message, icon) {
      this.$swal({
        title: message,
        icon: icon,
        confirmButtonText: '확인',
        confirmButtonColor: '#4b4a4a',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        scrollbarPadding: false,
        backdrop: true,
        didOpen: () => {
          document.body.classList.add('no-scroll');
          document.documentElement.style.overflow = 'hidden';
        },
        willClose: () => {
          document.body.classList.remove('no-scroll');
          document.documentElement.style.overflow = '';
        },
      });
    },

    getDisplayFileName(fileName) {
      const UUID_LENGTH = 36 + 1;

      if (!fileName || fileName.length <= UUID_LENGTH) {
        return fileName;
      }

      if (fileName.charAt(UUID_LENGTH - 1) === '_') {
        return fileName.substring(UUID_LENGTH);
      }

      return fileName;
    },

    goBack() {
      this.$router.go(-1);
    },
    goToModifyView() {
      console.log('modify 화면으로 넘긴 정보:', this.notice.mtip_board_no);
      this.$router.push({
        name: 'm_TipModifyView',
        params: { mtip_board_no: this.notice.mtip_board_no },
      });
    },
    isNew(dateString) {
      const today = new Date();
      const noticeDate = new Date(dateString);
      const diffTime = Math.abs(today - noticeDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    },
    formatDate(dateString) {
      if (!dateString) return 'Date not available';

      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return ' ↺ 댓글 등록 중';
      }

      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };

      return date.toLocaleString('ko-KR', options);
    },

    async downloadFile() {
      try {
        const fileName = encodeURIComponent(this.notice.mtip_board_file);
        const response = await api({
          url: `/mtip/downloadGuide/${fileName}`,
          method: 'GET',
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.notice.mtip_board_file);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('파일 다운로드 중 오류 발생:', error);
        this.showAlert('파일 다운로드 중 오류가 발생했습니다.', 'error');
      }
    },
    async fetchNoticeDetail(id) {
      this.isLoading = true;
      this.isNoticeLoaded = false;
      await this.$store.dispatch('mtipBoard/fetchNoticeDetail', id);

      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
      this.isLiked = likedPosts[this.notice.mtip_board_no] || false;

      this.isLoading = false;
      this.isNoticeLoaded = true;
    },
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters('mtipBoard', ['getNotice']),
    ...mapState('login', ['loginInfo']),
    ...mapState('mtipBoard', ['likedPosts']),

    notice() {
      return this.getNotice || null;
    },
    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo;
    },
    mileNo() {
      return this.$route.params.notice.mtip_board_no;
    },
    isLiked() {
      return this.$store.getters['mtipBoard/isPostLiked'](
        this.loginInfo.user_no,
        this.notice.mtip_board_no
      );
    },
  },
  mounted() {
    const noticeId = this.$route.params.mtip_board_no;
    if (noticeId) {
      this.fetchNoticeDetail(noticeId);
      this.$store.commit('mtipReply/CLEAR_COMMENTS'); // 댓글 초기화
      this.$store.dispatch('mtipReply/fetchComments', noticeId);
    }
  },
};
</script>

<style scoped>
.body pre {
  white-space: pre-wrap; /* 줄바꿈과 공백을 유지하여 표시 */
  word-wrap: break-word; /* 길이가 길 경우 줄바꿈 */
}
.app-container {
  width: 100%;
  padding: 0px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 30px;
  flex: 1;
}

.edit-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_C2', sans-serif;
  color: #714319;
  padding: 5px 0px;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_C2', sans-serif;
  color: #714319;
}
/* 신고취하 버튼*/
.revoke-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_C2', sans-serif;
  color: #714319;
}

.content {
  padding: 30px;
  width: 95%;
  max-width: 1300px;
  box-sizing: border-box;
  min-height: 90vh;
}

.content.cards {
  width: 100%;
  border: 1px solid #ccc;
  padding: 60px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 100vh;
}

.title {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'KB_C2', sans-serif;
  font-weight: bold;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 95px;
  font-family: 'KB_C2', sans-serif;
}

.meta .author {
  margin-right: 5px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 15vh;
}

.body p {
  font-size: 19px;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: left !important;
  padding-left: 2.5vw !important;
  padding-right: 3vw !important;
}

.body p {
  margin-bottom: 10px;
}

.file.cards {
  background-color: hsl(0, 0%, 95%);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  position: relative;
  left: 50%;
  transform: translateX(-48%);
  width: 102%;
}

.file h2 {
  text-align: left;
  font-size: 21px;
  font-family: 'KB_C2', sans-serif;
  color: #4b4a4a;
}

.file a {
  text-align: left;
  font-size: 19px;
  font-family: 'KB_C2', sans-serif;
  margin-left: 3%;
  display: block; /* 변경된 부분 */
}

.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
}

.views-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
}

.views-icon i {
  /*font-size: 1.4vw;*/
  font-size: 14pt;
  color: #4b4a4a;
}

.heart-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 84px;
  margin-left: 30px;
}

.heart-icon i {
  /*font-size: 1.3vw;*/
  font-size: 14pt;
  color: #dc3545;
  cursor: pointer;
}
.views-text {
  flex: 0 0 auto;
  text-align: left;
  /*font-size: 1.2vw;*/
  font-size: 14pt;
  font-family: 'KB_C2', sans-serif;
  color: #4b4a4a;
  margin-left: 0.8vw;
  margin-top: 80px;
}

.new-label {
  color: #ffca05;
  /* margin-left: 5px; */
  text-align: center;
  font-size: 18px;
  font-family: 'KB_C2', sans-serif;
  margin-left: 0%;
  display: inline-block;
  margin-bottom: 8px;
}

.content-container {
  width: 95%;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 왼쪽 정렬 */
  margin-left: 10px; /* 전체를 오른쪽으로 살짝 이동 */
}

.report-button {
  font-size: 18px;
  font-family: 'KB_C2', sans-serif;
  color: #4b4a4a;
  margin-right: 5px; /* 버튼과 아이콘 사이의 간격 조정 */
}

.alert-icon {
  font-size: 20pt;
  margin-left: 5px; /* 아이콘을 버튼과의 간격 조정 */
  margin-bottom: 10px;
}

.divider {
  margin-bottom: 20px;
}
@media (max-width: 768px) {
  .views-icon i {
    font-size: 14pt;
  }
  .views-text {
    font-size: 14pt;
  }
  .bi-heart::before {
    font-size: 14pt;
  }
  .bi-heart-fill::before {
    font-size: 14pt;
  }
  .edit-button {
    font-size: 15px;
  }
  .delete-button {
    font-size: 15px;
  }
}
</style>
