<template>
    <div class="error-page">
      <div class="error-container">
        <div>
            <img src="@/assets/imoji/bb/비비얼굴놀람.png" alt="오류" class="img mb-4"/>
        </div>
        <h3 class="error-title">페이지를 찾을 수 없습니다.</h3>
        <p class="error-code fw-bold" style="    margin-bottom: 30px;">에러 코드: Page Not Pound</p>
        <button class="btn-home" @click="goBack">이전페이지로</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage',
  
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
  </script>
  
  <style scoped>
  .img {
    width: 80px;
  }

  .error-page {
    font-family: 'KB_C3', sans-serif;
    text-align: center;
    background: linear-gradient(to bottom, #5fc9ad 38%, #fbfbfb 38%);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .error-container {
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 90%;
    width: 500px;
  }
  
  .error-title {
    font-family: 'KB_C1', sans-serif;
    font-size: 26pt;
    font-weight: bold;
    color: #4b4a4a;
    margin-bottom: 20px;
  }

  .error-code {
    font-size: 18pt;
    color: #ff8473;
    margin-bottom: 10px;
  }
  
  .error-message {
    font-size: 16pt;
    color: #8c8c8c;
    margin-bottom: 30px;
  }
  
  .btn-home {
    background-color: #19c99b;
    color: #ffffff;
    border: none;
    padding: 15px 30px;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.3s;
    font-size: 16pt;
    font-weight: bold;
  }
  
  .btn-home:hover {
    background-color: #32ab8b;
  }
  
  @media (max-width: 768px) {
    .error-title {
      font-size: 20pt;
    }

    .error-code {
        font-size: 16pt;
    }
  
    .error-message {
      font-size: 14pt;
    }
  
    .btn-home {
      font-size: 14pt;
      padding: 12px 24px;
    }
  }
  </style>