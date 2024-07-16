<template >
    <div id="back" class="my-5 justify-content-center mx-auto">
      <img src="../../assets/test.png" class="profile-small" />
      <img src="../../assets/test.png" class="profile-large" /> <br />
      <button class="btn-green">초록색 버튼이지용</button>
      <button class="btn-yellow">노란색 버튼이지용</button>
      <button class="btn-gray">회색 버튼이지용</button>
      <button class="btn-red">빨간색 버튼이지용</button>
      <button class="btn-pink">분홍색 버튼이지용</button>
      <br />
      <p class="bold-x-lg">강조큰글씨 : 나의 마일리지</p>
      <p class="lg">큰글씨 : 마일리지 상세</p>
      <p class="lg2">큰글씨2 : 마일리지 문서</p>
      <p class="md">중간글씨 : 프로필 보기</p>
      <p class="sm">작은글씨 : 문서모아</p>
      <p class="red">빨간색강조 : 중요합니다</p>
      <p class="gray">회색강조 : 재발급</p>
      <p class="green">초록색강조 : KB국민인증서 로그인</p>
      <p class="brown">갈색강조 : 나무나무색</p>
      <input type="text" class="input-base input-white" value="흰색" />
      <input type="text" class="input-base input-gray" value="회색" />
      <input type="text" class="input-base input-search" value="회색" />
      <br>
      <div class="input-base input-search d-flex justify-content-center mx-auto my-3"
       style="width: 500px; background: #EBEBEB;">
      <button class="tab-container lg2 fw-bold">취득현황</button>
      <button class="tab-container tab lg2 fw-bold">마일리지소개</button>
      </div >
   <div class="w-50 justify-content-center mx-auto">
     <!-- 알람 메시지 드롭다운 -->
     <div class="dropdown dropdown-alert KB_C2" style="font-size:16pt">
      <p class="KB_C2" style="font-size:16pt">알람 1</p>
      <p class="KB_C2" style="font-size:16pt">알람 2</p>
      <p class="KB_C2" style="font-size:16pt">알람 3</p>
    </div>
  
    <!-- 카테고리 드롭다운 -->
    <div class="dropdown dropdown-category" >
      <p class="selected KB_C2" style="font-size:16pt">카테고리 1</p>
      <p class="KB_C2" style="font-size:16pt">카테고리 2</p>
      <p class="KB_C2" style="font-size:16pt">카테고리 3</p>
    </div>
  
    
    <!-- 카드들 -->
  </div>
  <div class="d-flex justify-content-center mx-auto">
      <div class="cards">
      card 기본색.
      </div>
      <div class="cards card-gray">
      card 회색. 
      </div>
      <div class="cards  card-dash  card-lemon">
      card 대시보드. 레몬색.
      </div>
      <div class="cards card-dash card-yellow">
      card대시보드. 노란색.
      </div>
  </div>
   </div>
  </template>
    
    <script>
  export default {
    name: "LoginView",
    components: {},
  };
  </script>
  
    <style>
  #back {
    background-color: gray;
  }
  </style>
    