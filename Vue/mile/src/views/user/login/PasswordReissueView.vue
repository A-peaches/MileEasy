<template >
  <div  style="margin-top : 112px">
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
  <div class="back-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
          </button>
        </div>
   
      <h2 class="mt-3">비밀번호 재발급</h2>
      <form @submit.prevent="sendEmailHandler" class="reset-form">
        <div class="password-reset">
        <div class="form-group mb-3">
          <label for="user_no" class="input-label">직원번호</label>
          <input
            type="text"
            id="user_no"
            v-model="user_no"
            placeholder="직원번호를 입력하세요"
            required
          />
        </div>
        <div class="form-group">
          <label for="user_email" class="input-label">이메일</label>
          <input
            type="email"
            id="user_email"
            v-model="user_email"
            placeholder="이메일을 입력하세요"
            required
          />
              </div>
        </div>
    <div class="button-container d-flex mx-auto justify-content-center my-5">
          <button type="submit" class="btn-green" >인증번호 발송</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PasswordReissueView',
  data() {
    return {
      user_no: '',
      user_email: ''
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'LoginView' }); // 로그인 페이지로 이동
    },
    ...mapActions('login', ['sendEmail']), 
    async sendEmailHandler() {
      const inputInfo = {
        user_no: this.user_no,
        user_email: this.user_email
      };


      const response = await this.sendEmail(inputInfo);
      if(response && response.success){
        this.showAlert('이메일로 임시 비밀번호가 발급되었습니다.', 'success');
      }else{
        this.showAlert('비밀번호 재발급 중 오류가 발생했습니다', 'error');
      }
    },
    showAlert(message, icon) {
      this.$swal({
        title: "발송완료!",
        text: message,
        icon: icon,
        scrollbarPadding: false
      });
    },
  }
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
  font-family: 'KB_S3', sans-serif;
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
  width: 100px;
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
    font-size: 16px;
    padding: 12px;
  }
}
</style>
