<template>
  <div>
    <!-- 사용자 헤더 -->
    <div class="header">
      <div class="logo lg">
        <a href="/main" class="a_link">
          <span class="logo-text">MileEasy</span>
        </a>
      </div>
      <div class="menu">
        <ul class="nav justify-content-end">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              나의 마일리지
            </a>
            <div class="dropdown-menu dropdown-menu-end single-line">
              <div class="menu-items">
                <a class="dropdown-item" href="/myMileageView">나의 마일리지</a>
                <a class="dropdown-item" href="/hrdView">HRD 마일리지</a>
                <a class="dropdown-item" href="/monthlyBestView"
                  >MonthlyBest 마일리지</a
                >
                <a class="dropdown-item" href="/monthlyBaseView"
                  >MonthlyBase 마일리지</a
                >
                <a class="dropdown-item" href="/bestBranchView"
                  >Best PG 마일리지</a
                >
                <a class="dropdown-item" href="/leagueTableView"
                  >리그테이블 마일리지</a
                >
                <a class="dropdown-item" href="/hotTipView">HOT Tip 마일리지</a>
                <a class="dropdown-item" href="/consumerSupportView"
                  >소비자 지원 마일리지</a
                >
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/documentsView"
              >문서모아</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/m_TipMainView">M-Tip</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Desk
            </a>
            <div class="dropdown-menu dropdown-menu-end single-line">
              <div class="menu-items">
                <a class="dropdown-item" href="/noticeListView">공지사항</a>
                <a class="dropdown-item" href="/qnaListView">Q&A</a>
                <a class="dropdown-item" href="/mileEasyContactView"
                  >업무별 연락처</a
                >
                <a class="dropdown-item" href="/mileageContactView"
                  >마일리지 연락처</a
                >
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="Logout"
              >로그아웃</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="Logout"
              ><i class="bi bi-bell-fill"></i
            ></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="Logout"
              ><i class="bi bi-calendar-check"></i
            ></a>
          </li>
        </ul>
      </div>
      <div>
        <a href="/main">
          <img
            src="@/assets/img/test.png"
            class="profile-small"
            alt="Profile Picture"
          />
        </a>
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
</style>
