<!--🚨마일리지 관리자 :  마일리지 문서-->
<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">{{ mileInfo ? mileInfo.mile_no : '' }} 마일리지 점수</h2>

    <!-- 날짜 선택 -->
    <div class="d-flex justify-content-end align-items-center" style="margin-top: 10vh; padding-left: 3%; padding-right: 3%;">
      <Datepicker  v-model="selectedDate" :format="formatDate" style="width:25%"></Datepicker>
      <!-- <button @click="fetchScoresByDate" class="btn-green">날짜 선택</button> -->
    </div>

    <!-- 양식 다운로드 -->
    <div class="d-flex justify-content-end align-items-center mt-3">
      <span class="md" style="width:95%; text-align: right; margin-right:3%; font-size: 14pt;">
        <button @click="downloadSample"><span style="text-decoration: underline;">엑셀 양식 다운로드</span>&nbsp;&nbsp;<i class="bi bi-download lg2"></i></button>
      </span>
    </div>

    <!-- 엑셀 파일 리스트 (기본) -->
    <div v-if="!selectedDate && paginatedScores.length>0" class="pr-5 pl-5 pb-5 pt-4" style="margin-top: 10vh;">
      <div v-for="score in paginatedScores" :key="score.mile_excel_no" 
        class="mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper"
        :class="{activeDelete: deleteArray.includes(score)}"
        @click="addDeleteArray(score)"
        style="width:90%; height: 5em; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); background-color: #FBFBFB;">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex justify-content-start align-items-center" style="width:80%;">
            <div v-if="isNew(score.mile_excel_date)" style="padding-left:3%;">
              <span class="md" style="color: #edbb00;">NEW</span>
            </div>
            <span class="lg2 pl-2 pr-2" style="margin-left: 3%; text-align: left; font-family: KB_C2">{{ score.mile_excel_file }}</span>
            <span class="md">{{ formatting(score.mile_excel_date) }}</span>
          </div>
          <button @click.stop="downloadExcel(score.mile_excel_file)">
            <span class="md " style="text-align: right;">파일 다운로드 〉</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 엑셀 파일 리스트 (날짜 선택 시) -->
    <div v-else class="pr-5 pl-5 pb-5 pt-4" style="margin-top: 10vh;">
      <div v-if="paginatedScores.length>0">
        <div v-for="score in paginatedScores" :key="score.mile_excel_no" 
          class="mx-auto mb-4 border-bottom p-4 input-base input-white list-wrapper" 
          :class="{activeDelete: deleteArray.includes(score)}"
          @click="addDeleteArray(score)"
          style="width:90%; height: 5em; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); background-color: #FBFBFB;">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex justify-content-start align-items-center" style="width:80%;">
              <div v-if="isNew(score.mile_excel_date)" style="padding-left:3%;">
                <span class="md" style="color: #edbb00">NEW</span>
              </div>
              <span class="lg2 pl-2 pr-2" style="margin-left: 3%; text-align: left; font-family: KB_C2">{{ score.mile_excel_file }}</span>
              <span class="md">{{ formatting(score.mile_excel_date) }}</span>
            </div>
            <button @click.stop="downloadExcel(score.mile_excel_file)">
              <span class="md" style="text-align: right;">파일 다운로드 〉</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="lg2" style="text-align: center; color:#aeaeb2; font-family: KB_C2;">해당 날짜에 존재하는 마일리지 엑셀 파일이 없습니다.</p>
      </div>
    </div>

    <!-- 로드 버튼 -->
    <div style="margin-bottom: 3%;" v-if="showLoadButton">
      <button @click="loadScores" class="lg2" style="font-family: 'KB_C1';">
        <i class="bi bi-arrow-clockwise lg2"></i>&nbsp;더보기
      </button>
    </div>

    <!--버튼-->
    <div class="button-container mt-auto">
      <div class="d-flex justify-content-evenly mx-auto">
        <div class="my-5">
          <button @click="openModal" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">등록하기</button>
        </div>
        <div class="my-5">
          <button @click="deleteDocu" class="btn-gray" 
            :class="{choice:deleteArray.length>0}" 
            :style="deleteArray.length>0?{'pointer-events':'auto'} : {'pointer-events':'none'}"
            style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">
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
            마일리지 점수 업로드
          </p>
          <div class="p-4" style="margin-top: 5vh;">
            <div class="d-flex input-gray mt-3 p-4">
              <input type="file" @change="onFileChange" class="lg2" style="width: 90%; text-align: right;"/>
            </div>
          </div>
          <div class="d-flex justify-content-center" style="margin-top: 8vh;">
            <button
              class="btn-gray mt-2 KB_C2"
              @click="uploadFile"
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
import api from '@/api/axios';
import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'DocumentsMileageAdminView',
  components: {
    Datepicker
  },
  data(){
    return{
      isModalOpen: false,
      file: null,
      selectedDate: null,
      deleteArray: [],
      baseHeight: 1100,
      increment: 90,
      buttonHeight: 40,
      currentPage: 1, // 현재 페이지
      itemsPerPage: 7, // 한 페이지에 보여줄 항목 수
      allScores: [], // 모든 엑셀파일 데이터 
      countList: 0 // 총 리스트 수
    }
  },
  computed:{
    ...mapGetters('mile', ['getMileInfo']),
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters('mileExcel', ['getArrayMileExcel']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    arrayMileExcel(){
      return this.getArrayMileExcel;
    },
    computedHeight(){
      let height = this.baseHeight + this.paginatedScores.length * this.increment;
      if(this.paginatedScores.length % this.itemsPerPage === 0 && this.paginatedScores.length >0){
        height += this.buttonHeight/2;
      }else{
        height += this.buttonHeight/2;
      }
      return `${height}px`;
    },
    filteredScores(){
      if(this.selectedDate){
        const selectedDateStr = this.formattingYear(this.selectedDate);
        return this.allScores.filter(score => 
          this.formattingYear(score.mile_excel_date) === selectedDateStr
        );
      }
        return this.allScores;
    },
    paginatedScores(){
      return this.filteredScores.slice(0, this.currentPage * this.itemsPerPage);
    },
    showLoadButton(){
      const condition1 = this.filteredScores.length % this.itemsPerPage === 0;
      const condition2 = this.filteredScores.length > 0;
      const condition3 = this.filteredScores.length !== this.countList;
      
      return condition1 && condition2 && condition3;
    },
    isChecked() {
      return this.getIsChecked;
    }
  },
  methods:{
    ...mapActions('mile', ['fetchMileInfo', 'getMileDetail']),
    ...mapActions('mileExcel', ['fetchMileExcelInfo', 'downloadExcelSample', 'downloadFile', 'mileExcelLists', 'deleteMileExcel']),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    formatting(dateString){
      return moment(dateString).format('YYYY-MM-DD HH:mm');
    },
    formattingYear(dateString){
      return moment(dateString).format('YYYY-MM-DD');
    },
    isNew(dateString){
      const date = moment(dateString);
      const today = moment();
      const oneWeekAgo = moment().subtract(7, 'days');

      return date.isBetween(oneWeekAgo, today, null, '[]');
    },
    async deleteDocu(){
      if(this.deleteArray!=null){
        const response = await this.deleteMileExcel(this.deleteArray);
        if(response && response.data.success){
            console.log('마일리지 엑셀 파일 삭제 완료');
            this.showAlert('마일리지 파일이 삭제되었습니다', 'success', '#');
            this.deleteArray = [];
        }else{
          console.log('마일리지 엑셀 파일 삭제 실패');
          this.showAlert('마일리지 파일 삭제가 실패했습니다', 'error', '#');
        }
      }
    },
    addDeleteArray(score){
      if(!this.deleteArray.includes(score)){
        this.deleteArray.push(score);
      }else{
        this.deleteArray = this.deleteArray.filter(item => item !== score);
      }
      console.log("이건 삭제할 대상 배열", this.deleteArray);
    },
    downloadExcel(mile_excel_file){
      this.downloadFile({ mile_excel_file });
    },
    downloadSample(){
      this.downloadExcelSample();
    },
    onFileChange(event){
      this.file = event.target.files[0];
    },
    async uploadFile(){
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('mile_no', this.loginInfo ? this.loginInfo.mile_no : null);
      try{
        const response = await api.post(`/mileage/uploadExcel`, formData, {
          headers: {
            'Content-Type':'multipart/form-data',
          },
        });
        if(response.data.success){
          this.showAlert('마일리지 업로드 성공', 'success', '#');
        }else{
          this.showAlert('마일리지 업로드 실패', 'error', '#');
        }
      }catch(error){
        console.error('Error uploading file', error);
        this.showAlert('마일리지 업로드 실패', 'error', '#');
      }
    },
    async fetchScoresByDate(){
      const response = await this.fetchMileExcelInfo({
        selectedDate: this.formattingYear(this.selectedDate),
        mile_no: this.loginInfo.mile_no,
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage
      });
      this.allScores.push(...response.data);
      this.currentPage++;
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
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async loadScores(){
      if(this.selectedDate){
        await this.fetchScoresByDate();
      }else{
        const response = await this.mileExcelLists({
          mile_no: this.loginInfo.mile_no,
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage
        });
        this.allScores.push(...response.data);
        this.currentPage++;

        const mile_no = this.loginInfo.mile_no;
        const countList = await api.get(`/mileage/countList/${mile_no}`);
        this.countList = countList.data;
      } 
    },
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo.user_is_manager == 1 && this.getIsChecked == false)) {
          window.location.href="/noAccess"
        } 
    },
  },
  created(){
    // 마일리지 담당자 로그인 여부 확인
    this.checkLoginInfo();
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      this.mileInfo = this.fetchMileInfo(user_no);
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }

    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    if(mile_no){
      this.getMileDetail(mile_no);
      this.loadScores(); // 첫 페이지 로드 
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }

  }
};
</script>

<style scope>

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
