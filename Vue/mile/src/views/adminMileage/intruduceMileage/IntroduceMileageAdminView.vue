<!--🚨마일리지 관리자 :  마일리지 소개화면-->
<template>
  <div class="cards page-back mx-auto">
    <h2 class="lg KB_S5 my-3">{{ mileInfo ? mileInfo.user_is_manager : '' }} 마일리지</h2>
  </div>
  <div class="about">
    <h1>마일리지 관리자 : 마일리지 소개</h1>
    <a href="/introduceMileageAddAdminView"><h3>추가하기 버튼</h3></a>
    <hr />
    <h3>마일리지 소개</h3>
    <a href="/introduceMileageModifyAdminView"><h3>수정</h3></a>
    <h3>삭제</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IntroduceMileageAdminView',
  computed :{
    ...mapGetters('mileage', ['getMileInfo']),
    ...mapGetters('login', ['getLoginInfo']),
    LoginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    }
  },
  methods: {
    ...mapActions('mileage', ['fetchMileInfo']),
  },
  created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    console.log("마일리지 소개 화면에서 받았다.", user_no);
    if(user_no){
      this.fetchMileInfo(user_no);
    }else{
      console.error('user_no이 유효하지 않습니다.');
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
