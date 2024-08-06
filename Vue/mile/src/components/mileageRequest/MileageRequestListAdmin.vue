<template>
  <div>
    <div class="mt-5 mx-auto">
      <div class="cards-container mx-auto" :style="{ height: computedHeight }">
        <div class="notice-count-container">
          <div class="notice-count">총 {{ filteredRequestList.length }} 건</div>
          <label class="radio-container">
            <input
              type="radio"
              name="status"
              value="접수요청"
              v-model="selectedFilter"
              @change="applyFilters"
            />
            <span class="custom-radio"></span>
            <span class="radio-label">접수요청</span>
          </label>
          <label class="radio-container">
            <input
              type="radio"
              name="status"
              value="접수완료"
              v-model="selectedFilter"
              @change="applyFilters"
            />
            <span class="custom-radio"></span>
            <span class="radio-label">접수완료</span>
          </label>
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
            <!-- 데이터가 로드되었는지 확인 -->
            <div v-if="!filteredRequestList.length">
              <p>등록된 요청이 없습니다.</p>
            </div>
            <div
              v-for="(notice, index) in paginatedRequestList"
              :key="notice.mileage_request_no"
            >
              <div
                class="input-base list-wrapper"
                @click="toggleDetails(notice.mileage_request_no)"
              >
                <div class="notice-details">
                  <div class="notice-new">{{ index + 1 }}</div>
                  <div class="notice-num">
                    {{ getRequestAction(notice.request) }}
                  </div>
                  <div class="notice-title">
                    {{ notice.request_mile_name || notice.mile_name }}
                  </div>
                  <div class="notice-mile">
                    {{ getRequestStatus(notice.request_status) }}
                  </div>
                  <div class="notice-date">
                    {{ notice.mileage_request_date || '날짜 없음' }}
                  </div>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MileageRequestListAdmin',

  data() {
    return {
      selectedFilter: '접수요청',
      searchQuery: '',
      currentPage: 1,
      noticesPerPage: 10,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('request', ['getRequestList']),

    totalPages() {
      return Math.ceil(this.filteredRequestList.length / this.noticesPerPage);
    },

    loginInfo() {
      return this.getLoginInfo;
    },
    filteredRequestList() {
      if (!this.getRequestList || !Array.isArray(this.getRequestList))
        return [];

      let filteredList = [...this.getRequestList];

      // 상태 필터링 로직
      filteredList = filteredList.filter((notice) => {
        return (
          (this.selectedFilter === '접수요청' && notice.request_status === 0) ||
          (this.selectedFilter === '접수완료' && notice.request_status === 1)
        );
      });

      // 검색 로직
      if (this.searchQuery) {
        filteredList = filteredList.filter(
          (notice) =>
            (notice.request_mile_name &&
              notice.request_mile_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())) ||
            (notice.mile_name &&
              notice.mile_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()))
        );
      }
      return filteredList;
    },
    paginatedRequestList() {
      const start = (this.currentPage - 1) * this.noticesPerPage;
      const end = start + this.noticesPerPage;
      return this.filteredRequestList.slice(start, end);
    },
  },

  methods: {
    ...mapActions('mileage', ['getMileage']),
    ...mapActions('request', ['requestList']),

    applyFilters() {
      this.currentPage = 1;
    },
    getRequestAction(request) {
      switch (request) {
        case 1:
          return '추가';
        case 2:
          return '수정';
        case 3:
          return '삭제';
        default:
          return '';
      }
    },
    getRequestStatus(status) {
      switch (status) {
        case 0:
          return '접수요청';
        case 1:
          return '접수완료';
        case 2:
          return '승인완료';
        case 3:
          return '승인거절';
        default:
          return '';
      }
    },
    toggleDetails(mileage_request_no) {
      this.$router.push(`/mileageRequesDetail/${mileage_request_no}`);
    },
  },

  mounted() {
    this.requestList().catch((error) => {
      console.error('데이터 로딩 오류:', error);
    });
  },
};
</script>

<style scoped>
.notice-list {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin-left: 30px;
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
  flex: 1 1 150%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
}

.notice-num {
  flex: 1 1 20%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 12pt;
  font-family: 'KB_S5', sans-serif;
}
.notice-new {
  flex: 1 1 20%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 12pt;
  font-family: 'KB_S5', sans-serif;
  color: #edbb00;
}
.notice-mile {
  flex: 1 1 50%;
  text-align: left;
  letter-spacing: 1.5px;
  color: #745f40;
  font-family: 'KB_S5', sans-serif;
  font-size: 0.8em;
  margin-left: 10px;
}

.notice-date {
  flex: 1 1 60%;
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
</style>
