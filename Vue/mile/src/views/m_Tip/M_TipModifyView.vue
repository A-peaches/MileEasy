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
        <h1 class="title">M-Tip 수정</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">제목</label>
          <input type="text" id="title" v-model="form.title" placeholder="제목을 입력해주세요" class="title-input" />
        </div>
        <div class="form-group" @click.stop="toggleCategory" ref="categoryButton">
          <label for="category">카테고리</label>
          <div class="drop-category">
            <div class="selected">{{ selectedCategory || '마일리지를 선택해주세요' }}</div>
          </div>
          <div class="dropdown-category" v-if="showCategory" ref="dropdownMenu">
            <div class="menu-items">
              <a class="dropdown-item" v-for="mileage in mileages" :key="mileage.mile_no" @click="selectCategory(mileage.mile_no, mileage.mile_name, $event)">
                {{ mileage.mile_name }} 마일리지
              </a>
              <a class="dropdown-item" @click="selectCategory(null, '기타', $event)">기타</a>
            </div>
          </div>
          <div><i class="bi bi-caret-down-fill icon-right"></i></div>
        </div>
        <div class="form-group content">
          <label for="content">내용</label>
          <textarea id="content" v-model="form.content" placeholder="내용을 입력해주세요"></textarea>
        </div>
  <div class="form-group file-upload">
    <label for="file">첨부파일</label>
    <div class="custom-file-upload">
      <div v-if="displayFileName">
        <div class="file-info">
          <span>{{ displayFileName }}</span>
          <button @click="triggerFileInput" type="button" class="file-modify-button">파일 수정</button>
        </div>
        <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none;" />
      </div>
      <div v-else>
        <input type="file" @change="handleFileUpload" ref="fileInput" />
      </div>
    </div>
</div>
<div class="btn-yellow-container">
  <button type="submit" class="btn-yellow">수정</button>
