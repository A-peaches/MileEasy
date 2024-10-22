<template>
  <div class="notice-count-container">
    <div class="notice-count">총 {{ filteredNotices.length }}건</div>
    <label class="radio-container">
      <input
        type="radio"
        name="status"
        value="newest"
        v-model="selectedFilter"
        @change="applyFilters"
      />
      <span class="custom-radio"></span>
      <span class="radio-label">최신순</span>
    </label>
    <label class="radio-container">
      <input
        type="radio"
        name="status"
        value="oldest"
        v-model="selectedFilter"
        @change="applyFilters"
      />
      <span class="custom-radio"></span>
      <span class="radio-label">과거순</span>
    </label>
  </div>
  <div>
    <button class="write-button" @click="goToWritePage">
      <i class="bi bi-pencil" style="margin-right: 10px"></i> 글작성
    </button>
  </div>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="제목 및 내용을 검색하세요"
      class="input-search"
    />
    <button class="search-button" @click="applyFilters">
      <i class="bi bi-search"></i>
    </button>
  </div>
  <div style="text-align: center; justify-content: center">
    <div class="notice-list" style="text-align: center">
      <div v-if="paginatedNotices.length === 0" class="no-results">
        검색 결과가 없습니다.
      </div>
      <div v-else v-for="(notice, index) in paginatedNotices" :key="index">
        <div
          class="input-base list-wrapper"
          @click="toggleDetails(notice.mtip_guide_no)"
        >
          <div class="notice-details">
            <div class="notice-new">{{ index + 1 }}</div>
            <div class="notice-num">
              {{ notice.user_no }}({{ notice.user_name }})
            </div>
            <div class="notice-title">
              {{ notice.mtip_guide_title }}
            </div>
            <div class="notice-date">
              {{ formatDate(notice.mtip_guide_date) }}
            </div>
            <div class="notice-mile">
              <i class="bi bi-eye"></i> {{ notice.mtip_guide_hit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api/axios';

export default {
  data() {
    return {
      mTipGuideList: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      selectedFilter: 'newest', // 기본값을 'newest'로 설정
      selectedNotice: null,
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

    filteredNotices() {
      let filtered = this.mTipGuideList;

      // 검색 조건 적용
      if (this.searchQuery) {
        filtered = filtered.filter((notice) => {
          const title = notice.mtip_guide_title || '';
          const content = notice.mtip_guide_content || '';

          return (
            title.includes(this.searchQuery) ||
            content.includes(this.searchQuery)
          );
        });
      }

      // 필터 적용
      if (this.selectedFilter === 'oldest') {
        filtered.sort(
          (a, b) => new Date(a.mtip_guide_date) - new Date(b.mtip_guide_date)
        );
      } else {
        // 'newest' 또는 'all'은 최신순으로 정렬
        filtered.sort(
          (a, b) => new Date(b.mtip_guide_date) - new Date(a.mtip_guide_date)
        );
      }

      return filtered;
    },

    paginatedNotices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNotices.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredNotices.length / this.itemsPerPage);
    },
  },

  methods: {
    checkLoginInfo() {
      if (
        !this.getLoginInfo ||
        this.getIsChecked === false ||
        this.getLoginInfo.user_is_admin === false
      ) {
        window.location.href = '/noAccess';
      }
    },

    goToWritePage() {
      this.$router.push('/mTipWrite');
    },

    async fetchRequestList() {
      try {
        const response = await api.post('/notice/mTipGuideList', null);
        this.mTipGuideList = response.data;
      } catch (error) {
        this.mTipGuideList = [];
      }
    },

    applyFilters() {
      this.currentPage = 1;
    },

    toggleDetails(mtipGuideNo) {
      this.$router.push({
        name: 'mTipGuideDetail',
        params: { mtipGuideNo: mtipGuideNo },
      });
    },

    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },

  mounted() {
    this.fetchRequestList();
  },
  created() {
    this.checkLoginInfo();
  },
};
</script>

<style scoped>
.notice-list {
  display: flex;
  flex-direction: column;
}

.pagination button {
  background-color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 18px;
  font-family: 'KB_s4', sans-serif;
}

.pagination button.active {
  background-color: #43c2a0;
  color: white;
}

.pagination button:hover {
  background-color: #e1e3e4;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial, sans-serif';
  overflow-x: hidden;
  height: 100%;
}

body {
  overflow-y: scroll;
}

h2 {
  font-family: 'KB_S4', sans-serif;
  font-size: 40px;
  margin-top: 30px;
  display: inline-block;
  position: relative;
}

h2::after {
  content: '';
  display: block;
  width: 120%;
  height: 1px;
  background-color: #8d8d8d;
  position: absolute;
  bottom: -5px;
  left: -10%;
}

.app-container {
  width: 100%;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4%;
}

.content {
  text-align: center;
  padding: 20px;
  width: 95%;
  max-width: 1300px;
  box-sizing: border-box;
  min-height: 100vh;
  margin: auto;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
  justify-content: flex-end;
  opacity: 1;
}

.input-search {
  border-radius: 30px;
  padding-right: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
  width: 28%;
  border: none;
  margin: 5px;
  height: 60px;
}

.search-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  opacity: 0.8;
}

