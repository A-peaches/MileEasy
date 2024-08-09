<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <h2>비밀번호 변경</h2>
    <form @submit.prevent="changePassword" class="reset-form">
      <div class="password-reset">
        <div class="form-group mb-3">
          <label for="password" class="input-label">비밀번호 변경</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div class="form-group">
          <label for="confirm_password" class="input-label"
            >비밀번호 재입력</label
          >
          <input
            type="password"
            id="confirm_password"
            v-model="confirm_password"
            placeholder="비밀번호를 재입력하세요"
          />
        </div>
      </div>
      <div class="my-2">
        <i class="bi bi-info-circle"></i> 유의사항 : 길이 : 8자리 이상 / 구성 :
        영문자, 숫자, 특수문자를 최소 1자리 이상 혼합 구성 / 사용금지 : 연속,
        반복문자(4자리), 대표단어(kbstar, kbfng, kbfg, kbcard)
      </div>
      <div class="button-container d-flex mx-auto justify-content-center my-5">
        <button type="submit" class="btn-green my-4" style="margin-right: 30px">
          변경
        </button>
      </div>
    </form>
  </div>
</template>
   
   <script>
import { mapGetters } from "vuex";
import api from '@/api/axios';

export default {
  name: "PasswordReissueView",
  data() {
    return {
      password: "",
      confirm_password: "",
      msg: "",
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    async changePassword() {
      const inputInfo = {
        password: this.password,
        user_no: this.loginInfo.user_no,
      };

      console.log(inputInfo);

      // 입력 여부 확인
      if (!this.password || !this.confirm_password) {
        this.msg = "비밀번호를 모두 입력해주세요.";
        this.warningAlert();
        return;
      }

      // 일치 여부 확인
      if (this.password !== this.confirm_password) {
        this.msg = "비밀번호가 일치하지 않습니다.";
        this.errorAlert();
        return;
      }

      // 조건: 길이 8자리 이상
      if (this.password.length < 8) {
        this.msg = "비밀번호 유의사항을 확인해주세요.";
        this.warningAlert();
        return;
      }

      // 조건: 영문자, 숫자, 특수문자 최소 1자리 이상 혼합
      const hasLetter = /[a-zA-Z]/.test(this.password);
      const hasDigit = /\d/.test(this.password);
      const hasSpecialChar = /[~`!@#$%^&*(),.?":{}|<>]/.test(this.password);

      if (!hasLetter || !hasDigit || !hasSpecialChar) {
        this.msg = "비밀번호 유의사항을 확인해주세요.";
        this.warningAlert();
        console.log("password pattern Error!");
        return;
      }

      // 조건: 사용금지 - 연속 문자 4자리
      if (/(\w)\1\1\1/.test(this.password)) {
        this.msg = "비밀번호 유의사항을 확인해주세요.";
        this.warningAlert();
        console.log("password continuous Error!");
        return false;
      }

      // 대표단어 확인
      const forbiddenWords = ["kbstar", "kbfng", "kbfg", "kbcard"];
      if (
        forbiddenWords.some((word) =>
          this.password.toLowerCase().includes(word)
        )
      ) {
        this.msg = "비밀번호 유의사항을 확인해주세요.";
        this.warningAlert();
        console.log("password words contain Error!");
        return;
      }

      // 비밀번호 변경 로직 실행
      // ...

      try {
        const response = await api.post(
          "/user/changePassword",
          inputInfo
        );

        console.log("비밀번호 변경완료", response.data);

        if (response.data.success) {
          this.msg = response.data.message;
          this.successAlert();
        } else {
          this.msg = response.data.message;
          this.errorAlert();
        }
      } catch (error) {
        console.error("Error:", error);
        this.msg = "서버 오류가 발생했습니다.";
        this.errorAlert();
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    warningAlert() {
      this.$swal({
        title: "경고",
        text: this.msg,
        icon: "warning",
        scrollbarPadding: false,
      });
    },
    errorAlert() {
      this.$swal({
        title: "에러",
        text: this.msg,
        icon: "error",
        scrollbarPadding: false,
      });
    },
    successAlert() {
      this.$swal({
        title: "성공",
        text: this.msg,
        icon: "success",
        scrollbarPadding: false,
      });
    },
  },
};
</script>
   
   <style scoped>
.password-reset {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5b5b5b; /* 검은색 텍스트 */
  font-size: 15px;
  cursor: pointer;
  /* margin-left: auto; 요소를 오른쪽으로 이동 */
  margin-top: 60px;
  font-family: "KB_S5", sans-serif;
}

.back-button .arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc; /* 둥근 직사각형 */
  border-radius: 5px; /* 둥근 모서리 */
  margin-right: 8px;
  font-size: 15px;
  font-family: "KB_S5", sans-serif;
}

h2 {
  margin-bottom: 50px;
  text-align: center;
  font-family: "KB_S3", sans-serif;
}

.form-group {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f5f5; /* 입력란 배경색 */
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 1px;
}

.input-label {
  width: 12%;
  text-align: left;
  font-weight: bold;
  color: #5b5b5b;
  margin-right: 1px; /* 오른쪽 여백을 줄여 텍스트를 가깝게 */
  margin-left: 30px; /* 오른쪽으로 약간 이동 */
  font-size: 18px;
  font-family: "KB_S3", sans-serif;
}

input {
  flex-grow: 1;
  padding: 10px 5px 10px 15px; /* 왼쪽 패딩을 줄여 텍스트를 가깝게 */
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  outline: none; /* 포커스 시 외곽선 제거 */
  justify-content: flex-start;
  font-size: 18px;
  text-align: left;
  font-family: "KB_S5", sans-serif;
  margin-bottom: 5px;
}
/* 초록색 버튼 */
.btn-green {
  width: 10%;
  padding: 16px;
  background-color: #19c99b;
  color: #ffffff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: background-color 0.3s;
  font-family: "KB_S5", sans-serif;
  /* 중앙 정렬을 위해 margin 제거 */
}

.btn-green:hover {
  width: 10%;
  padding: 16px;
  background-color: #32ab8b;
  color: #ffffff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: background-color 0.3s;
  font-family: "KB_S5", sans-serif;
  /* 중앙 정렬을 위해 margin 제거 */
}

.submit-button:hover {
  background-color: #19c99b;
}

</style>
   