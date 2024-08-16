<!--🚨마일리지 관리자 :  마일리지 소개화면-->
<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">{{ mileInfo ? mileInfo.mile_no : '' }} 마일리지</h2>
    <div v-for="detail in arrayMiles" :key="detail.mile_introduce_no" style="padding:0 5%;">
      <div class="border-bottom p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">{{ detail.mile_title }} 마일리지</h3>
          <div>
            <a :href="'/introduceMileageModifyAdminView?mile_introduce_no=' + detail.mile_introduce_no" style="text-decoration: none;" class="brown">수정</a>
            <span class="mx-2">|</span>   
            <button @click="deleteMileDetail(detail.mile_introduce_no)" class="brown">삭제</button>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center input-gray p-4">
          <span><pre class="lg2" style="text-align: left; font-family: KB_C3; font-size: 15pt">{{ detail.mile_content }}</pre></span>
          <button @click="download(detail.mile_route)"><p class="md" v-if="detail.mile_route" style="text-align: right;">상세보기 〉</p></button>
        </div>
      </div>
    </div>
    <div class="my-5">
      <button @click="goModify" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">추가하기</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IntroduceMileageAdminView',
  computed :{
    ...mapGetters('mile', ['getMileInfo', 'getArrayMiles']),
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    arrayMiles(){
      return this.getArrayMiles;
    },
    isChecked() {
      return this.getIsChecked;
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo','getMileDetail', 'downloadFile', 'deleteMile']),
    
    goModify(){
      this.$router.push('/introduceMileageAddAdminView');
    },
    download(mile_route){
      this.downloadFile({ mile_route });
    },
    async deleteMileDetail(mile_introduce_no){
      const response = await this.deleteMile({ mile_introduce_no });
      if(response && response.data.success){
        this.showAlert('삭제 완료', 'success', '#');
      }else{
        this.showAlert('삭제 오류', 'error', '#');
      }
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
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo.user_is_manager == 1 && this.getIsChecked == false)) {
          window.location.href="/noAccess"
        } 
    },
  },
  async created(){
    // 마일리지 담당자 로그인 여부 확인
    this.checkLoginInfo();

    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      await this.fetchMileInfo(user_no);
      const mileInfo = this.getMileInfo;
      if(mileInfo){
        this.mile_name = mileInfo.mile_no;
      }else{
        console.error('마일리지 이름을 가져올 수 없습니다.');
      }
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }
    const mile_number = this.loginInfo ? this.loginInfo.mile_no : null;
    if(mile_number){
      this.arrayMiles = await this.getMileDetail(mile_number);
      if(this.arrayMiles.length==0){
        this.showAlert('등록된 마일리지 소개 글이 없습니다', 'warning', '/introduceMileageAddAdminView')
      }
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }

    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    if(mile_no){
      this.getMileDetail(mile_no);
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }
  },
 
};
</script>

<style scope>

</style>