</div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NoticeModifyAdminView',
  props: ['mtip_board_no'],
  data() {
    return {
      form: {
        notice_board_no: '',
        title: '',
        mile_no: null,
        file: '',
        content: '',
        user_no: '',
        user_name: '',
      },
      uploadedFileName: '',
      displayFileName: '',
      mileages: [],
      showCategory: false,
      selectedCategory: null,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    

    decodedFileName() {
    if (this.uploadedFileName) {
      const parts = this.uploadedFileName.split('_', 2);
      if (parts.length > 1) {
        return decodeURIComponent(parts[1]);
      }
    }
    return '';
  },
  },


  async mounted() {
  const noticeId = this.$route.params.mtip_board_no;
  console.log('Notice ID:', noticeId);
  if (noticeId) {
    await this.fetchNoticeDetails(noticeId);
  } else {
    console.error('No notice ID provided');
  }

  await this.fetchMileages();
  this.setUserInfo();
  document.addEventListener('click', this.handleClickOutside);
},

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },

  methods: {
    ...mapActions('mtipBoard', ['fetchNoticeDetail',]),

  async handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await api.post('/mtip/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('서버 응답:', response.data);
    
    const [savedFileName, originalFileName] = response.data.split(',');
    console.log('저장된 파일명:', savedFileName);
    console.log('원본 파일명:', originalFileName);
    
    this.uploadedFileName = savedFileName;
    this.displayFileName = originalFileName;
    this.form.file = savedFileName;
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error);
    this.showAlert('파일 업로드 중 오류가 발생했습니다.', 'error');
  }
},

  getDisplayFileName(fileName) {
  // UUID 길이와 구분자 "_"의 길이를 합한 값 (UUID: 36자, 구분자: 1자)
  const UUID_LENGTH = 36 + 1;

  // 파일 이름이 null이거나 길이가 UUID_LENGTH보다 짧은 경우
  if (!fileName || fileName.length <= UUID_LENGTH) {
    return fileName; // 파일 이름이 너무 짧아서 UUID가 포함될 수 없는 경우
  }

  // 파일 이름의 첫 부분이 UUID 형식인 경우 제거
  if (fileName.charAt(UUID_LENGTH - 1) === '_') {
    return fileName.substring(UUID_LENGTH);
  }
  
  return fileName;
},

  async submitForm() {
  const formData = new FormData();
  formData.append('mtip_board_no', this.form.notice_board_no);
  formData.append('mtip_board_title', this.form.title);
  formData.append('mile_name', this.selectedCategory);
  formData.append('mtip_board_content', this.form.content);
  formData.append('user_no', this.form.user_no);
  formData.append('user_name', this.form.user_name);

  if (this.form.file) {
    formData.append('file', this.form.file);
    formData.append('originalFileName', this.displayFileName);
  }
   // 파일이 업로드되지 않은 경우, 기존 파일명만 추가
   else if (this.displayFileName) {
        formData.append('originalFileName', this.displayFileName);
      }

  // FormData 내용 확인
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await api.post('/mtip/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('서버 응답:', response.data);

    if (response.status === 200) {
      this.showAlert('공지사항이 수정되었습니다.', 'success');
      this.$router.push('/M_TipListView');
    } else {
      this.showAlert('공지사항 수정 중 오류가 발생했습니다.', 'error');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    this.showAlert('공지사항 수정 중 오류가 발생했습니다.', 'error');
  }
},
    goBack() {
      this.$router.go(-1);
    },
    toggleCategory() {
      this.showCategory = !this.showCategory;
    },
    selectCategory(mile_no, mile_name, event) {
      if (event) event.stopPropagation();
      this.selectedCategory = mile_name; // 항상 mile_name을 사용하도록 설정
      this.form.mile_no = mile_no === null ? '기타' : mile_no; // mile_no가 null이면 '기타'로 설정
      this.showCategory = false;
    },
    handleClickOutside(event) {
      if (
        this.$refs.dropdownMenu &&
        !this.$refs.dropdownMenu.contains(event.target) &&
        this.$refs.categoryButton &&
        !this.$refs.categoryButton.contains(event.target)
      ) {
        this.showCategory = false;
      }
    },
    triggerFileInput() {
      const fileInput = this.$refs.fileInput;
      if (fileInput) {
        fileInput.click();
      } else {
        console.error("fileInput reference is not available.");
      }
    },
    setUserInfo() {
      const loginInfo = this.getLoginInfo;
      if (loginInfo) {
        this.form.user_no = loginInfo.user_no;
        this.form.user_name = loginInfo.user_name;
      }
    },
    async fetchNoticeDetails(noticeId) {
  try {
    console.log('noticeId:',noticeId);
    const response = await this.fetchNoticeDetail(noticeId);
    console.log('Full response:', response); // 전체 응답 로깅

    if (!response || !response.data) {
      console.error('Invalid response structure');
      return;
    }

    const notice = response.data;
    console.log('Notice data:', notice); // notice 객체 로깅


    if (notice.mtip_board_no !== undefined) {
      this.form.notice_board_no = notice.mtip_board_no;
      console.log('this.form.notice_board_no:', this.form.notice_board_no);
    } else {
      console.error('mtip_board_no is undefined in the response');
    }

    this.form.notice_board_no = notice.mtip_board_no;
    console.log('this.form.notice_board_no:',this.form.notice_board_no);
    this.form.title = notice.mtip_board_title;
    this.form.mile_no = notice.mile_no;
    this.originalMileNo = notice.mile_no;
    this.selectedCategory = notice.mile_no === null ? '기타' : notice.mile_name;
    this.form.content = notice.mtip_board_content;
    this.displayFileName = notice.mtip_board_file;

    console.log('Fetched notice details:', notice);
    console.log('Selected category:', this.selectedCategory);
  } catch (error) {
    console.error('Error fetching notice details:', error);
  }
},
    async fetchMileages() {
      try {
        const response = await api.get('/notice/mileage');
        this.mileages = response.data;
      } catch (error) {
        console.error('Error fetching mileages:', error.response ? error.response.data : error.message);
      }
    },
    showAlert(message, icon) {
      this.$swal({
        title: message,
        icon: icon,
        confirmButtonText: '확인',
        confirmButtonColor: '#4b4a4a',
      });
    },
  },
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
  margin-top : 4%;
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
  margin-bottom: 50px;
  font-family: 'KB_S2', sans-serif;
}
/* form-group content의 높이 조정 */
.form-group.content {
  height: auto; /* 필요에 따라 높이 조정 */
}
/* 제목 input의 높이 조정 */
.title-input {
  height: 45px; /* 제목 input의 높이 조절 */
}
/* textarea의 패딩과 줄 높이 조정 */
.form-group.content textarea {
  padding-top: 10px; /* 위쪽 패딩을 조절하여 텍스트 위치 변경 */
  padding-bottom: 0; /* 아래쪽 패딩을 제거 */
  line-height: 1.5; /* 줄 높이를 조절하여 텍스트 간격 변경 */
  height: 500px; /* 필요에 따라 높이 조정 */
  resize: none; /* 텍스트 영역 크기 조정 금지 */
  font-family: 'KB_s5', sans-serif;
  font-size: 20px;
  color: #4b4a4a;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none; /* 포커스 시 기본 테두리 제거 */
  margin-bottom: 0.5vh;
  text-align: left; /* 왼쪽 정렬 */
  letter-spacing: 1px;
  background-color: #f5f5f5; /* 배경색 추가 */
}
.content {
  padding: 30px;
  width: 100%;
  max-width: 1300px;
  box-sizing: border-box;
  min-height: 60vh;
}

