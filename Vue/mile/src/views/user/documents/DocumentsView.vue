<template>
  <!-- <div class="about">
    <h1>문서모아</h1>
    <h3>카테고리별 검색기능</h3>
    <h3>검색 기능</h3>
    <a href="/documentsDetailView"><h3>문서 상세보기</h3></a>
  </div> -->
  <div class="cards page-back mx-auto" :style="{height:computedHeight}">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">문서모아<hr style="width: 13%; border:0; height: 2px; background: black" class="mx-auto"></h2>
    <div @click.stop="toggleCategory" class="QnA" ref="categoryButton">
        <div class="category-button list-wrapper">카테고리</div>
        <div class="dropdown-menu" v-if="showCategory" ref="dropdownMenu">
          <div class="menu-items">
            <a @click="filterByCategory(null)">전체</a>
            <a v-for="mileage in mileages" :key="mileage.mile_no" @click="filterByCategory(mileage.mile_name)">
              {{ mileage.mile_name }} 마일리지
            </a>
          </div>
        </div>
      </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="lg2" style="padding: 3em">총 {{ documentSum }}건</div>
      <div class="input-search input-base" style="margin-right: 2em; width:17vw; height: 6vh;">
        <div class="d-flex justify-content-between align-items-center" style="font-size: 14pt; height: 100%; margin-left: 1em;">
          <input type="text" v-model="searchQuery" @input="onSearch" placeholder="검색어를 입력하세요" class="w-100 h-100 d-inline-block" style="text-align: left;"/>
          <button><i class="bi bi-search mr-2" style="font-size: 25px; color: #4b4a4a"></i></button>
        </div>
      </div>
    </div>
    
    <!-- 마일리지 문서 리스트 -->
    <div v-if="filteredDocuments.length>0" class="pr-5 pl-5 pb-5 pt-4" style="margin-top: 10vh;">
      <div v-for="document in paginatedDocuments" :key="document.documnet_mile_no" 
        class="mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"
        :class="{activeDelete: deleteArray.includes(document)}"
        @click="addDeleteDocuArray(document)"
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
  name: 'DocumentsView',
  data(){
    return{
      isModalOpen: false,
      file: null,
      deleteArray: [],
      baseHeight: 90,
      increment: 10,
      buttonHeight: 10,
      searchQuery: '', // 검색어 추가
      currentPage: 1, // 현재 페이지
      itemsPerPage: 7, // 한 페이지에 보여줄 항목 수
      allDocuments: [], // 모든 문서 데이터 
      countList: 0,
      lastInputTime: 0 // 마지막 입력 시간
    }
  },
  computed:{
    ...mapGetters('mile', ['getMileInfo']),
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileExcel', ['getArrayMileDocument', 'getDocumentSum']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
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
  methods:{
    ...mapActions('mile', ['fetchMileInfo', 'getMileDetail']),
    ...mapActions('mileExcel', ['mileDocumentLists', 'downloadDocument', 'deleteMileDocument', 'getMileDocumentSum']),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
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
    showAlert(t, i, r) {
      this.$swal({
        title: t,
        icon: i,
        scrollbarPadding: false
      }).then((result) => {
        if(result.isConfirmed){
          if(r == '#'){
            location.reload(); // 현재 페이지 새로고침
          }else{
            this.$router.push(r);
          }
        }
      })
    },
    onFileChange(event){
      this.file = event.target.files[0];
    },
    async uploadDocument(){
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('mile_no', this.loginInfo ? this.loginInfo.mile_no : null);
      try{
        const response = await axios.post(`http://localhost:8090/mileage/uploadDocument`, formData, {
          headers: {
            'Content-Type':'multipart/form-data',
          },
        });
        if(response.data.success){
          this.showAlert('마일리지 문서 업로드 성공', 'success', '#');
        }else{
          this.showAlert('마일리지 문서 업로드 실패', 'error', '#');
        }
      }catch(error){
        console.error('Error uploading document', error);
        console.log('이건 에러 상태 response status:', error.response.status);
        if(error.response && error.response.status === 409){
          this.showAlert('중복된 파일명이 있습니다', 'info', '#');
        }else{
          this.showAlert('마일리지 문서 업로드 실패', 'error', '#');
        }
      }
    },
    downloadDocu(document_file){
      this.downloadDocument({ document_file });
    },
    addDeleteDocuArray(document){
      if(!this.deleteArray.includes(document)){
        this.deleteArray.push(document);
        console.log(this.deleteArray);
      }else{
        this.deleteArray = this.deleteArray.filter(item => item !== document);
      }
    },
    async deleteDocu(){
      if(this.deleteArray!=null){
        const response = await this.deleteMileDocument(this.deleteArray);
        if(response && response.data.success){
            console.log('마일리지 문서 파일 삭제 완료');
            this.showAlert('마일리지 문서가 삭제되었습니다', 'success', '#');
            this.deleteArray = [];
        }else{
          console.log('마일리지 문서 파일 삭제 실패');
          this.showAlert('마일리지 문서 삭제가 실패했습니다', 'error', '#');
        }
      }
    },
    async loadDocuments(){
      const response = await this.mileDocumentLists({
        mile_no: this.loginInfo.mile_no,
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
      this.allDocuments.push(...response.data);
      this.currentPage++;
      
      const mile_no = this.loginInfo.mile_no;
      const countList = await axios.get(`http://localhost:8090/mileage/countListDocuments/${mile_no}`);
      this.countList = countList.data;
    },
    onSearch(){
      const currentTime = Date.now();
      const timeSinceLastInput = currentTime - this.lastInputTime;

      if(timeSinceLastInput>500){
        this.lastInputTime = currentTime;
        this.loadDocuments();
      }
    }
  },
  created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      this.mileInfo = this.fetchMileInfo(user_no);
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }

    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    if(mile_no){
      this.getMileDetail(mile_no);
      this.loadDocuments(); // 첫 페이지 로드 
      this.getMileDocumentSum(mile_no);
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }
  },
  watch: {
    searchQuery(){
      this.lastInputTime = Date.now();
      this.onSearch();
    }
  }
};
</script>

<style scoped>
.page-back {
  width: 70%;
  height: 90vh;
  /* height: 800px; */
  margin-top: 5%;
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
  font-family: 'KB_S5', sans-serif;
  opacity: 0.8; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
}
.list-wrapper:hover {
  cursor: pointer;
  background-color: #E1E3E4 !important;
  transition: background-color 0.3s ease;
}
</style>
