<template >
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
      <div>
        <input
          type="text"
          class="input-base input-white"
          v-model="user_no"
          placeholder="직원번호를 입력하세요"
          style="height: 70px; width: 400px; opacity: 75%"
        />
      </div>
      <div>
        <input
          type="password"
          class="input-base input-white"
          v-model="user_pw"
          placeholder="비밀번호를 입력하세요"
          style="height: 70px; width: 400px; opacity: 75%"
        />
      </div>
      <div>
        <button
          class="btn-green lg2"
          style="height: 70px; width: 400px; color: white"
          @click="goLogin"
        >
          로그인
        </button>
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
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      user_no: "",
      user_pw: "",
      isChecked: false, // 관리자 로그인 여부
    };
  },
  methods: {
    ...mapActions("login", ["login"]), // store 하위 login.js에서 login 메서드를 호출한다.
    async goLogin() {
      // '로그인'버튼 클릭했을 때 실행되는 메서드
      const loginInfo = {
        user_no: this.user_no,
        user_pw: this.user_pw,
        user_is_admin: this.isChecked,
        user_is_manager: this.isChecked,
      };

      const response = await this.login(loginInfo);
      if (response) {
        if (response.user_is_admin && this.isChecked) {
          this.$router.push("/admin");
        } else if (response.user_is_manager && this.isChecked) {
          this.$router.push("/manager");
        } else {
          this.$router.push("/main");
        }
      } else {
        console.error("Login 실패");
        this.showAlert();
      }
    },
    showAlert() {
      this.$swal({
        title: "유효하지 않은 로그인정보 입니다",
        icon: "error",
      });
    },
  },
};
</script>

<style>
@import url("../../../assets/css/css.css");

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
</style>
  