<!--🚨마일리지 관리자 :  마일리지 소개화면-->
<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">{{ mileInfo ? mileInfo.mile_no : '' }} 마일리지</h2>
    <div v-for="detail in arrayMiles" :key="detail.mile_introduce_no" style="padding:0 5%;">
      <div class="border-bottom p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">{{ detail.mile_title }}</h3>
          <div>
            <a href="/introduceMileageModifyAdminView" style="text-decoration: none;" class="brown">수정</a>
            <span class="mx-2">|</span>   
            <button class="brown">삭제</button>
          </div>
        </div>
        <div class="input-gray p-4">
          <p><pre class="lg2" style="text-align: left; font-family: KB_C3; font-size: 15pt">{{ detail.mile_content }}</pre></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IntroduceMileageAdminView',
  computed :{
    ...mapGetters('mile', ['getMileInfo', 'getArrayMiles']),
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    arrayMiles(){
      return this.getArrayMiles;
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo']),
    ...mapActions('mile', ['getMileDetail'])
  },
  created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      this.fetchMileInfo(user_no);
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
.page-back {
  width: 70%;
  /* height: 100%; */
  height: 800px;
  margin-top: 5%;
}
</style>