.search-button .bi-search {
  font-size: 25px;
}

.notice-count {
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
  text-align: left;
  padding-left: 3%;
}

.notice-count-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  top: -5px;
}

.checkbox-container input[type='checkbox'] {
  display: none;
}

.checkbox-container .custom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.checkbox-container input[type='checkbox']:checked + .custom-checkbox {
  background-color: #f6a319;
  border: none;
}

.checkbox-container input[type='checkbox']:checked + .custom-checkbox::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  margin-left: 10px;
  font-family: 'KB_S5', sans-serif;
  font-size: 20px;
}

.input-base {
  width: 100%;
  height: 65px;
  background-color: #f9f9f9;
  text-align: center;
  line-height: 65px;
  font-size: 20px;
  margin-bottom: 20px;
}

.list-wrapper:hover {
  cursor: pointer;
  background-color: #e1e3e4 !important;
  transition: background-color 0.3s ease;
}

.notice-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.notice-title {
  flex: 1 1 40%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
}

.notice-num {
  flex: 1 1 25%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 12pt;
  font-family: 'KB_S5', sans-serif;
}
.notice-new {
  flex: 1 1 5%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 12pt;
  font-family: 'KB_S5', sans-serif;
  color: #edbb00;
}
.notice-mile {
  flex: 1 1 5%;
  text-align: left;
  letter-spacing: 1.5px;
  color: #745f40;
  font-family: 'KB_S5', sans-serif;
  font-size: 0.8em;
  margin-left: 10px;
}

.notice-date {
  flex: 1 1 25%;
  text-align: center;
  letter-spacing: 1.5px;
  font-size: 16px;
  font-family: 'KB_S5', sans-serif;
}

.notice-views {
  flex: 1 1 20%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
}

.views-text {
  flex: 1;
  text-align: right;
  font-size: 18px;
  font-family: 'KB_S5', sans-serif;
}

.views-icon {
  flex: 1 1 30%;
  margin-left: 1%;
}

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
  border: none;
  background-color: rgba(255, 255, 255, 0.69);
  border-radius: 30px;
  cursor: pointer;
  width: 230px;
  transform: translate(-50%, -16%);
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
  padding: 10px 20px;
  text-decoration: none;
  color: #4b4a4a;
  font-family: 'KB_S5', sans-serif;
  font-size: 18px;
}

.menu-items a:hover {
  background-color: #f5f5f5;
  border: none;
  border-radius: 25px;
  width: auto;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  gap: 5px;
}

.pagination button {
  background-color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 18px; /* 숫자의 폰트 크기 */
  font-family: 'KB_s4', sans-serif; /* 숫자의 폰트 */
}

.pagination button:disabled {
  background-color: #d5e9e3;
  cursor: not-allowed;
  color: white;
}

.pagination button.active {
  background-color: #43c2a0;
  color: white;
}

.pagination button.arrow-button {
  font-size: 18px; /* 화살표의 폰트 크기 */
}

.write-button {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
  color: #000;
  background-color: transparent;
  margin-left: 89%; /* 왼쪽으로 이동 */
  margin-bottom: 3vh;
  font-family: 'KB_S5', sans-serif;
}

.write-button i {
  margin-right: 5px;
}

.write-button i.bi.bi-pencil {
  color: #32ab8b;
  font-size: 20px;
}
.notice-details-expanded {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 16px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.radio-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.radio-container input[type='radio'] {
  display: none;
}

.radio-container .custom-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #43c2a0;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
}

.radio-container .custom-radio::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background-color: #43c2a0;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.radio-container input[type='radio']:checked + .custom-radio::after {
  opacity: 1;
}

.radio-label {
  font-size: 16px;
  cursor: pointer;
}
@import url('C:\MileEasy\Vue\mile\src\assets\css\css.css');
</style>
