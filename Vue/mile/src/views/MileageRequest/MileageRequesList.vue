<template>
  <div class="app-container">
    <div class="content cards">
      <div>
        <h2 class="lg">마일리지 요청</h2>
      </div>
      <div class="topbuton" style="display: flex">
        <div class="notice-count">총 {{ filteredNotices.length }}건</div>
        <div class="notice-count-container">
          <label class="radio-container">
            <input
              type="radio"
              name="status"
              value="all"
              v-model="selectedFilter"
              @change="applyFilters"
            />
            <span class="custom-radio"></span>
            <span class="lg2 radio-label">전체</span>
          </label>
          <label class="radio-container">
            <input
              type="radio"
              name="status"
              value="processing"
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
              value="completed"
              v-model="selectedFilter"
              @change="applyFilters"
            />
            <span class="custom-radio"></span>
            <span class="radio-label">접수완료</span>
          </label>
          <label class="radio-container">
            <input
              type="radio"
              name="status"
              value="rejected"
              v-model="selectedFilter"
              @change="applyFilters"
            />
            <span class="custom-radio"></span>
            <span class="radio-label">승인완료</span>
          </label>
          <label class="radio-container">
            <input
              type="radio"
              name="status"
              value="false"
              v-model="selectedFilter"
              @change="applyFilters"
            />
            <span class="custom-radio"></span>
            <span class="radio-label">승인거절</span>
          </label>
        </div>
      </div>
      <div>
        <div class="writeBtn">
          <button class="write-button" @click="goToWritePage">
            <i class="bi bi-pencil" style="margin-right: 10px"></i> 글작성
          </button>
        </div>
      </div>
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="검색어를 입력하세요"
          class="input-search"
        />
        <button class="search-button" @click="applyFilters">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div style="text-align: center; justify-content: center">
        <div v-if="filteredNotices.length === 0" class="no-results">
          접수된 내역이 없습니다.
        </div>
        <div v-else>
          <div class="notice-list" style="text-align: center">
            <div
              v-for="(notice, index) in paginatedNotices"
              :key="index"
              class="con"
            >
              <div
                v-if="notice"
                class="input-base list-wrapper"
                @click="toggleDetails(index)"
              >
                <div class="notice-details">
                  <div class="notice-new">{{ index + 1 }}</div>
                  <div class="notice-num">
                    {{ getRequestType(notice.request) }}
                  </div>
                  <div class="notice-title">
                    {{ notice.request_mile_name || notice.mile_name }}
                  </div>
                  <div class="notice-mile">
                    {{ getStatus(notice.request_status) }}
                  </div>
                  <div class="notice-date">
                    {{ notice.mileage_request_date }}
                  </div>
                </div>
              </div>
              <div
                v-if="selectedNotice === index && notice"
                class="notice-details-expanded"
              >
                <p
                  style="text-align: left; font-size: 15pt"
                  class="KB_S3 mt-3 ml-3"
                >
                  요청사항
                </p>
                <hr />
                <p style="text-align: left" class="ml-3">
                  마일리지 이름 :
                  {{ notice.request_mile_name || notice.mile_name }}
                </p>
                <p style="text-align: left" class="ml-3">
                  연간 최고 한도 : {{ notice.request_mil_max }}
                </p>
                <p style="text-align: left" class="ml-3">
                  담당자 : {{ notice.request_admin }}
                </p>
                <p style="text-align: left" class="ml-3">
                  기타요청: {{ notice.request_etc }}
                </p>
                <div
                  v-if="notice.request_status === 0"
                  style="text-align: right; margin-right: 10px"
                >
                  <i
                    class="bi bi-trash-fill"
                    style="color: gray; font-size: larger"
                  ></i>
                  <span
                    style="color: gray; font-size: larger"
                    @click="deleteRequest(notice.mileage_request_no)"
                    >삭제</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="!canGoPrev">&lt;</button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>

        <button @click="nextPage" :disabled="!canGoNext">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api/axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      requestList: [], // 초기값을 빈 배열로 설정
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      selectedFilter: 'all',
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
      let filtered = this.requestList || []; // Ensure it's an array

      if (this.searchQuery) {
        filtered = filtered.filter((notice) => {
          return (
            (notice.mile_name && notice.mile_name.includes(this.searchQuery)) ||
            (notice.request_mile_name &&
              notice.request_mile_name.includes(this.searchQuery))
          );
        });
      }

      if (this.selectedFilter === 'all') {
        return filtered;
      }

      return filtered.filter((notice) => {
        const status = notice.request_status ?? -1; // Use default value if null
        return (
          (this.selectedFilter === 'processing' && status === 0) ||
          (this.selectedFilter === 'completed' && status === 1) ||
          (this.selectedFilter === 'rejected' && status === 2) ||
          (this.selectedFilter === 'false' && status === 3)
        );
      });
    },
    paginatedNotices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNotices.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredNotices.length / this.itemsPerPage);
    },
    canGoNext() {
      return this.currentPage < this.totalPages;
    },
    canGoPrev() {
      return this.currentPage > 1;
    },
  },

  methods: {
    nextPage() {
      if (this.canGoNext) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.canGoPrev) {
        this.currentPage--;
      }
    },
    goToWritePage() {
      this.$router.push('/mileageRequestWrite');
    },
    async fetchRequestList() {
      try {
        const response = await api.post('/user/requestList', null, {
          params: { user_no: this.getLoginInfo.user_no },
        });
        this.requestList = response.data || []; // Ensure it's an array
      } catch (error) {
        console.error('문제', error);
        this.requestList = []; // Ensure it's an array
      }
    },
    async deleteRequest(mileage_request_no) {
      const result = await Swal.fire({
        title: '삭제 확인',
        text: '정말로 요청을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      });

      if (result.isConfirmed) {
        try {
          const response = await api.post('/user/requestListDelete', null, {
            params: { mileage_request_no: mileage_request_no },
          });
          console.log(response.data);
          Swal.fire('삭제 완료', '요청이 삭제되었습니다.', 'success').then(
            () => {
              this.fetchRequestList(); // Call fetchRequestList to refresh data
            }
          );
        } catch (error) {
          console.error('문제', error);
          Swal.fire('오류', '요청 삭제에 실패했습니다.', 'error');
        }
      }
    },
    getRequestType(type) {
      if (type === 1) return '요청';
      if (type === 2) return '수정';
      if (type === 3) return '삭제';
      return '기타';
    },
    getStatus(status) {
      if (status === 0) return '접수요청';
      if (status === 1) return '접수완료';
      if (status === 2) return '승인완료';
      if (status === 3) return '승인거절';
      return '미확인';
    },
    toggleDetails(index) {
      this.selectedNotice = this.selectedNotice === index ? null : index;
    },
    applyFilters() {
      this.currentPage = 1; // Reset to the first page on filter change
    },
  },

  created() {
    this.fetchRequestList();
  },
};
</script>

