<template>
  <div class="mx-auto" style="width: 83%">
    <!-- 사용자 헤더 -->
    <div class="header">
      <div class="logo lg">
        <a href="/admin" class="a_link">
          <span class="logo-text" style="font-size: 20pt">
            <img src="@/assets/img/mini_logo.png" class="mb-2 mr-3 ml-2" style="width:33px">MileEasy
          </span>
        </a>
      </div>
      <div class="menu">
        <div class="nav justify-content-start" style="margin-left: 80px">
          <div class="nav-item">
            <a class="nav-link hover" href="/kingMain">마왕 관리</a>
          </div>
          <div class="nav-item">
            <a
              class="nav-link hover"
              aria-current="page"
              href="/mileageManagementView"
              >마일리지 관리</a
            >
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/m_TipListView">M-Tip관리</a>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/noticeListView">공지사항</a>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/qnaListView">Q&A</a>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/mileEasyContactView">연락처</a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="nav-item dropdown"
          @mouseenter="showDropdown"
          @mouseleave="hideDropdown"
        >
          <a class="nav-link dropdown-toggle no-caret" href="#" role="button">
            <img
              v-if="loginInfo && loginInfo.user_no"
             :src="profileImageUrl"
              class="profile-small my-3"
              alt="Profile Picture"
              @error="setDefaultImage"
            />
          </a>
          <div
            class="dropdown-menu dropdown-menu-end profile-dropdown"
            :class="{ show: isHovered }"
          >
            <a class="dropdown-item" aria-current="page" @click="Logout"
              >로그아웃</a
            >
            <a class="dropdown-item" href="/passwordChange"
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
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    profileImageUrl() {
      if (this.loginInfo && this.loginInfo.user_no) {
        return `${process.env.VUE_APP_IMAGE_URL}/profile/${this.loginInfo.user_no}.jpg`;
      }
      return ''; // 또는 기본 이미지 URL
    },
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

    willBeUpdate() {
      this.warningAlert();
    },
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    showDropdown() {
      if (window.innerWidth >= 768) {
        this.isHovered = true;
      }
    },
    hideDropdown() {
      if (window.innerWidth >= 768) {
        this.isHovered = false;
      }
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.isHovered = false;
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.hideDropdown);
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 30px 30px;
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
  font-size: 16pt;
  font-family: 'KB_C2';
}

.dropdown-menu {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: auto !important;
  position: absolute;
  border: none !important;
}

.profile-dropdown {
  left: 10%;
}

.dropdown-item {
  color: #333;
  display: inline-block;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-item:hover {
  color: black;
  background-color: rgb(244, 244, 244);
  border-radius: 10px;
}

.single-line .menu-items {
  display: inline;
}

.nav-link:hover {
  cursor: pointer;
}

.a_link {
  color: #fff;
  text-decoration: none;
}

.no-caret::after {
  display: none !important;
}

@media (min-width: 768px) {
  .dropdown-hover:hover > .dropdown-menu {
    display: block;
  }
}

.nav-link.hover {
  position: relative;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
}

.nav-link.hover::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #ffffffaa;
  transition: width 0.3s ease;
}

.nav-link.hover:hover {
  color: #ffffff;
}

.nav-link.hover:hover::after {
  width: 100%;
}

.hoverI:hover {
  font-size: 18pt;
}
</style>
