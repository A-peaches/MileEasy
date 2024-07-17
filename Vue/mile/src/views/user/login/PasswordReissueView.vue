<template>
 <div>
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <div class="password-reset">
      <h2>비밀번호 재발급</h2>
      <form @submit.prevent="verifyIdentity" class="reset-form">
        <div class="form-group">
          <label for="employee-number" class="input-label">직원번호</label>
          <input
            type="text"
            id="employee-number"
            v-model="employeeNumber"
            placeholder="직원번호를 입력하세요"
            required
          />
        </div>
        <div class="form-group">
          <label for="email" class="input-label">이메일</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        </form>
        </div>
        <div class="button-container">
          <button type="submit" class="btn-green">본인확인</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PasswordReissueView',
  data() {
    return {
      employeeNumber: '',
      email: ''
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'LoginView' }); // 로그인 페이지로 이동
    },
    verifyIdentity() {
      console.log('직원번호:', this.employeeNumber);
      console.log('이메일:', this.email);
      // 실제 본인 확인 로직을 여기에 추가하세요.
    }
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
  font-size: 20px;
  cursor: pointer;
  /* margin-left: auto; 요소를 오른쪽으로 이동 */
  margin-top: 60px;
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
  font-size: 16px;
}

h2 {
  margin-bottom: 50px;
  text-align: center;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center; /* 부모 요소의 텍스트 정렬 설정 */

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
    margin: 30px 0 0 650px; /* 왼쪽으로 살짝 이동 */
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
    margin: 30px 0 0 650px; /* 왼쪽으로 살짝 이동 */
}

.submit-button:hover {
  background-color: #19C99B;
}
</style>
