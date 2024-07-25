<template>
  <div class="app-container">
    <div v-if="notice" class="content cards">
      <div class="header">
        <div class="button-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
          </button>
        </div>
        <div v-if="isLoggedIn && loginInfo.user_is_admin && !loginInfo.user_is_manager && isChecked">
          <div class="actions">
            <button class="edit-button" @click="goToModifyView">수정</button>
            <button class="delete-button">삭제</button>
          </div>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{ notice.notice_board_title }}</h1>
        <div class="meta">
          <span class="author">{{ notice.user_name }}</span>
          <span class="date">{{ formatDate(notice.notice_board_date) }}</span>
        </div>
        <div class="main-content">
          <div class="body">
            <p>{{ notice.notice_board_content }}</p>
          </div>
          <div class="file cards" v-if="notice.notice_board_file">
            <h2>첨부파일</h2>
            <ul>
              <li><a :href="`http://localhost:8090/notice/downloadFile/${notice.notice_board_file}`">{{ notice.notice_board_file }}</a></li>
            </ul>
          </div>
        </div>
        <div class="icon-container">
          <div class="views-icon">
            <i class="bi bi-eye"></i>
          </div>
          <div class="views-text">{{ notice.notice_board_hit }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  props: ['id'], // id를 props로 받음
  data(){
    return{

    }
  },
  methods: {
    ...mapActions('notice', ['fetchNoticeDetail', 'incrementViews']),
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    },
    goToModifyView() {
      this.$router.push({ name: 'noticeModifyAdminView', params: { id: this.notice.notice_board_no } }); // noticeModifyAdminView 경로로 이동
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    },
    async downloadFile(fileName) {
      try {
        const response = await axios({
          url: `http://localhost:8090/notice/downloadFile/${fileName}`,
          method: 'GET',
          responseType: 'blob', // 중요한 부분입니다. blob 형태로 응답을 받습니다.
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // 파일 다운로드 설정
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters('notice', ['getNotice']),
    notice() {
      return this.getNotice;
    },
    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo; // loginInfo가 null이 아니면 로그인 상태로 판단합니다.
    }
  },
  watch: {
    id: {
      immediate: true,
     
    },
  },
  mounted() {
    const noticeId = this.$route.params.id;
    console.log('Notice ID:', noticeId); // Notice ID 값을 콘솔에 출력하여 확인합니다.
    this.fetchNoticeDetail(noticeId); // 초기 로딩 시 공지사항 세부 정보만 가져옴
  },
};
</script>


<style scoped>
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
  padding: 20px 0; /* 상하 패딩을 추가하여 공간 확보 */
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 10px; /* 왼쪽 여백을 추가하여 위치 조정 */
  flex: 1; 
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

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* 오른쪽 정렬 */
  flex: 1; /* 비율로 조절할 수 있도록 flex 속성 추가 */
}

.edit-button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
  color: #714319;
  padding: 5px 10px;
}


.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
  color: #714319;
  padding: 5px 10px;
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

.title {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'KB_S2', sans-serif;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: center; /* 가운데 정렬을 위한 설정 */
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 95px;
  font-family: 'KB_S5', sans-serif;
}

.meta .author {
  margin-right: 5px; /* 이름과 날짜 사이의 간격을 50px로 설정 */
}


.main-content {
  display: flex;
  flex-direction: column;
  gap: 15vh; /* 요소 간 간격을 뷰포트 높이의 3%로 설정 */
}

/* .body 스타일을 추가한 후, 우선순위 문제를 해결하기 위해 자식 선택자를 사용 */
.body p {
  font-size: 19px;
  line-height: 1.5;
  margin-bottom: 20px; /* 개별 p 태그의 아래 여백을 설정 */
  text-align: left !important; /* 텍스트를 왼쪽 정렬 */
  padding-left: 2.5vw !important; /* 뷰포트 너비의 5%로 설정 */
  padding-right: 3vw !important; /* 뷰포트 너비의 5%로 설정하여 여백 추가 */
}

.body p {
  margin-bottom: 10px; /* 개별 p 태그의 아래 여백을 설정 */
}

.file.cards{
  background-color: hsl(0, 0%, 95%);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px; /* 패딩을 추가하여 내부 여백 설정 */
  position: relative; /* 상대 위치를 설정 */
  left: 50%; /* 부모 요소의 왼쪽으로부터 50% */
  transform: translateX(-48%); /* 자신의 너비의 50%만큼 왼쪽으로 이동하여 중앙 정렬 */
  width: 110%; /* 원하는 너비 설정 */
}
.file h2 {
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  font-size: 21px; /* 글씨 크기를 조정할 수 있습니다 */
  font-family: 'KB_h5', sans-serif; /* 원하는 글꼴로 변경 가능 */
  color : #4b4a4a;
}
.file ul {
  padding-left: 0; /* 불필요한 왼쪽 패딩 제거 */
  list-style-type: none; /* 목록 스타일 제거 */
  color : #9C8480;
}

.file li {
  text-align: left; /* 리스트 항목을 왼쪽 정렬 */
  font-size: 19px; /* 글씨 크기를 조정할 수 있습니다 */
  font-family: 'KB_h5', sans-serif; /* 원하는 글꼴로 변경 가능 */
  margin-left: 3%; /* 비율로 왼쪽 여백을 추가하여 위치 조정 */
}

.icon-container {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 정렬 설정 */
  margin-top: 3vh; /* 부모 요소의 위쪽으로부터 뷰포트 높이의 3% */
}

.views-icon {
  flex: 0 0 auto; /* 아이콘의 flex 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.views-icon i {
  font-size: 1.8vw; /* 아이콘 크기를 비율로 설정 */
  color:#4b4a4a;
}

.views-text {
  flex: 0 0 auto; /* 텍스트의 flex 설정 */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  font-size: 1.5vw; /* 텍스트 크기 설정 */
  font-family: 'KB_s5', sans-serif; /* 원하는 글꼴로 변경 가능 */
  color:#4b4a4a;
  margin-left: 0.8vw; /* 아이콘과 텍스트 사이의 간격을 비율로 조정 */
}
</style>
