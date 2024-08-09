<template>
  <div class="cards" style="margin-top:20px; padding: 20px;">
    <div class="m-tip-header">
      <h2 class="m-tip-title fw-bold">M-Tip</h2>
      <a href="/M_TipListView" class="view-all">전체보기</a>
    </div>
    <div class="notice-list">
      <div v-for="category in mileageCategories" :key="category" class="notice-item">
        <span class="notice-mile">{{ category }}</span>
        <template v-if="latestNotices[category]">
          <span class="notice-title">
            {{ truncateTitle(latestNotices[category].mtip_board_title) }}
            <span class="title-icon">new</span>
          </span>
          <span class="notice-date" style="margin-left: 50px; font-size: 14px;font-family: 'KB_C2', sans-serif; margin-left: auto; /* 오른쪽으로 밀어냄 */
  margin-right: 0; /* 오른쪽 여백 제거 */">{{ formatDate(latestNotices[category].mtip_board_date) }}</span>
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
      mileageCategories: ['HRD', 'Monthly Best', 'Monthly Base', 'HotTip','BEST PG', 'BEST Branch', '소비자 지원', '리그 테이블', '기타']
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
    await api.post(`/notice/increment-views/${notice.notice_board_no}`);
    
    // 게시글 상세 정보 요청
    const response = await api.get(`/notice/details/${notice.notice_board_no}`);
    console.log('게시글 상세보기 서버에서 가지고 온 데이터:', response); // 응답이 정상적으로 오는지 확인
    const noticeDetails = response.data;
    console.log('Fetched notice details:', noticeDetails);

    // 조회수 업데이트
    notice.notice_board_hit += 1;

    const noticeToPass = {
      ...noticeDetails,
      mile_no: noticeDetails.mile_no,
      mile_name: noticeDetails.mile_name,
      file: noticeDetails.file || null,
      notice_board_hit: notice.notice_board_hit // 업데이트된 조회수 사용
    };

    console.log('Navigating to noticeDetailView with notice:', {
      id: notice.notice_board_no,
      notice: noticeToPass
    });

    this.$router.push({
      name: 'noticeDetailView',
      params: { 
        id: notice.notice_board_no, 
        notice: noticeToPass
      }
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
  }
};
</script>

<style scoped>
.title-icon {
  color: #ffca05;
  margin-left: 10px; /* 왼쪽으로 여백 추가 */
  font-size: 20px; /* 아이콘 크기 조절 */
}
.cards {
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
.notice-title {
  flex-grow: 1;
  margin-left: 18PX;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-family: 'KB_C2', sans-serif;
}
.notice-date {
  margin-left: 50px;
  font-size: 14px;
  font-family: 'KB_C2', sans-serif;
  margin-left: auto; /* 오른쪽으로 밀어냄 */
  margin-right: 0; /* 오른쪽 여백 제거 */
}
.no-notice {
  color: #888;
  font-style: italic;
  margin-left: 20px;
}
</style>
