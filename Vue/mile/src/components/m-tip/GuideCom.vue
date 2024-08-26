<template>
  <div key="profile" class="cards guide-card">
    <div class="guide-container">
      <div class="guide-header">
        <div class="guide-title">M-Tip 가이드</div> 
        <div v-if="notices.length > 0" class="file-download-wrapper-mobile">
          <a @click.prevent="downloadFile(notices[0])"
             href="#"
             class="file-download-link"
          >
            상세보기
          </a>
        </div>
      </div>
      <div v-if="notices.length === 0" class="no-notices">
        등재된 게시글이 없습니다.
      </div>
      <div v-else class="notice-item" v-for="notice in notices" :key="notice?.mtip_guide_no">
        <div class="notice-details">
          <div class="notice-content-wrapper">
            <div class="notice-content">{{ notice?.mtip_guide_content }}</div>
            <div v-if="notice.mtip_guide_file" class="file-download-wrapper-desktop">
              <a @click.prevent="downloadFile(notice)"
                 href="#"
                 class="file-download-link"
              >
                상세보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  import { mapGetters } from "vuex";
  import api from '@/api/axios';

  export default {
    name: "GuideCom",
    data() {
      return{
        notices: [] // 게시글 목록을 저장할 배열
      }
    },
    computed: {
      ...mapGetters("login", ["getLoginInfo"]),
      loginInfo() {
        const info = this.getLoginInfo;
        return info
          ? {
              ...info,
              position_no: info.position_no || "",
              level_no: info.level_no || "",
              job_no: info.job_no || "",
              dp_no: info.dp_no || "",
            }
          : null;
      },
    },
    methods: {

      handleMouseDown(event) {
      event.target.style.color = '#f4ada4';
    },
    handleMouseUp(event) {
      event.target.style.color = '#f4ada4';
    },

    async fetchNotices() {
      try {
        const response = await api.get('/mtip/list');
        this.notices = response.data.filter(notice => notice && notice.mtip_guide_no);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    },

    async downloadFile(notice) {
  try {
    const response = await api.get(`/notice/downloadGuide/${notice.mtip_guide_file}`, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.getDisplayFileName(notice.mtip_guide_file);
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('파일 다운로드 중 오류가 발생했습니다.', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('서버 응답 데이터:', error.response.data);
    }
  }
},




    getDisplayFileName(fileName) {
      return fileName.split('/').pop();
    },
  },
  created() {
    this.fetchNotices();
  }
  };
  </script>
  
  <style scoped>

.guide-card {
  height: auto;
  margin-top: 40px;
  padding: 20px;
}

.guide-container {
  text-align: left;
}

.guide-title {
  font-size: 24px;
  font-family: 'KB_C2', sans-serif;
  font-weight: bold;
}


.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


.no-notices {
  font-family: 'KB_C2', sans-serif;
  color: #4b4a4a;
  margin-top: 20px;
}

.notice-item {
  margin: 10px 0;
}

.notice-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notice-content {
  flex-grow: 1;
  font-size: 20px;
  font-family: 'KB_C2', sans-serif;
}

.file-download-link {
  color: #ffca05;
  margin-right: 2px;
  font-family: 'KB_C2', sans-serif;
  font-size: 17px;
  text-decoration: none;
}

.file-download-wrapper-mobile {
  display: none;
}


@media (max-width: 768px) {
  .guide-title {
    font-size: 20px;
  }
  
  .notice-content {
    font-size: 16px;
  }
  
  .file-download-link {
    font-size: 14px;
  }

  
  .file-download-wrapper-desktop {
    display: none;
  }


  .file-download-wrapper-mobile {
    display: block;
  }
}

.guide-card{
  margin-top:40px !important;
}
@media (max-width: 480px) {
  .guide-card {
    margin-top:20px;
    padding: 15px;
  }
  
  .guide-title {
    font-size: 18px;
  }
  
  .notice-content {
    font-size: 14px;
  }
  
  .file-download-link {
    font-size: 12px;
  }
}
  </style>