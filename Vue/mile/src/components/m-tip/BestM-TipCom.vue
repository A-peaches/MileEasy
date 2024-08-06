<template>
  <div class="cards" style="margin-top:20px; padding: 20px;">
    <div class="m-tip-header">
      <h2 class="m-tip-title">Best M-Tip</h2>
      <a href="/M_TipBestView" class="view-all">전체보기</a>
    </div>
    <div class="notice-list">
      <div v-for="notice in bestNotices" :key="notice.mtip_board_no" class="notice-item">
        <span class="notice-mile">{{ notice.mile_name }}</span>
        <span class="notice-title">
          {{ notice.mtip_board_title }}
          <i class="bi bi-heart-fill title-icon"></i>
        </span>
        <span class="notice-date">{{ formatDate(notice.mtip_board_date) }}</span>
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
      bestNotices: [], // 좋아요가 가장 많은 게시글 목록
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    async fetchBestNotices() {
      console.log('Mtiplist DB 메소드로 이동 ~ ');
      try {
        const response = await api.get('/mtip/bestMtiplist');
        this.bestNotices = response.data.slice(0, 9); // 좋아요가 많은 상위 9개의 게시글
        console.log('Best Mtiplist 서버에서 가지고 온 값 :', this.bestNotices);
      } catch (error) {
        console.error('Error fetching best notices:', error.response ? error.response.data : error.message);
      }
    },
  },
  mounted() {
    this.fetchBestNotices();
  }
};
</script>

<style scoped>
.title-icon {
  color: #d23e3e;
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
  font-family: 'KB_S3', sans-serif;
  margin: 0;
}
.view-all {
  font-size: 18px;
  font-family: 'KB_S5', sans-serif;
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
  font-family: 'KB_S3', sans-serif;
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
  font-family: 'KB_S4', sans-serif;
}
.notice-date {
  margin-left: 50px;
  font-size: 14px;
  font-family: 'KB_S5', sans-serif;
  margin-left: auto; /* 오른쪽으로 밀어냄 */
  margin-right: 0; /* 오른쪽 여백 제거 */
}
.no-notice {
  color: #888;
  font-style: italic;
  margin-left: 20px;
}
</style>
