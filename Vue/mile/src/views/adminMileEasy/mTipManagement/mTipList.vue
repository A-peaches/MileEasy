<template>
  <div class="button-container"></div>

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
    <div
      v-if="
        isLoggedIn &&
        loginInfo.user_is_admin &&
        !loginInfo.user_is_manager &&
        isChecked
      "
    ></div>
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

  <div class="notice-list" style="margin-left: 30px">
    <div v-if="paginatedNotices.length">
      <div
        class="input-base list-wrapper"
        v-for="notice in paginatedNotices"
        :key="notice.notice_board_no"
        @click="handleNoticeClick(notice)"
      >
        <div class="notice-details">
          <div v-if="notice.is_new" class="notice-new">
            {{ notice.display_num }}
          </div>
          <div v-else class="notice-num">{{ notice.display_num }}</div>
          <div class="notice-mile">
            {{
              notice.mile_name && notice.mile_name !== '기타'
                ? notice.mile_name + ' 마일리지'
                : '기타'
            }}
          </div>
          <div class="notice-title">
            {{
              notice.mtip_board_title.length > 30
                ? notice.mtip_board_title.substring(0, 30) + ' ...'
                : notice.mtip_board_title
            }}
          </div>
          <pre class="notice-date">{{
            formatDate(notice.mtip_board_date)
          }}</pre>
          <i class="bi bi-eye"></i>
          <div class="notice-views">
            {{ notice.mtip_board_hit }} <i class="fa fa-eye"></i>
          </div>
          <!-- 좋아요 아이콘과 카운트 -->
          <i
            :class="['bi', notice.liked ? 'bi-heart-fill' : 'bi-heart']"
            :style="{ color: notice.liked ? '#dc3545' : 'inherit' }"
          ></i>
          <div class="notice-like">{{ notice.mtip_board_like }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>게시글이 없습니다.</p>
    </div>
  </div>

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
    <button @click="nextPage" :disabled="currentPage === totalPages">〉</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '@/api/axios';

export default {
  data() {
    return {
      notices: [],
      mileages: [],
      showCategory: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: '',
      selectedCategory: null,
      isProcessing: false,
      sortByDateAsc: true, // 최신순 체크박스가 기본으로 선택
      sortByViews: false, // 조회 수 정렬 여부
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapState('login', ['loginInfo']),
    ...mapGetters('mtipBoard', ['isPostLiked']),

    paginatedNotices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNotices.slice(start, end).map((notice) => {
        return {
          ...notice,
          liked: this.isPostLiked(this.loginInfo.user_no, notice.mtip_board_no),
        };
      });
    },

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
      let result = this.notices;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (notice) =>
            (notice.mtip_board_title &&
              notice.mtip_board_title.toLowerCase().includes(query)) ||
            (notice.mtip_board_content &&
              notice.mtip_board_content.toLowerCase().includes(query))
        );
      }
      if (this.selectedCategory !== null) {
        if (this.selectedCategory === '기타') {
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
            b.mtip_board_hit - a.mtip_board_hit ||
            new Date(b.mtip_board_date) - new Date(a.mtip_board_date)
        );
      } else if (this.sortByDateAsc) {
        result.sort(
          (a, b) => new Date(b.mtip_board_date) - new Date(a.mtip_board_date)
        );
      } else {
        result.sort(
          (a, b) => new Date(a.mtip_board_date) - new Date(b.mtip_board_date)
        );
      }

      let displayNum = 1;
      return result.map((notice) => ({
        ...notice,
        is_new: this.isNew(notice.mtip_board_date),
        display_num: this.isNew(notice.mtip_board_date) ? 'NEW' : displayNum++,
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
  },
  methods: {
    ...mapActions('mtipBoard', [
      'fetchNotices',
      'checkLikeStatus',
      'fetchLikedPosts',
    ]),
    ...mapActions('mileage', ['fetchMileages']),
    checkLoginInfo() {
      if (
        !this.getLoginInfo ||
        this.getIsChecked === false ||
        this.getLoginInfo.user_is_admin === false
      ) {
        window.location.href = '/noAccess';
      }
    },

    goBack() {
      this.$router.go(-1);
    },
    isNew(dateString) {
      const today = new Date();
      const noticeDate = new Date(dateString);
      const differenceInTime = today.getTime() - noticeDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays <= 7;
    },
    // methods 부분
    handleCheckboxChange(sortType) {
      if (sortType === 'views' && this.sortByViews) {
        this.sortByDateAsc = false;
      } else if (sortType === 'date' && this.sortByDateAsc) {
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
    async fetchNotices() {
      try {
        const response = await api.get('/mtip/MtiplistComplain');
        this.notices = response.data.map((notice) => ({
          ...notice,
          liked: notice.liked || false, // 서버에서 좋아요 여부를 전달해줬을 경우
        }));
      } catch (error) {
        console.error(
          'Error fetching notices:',
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchMileages() {
      try {
        const response = await api.get('/mtip/Mtipmileage');
        this.mileages = response.data;
      } catch (error) {
        console.error(
          'Error fetching mileages:',
          error.response ? error.response.data : error.message
        );
      }
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

        // 좋아요 상태 확인 요청
        await this.checkLikeStatus({
          mtip_board_no: notice.mtip_board_no,
          user_no: this.loginInfo.user_no,
        });

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
        console.error(
          'Error fetching notice details:',
          error.response ? error.response.data : error.message
        );
      } finally {
        this.isProcessing = false;
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
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
      this.searchQuery = '';
      this.currentPage = 1;
    },
    async initializeData() {
      await this.fetchNotices();
      await this.fetchMileages();
      if (this.loginInfo) {
        await this.fetchLikedPosts(this.loginInfo.user_no);
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);

    this.fetchNotices();
    this.fetchMileages();
    this.initializeData();
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  created() {
    this.checkLoginInfo();
  },
};
</script>

<style scoped>
html,
body {
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
  font-family: 'KB_C2', sans-serif;
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
  padding: 0;
  min-height: 100vh; /* 최소 높이를 설정하여 페이지 전체를 채움 */
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

.content.cards {
  width: 100%;
  border: 1px solid #ccc;
  padding: 60px;
  border-radius: 8px;
  box-sizing: border-box;
  max-width: 1300px;
  margin: 0 auto;
}

.category-button {
  background-color: #f9f9f9;
  border-radius: 25px;
  padding: 12px 40px;
  cursor: pointer;
  margin-bottom: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 공지사항과 카테고리 버튼 사이의 간격 */
  display: inline-block;
  font-size: 20px;
  font-family: 'KB_C3', sans-serif;
  opacity: 0.8; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
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
  font-family: 'KB_C3', sans-serif;
  width: 28%;
  border: none;
  margin: 5px;
  height: 60px; /* 높이를 조금 높여줌 */
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 10px;
  flex: 1;
}
.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5b5b5b;
  font-size: 18px;
  cursor: pointer;
  margin-top: 0;
  font-family: 'KB_C2', sans-serif;
}

.back-button .arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 15px;
  font-size: 17px;
  font-family: 'KB_C2', sans-serif;
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
  opacity: 0.7; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
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
  font-size: 19px;
  font-family: 'KB_C3', sans-serif;
  text-align: left; /* 왼쪽 정렬 */
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
  top: -5px; /* 위치를 살짝 위로 올립니다 */
}

.checkbox-container input[type='checkbox'] {
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

.checkbox-container input[type='checkbox']:checked + .custom-checkbox {
  background-color: #f6a319; /* 체크된 상태일 때 배경색 변경 (노란색) */
  border: none; /* 체크된 상태일 때 테두리 제거 */
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
  margin-left: 10px; /* 체크박스와 텍스트 사이 간격 */
  font-family: 'KB_C3', sans-serif;
  font-size: 20px;
}

.input-base {
  width: 100%;
  height: 65px;
  background-color: #f9f9f9;
  text-align: center; /* 가로 정렬 */
  line-height: 65px; /* 세로 정렬 */
  font-size: 20px;
  margin-bottom: 20px; /*글 목록 사이 공간*/
  width: 1200px;
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
  font-family: 'KB_C2', sans-serif;
}

.notice-num {
  flex: 1 1 20%;
  text-align: center;
  letter-spacing: 1px; /* 예시: 번호의 글자 간 거리 */
  font-size: 10pt;
  font-family: 'KB_C3', sans-serif;
}
.notice-new {
  flex: 1 1 20%;
  text-align: center;
  letter-spacing: 1px; /* 예시: 번호의 글자 간 거리 */
  font-size: 12pt;
  font-family: 'KB_C3', sans-serif;
  color: #edbb00;
}
.notice-mile {
  flex: 1 1 50%;
  text-align: left;
  letter-spacing: 1.5px; /* 예시: 날짜의 글자 간 거리 */
  color: #675437;
  font-family: 'KB_C3', sans-serif;
  font-size: 0.7em;
  margin-left: 10px; /* 왼쪽 여백 추가 */
}

.notice-date {
  flex: 1 1 60%;
  text-align: center;
  letter-spacing: 1.5px; /* 예시: 날짜의 글자 간 거리 */
  font-size: 15px;
  font-family: 'KB_C3', sans-serif;
}

.notice-views {
  flex: 1 1 15%; /* flex-grow, flex-shrink, flex-basis */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 10%;
}

.notice-like {
  flex: 1 1 15%; /* flex-grow, flex-shrink, flex-basis */
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
  font-family: 'KB_C3', sans-serif;
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
  transform: translate(
    -50%,
    -16%
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
  font-family: 'KB_C3', sans-serif;
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
  object-fit: contain;
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
  font-family: 'KB_C3', sans-serif; /* 숫자의 폰트 */
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
  font-family: 'KB_C3', sans-serif;
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
