<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">

    <h2  style="margin-top:70px">비밀번호 변경</h2>
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
      <div class="my-2 md">
        <i class="bi bi-info-circle"></i> 유의사항 : 길이 : 8자리 이상 / 구성 :
        영문자, 숫자, 특수문자를 최소 1자리 이상 혼합 구성 / 사용금지 : 연속,
        반복문자(4자리), 대표단어(kbstar, kbfng, kbfg, kbcard)
      </div>
      <div class="button-container d-flex mx-auto justify-content-center my-5">
        <button type="submit" class="btn-green my-4" >
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
        return;
      }

      // 조건: 사용금지 - 연속 문자 4자리
      if (/(\w)\1\1\1/.test(this.password)) {
        this.msg = "비밀번호 유의사항을 확인해주세요.";
        this.warningAlert();
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
        return;
      }

      // 비밀번호 변경 로직 실행
      // ...

      try {
        const response = await api.post(
          "/user/changePassword",
          inputInfo
        );

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

      this.password = '';
      this.confirm_password ='';
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

h2 {
  margin-bottom: 50px;
  text-align: center;
  font-family: "KB_S3", sans-serif;
}
.form-group {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  border: 1px solid #F5F5F5;
  border-radius: 8px;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 15px;
}

.input-label {
  width: 150px;
  text-align: left;
  font-weight: bold;
  color: #5B5B5B;
  margin-right: 10px;
  margin-left: 30px;
  font-size: 18px;
  font-family: 'KB_S3', sans-serif;
}

input {
  flex-grow: 1;
  padding: 10px 5px 10px 15px; /* 왼쪽 패딩을 줄여 텍스트를 가깝게 */
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  outline: none; /* 포커스 시 외곽선 제거 */
  justify-content: flex-start;
  font-size : 18px;
  text-align: left;
  font-family: 'KB_S5', sans-serif;
  margin-bottom: 5px;
}
/* 초록색 버튼 */
input {
  flex-grow: 1;
  padding: 10px 5px 10px 15px;
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  outline: none;
  justify-content: flex-start;
  font-size: 18px;
  text-align: left;
  font-family: 'KB_S5', sans-serif;
  margin-bottom: 5px;
}

.btn-green {
  width: 200px;
  padding: 16px;
  background-color: #19C99B;
  color: #FFFFFF;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: background-color 0.3s;
  font-family: 'KB_S5', sans-serif;
}

.btn-green:hover {
  background-color: #32AB8B;
}

.submit-button:hover {
  background-color: #19C99B;
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
  .password-reset {
    max-width: 90%;
  }

  h2 {
    font-size: 24px;
  }

  .input-label {
    font-size: 16px;
  }

  input {
    font-size: 16px;
  }

  .btn-green {
    width: 180px;
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .form-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-label {
    width: 100%;
    margin-left: 0;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
  }

  .btn-green {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 20px;
  }

  .input-label {
    font-size: 14px;
  }

  input {
    font-size: 14px;
  }

  .btn-green {
    width: 150px;
    font-size: 16px;
    padding: 12px;
  }
}
</style>
   