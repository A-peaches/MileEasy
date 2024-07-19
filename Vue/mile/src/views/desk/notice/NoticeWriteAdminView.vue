<template>
  <div class="app-container">
    <div class="content cards">
      <div class="header">
        <div class="button-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
          </button>
        </div>
      </div>
        <div class="actions">
          <h1 class="title">공지사항 글작성</h1>
        </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">제목</label>
          <input type="text" id="title" v-model="form.title" placeholder="제목을 입력해주세요" />
        </div>
        <div class="form-group">
          <label for="category">카테고리</label>
          <select id="category" v-model="form.category" class="dropdown-select">
            <option>M-Tip 가이드</option>
            <option>Desk 공지사항</option>
          </select>
        </div>
        <div class="form-group">
          <label for="file">첨부파일</label>
          <input type="file" id="file" @change="handleFileUpload" />
        </div>
        <div class="form-group">
          <label for="content">내용</label>
          <textarea id="content" v-model="form.content" placeholder="내용을 입력해주세요"></textarea>
        </div>
        <div class="btn-yellow-container">
        <button type="submit" class="btn-yellow">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      form: {
        title: '',
        category: '',
        file: null,
        content: ''
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleFileUpload(event) {
      this.form.file = event.target.files[0];
    },
    async submitForm() {
    const postData = {
      title: this.form.title,
      category: this.form.category,
      file: this.form.file,
      content: this.form.content,
    };

    try {
      // 여기에 글 작성 API 호출 로직 추가
      // 예시: const response = await this.createPost(postData);
      const response = await this.createPost(postData);

      if (response && response.success) {
        this.showAlert('공지사항이 등록되었습니다.', 'success');
        this.$router.push('/noticeList'); // 공지사항 목록 페이지로 이동
      } else {
        this.showAlert('공지사항 등록 중 오류가 발생했습니다.', 'error');
      }
    } catch (error) {
      this.showAlert('공지사항 등록 중 오류가 발생했습니다.', 'error');
    }
  },
  showAlert(message, icon) {
  this.$swal({
    title: message,
    icon: icon,
    confirmButtonText: '확인',
    confirmButtonColor: '#4b4a4a',
    allowOutsideClick: false, // 외부 클릭 금지
    allowEscapeKey: false, // ESC 키 금지
    allowEnterKey: false, // Enter 키 금지
    stopKeydownPropagation: false, // 키다운 이벤트 전파 금지
    backdrop: true, // 배경 클릭 금지
    didOpen: () => {
      // SweetAlert이 열릴 때 페이지 스크롤 잠금
      document.body.classList.add('no-scroll');
      document.documentElement.style.overflow = 'hidden';
    },
    willClose: () => {
      // SweetAlert이 닫힐 때 페이지 스크롤 해제
      document.body.classList.remove('no-scroll');
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
    }
  });
},
}
  };
</script>


<style scoped>
.no-scroll {
  overflow: hidden;
  height: 100%; /* 높이를 고정하여 스크롤을 방지 */
}

.app-container {
  width: 100%;
  padding: 0px;
  min-height: 100vh; /* 최소 높이를 설정하여 페이지 전체를 채움 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0; /* 상하 패딩을 추가하여 공간 확보 */
}

h2 {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'KB_S2', sans-serif;
}

.content {
  padding: 20px;
  width: 95%;
  max-width: 1300px;
  box-sizing: border-box;
  min-height: 100vh;
}

.content.cards {
  width: 100%;
  border: 1px solid #ccc;
  padding: 60px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 100vh;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center; /* 가운데 정렬 */
  flex: 1; /* 비율로 조절할 수 있도록 flex 속성 추가 */
}

.title {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 70px;
  font-family: 'KB_S2', sans-serif;
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 10px; /* 왼쪽 여백을 추가하여 위치 조정 */
  flex: 1; 
  margin-top: -10px; /* 상단 마진을 음수 값으로 설정하여 위로 이동 */
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5B5B5B; /* 검은색 텍스트 */
  font-size: 18px;
  cursor: pointer;
  margin-top: 0;
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
  font-size: 17px;
  font-family: 'KB_S5', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f5f5f5; /* 배경색 추가 */
  padding: 8px;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group label {
  flex: 0 0 10%; /* label의 너비를 설정합니다. */
  font-family: 'KB_h3', sans-serif;
  font-size: 18px;
  color: #4b4a4a; 
}
.dropdown-select {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none; /* 테두리 제거 */
  border-radius: 5px;
  box-sizing: border-box;
  outline: none; /* 포커스 시 기본 테두리 제거 */
  appearance: none; /* 기본 드롭다운 화살표 제거 */
  font-family: 'KB_h3', sans-serif;
}
.dropdown-select option {
  color: #4b4a4a; /* 드롭다운 옵션 글자 색상 추가 */
}

.dropdown-select:focus {
  background-color: #f5f5f5; /* 포커스 시 배경색 변경 */
}

.dropdown-select:focus {
  background-color: #f5f5f5; /* 포커스 시 배경색 변경 */
}
.form-group input,
.form-group select,
.form-group textarea {
  flex: 1;
  padding: 18px;
  font-size: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  color: #4b4a4a;
  outline: none; /* 포커스 시 기본 테두리 제거 */
  margin-bottom: 0.5vh;
  text-align: left; /* 왼쪽 정렬 */
  letter-spacing: 1px;
  font-family: 'KB_s5', sans-serif;
}

.form-group textarea {
  height: 350px;
  resize: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  background-color: #f5f5f5; /* 포커스 시 배경색 변경 */
}

.btn-yellow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 필요에 따라 높이 조정 */
}

.btn-yellow {
  background-color: #ffca05;
  color: #4b4a4a;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
  width: 7vw;
  height: 5vh;
  font-size : 19px;
  font-family: 'KB_s5', sans-serif;
}

.btn-yellow:hover {
  background-color: #edbb00;
  color: #4b4a4a;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
  width: 7vw;
  height: 5vh;
  font-family: 'KB_s5', sans-serif;
}
</style>

