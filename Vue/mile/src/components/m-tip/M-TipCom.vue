<template>
  <div class="cards m-tip-container">
    <div class="m-tip-header">
      <h2 class="m-tip-title fw-bold">M-Tip</h2>
      <a href="/M_TipListView" class="view-all">전체보기</a>
    </div>
    <div class="notice-list" :class="{ 'mobile-scroll': isMobile }">
      <div v-for="category in mileageCategories" :key="category" class="notice-item">
        <span class="notice-mile">{{ category }}</span>
        <template v-if="latestNotices[category]">
          <div class="notice-content" @click="handleNoticeClick(latestNotices[category])">
            <span class="notice-title">
              {{ truncateTitle(latestNotices[category].mtip_board_title) }}
              <span class="title-icon">new</span>
            </span>
            <span class="notice-date">{{ formatDate(latestNotices[category].mtip_board_date) }}</span>
          </div>
        </template>
        <span v-else class="no-notice">게시글이 없습니다.</span>
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/api/axios';

export default {
  name: 'M-TipCom',
  data() {
    return {
      notices: [],
      paginatedNotices: [],
      mileageCategories: ['HRD', 'Monthly Best', 'Monthly Base', 'HotTip','BEST PG', 'BEST Branch', '소비자 지원', '리그 테이블', '기타'],
      isMobile: false
    };
  },
  computed: {
    latestNotices() {
      const latest = {};
      this.mileageCategories.forEach(category => {
        const notice = this.paginatedNotices.find(n => (n.mile_name === category) || (category === '기타' && (n.mile_name === null || n.mile_name === '기타')));
        if (notice) {
          latest[category] = notice;
        }
      });
      return latest;
    },
  displayedCategories() {
      return this.isMobile ? this.mileageCategories.slice(0, 3) : this.mileageCategories;
    },
    mobileScrollStyle() {
      if (this.isMobile) {
        return {
          maxHeight: '300px',
          overflowY: 'auto'
        };
      }
      return {};
    }
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
    checkMobile() {
      this.isMobile = window.innerWidth <= 480;
      console.log('Is Mobile:', this.isMobile); // 디버깅용
    },
    async fetchNotices() {
      console.log('Mtiplist DB 메소드로 이동 ~ ');
      try {
        const response = await api.get('/mtip/Mtiplist');
        this.notices = response.data;
        this.paginatedNotices = this.notices; // 페이지네이션 로직이 없으므로 모든 공지사항을 표시
        console.log('Mtiplist 서버에서 가지고 온 값 :', this.notices);
      } catch (error) {
        console.error('Error fetching notices:', error.response ? error.response.data : error.message);
      }
    },
    async handleNoticeClick(notice) {
      console.log("notice:", notice);
      if (this.isProcessing) return;
      this.isProcessing = true;
      try {
        console.log("게시글 상세보기+조회수 메소드 도달", notice);
        
        // 조회수 증가 요청
        await api.get(`/mtip/MtipViews/${notice.mtip_board_no}`);

        // 게시글 상세 정보 요청
        const response = await api.get(`/mtip/details/${notice.mtip_board_no}`);
        console.log('게시글 상세보기 서버에서 가지고 온 데이터:', response);
        const noticeDetails = response.data;
        
        // 조회수 업데이트
        notice.mtip_board_hit += 1;

        const noticeToPass = {
          ...noticeDetails,
          mile_no: noticeDetails.mile_no,
          mile_name: noticeDetails.mile_name,
          file: noticeDetails.mtip_board_file || null,
          mtip_board_hit: notice.mtip_board_hit, // 업데이트된 조회수 사용
        };

        console.log('Navigating to noticeDetailView with notice:', {
          id: notice.mtip_board_no,
          notice: noticeToPass,
        });
        this.$router.push({
          name: 'm_TipDetailView',
          params: { mtip_board_no: notice.mtip_board_no },
        });
      } catch (error) {
        console.error('Error fetching notice details:', error.response ? error.response.data : error.message);
      } finally {
        this.isProcessing = false;
      }
    },
  },
  mounted() {
    this.fetchNotices();
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



.cards {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  cursor: pointer;
}


.notice-title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: 'KB_C2', sans-serif;
  text-align : start;
}

.title-icon {
  color: #ffca05;
  margin-left: 10px;
  font-size: 20px;
}
.notice-date {
  margin-left: 20px;
  font-size: 14px;
  font-family: 'KB_C2', sans-serif;
  white-space: nowrap;
}

.no-notice {
  color: #888;
  font-style: italic;
  margin-left: 20px;
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
    max-height: 200px; /* 모바일에서 항상 최대 높이 설정 */
    overflow-y: auto; /* 모바일에서 항상 스크롤 가능하게 설정 */
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
