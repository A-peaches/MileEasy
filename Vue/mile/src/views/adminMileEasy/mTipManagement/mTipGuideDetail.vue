<template>
  <div class="app-container">
    <div v-if="notice" class="content cards">
      <div class="header">
        <div class="button-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
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
          <div class="actions">
            <button class="edit-button" @click="goToModifyView">수정</button>
            <button class="delete-button" @click="deleteNotice">삭제</button>
          </div>
        </div>
      </div>
      <div class="content">
        <span v-if="isNew(notice.mtip_guide_date)" class="new-label">NEW</span>
        <h1 class="title">{{ notice.mtip_guide_title }}</h1>
        <div class="meta">
          <span class="author">{{ notice.user_name }}</span>
          <span class="date">{{ formatDate(notice.mtip_guide_date) }}</span>
        </div>
        <div class="main-content">
          <div class="body">
            <pre><p>{{ notice.mtip_guide_content }}</p></pre>
          </div>
          <div class="file cards">
            <div style="display: flex; align-items: center">
              <h2 style="margin-right: 10px">첨부파일</h2>
              <span
                v-if="!notice.mtip_guide_file"
                style="
                  color: #4b4a4a;
                  font-family: 'KB_S5', sans-serif;
                  margin-left: 2%;
                  white-space: nowrap;
                "
                >파일이 존재하지 않습니다.</span
              >
            </div>
            <div v-if="notice.mtip_guide_file" style="margin-top: 10px">
              <a
                @click.prevent="downloadFile"
                href="#"
                class="file-download-link"
              >
                {{ getDisplayFileName(notice.mtip_guide_file) }}
              </a>
            </div>
          </div>
        </div>
        <div class="icon-container">
          <div class="views-icon">
            <i class="bi bi-eye"></i>
          </div>
          <div class="views-text">{{ notice.mtip_guide_hit }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import { mapActions, mapGetters } from 'vuex';

import Swal from 'sweetalert2';

export default {
  props: {
    mtipGuideNo: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      guideDetail: null,
    };
  },
  methods: {
    ...mapActions('notice', ['MtipGuideDetail', 'guide_incrementViews']),

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
        scrollbarPadding: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.delete(
              `/notice/Guidedelete/${this.notice.mtip_guide_no}`
            );
            Swal.fire(
              '게시글 삭제 완료',
              '게시글이 삭제 되었습니다.',
              'success'
            ).then(() => {
              this.$router.push('/mTipMainAdminView');
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
          document.querySelector('.swal2-container').style.zIndex = '999999';
        },
      });
    },

    getDisplayFileName(fileName) {
      return fileName.split('/').pop();
    },

    goBack() {
      this.$router.go(-1);
    },

    goToModifyView() {
      this.$router.push({
        name: 'mTipGuideModify',
        params: { mtipGuideNo: this.notice.mtip_guide_no },
      });
    },

    isNew(dateString) {
      const now = new Date();
      const date = new Date(dateString);
      const timeDiff = now - date;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },

    async downloadFile() {
      try {
        const response = await api.get(
          `/notice/downloadGuide/${this.notice.mtip_guide_file}`,
          {
            responseType: 'blob',
          }
        );
        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.getDisplayFileName(this.notice.mtip_guide_file);
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('파일 다운로드 중 오류가 발생했습니다.', error);
      }
    },
  },
  computed: {
    ...mapGetters('login', {
      loginInfo: 'getLoginInfo',
      isChecked: 'getIsChecked',
    }),
    ...mapGetters('notice', {
      notice: 'getMtipGuideList',
      allNotices: 'getMtipGuideLists',
    }),

    isLoggedIn() {
      return !!this.loginInfo;
    },
    mileNo() {
      return this.$route.params.mile_no; // URL에서 전달받은 mile_no를 컴포넌트에서 사용
    },
  },
  watch: {
    mtipGuideNo(newVal) {
      if (newVal) {
        this.MtipGuideDetail(newVal);
      }
    },
  },
  mounted() {
    console.log('mtipGuideNo:', this.mtipGuideNo);
    if (this.mtipGuideNo) {
      console.log('Calling MtipGuideDetail with:', this.mtipGuideNo);
      this.MtipGuideDetail(this.mtipGuideNo);
      this.guide_incrementViews(this.mtipGuideNo);
    } else {
      console.log('mtipGuideNo is not available');
    }
  },
  created() {
    if (this.mtipGuideNo) {
      this.MtipGuideDetail(this.mtipGuideNo);
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
  padding-left: 10px;
  flex: 1;
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5b5b5b;
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
}

.views-icon i {
  font-size: 1.8vw;
  color: #4b4a4a;
}

.views-text {
  flex: 0 0 auto;
  text-align: left;
  font-size: 1.5vw;
  font-family: 'KB_S5', sans-serif;
  color: #4b4a4a;
  margin-left: 0.8vw;
}

.new-label {
  color: #ffca05;
  /* margin-left: 5px; */
  text-align: center;
  font-size: 18px;
  font-family: 'KB_S3', sans-serif;
  margin-left: 0%;
  display: inline-block;
  margin-bottom: 8px;
}
</style>
