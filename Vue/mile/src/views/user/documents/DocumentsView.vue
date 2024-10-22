<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg mt-5 mb-4" style="font-family: KB_C3">
      문서모아
      <hr
        
        class="mx-auto title-line"
      />
    </h2>
  
    <!-- 카테고리 목록 -->
    <div @click.stop="toggleCategory" class="QnA" ref="categoryButton">
      <div class="category-button list-wrapper-category" >
        {{ selectedCategory ? selectedCategory : '카테고리' }}
      </div>
      <div class="dropdown-menu" v-if="showCategory" ref="dropdownMenu">
        <div class="menu-items">
          <a class="dropdown-item" @click="filterByCategory(null)">전체</a>
          <a
            class="dropdown-item"
            v-for="mileage in mileages"
            :key="mileage.mile_no"
            @click="filterByCategory(mileage.mile_name)"
          >
            {{ mileage.mile_name }} 마일리지
          </a>
        </div>
      </div>
    </div>
  
  <div class="d-flex justify-content-between align-items-center document-menu">
    <div class="lg2 document-count" >총 {{ countList }}건</div>
    <div
      class="input-search input-base search-mobile"
    >
      <div
        class="d-flex justify-content-between align-items-center search-wrapper"
      >
        <input
          type="text"
          v-model="searchQuery"
          @input="onSearch"
          placeholder="검색어를 입력하세요"
          class="w-100 h-100 d-inline-block"
          style="text-align: left"
        />
        <button>
          <i
            class="bi bi-search mr-2"
          ></i>
        </button>
      </div>
    </div>
    </div>

    <!-- 문서 리스트 불러오기 -->
    <div
      v-if="filteredDocuments.length > 0"
      class="pr-5 pl-5 pb-5 pt-2 document-container"
    >
      <div
        v-for="document in paginatedDocuments"
        :key="document.documnet_mile_no"
        class="mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"
      >
        <div class="d-flex align-items-center justify-content-between list-container">
          <button style="width: 90%; text-align: left">
            <div class="d-flex align-items-center justify-content-start">
              <div
                v-if="isNew(document.document_date) && !isMobile"
                style="width: 5%; padding-left: 3%"
              >
                <span class="" style="color: #edbb00; font-family: 'KB_C2'; font-size: 11pt;"
                  >NEW</span
                >
              </div>
              <div
                class="d-flex align-items-center justify-content-between"
                style="width: 100%"
              >
                <span
                  class="pl-1 document-category"
                  >{{ document.mile_name }}</span
                >
                <span
                  class="lg2 document-title"
                  >{{ document.document_file }}</span
                >
                <div v-if="!isMobile">
                  <span
                    class="md mr-5 document-date"
                    >{{ formatDate(document.document_date) }}</span
                  >
                </div>
                
              </div>
            </div>
          </button>
          <button @click.stop="downloadDocu(document.document_file)">
            <div v-if="!isMobile">
              <span class="md download-font" style="text-align: right">파일 다운로드 〉</span>
            </div>
            <div v-else>
              <span class="md download-font" style="text-align: right">
                <i class="bi bi-download"></i>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-else style="padding-top: 10vh">
      <p
        class="lg2"
        style="text-align: center; color: #aeaeb2; font-family: KB_C2"
      >
        검색 결과가 없습니다.
      </p>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination-container">
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">〈</button>
        <button
          v-for="page in searchPages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === searchPages">
          〉
        </button>
      </div>
    </div>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '@/api/axios';
import moment from 'moment';
import MobileDetect from "mobile-detect";

