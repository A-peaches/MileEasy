<template>
  <div class="cards m-tip-container">
    <div class="m-tip-header">
      <h2 class="m-tip-title fw-bold">Best M-Tip</h2>
      <a href="/M_TipBestView" class="view-all">전체보기</a>
    </div>
    <div class="notice-list" :class="{ 'mobile-scroll': isMobile }">
      <div v-for="notice in bestNotices" :key="notice.mtip_board_no" class="notice-item">
        <span class="notice-mile">{{ notice.mile_name || '기타' }}</span>
        <div class="notice-content" @click ="handleNoticeClick(notice)">
          <span class="notice-title">
            {{ truncateTitle(notice.mtip_board_title) }}
            <i class="bi bi-heart-fill title-icon"></i>
          </span>
          <span class="notice-date">{{ formatDate(notice.mtip_board_date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import { mapGetters } from 'vuex'; // Vuex의 mapGetters를 사용합니다.

export default {
  name: 'BestM-TipCom',
  data() {
    return {
      bestNotices: [],
      isMobile: false
    };
  },
  computed: {
    ...mapGetters('mtipBoard', ['isPostLiked']), // Vuex getter를 가져옵니다.
  },
  methods: {
    truncateTitle(title) {
      if (title.length > 25) {
        return title.slice(0, 25) + '....';
      }
      return title;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    async fetchBestNotices() {
  try {
    const response = await api.get('/mtip/bestMtiplist');
    
    // mile_no 기준으로 오름차순 정렬, mile_name이 '기타' 또는 null인 항목은 마지막으로 이동
    this.bestNotices = response.data
      .sort((a, b) => {
        if (!a.mile_name || a.mile_name === '기타') return 1;  // a가 '기타'이면 뒤로 이동
        if (!b.mile_name || b.mile_name === '기타') return -1; // b가 '기타'이면 앞으로 이동
        return a.mile_no - b.mile_no;  // mile_no 기준으로 오름차순 정렬
      })
      .slice(0, 9); // 상위 9개의 게시글만 표시
  } catch (error) {
    console.error('Error fetching best notices:', error.response ? error.response.data : error.message);
  }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 480;
    },
    async handleNoticeClick(notice) {
      if (this.isProcessing) return;
      this.isProcessing = true;
      try {
        // 조회수 증가 요청
        await api.get(`/mtip/MtipViews/${notice.mtip_board_no}`);

        // 게시글 상세 정보 요청
        const response = await api.get(`/mtip/details/${notice.mtip_board_no}`);
        const noticeDetails = response.data;


        // 조회수 업데이트
        notice.mtip_board_hit += 1;

        // 하트 여부를 추가합니다.
        const isLiked = this.isPostLiked(this.loginInfo?.user_no, notice.mtip_board_no);

        const noticeToPass = {
          ...noticeDetails,
          mile_no: noticeDetails.mile_no,
          mile_name: noticeDetails.mile_name,
          file: noticeDetails.mtip_board_file || null,
          mtip_board_hit: notice.mtip_board_hit, // 업데이트된 조회수 사용
          isLiked: isLiked // 하트 여부 추가
        };

        console.log('Navigating to noticeDetailView with notice:', {
          id: notice.mtip_board_no,
          notice: noticeToPass,
        });

        this.$router.push({
          name: 'm_TipDetailView',
          params: { 
          mtip_board_no: notice.mtip_board_no,
          notice: noticeToPass,
          isLiked: isLiked  // 이 부분을 추가
      },
        });

      } catch (error) {
        console.error('Error fetching notice details:', error.response ? error.response.data : error.message);
      } finally {
        this.isProcessing = false;
      }
    },
  },
  mounted() {
    this.fetchBestNotices();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  }
};
</script>

<style scoped>
.m-tip-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.m-tip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.m-tip-title {
  font-size: 24px;
  font-family: 'KB_C2', sans-serif;
  margin: 0;
}

.view-all {
  font-size: 18px;
  font-family: 'KB_C2', sans-serif;
  color: #edbb03;
  text-decoration: underline;
  cursor: pointer;
}

.notice-list {
  display: flex;
  flex-direction: column;
}

.mobile-scroll {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px; /* 스크롤바 공간 확보 */
}

.notice-item {
  display: flex;
  align-items: center;
  padding: 3px 0;
}

.notice-mile {
  width: 120px;
  font-weight: bold;
  color: #e98c4e;
  text-align: left;
  font-size: 16px;
  font-family: 'KB_C2', sans-serif;
  margin: 0;
}

.notice-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
}

.notice-title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: 'KB_C2', sans-serif;
  text-align: start;
  cursor:pointer;
}

.title-icon {
  color: #d23e3e;
  margin-left: 10px;
  font-size: 20px;
}

.notice-date {
  margin-left: 20px;
  font-size: 14px;
  font-family: 'KB_C2', sans-serif;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .m-tip-container {
    padding: 15px;
  }

  .m-tip-title {
    font-size: 20px;
  }

  .view-all {
    font-size: 16px;
  }

  .notice-mile {
    width: 100px;
    font-size: 14px;
  }

  .notice-title {
    font-size: 16px;
  }

  .title-icon {
    font-size: 16px;
  }

  .notice-date {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .m-tip-container {
    padding: 10px;
  }

  .notice-list {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .m-tip-title {
    font-size: 18px;
  }

  .view-all {
    font-size: 14px;
  }

  .notice-item {
    flex-wrap: nowrap;
    padding: 5px 0;
  }

  .notice-mile {
    width: 80px;
    font-size: 12px;
    margin-right: 1px;
  }

  .notice-title {
    font-size: 14px;
  }

  .notice-date {
    font-size: 10px;
  }

  .title-icon {
    font-size: 14px;
  }

  /* 스크롤바 스타일링 */
  .mobile-scroll::-webkit-scrollbar {
    width: 5px;
  }

  .mobile-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .mobile-scroll::-webkit-scrollbar-thumb {
    background: #bababa;
  }

  .mobile-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>