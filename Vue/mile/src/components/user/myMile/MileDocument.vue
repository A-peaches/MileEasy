<template>
  <div :style="{height:computedHeight}">
    <div class="d-flex justify-content-between align-items-center">
      <div class="lg2 document-count">총 {{ documentSum }}건</div>
      <div class="input-search input-base search-mobile">
        <div class="d-flex justify-content-between align-items-center search-wrapper">
          <input type="text" v-model="searchQuery" @input="onSearch" placeholder="검색어를 입력하세요" class="w-100 h-100 d-inline-block" style="text-align: left;"/>
          <button><i class="bi bi-search mr-2"></i></button>
        </div>
      </div>
    </div>
    
    <!-- 마일리지 문서 리스트 -->
    <div v-if="filteredDocuments.length>0" class="pr-5 pl-5 pb-5 pt-4 document-container">
      <div v-for="document in paginatedDocuments" :key="document.document_mile_no" 
        class="mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"
        >
        <div class="d-flex align-items-center justify-content-between list-container">
          <button class="left-wrapper" >
            <div class="d-flex align-items-center justify-content-start">
              <div v-if="isNew(document.document_date) && !isMobile" style="width:5%; padding-left: 3%;">
                <span class="" style="color: #edbb00; font-family: 'KB_C2'; font-size: 11pt;">NEW</span>
              </div>
              <div class="d-flex align-items-center justify-content-between" style="width: 100%;">
                <span class="lg2 document-title">{{ document.document_file }}</span>
                <!-- <div v-if="isMobile"> -->
                <span class="md mr-5 document-date" >{{ formatDate(document.document_date) }}</span>
                <!-- </div> -->
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
    <div v-else style="padding-top: 10vh;">
      <p class="lg2" style="text-align: center; color:#aeaeb2; font-family: KB_C2;">검색 결과가 없습니다.</p>
    </div>

    <!-- 페이지네이션 -->
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import api from '@/api/axios';
import moment from 'moment';
import MobileDetect from "mobile-detect";

export default {
  name: "AttendanceCom",
  props: ['mile_no'],
  data() {
    return {
      file: null,
      baseHeight: 60,
      increment: 5,
      buttonHeight: 10,
      searchQuery: '', // 검색어 추가
      currentPage: 1, // 현재 페이지
      itemsPerPage: 7, // 한 페이지에 보여줄 항목 수
      allDocuments: [], // 모든 문서 데이터 
      countList: 0,
      lastInputTime: 0, // 마지막 입력 시간
      isMobile: false,
      totalPages: 0, // 총 페이지 수
      searchPages: 0,
      lastSearchQuery: '',
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters('mileExcel', ['getArrayMileDocument', 'getDocumentSum']),

    arrayMileDocument(){
      return this.getArrayMileDocument;
    },
    computedHeight(){
      // if(this.isMobile){
      //   return "90vh";
      // }else{
        let height = this.baseHeight + this.paginatedDocuments.length * this.increment;
        if(this.paginatedDocuments.length % this.itemsPerPage === 0 && this.paginatedDocuments.length >0){
          height += this.buttonHeight/2;
        }else{
          height += this.buttonHeight/2;
        }
        return `${height}vh`;
      // }
    },
    documentSum(){
      return this.getDocumentSum;
    },
    filteredDocuments(){ 
      // 검색어에 따라 문서 필터링
      let documents = this.allDocuments;

      const searchQueryLower = this.searchQuery.toLowerCase();
      return documents.filter((document) =>
        document.document_file.toLowerCase().includes(searchQueryLower)
      );
    },
    paginatedDocuments(){
      return this.filteredDocuments.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    totalFilteredPages() {
      return Math.ceil(this.filteredDocuments.length/this.itemsPerPage);
    },
  },
  watch: {
    searchQuery(){
      this.lastInputTime = Date.now();
      this.onSearch();
    },
    filteredDocuments() {
      this.updateSearchPages();
    }
  },
  methods: {
    ...mapActions('mileExcel', ['mileDocumentLists', 'getMileDocumentSum', 'downloadDocument']),
    
    downloadDocu(document_file){
      this.downloadDocument({ document_file });
    },
    formatDate(dateString){
      return moment(dateString).format('YYYY-MM-DD');
    },
    isNew(dateString){
      const date = moment(dateString);
      const today = moment();
      const oneWeekAgo = moment().subtract(7, 'days');

      return date.isBetween(oneWeekAgo, today, null, '[]');
    },
    async loadDocuments(){
      // 문서 리스트 가져오기 (페이지네이션 처리)
      const response = await this.mileDocumentLists({
        mile_no: this.mile_no,
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });

      if(response.data.length == 0 || response.data == null){
        console.error('불러올 문서가 존재하지 않습니다.');
      } 

      this.allDocuments = response.data; // 문서 리스트 불러오기 
      
      this.getMileDocumentSum(this.mile_no); // 문서 리스트 총 건수 불러오기 

      this.totalPages = Math.ceil(this.getDocumentSum / this.itemsPerPage);
      this.updateSearchPages();
    },
    updateSearchPages() {
      this.searchPages = Math.ceil(this.filteredDocuments.length / this.itemsPerPage);
    },
    onSearch(){
      // 검색 기능 
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
    if(this.mile_no){
      this.loadDocuments(); // 첫 페이지 로드 
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }
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
  .document-count {
    padding: 30px !important;
    font-size: 11pt !important;
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
  .list-wrapper:hover {
    background-color: #e1e3e4 !important;
    transition: background-color 0s ease !important;
  }
  .list-container {
    padding: 0 !important;
  }
  .document-title {
    font-size: 11pt !important;
    width: 80% !important;
  }
  .document-date {
    font-size: 9pt !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 30% !important;
  }
  .download-font {
    font-size: 13pt !important;
  }
  .left-wrapper {
    width: 90% !important; 
  }
}

.document-date {
  width: 20%;
  margin-right: 3%;
  text-align: left;
  font-family: 'KB_C3';
}

.document-count {
  padding: 3em;
}

.document-container {
  margin-top: 8vh;
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

.document-title {
  width: 65%;
  text-align: center;
  font-family: 'KB_C2';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.left-wrapper {
  width: 80%; 
  text-align: left;
}

/* 페이지 네이션 및 글쓰기 버튼 스타일 */
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
</style>