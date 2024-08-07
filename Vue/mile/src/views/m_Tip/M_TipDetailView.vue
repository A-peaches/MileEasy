<template>
  <div class="app-container">
    <div v-if="notice" class="content cards">
      <div class="header">
        <div class="button-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
          </button>
        </div>
        <div class="actions">
          <!-- 로그인한 사용자가 글 작성자인 경우 -->
          <div v-if="isLoggedIn && notice.user_no === loginInfo.user_no">
            <button class="edit-button" @click="goToModifyView">수정</button>
            <button class="delete-button" @click="deleteNotice">삭제</button>
          </div>

          <!-- 로그인한 사용자가 관리자인 경우 -->
          <div v-else-if="isLoggedIn && loginInfo.user_is_admin && !loginInfo.user_is_manager && isChecked">
            <button class="report-button" @click="reportNotice">신고하기</button>
            <span style="font-size: 25pt;">🚨</span>
          </div>
        </div>
      </div>
      <div class="content">
        <span v-if="isNew(notice.mtip_board_date)" class="new-label">NEW</span>
        <h1 class="title">{{ notice.mtip_board_title }}</h1>
        <div class="meta">
          <span class="author">{{ notice.user_name }}</span>
          <span class="date">{{ formatDate(notice?.mtip_board_date) }}</span>
        </div>
        <div class="main-content">
        <div class="body">
          <pre><p>{{ notice.mtip_board_content }}</p></pre> <!-- 줄 바꿈 -->
        </div>
        <div class="file cards" >
          <div style="display: flex; align-items: center;">
              <h2 style="margin-right: 10px;">첨부파일</h2>
              <span v-if="!notice.mtip_board_file" style="color: #4b4a4a; font-family: 'KB_S5',sans-serif; margin-left: 2%; white-space: nowrap;">파일이 존재하지 않습니다.</span>
            </div>
          <div v-if="notice.mtip_board_file" style="margin-top: 10px;">
            <a @click.prevent="downloadFile" href="#" class="file-download-link">
              {{ getDisplayFileName(notice.mtip_board_file) }} 
            </a>
          </div>
        </div>
      </div>
      <div class="stats-container">
        <div class="icon-container">
          <div class="views-icon">
            <i class="bi bi-eye"></i>
          </div>
          <div class="views-text">{{ notice.mtip_board_hit }}</div>
        </div>
        <div class="icon-container">
          <div class="heart-icon" @click="toggleLike">
            <i :class="['bi', isPostLiked(loginInfo.user_no, notice.mtip_board_no) ? 'bi-heart-fill' : 'bi-heart']"
           :style="{ color: isPostLiked(loginInfo.user_no, notice.mtip_board_no) ? '#dc3545' : 'inherit' }"></i>
           </div>
          <div class="views-text">{{ notice.mtip_board_like }}</div>
        </div>
       </div>
        <hr style="margin-top: 100px;">
        <CommentSection :comments="comments" :login-info="loginInfo" @post-comment="postComment" />
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
import CommentSection from '@/components/m-tip/UserComment';

