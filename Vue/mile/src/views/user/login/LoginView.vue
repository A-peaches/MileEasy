<template>
  <div class="background-video-wrapper">
    <video autoplay muted loop class="background-video">
      <source src="../../../assets/background_login.mp4" type="video/mp4" />
    </video>
    <div class="overlay"></div>
  </div>
 
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="d-flex flex-column align-items-center">

      <div class="KB_C1 mr-2 logofont">
        <img src="@/assets/img/logo.png" class='mr-5 mb-2 ' style="
        width:10%">MileEasy</div>
      <div>
        <input
          type="text"
          class="input-base input-white input-id"
          v-model="user_no"
          placeholder="직원번호를 입력하세요"
          
        />
      </div>
      <div>
        <input
          type="password"
          class="input-base input-white input-id"
          v-model="user_pw"
          placeholder="비밀번호를 입력하세요"
          @keyup.enter="goLogin"
        />
      </div>
      <div>
        <button
          class="btn-green lg2 login-btn"
          @click="goLogin"
        >
          로그인
        </button>
        <input type="text" style="display: none" @keyup.enter="goLogin" ref="loginInput"/>
      </div>
      <div class="d-flex justify-content-center my-3">
        <div class="mr-8">
          <p style="color: #ffffff">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="isChecked"
            />
            &nbsp;관리자 로그인
          </p>
        </div>
        <div class="ml-8">
          <a
            style="color: #ffffff; cursor: pointer; text-decoration: none"
            href="/password"
            >비밀번호 재발급</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      user_no: '',
      user_pw: '',
      isChecked: false, // 관리자 로그인 여부
      isMobile: false,
    };
  },
  methods: {
    ...mapActions('login', ['login']), // store 하위 login.js에서 login 메서드를 호출한다.
    async goLogin() {
      // '로그인'버튼 클릭했을 때 실행되는 메서드
      const loginInfo = {
        user_no: this.user_no,
        user_pw: this.user_pw,
        is_checked: this.isChecked,
      };
      
      const response = await this.login(loginInfo);
      if (response) {
        if (response.user_is_admin && this.isChecked) {
          this.$router.push('/admin');
        } else if (response.user_is_manager && this.isChecked) {
          this.$router.push('/mana');
        } else {
          this.$router.push('/main');
        }
      } else {
        console.error('Login 실패');
        this.showAlert();
      }
    },
    showAlert() {
      this.$swal({
        title: '유효하지 않은 로그인정보 입니다',
        icon: 'error',
        scrollbarPadding: false
      });
    },
  },
  mounted() {
    if (this.$refs.loginInput) {
      this.$refs.loginInput.focus();
    }
  }
};
</script>

<style>
@import url('../../../assets/css/css.css');

/* 모바일 버전 스타일 */
@media (max-width: 768px) {
  .background-video-wrapper {
    height: 100vh;
  }

  .KB_C1.logofont {
    font-size: 36pt; /* 폰트 크기 조정 */
    margin-bottom: 16px;
    color:#ffffff;   
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .KB_C1.logofont img {
    width: 25%; /* 로고 이미지 크기 조정 */
  }

  .input-base.input-white {
    height: 70px; /* 입력 필드 높이 조정 */
    width: 290px; /* 입력 필드 너비 조정 */
    font-size: 14pt; /* 텍스트 크기 조정 */
  }

  .btn-green.lg2 {
    height: 60px; /* 버튼 높이 조정 */
    width: 285px; /* 버튼 너비 조정 */
    font-size: 14pt; /* 텍스트 크기 조정 */
  }

  .d-flex.justify-content-center.my-3 p {
    font-size: 12pt; /* 체크박스 텍스트 크기 조정 */
  }

  .ml-8 a {
    font-size: 12pt; /* 비밀번호 재발급 링크 텍스트 크기 조정 */
  }
}

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
  background: rgba(
    0,
    0,
    0,
    0.3
  ); /* Adjust the opacity to control the darkness */
  backdrop-filter: blur(4px);
  z-index: 0;
}

.logofont {
  font-size:48pt; 
  color:#ffffff;   
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom:24px;
}

.input-id {
  height: 70px; 
  width: 400px; 
  opacity: 75%;
}

.login-btn {
  height: 70px; 
  width: 400px; 
  color: white;
}
</style>


