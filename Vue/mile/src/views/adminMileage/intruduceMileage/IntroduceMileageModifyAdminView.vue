<!--🚨마일리지 관리자 :  마일리지 수정화면-->
<template>
  <div class="cards page-back mx-auto">
    <div class="d-flex p-4">
      <button type="button" @click="goBack">
        <p class="lg2">
          <i class="bi bi-chevron-left lg2 border border-secondary p-2 rounded-2"></i>&nbsp;&nbsp;이전
        </p>
      </button>
    </div>
    <div class="p-4 mt-5">
      <div class="d-flex justify-content-between">
        <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">마일리지 항목</h3>
        <div class="d-flex justify-content-end align-items-center">
          <input type="radio" class="btn-check" name="job_name" id="공통" value="공통" v-model="selectedJob" autocomplete="off" checked>
          <label class="btn custom-radio-btn" for="공통" style="width:5vw; font-size: 15pt; font-family: 'KB_C3';">공통</label>
          <input type="radio" class="btn-check" name="job_name" id="개인" value="개인" v-model="selectedJob" autocomplete="off">
          <label class="btn custom-radio-btn" for="개인" style="width:5vw; font-size: 15pt; font-family: 'KB_C3';">개인</label>
          <input type="radio" class="btn-check" name="job_name" id="기업" value="기업" v-model="selectedJob" autocomplete="off">
          <label class="btn custom-radio-btn" for="기업" style="width:5vw; font-size: 15pt; font-family: 'KB_C3';">기업</label>
        </div>
      </div>
      <div class="p-4">
        <div class="input-gray p-4">
          <input type="text" class="lg2" v-model="mile_title" style="width: 100%; text-align: left;"/>
        </div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">상세 내용</h3>
      <div class="p-4">
        <div class="input-gray p-4">
          <textarea v-model="mile_content" class="lg2" style="text-align: left; width: 100%; height: 30vh"></textarea>
        </div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">첨부 파일</h3>
      <div class="p-4">
        <div class="d-flex input-gray p-4">
          <input type="file" @change="handlerFileUpload" class="md" style="width: 80%; text-align: right;"/>
          <span v-if="before_mile_route" class="md" style="text-align:left;">
            <button @click="deleteFile(this.mile_introduce_no)"><i class="bi bi-x-square"></i></button>
            기존 파일: {{ before_mile_route}}
          </span>
        </div>       
      </div>
    </div>
    <div class="my-5">
      <button @click="updateAction" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">수정</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IntroduceMileageModifyAdminView',
  data(){
    return {
      mile_title: '',
      mile_content: '',
      file: null,
      before_mile_route: '',
      mile_introduce_no: null,
      mile_no: '',
      selectedJob: ''
    }
  },
  computed:{
    ...mapGetters('mile', ['getMileDetail']),
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    mileDetail(){
      return this.getMileDetail;
    },
    loginInfo(){
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    }
  },
  methods: {
    ...mapActions('mile', ['getMileModify', 'updateMile']),
    deleteFile(mile_introduce_no) {
      console.log(mile_introduce_no);
      this.before_mile_route = '없음';
    },
    goBack() {
      this.$router.go(-1);
    },
    handlerFileUpload(event){
      this.file = event.target.files[0];
      this.mile_route = this.file ? this.file.name : ''; //선택된 파일의 이름을 저장 
    },
    async updateAction(){
      const mileInfo = new FormData();
      mileInfo.append('mile_introduce_no', this.mile_introduce_no);
      mileInfo.append('mile_title', this.mile_title);
      mileInfo.append('job_name', this.selectedJob);
      mileInfo.append('mile_content', this.mile_content);

      if(this.file){
        mileInfo.append('file', this.file);
      } else {
          if(this.before_mile_route === '없음'){
            this.before_mile_route = '';
          }else{
            const response = await fetch(this.before_mile_route);
            const blob = await response.blob();
            const fileName = this.before_mile_route.split('/').pop();
            const file = new File([blob], fileName, {type: blob.type});
            mileInfo.append('file', file);
          }
      }
      try{
        const response = await this.updateMile(mileInfo);
        if(response && response.data.success){
          this.showAlert('마일리지가 수정되었습니다', 'success', '/IntroduceMileageAdminView');
        }else{
          this.showAlert('마일리지 수정에 실패했습니다', 'error', '#');
        }
      }catch(error){
        console.error('mileage introduce modify fail');
      }
    },
    showAlert(t, i, r) {
      this.$swal({
        title: t,
        icon: i,
        scrollbarPadding: false
      }).then((result) => {
        if(result.isConfirmed && r !== '#'){
          this.$router.push(r);
        }
      })
    },
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo.user_is_manager == 1 && this.getIsChecked == false)) {
          window.location.href="/noAccess"
        } 
    },
  },
  async created(){
    // 마일리지 담당자 로그인 여부 확인
    this.checkLoginInfo();
    this.mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    this.mile_introduce_no = this.$route.query.mile_introduce_no;
    if(this.mile_introduce_no && this.mile_no){
      await this.getMileModify({
        mile_introduce_no: this.mile_introduce_no,
        mile_no: this.mile_no
      });
      const mileDetail = this.getMileDetail;
      if(mileDetail){
        this.mile_title = mileDetail.mile_title;
        this.selectedJob = mileDetail.job_name;
        this.mile_content = mileDetail.mile_content;
        this.before_mile_route = mileDetail.mile_route; // 기존 파일명을 가져와서 표시
      }else{
        console.error('해당 마일리지 정보를 가져올 수 없습니다.');
      }
    }else{
      console.error('mile_introduce_no이 유효하지 않습니다.');
    }
  }
};
</script>

<style scope>

/* 기본 버튼 스타일 */
.custom-radio-btn {
  border: 1px solid transparent;
  transition: background-color 0.3s ease;
}

/* 선택된 버튼 스타일 */
.btn-check:checked + .custom-radio-btn {
  /* border-color: #19c99b; */
  background-color: #19c99b;
  color:#fff;
  font-weight: 600;
}

.btn-check:hover + .custom-radio-btn:hover {
  background-color: #19c99b;
  color:#fff;
  font-weight: 600;
}
</style>
