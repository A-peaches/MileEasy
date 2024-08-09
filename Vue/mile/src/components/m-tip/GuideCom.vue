<template>
  <div key="profile" class="cards" style="height: 105%; padding-left:30px; margin-top:20px;">
    <div class="guide-container">
      <div style="font-size: 24px; font-family: 'KB_S3', sans-serif; margin-right: 10px; text-align: left;">M-Tip 가이드</div> 
      <div v-if="notices.length === 0" style="font-family: 'KB_S5', sans-serif; color: #4b4a4a; margin-top: 20px;">
        등재된 게시글이 없습니다.
      </div>
      <div v-else class="notice-item" v-for="notice in notices" :key="notice?.mtip_guide_no">
        <div class="notice-details">
          <div class="notice-content-wrapper">
            <div class="notice-content">{{ notice?.mtip_guide_content }}</div>
            <div v-if="notice.mtip_guide_file" class="file-download-wrapper">
              <a @click.prevent="downloadFile(notice)"
                 href="#"
                 class="file-download-link" style="color: #ffca05; margin-right: 2px;font-family: 'KB_S5', sans-serif; font-size: 17px;"
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
        console.log('m-tip 게시글 db 접근');
        const response = await api.get('/mtip/list');
        console.log('m-tip 게시글 db에서 가지고 온 데이터:', response.data); // 가져온 데이터 출력
        this.notices = response.data.filter(notice => notice && notice.mtip_guide_no);
        console.log('Filtered notices:', this.notices); // 필터링된 데이터 출력
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    },

    async downloadFile(notice) {
  console.log('downloadFile 함수가 호출되었습니다.');
  try {
    console.log('다운로드 요청 URL:', `/notice/downloadGuide/${notice.mtip_guide_file}`);
    const response = await api.get(`/notice/downloadGuide/${notice.mtip_guide_file}`, {
      responseType: 'blob',
    });
    console.log('서버 응답:', response);  // 서버 응답 전체를 출력합니다.
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
      console.error('서버 응답 상태 코드:', error.response.status);
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

  .guide-container {
  text-align: left;
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
  font-family: 'KB_S4', sans-serif;
}


  </style>