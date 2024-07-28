<!--🚨마일리지 관리자 :  마일리지 문서-->
<template>
  <div class="cards page-back mx-auto" :style="{height:computedHeight}">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">{{ mileInfo ? mileInfo.mile_no : '' }} 마일리지 문서</h2>
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
 
    <!--버튼-->
    <div class="button-container mt-auto">
      <div class="d-flex justify-content-evenly mx-auto">
        <div class="mt-5">
          <button @click="openModal" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">등록하기</button>
        </div>
        <div class="mt-5">
          <button @click="deleteDocu" class="btn-gray button-style" 
            :class="{choice:deleteArray.length>0}" 
            :style="deleteArray.length>0?{'pointer-events':'auto'} : {'pointer-events':'none'}"
            >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <div v-if="isModalOpen" class="modals" >
      <div
        class="modals-content" ref="modal"
        style="width: 40%; height: 45%; background-color: #f9f9f9"
      >
        <span class="close" @click="closeModal">&times;</span>
        <div>
          <p class="text-left fw-bold mb-3" style="font-size: 19pt">
            마일리지 문서 업로드
          </p>
          <div class="p-4" style="margin-top: 5vh;">
            <div class="d-flex input-gray mt-3 p-4">
              <input type="file" @change="onFileChange" class="lg2" style="width: 90%; text-align: right;"/>
            </div>
          </div>
          <div class="d-flex justify-content-center" style="margin-top: 8vh;">
            <button
              class="btn-gray mt-2 KB_C2"
              @click="uploadDocument"
              style="
                width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;
              "
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'DocumentsMileageAdminView',
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
      countList: 0
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
    
  }
};
</script>

<style scope>
.page-back {
  width: 70%;
  height: 90vh;
  /* height: 800px; */
  margin-top: 5%;
}
.choice {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
  pointer-events: auto;
}
.choice:hover {
  background-color: #bd2c3a;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
}
.activeDelete {
  background-color: #e1e3e4 !important;
}
.list-wrapper {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.list-wrapper:hover {
  cursor: pointer;
  background-color: #e1e3e4 !important;
  transition: background-color 0.3s ease;

}
.button-container {
  margin-top: auto;
  padding: 20px 0;
}
.button-style {
  width: 8vw;
  height: 3vw;
  font-size: 1.2vw;
  font-family: KB_C2;
}
</style>
