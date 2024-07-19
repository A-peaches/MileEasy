<template>
 <div>
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
      <h2>비밀번호 재발급</h2>
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
              <button type="submit" class="btn-green" style="margin-right:100px;">인증번호 발송</button>
            </div>
      </form>
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

.button-container {
  display: flex;
  align-items: center;
  padding-left: 100px; /* 왼쪽 여백을 추가하여 위치 조정 */
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5B5B5B; /* 검은색 텍스트 */
  font-size: 15px;
  cursor: pointer;
  /* margin-left: auto; 요소를 오른쪽으로 이동 */
  margin-top: 60px;
  font-family: 'KB_S5', sans-serif;
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
  font-family: 'KB_S5', sans-serif;
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
  background-color: #F5F5F5; /* 입력란 배경색 */
  border: 1px solid #F5F5F5;
  border-radius: 8px;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 1px;
}

.input-label {
  width: 100px;
  text-align: left;
  font-weight: bold;
  color: #5B5B5B;
  margin-right: 1px; /* 오른쪽 여백을 줄여 텍스트를 가깝게 */
  margin-left: 30px; /* 오른쪽으로 약간 이동 */
  font-size : 18px;
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
.btn-green {
  width: 13%;
  padding: 20px;
  background-color: #19C99B;
  color: #FFFFFF;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: background-color 0.3s;
  font-family: 'KB_S5', sans-serif;
  /* 중앙 정렬을 위해 margin 제거 */
}

.btn-green:hover {
  width: 13%;
  padding: 20px;
  background-color: #32AB8B;
  color: #FFFFFF;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: background-color 0.3s;
  font-family: 'KB_S5', sans-serif;
  /* 중앙 정렬을 위해 margin 제거 */
}

.submit-button:hover {
  background-color: #19C99B;
}
</style>
