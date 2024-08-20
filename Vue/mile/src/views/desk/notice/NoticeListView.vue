<template>
  <div class="app-container">
    <div class="content cards page-back mx-auto" @click="handleClick">
      <h2 class="bold-x-lg mt-5 mb-4" style="font-family: KB_C3">공지사항</h2>
      <hr
      class="mx-auto title-line"
    />
      <div @click.stop="toggleCategory" class="QnA" ref="categoryButton">
        <div class="category-button list-wrapper-category">카테고리</div>
        <div class="dropdown-menu" v-if="showCategory" ref="dropdownMenu">
          <div class="menu-items">
            <a class="dropdown-item" @click="filterByCategory(null)">전체</a>
            <a
              class="dropdown-item"
              v-for="mileage in mileages"
              :key="mileage.mile_no"
              @click="filterByCategory(mileage.mile_name)"
            >
              {{ mileage.mile_name }} <span class="mileage-text">마일리지</span>
            </a>
            <a class="dropdown-item" @click="filterByCategory('기타')">기타</a>
          </div>
        </div>
      </div>

      <div class="notice-count-container">
        <div class="lg2 notice-count">총 {{ filteredNotices.length }}건</div>
        <label class="checkbox-container">
          <input
            type="checkbox"
            v-model="sortByViews"
            @change="handleCheckboxChange('views')"
          />
          <span class="custom-checkbox"></span>
          <span class="lg2 checkbox-label">조회수</span>
        </label>
        <label class="checkbox-container">
          <input
            type="checkbox"
            v-model="sortByDateAsc"
            @change="handleCheckboxChange('date')"
          />
          <span class="custom-checkbox"></span>
          <span class="lg2 checkbox-label">최신순</span>
        </label>
      </div>
      <div>
        <div
          v-if="
            isLoggedIn &&
            (loginInfo.user_is_admin || loginInfo.user_is_manager) &&
            isChecked
          "
        >
          <button class="write-button" @click="goToWritePage">
            <i class="bi bi-pencil" style="margin-right: 10px"></i> 글작성
          </button>
        </div>
      </div>
      <!-- 검색 창 -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="제목 및 내용을 검색하세요"
          class="input-search"
        />
        <button class="search-button" @click="searchNotices">
          <i class="bi bi-search"></i>
        </button>
      </div>

      <div class="notice-list">
        <div v-if="paginatedNotices.length">
          <div
            class="input-base list-wrapper"
            v-for="notice in paginatedNotices"
            :key="notice.notice_board_no"
            @click="handleNoticeClick(notice)"
          >
            <div class="notice-details">
              <div v-if="notice.is_new" class="notice-new" >
                {{ notice.display_num }}
              </div>
              <div v-else class="notice-num">{{ notice.display_num }}</div>
              <div class="notice-mile">
                {{ notice.mile_name && notice.mile_name !== '기타' ? notice.mile_name : '' }}
                <span class="mileage-text" v-if="!isMobile && notice.mile_name !== '기타'">마일리지</span>
                <span v-if="notice.mile_name === '기타' || !notice.mile_name">기타</span>
              </div>
              <div class="notice-title">{{ truncateTitle(notice.notice_board_title) }}</div>
              <pre class="notice-date">{{
                formatDate(notice.notice_board_date)
              }}</pre>
              <i class="bi bi-eye"></i>
              <div class="notice-views">
                {{ notice.notice_board_hit }} <i class="fa fa-eye"></i>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>게시글이 없습니다.</p>
        </div>
      </div>

    <div class="pagination-container">
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">〈</button>
        <button
          @click="goToPage(page)"
          :class="{ active: currentPage === page }"
          v-for="page in totalPages"
          :key="page"
        >
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          〉
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/axios";

