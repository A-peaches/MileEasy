<template>
  <div class="app-container">
    <div class="content cards">
      <h2>공지사항</h2>
      <div>
      <button class="category-button">카테고리</button>
      </div>
      <div class="search-container">
        <input type="text" placeholder="검색어를 입력하세요" class="input-search">
        <button class="search-button">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="notice-list">
        <div class="notice-item" v-for="(item, index) in notices" :key="index">
          <div class="notice-details">
            <div class="notice-title">{{ item.title }}</div>
            <div class="notice-author">{{ item.author }}</div>
            <div class="notice-date">{{ item.date }}</div>
            <div class="notice-views">{{ item.views }} <i class="fa fa-eye"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      notices: [
        { title: "연수마일리지", author: "김근미", date: "2024.05.24", views: 59 },
        // ... 다른 공지사항들
      ]
    }
  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Arial, sans-serif';
}

h2{
 font-family: 'KB_S4', sans-serif;
 font-size: 40px;
 margin-top: 30px;
 display: inline-block; /* 밑줄 길이를 텍스트 길이에 맞춥니다 */
 position: relative;
}

h2::after {
  content: '';
  display: block;
  width: 120%; /* 텍스트보다 긴 밑줄을 위해 조정 */
  height: 1px; /* 밑줄 두께 */
  background-color: #737373; /* 밑줄 색상 */
  position: absolute;
  bottom: -5px; /* 텍스트와 밑줄 사이의 간격을 위해 조정 */
  left: -10%; /* 중앙 정렬을 위해 조정 */
}


.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 뷰포트 높이의 100% */
}

.content {
  text-align: center;
  padding: 20px;
  width: 95%; /* 너비를 80%로 설정 */
  max-width: 1300px; /* 원하는 최대 너비를 설정 */
  height: 95%; /* 높이를 컨테이너 높이의 70%로 설정 */
  max-height: 1000px; /* 원하는 최대 높이 설정 */
  box-sizing: border-box; /* 패딩 포함한 크기 계산 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 */
}


.category-button {
  background-color: #ffffff;
  border-radius: 25px;
  padding: 12px 40px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* 공지사항과 카테고리 버튼 사이의 간격 */
  display: inline-block;
  font-size: 20px;
  font-family: 'KB_S5', sans-serif;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative; /* 상대 위치 */
  margin-bottom: 20px;
  justify-content: flex-end; /* 오른쪽 정렬 */
}

.input-search {
  border-radius: 30px;
  padding-right: 50px; /* 아이콘 공간 확보 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  outline: none;
  font-size: 19px;
  font-family: 'KB_S5', sans-serif;
  width: 28%;
  border: none;
  margin: 5px;
  height: 60px; /* 높이를 조금 높여줌 */
}

.search-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 80px; /* 높이를 조금 높여줌 */
  height: 80px; /* 높이를 조금 높여줌 */
}


.notice-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notice-item {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 아이템 주변에 그림자 추가 */
}

.notice-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.notice-title, .notice-author, .notice-date, .notice-views {
  flex: 1;
  text-align: center;
}

.notice-views {
  display: flex;
  align-items: center;
  gap: 5px;
}

.notice-views i {
  font-size: 16px;
}
</style>
