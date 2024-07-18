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
      <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">마일리지 항목</h3>
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
      mile_no: ''
    }
  },
  methods: {
    ...mapActions('mile', ['getMileDetail']),
    goBack() {
      this.$router.go(-1);
    },
    ...mapActions('mile', ['addMile']),
    async addAction(){
      const mileInfo = {
        mile_title: this.mile_title,
        mile_content: this.mile_content,
        mile_no: this.mile_no 
      };
      const response = await this.addMile(mileInfo);
      if(response){
        this.showAlert();
      }
    },
    showAlert() {
      this.$swal({
        title: '마일리지가 등록되었습니다.',
        icon: 'success',
      }).then((result) => {
        if(result.isConfirmed){
          this.$router.push('/IntroduceMileageAdminView');
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
.page-back {
  width: 70%;
  height: 120vh;
  margin-top: 5%;
}
</style>