.content.cards {
  width: 100%;
  border: 1px solid #ccc;
  padding: 100px;
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 60vh;
}
/* 첨부파일 form-group 높이 조정 */
.form-group.file-upload {
  height: 100px; /* 원하는 높이로 조절 */
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: center; /* 가운데 정렬 */
  flex: 1; /* 비율로 조절할 수 있도록 flex 속성 추가 */
  margin-bottom: -5%; /* 기존 값에서 간격을 줄임 */
}

.title {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 13%;
  font-family: 'KB_S5', sans-serif;
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
  position: relative; /* relative로 설정하여 내부 요소를 기준으로 배치 가능 */
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f5f5f5; /* 배경색 추가 */
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height:auto;
}

.form-group label {
  flex: 0 0 10%; /* label의 너비를 설정합니다. */
  font-family: 'KB_s4', sans-serif;
  font-size: 20px;
  color: #4b4a4a;
  display: block;
}

.form-group input,
.form-group select,
.form-group textarea {
  flex: 1;
  padding: 15px;
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

.form-group.file-upload {
  height: 80px; /* 원하는 높이로 조절 */
}


.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  background-color: #f5f5f5; /* 포커스 시 배경색 변경 */
}

/* 카테고리 드롭다운 스타일 */
.drop-category {
  position: relative; /* 부모 요소에 상대 위치 설정 */
  background-color: rgba(255, 255, 255, 0.69);
  /* 배경색상: FFFFFF, 투명도 69% */
  border-radius: 30px;
  cursor: pointer;
}
/* 아이콘 크기*/
.icon-right {
  position: absolute;
  right: 5%; /* form-group의 오른쪽 끝에서 10px 떨어진 위치 */
  top: 50%;
  transform: translateY(-50%); /* 수직 가운데 정렬 */
}

/* 종류랑 카테고리를 선택해주세요 스타일*/
.drop-category .selected {
  background-color: #f5f5f5;
  height: 46px;
  border-radius: 30px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 22px;
  font-family: 'KB_s5', sans-serif;
  color: #7a7a7a;
  width: 100%; /* 가로로 길게 설정 */
  max-width: 500px; /* 필요에 따라 최대 너비 설정 */
  box-sizing: border-box; /* 패딩 포함하여 너비 계산 */
}

.dropdown-menu {
  display: block;
  position: absolute;
  z-index: 1000;
  background-color:  rgba(255, 255, 255, 0.69);
  /* 배경색상: FFFFFF, 투명도 69% */
  top: 78px; /* 아래로 살짝 내림 */
  left:135px; /* 오른쪽으로 위치 조정 */
  border: none; /* 테두리 제거 */
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  padding: 10px; /* 안쪽 여백 추가 */
  width: 920px; /* 가로로 늘림 */
  height: auto; /* 세로로 늘림 */
  max-height: 400px; /* 최대 높이 설정 */
}
.dropdown-category {
  display: block;
  position: absolute;
  z-index: 1000;
  background-color:  rgba(255, 255, 255, 0.69);
  /* 배경색상: FFFFFF, 투명도 69% */
  top: 78px; /* 아래로 살짝 내림 */
  left: 135px; /* 오른쪽으로 위치 조정 */
  border: none; /* 테두리 제거 */
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  padding: 10px; /* 안쪽 여백 추가 */
  width: 920px; /* 가로로 늘림 */
  height: auto; /* 세로로 늘림 */
  max-height:2000px; /* 최대 높이 설정 */
}
.menu-items {
  display: flex;
  flex-direction: column;
}
/* 종류 드롭다운 */
.dropdown-item {
  padding: 10px 80px;
  border: none; /* 테두리 제거 */
  cursor: pointer;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.69); /* 배경색상: FFFFFF, 투명도 69% */
 
}

.dropdown-item:hover {
  background-color: #d9d9d9;
  border-radius: 30px; /* 모서리 30px */
  border: none; /* 테두리 제거 */
}


.btn-yellow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 필요에 따라 높이 조정 */
  margin-top: 50px; /* 아래로 이동 */
}

.btn-yellow {
  background-color: #19c99b;
  color: #ffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
  width: 7vw;
  height: 6vh;
  font-size : 23px;
  font-family: 'KB_s5', sans-serif;
}

.btn-yellow:hover {
  background-color: #32ab8b;
  color: #ffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
  width: 7vw;
  height: 6vh;
  font-family: 'KB_s5', sans-serif;
}

.file-modify-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.custom-file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-modify-button {
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>