export default {
  data() {
    return {
      notices: [],
      mileages: [],
      showCategory: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
      selectedCategory: null,
      isProcessing: false,
      sortByDateAsc: true, // 최신순 체크박스가 기본으로 선택
      sortByViews: false, // 조회 수 정렬 여부
      isMobile: false,
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo", "getIsChecked"]),

    uniqueMileages() {
      return [
        ...new Set(
          this.notices
            .filter((notice) => notice.mile_name)
            .map((notice) => notice.mile_name)
        ),
      ];
    },
    filteredNotices() {
      let result = this.notices.map(notice => ({
        ...notice,
        mile_name: notice.mile_name || '기타'
      }));
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (notice) =>
            notice.notice_board_title.toLowerCase().includes(query) ||
            notice.notice_board_content.toLowerCase().includes(query)
        );
      }
      if (this.selectedCategory !== null) {
        if (this.selectedCategory === "기타") {
          result = result.filter((notice) => !notice.mile_name);
        } else {
          result = result.filter(
            (notice) => notice.mile_name === this.selectedCategory
          );
        }
      }
      if (this.sortByViews) {
        result.sort(
          (a, b) =>
            b.notice_board_hit - a.notice_board_hit ||
            new Date(b.notice_board_date) - new Date(a.notice_board_date)
        );
      } else if (this.sortByDateAsc) {
        result.sort(
          (a, b) =>
            new Date(b.notice_board_date) - new Date(a.notice_board_date)
        );
      } else {
        result.sort(
          (a, b) =>
            new Date(a.notice_board_date) - new Date(b.notice_board_date)
        );
      }
      // NEW 항목과 번호 증가를 처리합니다.
      let displayNum = 1;
      return result.map((notice) => ({
        ...notice,
        is_new: this.isNew(notice.notice_board_date),
        display_num: this.isNew(notice.notice_board_date)
          ? "NEW"
          : displayNum++,
      }));
    },

    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo;
    },
    totalPages() {
      return Math.ceil(this.filteredNotices.length / this.itemsPerPage);
    },
    paginatedNotices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNotices.slice(start, end);
    },
  },
  methods: {
    checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  },

  truncateTitle(title) {
    const maxLength = 15;
    if (this.isMobile && title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  },
    isNew(dateString) {
      const today = new Date();
      const noticeDate = new Date(dateString);
      const differenceInTime = today.getTime() - noticeDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays <= 7;
    },
    handleCheckboxChange(sortType) {
      if (sortType === "views" && this.sortByViews) {
        this.sortByDateAsc = false;
      } else if (sortType === "date" && this.sortByDateAsc) {
        this.sortByViews = false;
      }
    },
    toggleCategory() {
      this.showCategory = !this.showCategory;
    },
    closeDropdown() {
      this.showCategory = false;
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
      this.$router.push({ name: "noticeWriteAdminView" });
    },
    async fetchNotices() {
      console.log("게시글 list 서버 메소드로 이동 ~ "); // 이 로그가 출력되는지 확인합니다.
      try {
        const response = await api.get("/notice/list");
        this.notices = response.data;
        console.log("list 서버에서 가지고 온 값 :", this.notices);
      } catch (error) {
        console.error(
          "Error fetching notices:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchMileages() {
      try {
        const response = await api.get("/notice/mileage");
        console.log("Fetched mileages:", response.data);
        this.mileages = response.data;
      } catch (error) {
        console.error(
          "Error fetching mileages:",
          error.response ? error.response.data : error.message
        );
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
        const response = await api.get(
          `/notice/details/${notice.notice_board_no}`
        );
        console.log("게시글 상세보기 서버에서 가지고 온 데이터:", response); // 응답이 정상적으로 오는지 확인
        const noticeDetails = response.data;
        console.log("Fetched notice details:", noticeDetails);

        // 조회수 업데이트
        notice.notice_board_hit += 1;

        const noticeToPass = {
          ...noticeDetails,
          mile_no: noticeDetails.mile_no,
          mile_name: noticeDetails.mile_name,
          file: noticeDetails.file || null,
          notice_board_hit: notice.notice_board_hit, // 업데이트된 조회수 사용
        };

        console.log("Navigating to noticeDetailView with notice:", {
          id: notice.notice_board_no,
          notice: noticeToPass,
        });

        this.$router.push({
          name: "noticeDetailView",
          params: {
            id: notice.notice_board_no,
            notice: noticeToPass,
          },
        });
      } catch (error) {
        console.error(
          "Error fetching notice details:",
          error.response ? error.response.data : error.message
        );
      } finally {
        this.isProcessing = false;
      }
    },

    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    },
    searchNotices() {
      this.currentPage = 1;
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
    },
    refreshPage() {
      this.selectedCategory = null;
      this.searchQuery = "";
      this.currentPage = 1;
    },
  },
  mounted() {
    console.log("loginInfo:", this.loginInfo);
    console.log("isLoggedIn:", this.isLoggedIn);
    console.log("isChecked:", this.isChecked);

    document.addEventListener("click", this.handleClickOutside);

    this.fetchNotices();
    this.fetchMileages();

    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>


<style scoped>
@media (max-width: 768px) {
  .title-line {
    width: 30% !important;
  }
  .dropdown-menu {
    top: 280% !important;
    background-color: rgba(255, 255, 255, 0.96) !important;
  }
  .category-button {
    width: 25vw !important;
    font-size: 12pt !important;
  }
  .category-button:hover {
    transition: background-color 0s ease !important;
  }
  .notice-count {
    padding: 0 !important;
    padding-left: 3% !important;
    padding-top: 5% !important;
    font-size: 11pt !important;
  }
  .checkbox-label {
    margin-left: 7px !important; /* 체크박스와 텍스트 사이 간격 */
    font-size: 11pt !important;
  }
  .checkbox-container {
    top: 0 !important;
    padding-top: 5% !important;
  }
}

.app-container {
  width: 100%;
  padding: 0;
  min-height: 100vh; /* 최소 높이를 설정하여 페이지 전체를 채움 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top : 4%;
  
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

.content.cards {
  width: 100%;
  border: 1px solid #ccc;
  padding: 60px;
  border-radius: 8px;
  box-sizing: border-box;
  max-width: 1300px;
  margin: 0 auto;
}

.title-line {
  width: 13%; 
  border: 0; 
  height: 2px; 
  background: black;
}

.list-wrapper-category {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-wrapper-category:hover {
  cursor: pointer;
  background-color: #e1e3e4 !important;
  transition: background-color 0.3s ease;
}
/* html,
body {
  margin: 0;
  padding: 0;
  font-family: "Arial, sans-serif";
  overflow-x: hidden; 
  height: 100%; 
}

body {
  overflow-y: scroll; 
} */

/* h2 {
  font-family: "KB_C2", sans-serif;
  font-size: 40px;
  margin-top: 30px;
  display: inline-block;
  position: relative;
} */

/* h2::after {
  content: "";
  display: block;
  width: 120%;
  height: 1px;
  background-color: #8d8d8d; 
  position: absolute;
  bottom: -5px; 
  left: -10%; 
} */

/* .app-container {
  width: 100%;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4%;
} */

/* .content {
  text-align: center;
  padding: 20px;
  width: 95%;
  max-width: 1300px;
  box-sizing: border-box;
  min-height: 100vh;
  margin: auto;
} */

/* .content {
  width: 100%;
  border: 1px solid #ccc;
  padding: 60px;
  border-radius: 8px;
  box-sizing: border-box;
  max-width: 1300px;
  margin: 0 auto;
} */

.category-button {
  background-color: #f9f9f9;
  border-radius: 25px;
  padding: 12px 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  font-size: 17pt;
  font-family: 'KB_S5', sans-serif;
  opacity: 0.8; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
  width: 10vw;
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
  font-family: "KB_C3", sans-serif;
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
  gap: 20px;
}

.notice-count {
  /* margin-bottom: 10px;
  font-size: 19px;
  font-family: "KB_C3", sans-serif;
  text-align: left; 
  padding-left: 3%; */
  padding: 2em;
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
}

.checkbox-container input[type="checkbox"] {
  display: none; /* 기본 체크박스를 숨깁니다 */
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

.checkbox-container input[type="checkbox"]:checked + .custom-checkbox {
  background-color: #f6a319; /* 체크된 상태일 때 배경색 변경 (노란색) */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.checkbox-container input[type="checkbox"]:checked + .custom-checkbox::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  margin-left: 10px; /* 체크박스와 텍스트 사이 간격 */
  font-family: "KB_S5", sans-serif;
}

.input-base {
  width: 100%;
  height: 65px;
  background-color: #f9f9f9;
  text-align: center; /* 가로 정렬 */
  line-height: 65px; /* 세로 정렬 */
  font-size: 20px;
  margin-bottom: 20px; /*글 목록 사이 공간*/
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
  letter-spacing: 1px; /* 예시: 제목의 글자 간 거리 */
  font-size: 18px;
  font-family: "KB_C2", sans-serif;
}

.notice-num {
  flex: 1 1 20%;
  text-align: center;
  letter-spacing: 1px; /* 예시: 번호의 글자 간 거리 */
  font-size: 12pt;
  font-family: "KB_C3", sans-serif;
}
.notice-new {
  flex: 1 1 20%;
  text-align: center;
  letter-spacing: 1px; /* 예시: 번호의 글자 간 거리 */
  font-size: 12pt;
  font-family: "KB_C3", sans-serif;
  color: #edbb00;
}
.notice-mile {
  flex: 1 1 50%;
  text-align: left;
  letter-spacing: 1.5px; /* 예시: 날짜의 글자 간 거리 */
  color: #675437;
  font-family: "KB_C3", sans-serif;
  font-size: 0.70em;
  margin-left: 10px; /* 왼쪽 여백 추가 */
}

.notice-date {
  flex: 1 1 60%;
  text-align: center;
  letter-spacing: 1.5px; /* 예시: 날짜의 글자 간 거리 */
  font-size: 15px;
  font-family: "KB_C3", sans-serif;
}

.notice-views {
  flex: 1 1 12%; /* flex-grow, flex-shrink, flex-basis */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 10%;
}

.views-text {
  flex: 1;
  text-align: right; /* 텍스트를 오른쪽 정렬 */
  font-size: 18px;
  font-family: "KB_C3", sans-serif;
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
  top: 250%;
  left: 50%;
  z-index: 1;
  border-color: #eeeeee;
  background-color: rgba(255, 255, 255, 0.96) !important;
  border-radius: 15px;
  cursor: pointer;
  width: 230px; /* 드롭다운 메뉴의 너비를 픽셀 단위로 고정 */
  transform: translate(
    -50%,
    -17%
  ); /* 수평 위치 중앙 정렬, 수직 위치 위로 이동 */
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
  font-family: "KB_C3", sans-serif;
  font-size: 18px; /* 텍스트 크기를 픽셀 단위로 설정 */
}

.menu-items a:hover {
  background-color: #f5f5f5;
  border: none; /* 테두리 제거 */
  border-radius: 25px;
  width: auto; /* 너비를 자동으로 설정 */
}


/* 페이지 네이션 및 글쓰기 버튼 스타일 */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  object-fit:contain;
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
  font-family: "KB_S5", sans-serif;
}

.write-button i {
  margin-right: 5px;
}

.write-button i.bi.bi-pencil {
  color: #32ab8b;
  font-size: 20px;
}
.radio-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.radio-input {
  display: none; /* 기본 라디오 버튼을 숨깁니다 */
}

.custom-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 10px;
  display: inline-block;
  position: relative;
}

.radio-input:checked + .custom-radio {
  background-color: #f6a319; /* 체크된 상태일 때 배경색 */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.radio-input:checked + .custom-radio::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px; /* 체크된 상태일 때 체크 표시 스타일 */
}

.radio-label {
  font-family: 'KB_C1';
  font-size: 16px;
  color: #333; /* 라벨 텍스트 색상 */
}
.mileage-text {
  display: inline;
}

@media (max-width: 768px) {
  .notice-new{
    display: none;
  }
  .notice-num{
    display: none;
  }
  .notice-date{
    display: none;
  }
.input-search{
    border-radius: 30px;
    padding-right: 15px; 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    outline: none;
    font-size: 12px;
    font-family: "KB_C3", sans-serif;
    width: 45%;
    border: none;
    margin: 4px;
    height: 0px;
}
.bi-search {
  font-size: 10px !important;
  margin-left: 70px;
}
.notice-mile{
  /* flex: 1 1 100%; */
  text-align: left;
  letter-spacing: 0px;
  color: #745f40;
  font-family: "KB_C2", sans-serif;
  font-size: 8pt;
  margin-left: 0px;
}    
/* .input-base {
    width: 100%;
    height: 65px;
    background-color: #f9f9f9;
    text-align: center;
    line-height: 65px;
    font-size: 10px;
    margin-bottom: 20px;
} */

.notice-views {
    /* flex: 1 1 10%; */
    text-align: center;
    display: inline;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    margin-bottom: 10%;
}
.mileage-text {
    display: none;
  }
  .input-base {
    width: 100%;
    height: 45px;
    background-color: #f9f9f9;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    margin-bottom: 20px;
}
.notice-title {
    flex: 1 1 150%;
    text-align: center;
    letter-spacing: 1px;
    font-family: "KB_C2", sans-serif;
    font-size: 12pt;
}
 ::before, ::after {
    background-repeat: no-repeat;
    box-sizing: inherit;
    font-size: 12px;
    
}

}
</style>
