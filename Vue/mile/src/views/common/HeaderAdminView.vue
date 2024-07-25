<template>
  <div  class="mx-auto" style="width:83%;">
    <!-- 운영관리자 헤더  -->
    <div class="header">
      <div class="logo lg">
        <a href="/main" class="a_link">
          <span class="logo-text" style="font-size:20pt">
            <i class="bi bi-apple mr-3"></i>MileEasy
          </span>
        </a>
      </div>
      <div class="menu">
        <ul class="nav justify-content-start" style="margin-left: 80px;">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
            >
              마왕관리
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/kingTopAdminView">TOP</a></li>
              <li>
                <a class="dropdown-item" href="/kingSelectAdminView"
                  >채택하기</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="/kingBadgeOptionAdminView"
                  >배지 디자인 변경</a
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown"
              href="/mileageManagementView"
              role="button"
              aria-expanded="false"
            >
              마일리지 관리
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              M-Tip
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="/m_TipMainAdminView"
                  >M-Tip 가이드</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="/m_TipListView">M-Tip 관리</a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              Desk
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="/noticeListView">공지사항</a>
              </li>
              <li><a class="dropdown-item" href="/qnaListView">Q&A 답변</a></li>
              <li>
                <a class="dropdown-item" href="/mileEasyContactView"
                  >업무별 연락처</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <div class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle no-caret"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              v-if="loginInfo && loginInfo.user_no"
              :src="`http://localhost:8090/profile/${loginInfo.user_no}.jpg`"
              class="profile-small my-3"
              alt="Profile Picture"
              @error="setDefaultImage"
            />
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" aria-current="page" @click="Logout"
              >로그아웃</a
            >
            <a class="dropdown-item" href="/passwordChangeView"
              >비밀번호 변경</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
  },
  methods: {
    ...mapActions('login', ['logout']),
    Logout() {
      this.logout();
      window.location.href = '/login';
    },
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 60px 30px;
  color: #fff;
  font-size: 18px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 40px;
  height: auto;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.menu {
  flex: 1;
}

.nav-link {
  color: #fff;
  text-decoration: none;
}

.dropdown-menu {
  text-align: center;
  background-color: #fff6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: auto !important;
}

.dropdown-item {
  color: #333;
  display: inline-block; /* 인라인 블록 요소로 표시 */
  justify-content: center;
  white-space: nowrap; /* 한 줄에 모두 표시하기 위해 줄 바꿈 방지 */
  margin-right: 10px; /* 각 항목 사이 간격을 위해 마진 추가 */
}

.dropdown-item:hover {
  color: black;
  background-color: #fffffffa;
  border-radius: 10px;
}

.single-line .menu-items {
  display: inline; /* 한 줄에 모든 항목 표시 */
}

/* 마우스를 올렸을 때 커서 모양 변경 */
.nav-link:hover {
  cursor: pointer;
}

.a_link {
  color: #fff;
  text-decoration: none;
}

/* 드롭다운 화살표 숨기기 */
.no-caret::after {
  display: none !important;
  content: '' !important;
}

.dropdown-toggle::after {
  display: none !important;
  content: '' !important;
}

.nav-link.no-caret {
  appearance: none;
}

.profile-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
</style>