export default {
  name: 'DocumentsView',
  data() {
    return {
      mileages: [],
      baseHeight: 900,
      increment: 90,
      buttonHeight: 150,
      searchQuery: '', // 검색어 추가
      currentPage: 1, // 현재 페이지
      itemsPerPage: 7, // 한 페이지에 보여줄 항목 수
      allDocuments: [], // 모든 문서 데이터
      countList: 0,
      lastInputTime: 0, // 마지막 입력 시간
      selectedCategory: '', // 선택된 카테고리
      showCategory: false, // 카테고리: 전체
      totalPages: 0, // 총 페이지 수
      isMobile: false,
      searchPages: 0,
      lastSearchQuery: '',
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo','getIsChecked']),
    ...mapGetters('mileExcel', ['getArrayMileDocument', 'getDocumentSum']),

    computedHeight() {
      if(this.isMobile){
        return "1100px";
      }else{
        let height =
          this.baseHeight + this.paginatedDocuments.length * this.increment;
        if (
          this.paginatedDocuments.length % this.itemsPerPage === 0 &&
          this.paginatedDocuments.length > 0
        ) {
          height += this.buttonHeight / 2;
        } else {
          height += this.buttonHeight / 2;
        }
        return `${height}px`;
      }
    },
    documentSum() {
      return this.getDocumentSum;
    },
    filteredDocuments() {
      // 검색어에 따라 문서 필터링
      let documents = this.allDocuments;
      if (this.selectedCategory && this.selectedCategory !== 'null') {
        documents = documents.filter(
          (document) => document.mile_name === this.selectedCategory
        );
      }

      // 검색어와 문서 파일명을 소문자로 변환하여 비교
      const searchQueryLower = this.searchQuery.toLowerCase();
      return documents.filter((document) =>
        document.document_file.toLowerCase().includes(searchQueryLower)
      );
    },
    paginatedDocuments() {
      return this.filteredDocuments.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    totalFilteredPages() {
      return Math.ceil(this.filteredDocuments.length/this.itemsPerPage);
    }
  },
  watch: {
    searchQuery() {
      this.lastInputTime = Date.now();
      this.onSearch();
    },
    filteredDocuments() {
      this.updateSearchPages();
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo', 'getMileDetail']),
    ...mapActions('mileExcel', ['downloadDocument']),
    ...mapActions('mileDocument', ['fetchMileDocument']),

    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo && this.getIsChecked == true)) {
          window.location.href="/noAccess"
        } 
    },
    formatDate(dateString) {
      return moment(dateString).format('YYYY-MM-DD');
    },
    isNew(dateString) {
      const date = moment(dateString);
      const today = moment();
      const oneWeekAgo = moment().subtract(7, 'days');

      return date.isBetween(oneWeekAgo, today, null, '[]');
    },
    showAlert(t, i, r) {
      this.$swal({
        title: t,
        icon: i,
        scrollbarPadding: false,
      }).then((result) => {
        if (result.isConfirmed) {
          if (r == '#') {
            location.reload(); // 현재 페이지 새로고침
          } else {
            this.$router.push(r);
          }
        }
      });
    },
    downloadDocu(document_file) {
      this.downloadDocument({ document_file });
    },
    async loadDocuments() {
      // 문서 리스트 가져오기(페이지네이션 처리)

      const response = await this.fetchMileDocument();
      this.allDocuments = response.data;

      const countList = await api.get(
        `/myMile/countListDocuments`
      );
      this.countList = countList.data;

      this.totalPages = Math.ceil(this.countList / this.itemsPerPage);
      this.updateSearchPages();
    },
    updateSearchPages() {
      this.searchPages = Math.ceil(this.filteredDocuments.length / this.itemsPerPage);
    },
    onSearch() {
      // 검색
      const currentTime = Date.now();
      const timeSinceLastInput = currentTime - this.lastInputTime;

      if (timeSinceLastInput > 500) {
        this.lastInputTime = currentTime;
        if(this.searchQuery !== this.lastSearchQuery){
          this.currentPage = 1; //검색어가 변경되었을 때만 첫 페이지로 이동
          this.lastSearchQuery = this.searchQuery;
        }
        this.updateSearchPages();
      }
    },
    async fetchMileages() {
      // 마일리지 카테고리 가져오기
      try {
        const response = await api.get(
          '/notice/mileage'
        );
        this.mileages = response.data;
      } catch (error) {
        console.error(
          'Error fetching mileages:',
          error.response ? error.response.data : error.message
        );
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
    filterByCategory(category) {
      this.selectedCategory = category !== null ? category : '';
      this.currentPage = 1;
      this.loadDocuments();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadDocuments();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadDocuments();
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.loadDocuments();
    },
  },
  created() {

    this.checkLoginInfo();
    
    const user_no = this.getLoginInfo ? this.getLoginInfo.user_no : null;
    if (user_no) {
      this.fetchMileInfo(user_no);
    } else {
      console.error('user_no이 유효하지 않습니다.');
    }
    this.loadDocuments(); // 첫 페이지 로드
    this.fetchMileages();
  },
  mounted() {
    // 모바일 기기 판단 여부 
    const md = new MobileDetect(window.navigator.userAgent);
    this.isMobile = md.mobile() !== null;
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .title-line {
    width: 30% !important;
  }
  .category-button {
    width: 25vw !important;
    font-size: 12pt !important;
  }
  .category-button:hover {
    transition: background-color 0s ease !important;
  }
  .list-wrapper:hover {
    background-color: #e1e3e4 !important;
    transition: background-color 0s ease !important;
  }
  .document-count {
    padding: 30px !important;
    font-size: 11pt !important;
  }
  .dropdown-menu {
    top: 260% !important;
    background-color: rgba(255, 255, 255, 0.96) !important;
  }
  .document-menu {
    margin-top: 30px !important;
  }
  .document-container {
    margin-top: 4vh !important;
    padding: 0 !important;
  }
  .list-wrapper {
    width: 100% !important;
    height: 3em !important;
    padding: 3% !important;
  }
  .document-category {
    margin-left: 0 !important;
    font-size: 8pt !important;
    width: 20% !important;
    padding-left: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .document-title {
    font-size: 11pt !important;
    width: 80% !important;
  }
  .document-date {
    font-size: 9pt !important;
    padding: 0 !important;
  }
  .download-font {
    font-size: 13pt !important;
  }
  .list-container {
    padding: 0 !important;
  }
}

.document-date {
  width: 20%;
  margin-right: 3%;
  text-align: left;
  font-family: 'KB_C3';
}

.document-title {
  width: 65%;
  text-align: center;
  font-family: 'KB_C2';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-category {
  width: 15%;
  margin-left: 3%;
  text-align: left;
  font-family: 'KB_C2';
  font-size: 14pt;
  color: #9c8480;
}

.document-container {
  margin-top: 8vh;
}

.document-count {
  padding: 3em;
}

.title-line {
  width: 13%; 
  border: 0; 
  height: 2px; 
  background: black;
}

/* 드롭다운 메뉴 스타일 */
.QnA {
  position: relative;
  display: inline-block;
}

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

.category-button:hover {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-wrapper {
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 95%;
  height: 5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fbfbfb;
}

.list-wrapper:hover {
  cursor: pointer;
  background-color: #e1e3e4 !important;
  transition: background-color 0.3s ease;
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

.dropdown-menu {
  display: none;
  position: absolute;
  top: 240%;
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
  font-family: 'KB_S5', sans-serif;
  font-size: 13pt; /* 텍스트 크기를 픽셀 단위로 설정 */
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
</style>
