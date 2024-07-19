<template>
  <div class="app-container">
    <div class="content cards" @click="handleClick">
      <div>
        <h2>공지사항</h2>
      </div>
      <div @click.stop="toggleCategory" class="QnA" ref="categoryButton">
        <div class="category-button">카테고리</div>
        <div class="dropdown-menu" v-if="showCategory" ref="dropdownMenu">
          <div class="menu-items">
            <a class="dropdown-item" href="/hrdView">HRD 마일리지</a>
            <a class="dropdown-item" href="/monthlyBestView">MonthlyBest 마일리지</a>
            <a class="dropdown-item" href="/monthlyBaseView">MonthlyBase 마일리지</a>
            <a class="dropdown-item" href="/bestBranchView">Best PG 마일리지</a>
            <a class="dropdown-item" href="/bestBranchView">Best 지점 마일리지</a>
            <a class="dropdown-item" href="/leagueTableView">리그테이블 마일리지</a>
            <a class="dropdown-item" href="/hotTipView">HOT Tip 마일리지</a>
            <a class="dropdown-item" href="/consumerSupportView">소비자 지원 마일리지</a>
          </div>
        </div>
      </div>
      <div class="notice-count">총 {{ notices.length }}건</div>
      <div v-if="isLoggedIn && loginInfo.user_is_admin && !loginInfo.user_is_manager && isChecked">
        <button class="write-button" @click="goToWritePage">글쓰기</button>
      </div>
      <div class="search-container">
        <input type="text" placeholder="검색어를 입력하세요" class="input-search">
        <button class="search-button">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="notice-list">
        <div class="input-base" v-for="(item, index) in paginatedNotices" :key="index" @click="goToDetailView(item.num)">
          <div class="notice-details">
            <div class="notice-num">{{ item.num }}</div>
            <div class="notice-title">{{ item.title }}</div>
            <div class="notice-date">{{ item.date }}</div>
            <i class="bi bi-eye"></i>
            <div class="notice-views">{{ item.views }} <i class="fa fa-eye"></i></div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">«</button>
        <button @click="goToPage(page)" :class="{ active: currentPage === page }" v-for="page in totalPages" :key="page">{{ page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">»</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      notices: [
        { num: "1", title: "연수마일리지", date: "2024.05.24", views: 59 },
        { num: "2", title: "연수마일리지마일리지마일리지마일리지마일리지마일리지", date: "2024.05.24", views: 59 },
        { num: "3", title: "연수마일리지마일리지마일리지마일리지마일리지마일리지", date: "2024.05.24", views: 59 },
        { num: "4", title: "연수마일리지마일리지마일리지마일리지마일리지마일리지", date: "2024.05.24", views: 59 },
      ],
      showCategory: false,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo; // loginInfo가 null이 아니면 로그인 상태로 판단합니다.
    },
    totalPages() {
      return Math.ceil(this.notices.length / this.itemsPerPage);
    },
    paginatedNotices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.notices.slice(start, end);
    },
  },
  methods: {
    toggleCategory() {
      this.showCategory = !this.showCategory;
    },
    closeDropdown() {
      this.showCategory = false;
    },
    goToDetailView(noticeId) {
      this.$router.push({ name: 'noticeDetailView', params: { id: noticeId } });
    },
    handleClickOutside(event) {
      if (
        this.$refs.dropdownMenu &&
        !this.$refs.dropdownMenu.contains(event.target) &&
        this.$refs.categoryButton &&
        !this.$refs.categoryButton.contains(event.target)
      ) {
        this.closeDropdown();
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToWritePage() {
      this.$router.push({ name: 'noticeWriteAdminView' });
    },
  },
  mounted() {
    console.log('loginInfo:', this.loginInfo);
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('isChecked:', this.isChecked);

    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Arial, sans-serif';
  overflow-x: hidden; /* 수평 스크롤바 제거 */
  height: 100%; /* 페이지 높이를 100%로 설정 */
}

body {
  overflow-y: scroll; /* 수직 스크롤바 유지 */
}

h2 {
  font-family: 'KB_S4', sans-serif;
  font-size: 40px;
  margin-top: 30px;
  display: inline-block; /* 밑줄 길이를 텍스트 길이에 맞춥니다 */
  position: relative;
}

h2::after {
  content: '';
  display: block;
  width: 120%; /* 텍스트보다 긴 밑줄을 위해 조정 */
  height: 1px; /* 밑줄 두께 */
  background-color: #8d8d8d; /* 밑줄 색상 */
  position: absolute;
  bottom: -5px; /* 텍스트와 밑줄 사이의 간격을 위해 조정 */
  left: -10%; /* 중앙 정렬을 위해 조정 */
}

.app-container {
  width: 100%;
  padding: 0px;
  min-height: 100vh; /* 최소 높이를 설정하여 페이지 전체를 채움 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
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

.category-button {
  background-color: #ffffff;
  border-radius: 25px;
  padding: 12px 40px;
  cursor: pointer;
  margin-bottom: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 공지사항과 카테고리 버튼 사이의 간격 */
  display: inline-block;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
  opacity: 0.8; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
}

.write-button {
  background-color: #ffca05;
  color: #4b4a4a;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 15px;
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
  transition: background-color 0.3s;
  width: 10%;
  float: right; /* 버튼을 오른쪽으로 이동 */
  margin-top: -80px; /* 위치 조정을 위해 추가 */
  margin-right: 30px;
}

.write-button:hover {
  background-color: #edbb00;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative; /* 상대 위치 */
  margin-bottom: 40px;
  justify-content: flex-end; /* 오른쪽 정렬 */
  opacity: 1; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
}

.input-search {
  border-radius: 30px;
  padding-right: 50px; /* 아이콘 공간 확보 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  outline: none;
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
  width: 28%;
  border: none;
  margin: 5px;
  height: 60px; /* 높이를 조금 높여줌 */
}

.search-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 80px; /* 높이를 조금 높여줌 */
  height: 80px; /* 높이를 조금 높여줌 */
  opacity: 0.8; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
}

.search-button .bi-search {
  font-size: 25px; /* 아이콘 크기 조정 */
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notice-count {
  margin-bottom: 10px;
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
  text-align: left; /* 왼쪽 정렬 */
  padding-left: 3%;
}

.input-base {
  width: 100%;
  height: 65px;
  background-color: #FBFBFB;
  text-align: center; /* 가로 정렬 */
  line-height: 65px; /* 세로 정렬 */
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
}

.notice-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.notice-title {
  flex: 1 1 180%;
  text-align: center;
  letter-spacing: 1px; /* 예시: 제목의 글자 간 거리 */
}

.notice-num {
  flex: 1;
  text-align: center;
  letter-spacing: 1px; /* 예시: 번호의 글자 간 거리 */
}

.notice-date {
  flex: 1 1 60%;
  text-align: center;
  letter-spacing: 1.5px; /* 예시: 날짜의 글자 간 거리 */
}

.notice-views {
  flex: 1 1 20%; /* flex-grow, flex-shrink, flex-basis */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.views-text {
  flex: 1;
  text-align: right; /* 텍스트를 오른쪽 정렬 */
}

.views-icon {
  flex: 1 1 30%;
  margin-left: 1%; /* 텍스트와 아이콘 사이의 비율 간격 */
}

/* 드롭다운 메뉴 스타일 */
.QnA {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 1;
  border: none; /* 테두리 제거 */
  background-color: rgba(255, 255, 255, 0.69);
  border-radius: 30px;
  cursor: pointer;
  width: 230px; /* 드롭다운 메뉴의 너비를 픽셀 단위로 고정 */
  transform: translate(-50%, -16%); /* 수평 위치 중앙 정렬, 수직 위치 위로 이동 */
}

.QnA:hover .dropdown-menu,
.QnA .dropdown-menu {
  display: block;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-items a {
  display: block;
  padding: 10px 20px; /* 상하 패딩과 좌우 패딩을 픽셀 단위로 설정 */
  text-decoration: none;
  color: #4b4a4a;
  font-family: 'KB_S5', sans-serif;
  font-size: 18px; /* 텍스트 크기를 픽셀 단위로 설정 */
}

.menu-items a:hover {
  background-color: #f5f5f5;
  border: none; /* 테두리 제거 */
  border-radius: 25px;
  width: auto; /* 너비를 자동으로 설정 */
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #f1f1f1;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #8d8d8d;
  color: white;
}
</style>
