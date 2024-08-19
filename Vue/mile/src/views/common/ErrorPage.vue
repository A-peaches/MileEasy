<template>
    <div class="error-page">
      <div class="error-container">
        <div>
            <img src="@/assets/imoji/lamu/라무얼굴슬픔.png" alt="오류" class="img mb-4"/>
        </div>
        <h1 class="error-title">오류가 발생했습니다</h1>
        <p class="error-code fw-bold">에러 코드: {{ errorCode }}</p>
        <p class="error-message">죄송합니다.</p>
        <button class="btn-home" @click="goHome">홈으로 돌아가기</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorPage',
    props: {
        errorCode: {
        type: String,
        default: '404'
        }
    },
    computed: {
        errorMessage() {
            const messages = {
                '400': '잘못된 요청입니다.',
                '401': '인증이 필요합니다.',
                '403': '접근 권한이 없습니다.',
                '404': '요청하신 페이지를 찾을 수 없습니다.',
                '405': '허용되지 않은 요청 방식입니다.',
                '408': '요청 시간이 초과되었습니다.',
                '429': '너무 많은 요청이 발생했습니다.',
                '500': '서버 내부 오류가 발생했습니다.',
                '501': '요청을 수행할 수 없습니다.',
                '502': '게이트웨이 오류가 발생했습니다.',
                '503': '서비스를 일시적으로 사용할 수 없습니다.',
                '504': '게이트웨이 시간 초과가 발생했습니다.'
            };
            return messages[this.errorCode] || '알 수 없는 오류가 발생했습니다.';
        }
    },
    methods: {
      goHome() {
        this.$router.push('/'); // Vue Router를 사용한다고 가정
      }
    }
  }
  </script>
  
  <style scoped>
  .img {
    width: 70px;
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
    font-size: 28pt;
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
      font-size: 22pt;
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