export default {
  name: 'M_TipDetailView',
  props: ['mtip_board_no'],
  data() {
    return {
      isLoading: true,
    };
  },
  components : {
    CommentSection
  },
  methods: {
    ...mapActions('mtipBoard', ['fetchNoticeDetail', 'toggleLikeAction', 'fetchLikedPosts']),
    ...mapGetters('mtipBoard', ['getNotice', 'isPostLiked']),

    async toggleLike() {
      if (!this.loginInfo) {
        alert('로그인이 필요합니다.');
        return;
      }

      if (!this.notice) {
        console.error('Notice data is not available');
        return;
      }

      try {
        await this.toggleLikeAction({
          mtip_board_no: this.notice.mtip_board_no,
          user_no: this.loginInfo.user_no
        });
        await this.fetchLikedPosts(this.loginInfo.user_no);
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },

    async deleteNotice() {
      Swal.fire({
        title: '정말로 삭제하시겠습니까?',
        text: '다시 되돌릴 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4b4a4a',
        cancelButtonColor: '#bd2c3a',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false,
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            await api.delete(`/mtip/delete/${this.notice.mtip_board_no}`);
            Swal.fire('게시글 삭제 완료', '게시글이 삭제 되었습니다.', 'success').then(() => {
              this.$router.push('/M_TipListView');
            });
          } catch (error) {
            console.error('게시글 삭제 중 오류가 발생했습니다.', error);
            Swal.fire('게시글 삭제 중 오류가 발생했습니다.', '', 'error');
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
        }
      });
    },
    
    getDisplayFileName(fileName) {
  // UUID 길이와 구분자 "_"의 길이를 합한 값 (UUID: 36자, 구분자: 1자)
  const UUID_LENGTH = 36 + 1;

  // 파일 이름이 null이거나 길이가 UUID_LENGTH보다 짧은 경우
  if (!fileName || fileName.length <= UUID_LENGTH) {
    return fileName; // 파일 이름이 너무 짧아서 UUID가 포함될 수 없는 경우
  }

  // 파일 이름의 첫 부분이 UUID 형식인 경우 제거
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
      this.$router.push({ name: 'm_TipModifyView', params: { mtip_board_no: this.notice.mtip_board_no } });
    },
    isNew(dateString) {
      const today = new Date();
      const noticeDate = new Date(dateString);
      const diffTime = Math.abs(today - noticeDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    },
    formatDate(dateString) {
      console.log('Formatting date:', dateString);
      if (!dateString) return 'Date not available';
      
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return 'Invalid Date';
      }
      
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      
      return date.toLocaleString('ko-KR', options);
    },


    async downloadFile() {
    try {
      console.log("글쓰기 상세보기 fileName :",this.notice.mtip_board_file);
      const fileName = encodeURIComponent(this.notice.mtip_board_file);
      const response = await api({
        url: `/mtip/downloadGuide/${fileName}`,
        method: 'GET',
        responseType: 'blob',
      });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', this.notice.mtip_board_file); // 서버에서 받은 파일명을 그대로 사용
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
      await this.$store.dispatch('mtipBoard/fetchNoticeDetail', id);
      this.isLoading = false;
    },
},
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters('mtipBoard', ['getNotice']),
    ...mapState('login', ['loginInfo']),

    notice() {
      return this.getNotice || null; // null을 반환하여 undefined 방지
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
      return this.$route.params.notice.mtip_board_no; // URL에서 전달받은 mile_no를 컴포넌트에서 사용
    },
  },
  async mounted() {
    const noticeId = this.$route.params.mtip_board_no;
    if (noticeId) {
      await this.fetchNoticeDetail(noticeId);
    }
    if (this.loginInfo) {
      await this.fetchLikedPosts(this.loginInfo.user_no);
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
  margin-top : 4%;
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
  padding-left: 10px;
  flex: 1; 
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5B5B5B;
  font-size: 18px;
  cursor: pointer;
  margin-top: 0;
  font-family: 'KB_S5', sans-serif;
}

.back-button .arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 8px;
  font-size: 17px;
  font-family: 'KB_S5', sans-serif;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex: 1;
}

.edit-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
  color: #714319;
  padding: 5px 10px;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
  color: #714319;
  padding: 5px 10px;
}

.report-button{
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
  color: red;
  margin-top: 15px;
}

.content {
  padding: 20px;
  width: 95%;
  max-width: 1300px;
  box-sizing: border-box;
  min-height: 100vh;
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
  font-family: 'KB_S2', sans-serif;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 95px;
  font-family: 'KB_S5', sans-serif;
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
  border-radius: 20px;
  padding: 20px;
  position: relative;
  left: 50%;
  transform: translateX(-48%);
  width: 110%;
}

.file h2 {
  text-align: left;
  font-size: 21px;
  font-family: 'KB_S5', sans-serif;
  color: #4b4a4a;
}

.file a {
  text-align: left;
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
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
  font-size: 1.4vw;
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
  font-size: 1.3vw;
  color: #dc3545;
}
.views-text {
  flex: 0 0 auto;
  text-align: left;
  font-size: 1.2vw;
  font-family: 'KB_S5', sans-serif;
  color: #4b4a4a;
  margin-left: 0.8vw;
  margin-top: 80px;
}

.new-label {
  color: #ffca05;
  /* margin-left: 5px; */
  text-align: center;
  font-size:18px;
  font-family: 'KB_S3', sans-serif;
  margin-left:0%;
  display: inline-block;
  margin-bottom: 8px;
}

</style>