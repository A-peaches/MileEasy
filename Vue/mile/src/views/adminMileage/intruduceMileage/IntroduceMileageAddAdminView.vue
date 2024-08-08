<!--🚨마일리지 관리자 :  마일리지 추가화면-->
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
        <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">마일리지 항목<span style="font-size: 12pt;">&nbsp;(항목별 세부 분야를 같이 선택해주세요. '공통' 분야가 기본으로 선택됩니다.)</span></h3>
        
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
          <input type="text" class="lg2" v-model="mile_title" placeholder="추가할 마일리지 항목을 입력하세요" style="width: 100%; text-align: left;"/>
        </div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">상세 내용</h3>
      <div class="p-4">
        <div class="input-gray p-4">
          <textarea v-model="mile_content" class="lg2" placeholder="상세 내용을 입력하세요" style="text-align: left; width: 100%; height: 30vh"></textarea>
        </div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">첨부 파일</h3>
      <div class="p-4">
        <div class="d-flex input-gray p-4">
          <input type="file" @change="handlerFileUpload" class="md" style="width: 90%; text-align: right;"/>
        </div>
      </div>
    </div>
    <div class="my-5">
      <button @click="addAction" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">등록</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IntroduceMileageAddAdminView',
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mile', ['getMileInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
  },
  data(){
    return{
      mile_title: '',
      mile_content: '',
      mile_no: '',
      mile_route: '',
      file: null,
      selectedJob: '공통' // 기본값 설정 
    }
  },
  methods: {
    ...mapActions('mile', ['getMileDetail', 'addMile']),
    goBack() {
      this.$router.go(-1);
    },

    handlerFileUpload(event){
      this.file = event.target.files[0]; // 선택된 파일 객체를 data의 file에 선언.
    },
    
    async addAction(){
      const mileInfo = new FormData(); // FormData형식을 쓰지 않으면 JSON 형식으로 파일의 이름만 전달된다. 실제 파일 데이터 전송하기 위해 FormData 사용
      mileInfo.append('mile_no', this.loginInfo ? this.loginInfo.mile_no : null);
      mileInfo.append('mile_title', this.mile_title);
      mileInfo.append('mile_content', this.mile_content);
      mileInfo.append('file', this.file || ''); // 파일이 없을 때도 file 필드를 추가한다.
      mileInfo.append('job_name', this.selectedJob); 
      
      const response = await this.addMile(mileInfo);

      if(response && response.data.success){
        this.showAlert('마일리지가 등록되었습니다', 'success', '/IntroduceMileageAdminView');
      }else{
        this.showAlert('마일리지 등록에 실패했습니다', 'fail', '#');
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
  },
  created(){
    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    if(mile_no){
      this.getMileDetail(mile_no);
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }
  }
};
</script>

<style scoped>

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
