<template >
   <div class="background-video-wrapper">
    <video autoplay muted loop class="background-video">
      <source src="../../../assets/background_login.mp4" type="video/mp4">
    </video>
    <div class="overlay"></div>
    </div>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="d-flex flex-column align-items-center">
        <div class="input-base input-search d-flex justify-content-center mx-auto" style="height: 70px; width: 370px; background: #EBEBEB; padding: 0 20px">
          <button class="tab-container md fw-bold d-flex flex-column align-items-center">
            <div>KB국민인증서</div>
            <div>로그인</div>
          </button>
          <button class="tab-container tab md fw-bold" >비밀번호 로그인</button>
          </div >
        <div>
          <input type="text" class="input-base input-white" v-model="user_no" placeholder="직원번호를 입력하세요" style="height: 70px; width: 400px; opacity: 75%;">
        </div>
        <div>
          <input type="password" class="input-base input-white" v-model="user_pw" placeholder="비밀번호를 입력하세요" style="height: 70px; width: 400px; opacity: 75%;">
        </div>
        <div>
          <button class="btn-green lg2" style="height: 70px; width: 400px; color: white;" @click="goLogin">로그인</button>
        </div>
        <div class="d-flex justify-content-center my-3">
          <div class="mr-8">
            <p style="color: #FFFFFF;">
              <input type="checkbox" class="form-check-input" />
              &nbsp;관리자 로그인
            </p>
          </div>
          <div class="ml-8">
            <a style="color: #FFFFFF; cursor: pointer; text-decoration: none;" href="/password">비밀번호 재발급</a>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {
  name: "LoginView",
  components: {},
  data(){
    return{
      user_no: '',
      user_pw: '',
      
    }
  },
  methods: {
    ...mapActions('login', ['login']), // store 하위 login.js에서 login 메서드를 호출한다.
    async goLogin(){ // '로그인'버튼 클릭했을 때 실행되는 메서드 
      const loginInfo = {
        user_no: this.user_no,
        user_pw: this.user_pw
      };
      const success = await this.login(loginInfo);
      if(success){
        this.$router.push('/main');
      }else{
        console.error('Login 실패');
      }

    }
  }
};
</script>

<style>
@import url('../../../assets/css/css.css');

.background-video-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Adjust the opacity to control the darkness */
  backdrop-filter: blur(4px); 
  z-index: 0;
}
</style>
  