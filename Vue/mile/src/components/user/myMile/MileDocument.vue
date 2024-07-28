<template>
  <div :style="{height:computedHeight}">
    <div class="d-flex justify-content-between align-items-center">
      <div class="lg2" style="padding: 3em">총 {{ documentSum }}건</div>
      <div class="input-search input-base" style="margin-right: 2em; width:17vw; height: 6vh;">
        <div class="d-flex justify-content-between align-items-center" style="font-size: 14pt; height: 100%; margin-left: 1em;">
          <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요" class="w-100 h-100 d-inline-block" style="text-align: left;"/>
          <button><i class="bi bi-search mr-2" style="font-size: 25px; color: #4b4a4a"></i></button>
        </div>
      </div>
    </div>
    
    <!-- 마일리지 문서 리스트 -->
    <div v-if="filteredDocuments.length>0" class="pr-5 pl-5 pb-5 pt-4" style="margin-top: 10vh;">
      <div v-for="document in paginatedDocuments" :key="document.documnet_mile_no" 
        class="mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"
        style="width:90%; height: 5em; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); background-color: #FBFBFB;">
        <div class="d-flex align-items-center justify-content-between">
          <button style="width: 80%; text-align: left;">
            <div class="d-flex align-items-center justify-content-start">
              <div v-if="isNew(document.document_date)" style="width:5%; padding-left: 3%;">
                <span class="md" style="color: #edbb00;">NEW</span>
              </div>
              <div class="d-flex align-items-center justify-content-between" style="width: 100%;">
                <span class="lg2 pl-5" style="margin-left: 3%; text-align: left; font-family: KB_C2;">{{ document.document_file }}</span>
                <span class="md pl-3" style="width:15%; margin-right: 2%; text-align: right; font-family: KB_C3">{{ formatDate(document.document_date) }}</span>
              </div>
            </div>
          </button>
          <button @click.stop="downloadDocu(document.document_file)">
            <span class="md" style="text-align: right;">파일 다운로드 〉</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else style="padding-top: 10vh;">
      <p class="lg2" style="text-align: center; color:#aeaeb2; font-family: KB_C2;">검색 결과가 없습니다.</p>
    </div>

    <!-- 로드 버튼 -->
    <div style="margin-bottom: 3%;" v-if="showLoadButton">
      <button @click="loadDocuments" class="lg2" style="font-family: 'KB_C1';">
        <i class="bi bi-arrow-clockwise lg2"></i>&nbsp;더보기
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import moment from 'moment';
export default {
  name: "AttendanceCom",
  props: ['mile_no'],
  data() {
    return {
      file: null,
      baseHeight: 60,
      increment: 10,
      buttonHeight: 10,
      searchQuery: '', // 검색어 추가
      currentPage: 1, // 현재 페이지
      itemsPerPage: 7, // 한 페이지에 보여줄 항목 수
      allDocuments: [], // 모든 문서 데이터 
      countList: 0
    };
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
      const response = await this.mileDocumentLists({
        mile_no: this.mile_no,
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
      if(response.data.length == 0 || response.data == null){
        console.error('불러올 문서가 존재하지 않습니다.');
      } 
      this.allDocuments.push(...response.data);
      this.currentPage++;
      
      const mile_no = this.mile_no;
      const countList = await axios.get(`http://localhost:8090/mileage/countListDocuments/${mile_no}`);
      this.countList = countList.data;
    },
  },
  created() {
    if(this.mile_no){
      this.loadDocuments(); // 첫 페이지 로드 
      this.getMileDocumentSum(this.mile_no);
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }
  },
  mounted() {
  // mile_no를 사용할 수 있습니다.
  console.log('Mile No:', this.mile_no);
},
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters('mileExcel', ['getArrayMileDocument', 'getDocumentSum']),
    arrayMileDocument(){
      return this.getArrayMileDocument;
    },
    computedHeight(){
      let height = this.baseHeight + this.paginatedDocuments.length * this.increment;
      if(this.paginatedDocuments.length % this.itemsPerPage === 0 && this.paginatedDocuments.length >0){
        height += this.buttonHeight/2;
      }else{
        height += this.buttonHeight/2;
      }
      return `${height}vh`;
    },
    documentSum(){
      return this.getDocumentSum;
    },
    filteredDocuments(){ // 검색어에 따라 문서 필터링 
      return this.allDocuments.filter(document => document.document_file.includes(this.searchQuery));
    },
    paginatedDocuments(){
      return this.filteredDocuments.slice(0, this.currentPage * this.itemsPerPage);
    },
    showLoadButton(){
      const condition1 = this.filteredDocuments.length % this.itemsPerPage === 0;
      const condition2 = this.filteredDocuments.length > 0;
      const condition3 = this.filteredDocuments.length !== this.countList;
      
      return condition1 && condition2 && condition3;
    }
  },
  watch: {
  }
};
</script>

<style scope>
/* .page-back {
  height: 90vh;
} */

</style>