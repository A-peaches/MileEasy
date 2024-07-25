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
      <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">마일리지 항목</h3>
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
          <span v-if="before_mile_route" class="md" style="text-align:left;">기존 파일: {{ before_mile_route}}</span>
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
      mile_introduce_no: null
    }
  },
  computed:{
    ...mapGetters('mile', ['getMileDetail']),
    
    mileDetail(){
      return this.getMileDetail;
    }
  },
  methods: {
    ...mapActions('mile', ['getMileModify', 'updateMile']),
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
      mileInfo.append('mile_content', this.mile_content);
      mileInfo.append('file', this.file ? this.file : this.before_mile_route); 
      const response = await this.updateMile(mileInfo);
      if(response && response.data.success){
        this.showAlert('마일리지가 수정되었습니다', 'success', '/IntroduceMileageAdminView');
      }else{
        this.showAlert('마일리지 수정에 실패했습니다', 'error', '#');
      }
    },
    showAlert(t, i, r) {
      this.$swal({
        title: t,
        icon: i,
      }).then((result) => {
        if(result.isConfirmed && r !== '#'){
          this.$router.push(r);
        }
      })
    },
  },
  async created(){
    this.mile_introduce_no = this.$route.query.mile_introduce_no;
    if(this.mile_introduce_no){
      await this.getMileModify(this.mile_introduce_no);
      const mileDetail = this.getMileDetail;
      if(mileDetail){
        this.mile_title = mileDetail.mile_title;
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
.page-back {
  width: 70%;
  height: 100%;
  /* height: 800px; */
  margin-top: 5%;
}
</style>