<style scoped>
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
  width: auto;
  height: 65px;
  background-color: #f9f9f9;
  text-align: center;
  line-height: 65px;
  font-size: 20px;
  margin-bottom: 20px;
}
.list-wrapper {
  width: auto;
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

  margin-bottom: 40px;

  object-fit: contain;
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
  width: 100%;
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
  margin-left: 90%; /* 왼쪽으로 이동 */
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
.notice-count {
  margin-top: 5pt;
}
.notice-count-container {
  display: flex;
  flex-direction: row; /* 수평 배치 */

  align-items: center; /* 세로축 가운데 정렬 */
  gap: 15px; /* 버튼 간 간격 */
  flex-wrap: wrap; /* 공간 부족 시 줄바꿈 */
  padding: 10px;
}

.notice-count-container label {
  display: flex;
  align-items: center; /* 라디오 버튼과 텍스트 수직 정렬 */
}

.notice-count-container input[type='radio'] {
  margin-right: 8px; /* 라디오 버튼과 텍스트 사이의 간격 */
}
.topbuton {
  margin-top: 80px;
}

.content {
  text-align: center;
  padding: 20px 10px; /* 상하 20px, 좌우 10px 패딩 */
  width: 1300px; /* 너비를 자동으로 설정 */
  max-width: 1300px; /* 최대 너비 유지 */
  box-sizing: border-box; /* 패딩을 너비에 포함 */
  min-height: 100vh;
  margin: auto;
  overflow-x: hidden; /* 가로 스크롤 방지 */
}

.notice-list {
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: 30px;
}

.writeBtn {
  width: auto;
}

/* 모바일 화면에서의 스타일 */
@media (max-width: 768px) {
  .notice-count {
    font-size: 11pt; /* 총 0건 텍스트의 폰트 크기 조정 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    width: 100%; /* 텍스트가 가로 전체를 차지하도록 설정 */
    box-sizing: border-box; /* 패딩 포함 너비 계산 */
  }

  .topbuton {
    display: flex;
    flex-direction: column; /* 버튼들을 세로로 배치 */
    align-items: flex-start; /* 왼쪽 정렬 */
    width: 100%; /* 전체 너비 설정 */
    padding: 0 10px; /* 좌우 여백 추가 */
    margin-top: 25px;
  }

  .notice-count-container {
    display: flex;
    flex-direction: row; /* 버튼들을 가로로 배치 */
    flex-wrap: wrap; /* 공간 부족 시 줄바꿈 */
    justify-content: flex-start; /* 왼쪽 정렬 */
    gap: 10px; /* 버튼들 간의 간격 */
  }

  .notice-count-container label {
    display: flex;
    align-items: center; /* 라디오 버튼과 텍스트 수직 정렬 */
    font-size: 11px; /* 모바일에서 폰트 크기 조정 */
    margin: 5px; /* 각 버튼과 텍스트 사이의 간격 */
  }

  .notice-count-container input[type='radio'] {
    margin-right: 5px; /* 라디오 버튼과 텍스트 사이의 간격 */
  }
  .radio-label {
    font-size: 11pt !important;
    cursor: pointer;
  }
  .lg {
    font-size: 20pt;
  }
  .write-button {
    margin-left: 67%;
    margin-top: 10px;
  }
  .input-search {
    width: 67%;
    padding-right: 29px;
  }
  .search-button {
    right: 15px;
    width: 30px;
    height: 30px;
  }
  .no-results {
    margin-top: 100px;
  }
  .input-base {
    height: 48px;
    justify-content: center;
    line-height: 50px;
  }
  .notice-list {
    margin-left: 5px;
  }
  .notice-num-expanded i.bi-trash-fill {
    display: none;
  }

  .notice-num-expanded span {
    display: none;
  }

  /* 모바일에서 날짜 숨기기 */
  .notice-date {
    display: none;
  }
  .notice-num {
    display: none;
  }
  .notice-details {
    height: 48px;
  }
  .notice-num.notice-title.notice-mile.notice-date {
    height: 48px;
  }
  .notice-details-expanded {
    width: auto;
  }
  .con {
    width: auto;
  }
  .content {
    padding: 10px 0px 0px 10px;
  }
}
</style>
