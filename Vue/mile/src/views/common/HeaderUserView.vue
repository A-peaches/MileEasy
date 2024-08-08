<template>
  <div class="mx-auto" style="width: 83%">
    <!-- 사용자 헤더 -->
    <div class="header">
      <div class="logo lg">
        <a href="/main" class="a_link">
          <span class="logo-text" style="font-size: 20pt">
            <img src="@/assets/img/mini_logo.png" class="mb-2 mr-3 ml-2" style="width:33px">MileEasy
          </span>
        </a>
      </div>
      <div class="menu">
        <div class="nav justify-content-start" style="margin-left: 80px">
          <div class="nav-item">
            <a class="nav-link hover" href="/myMileageView">나의 마일리지</a>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/myMileagetarget">목표 설정</a>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" aria-current="page" href="/documentsView"
              >문서모아</a
            >
          </div>
          <div v-if="loginInfo.is_hr == true">
            <div class="nav-item">
              <a class="nav-link hover" href="/group">그룹 관리</a>
            </div>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/M-Tip">M-Tip</a>
          </div>
          <div class="nav-item">
            <a class="nav-link hover" href="/noticeListView">공지사항</a>
          </div>
          <!-- <div class="nav-item">
            <a class="nav-link hover" href="/qnaListView">Q&A</a>
          </div> -->
          <div class="nav-item">
            <a class="nav-link hover" href="/mileEasyContactView">연락처</a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div class="nav-item dropdown" style="margin-right: 30px">
          <a
            class="nav-link active hoverI shake"
            aria-current="page"
            style="cursor: pointer"
            @click="toggleNotificationDropdown"
          >
            <i class="bi bi-bell-fill"></i>
            <span
              v-if="mileExcelData.length > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="height: 20px; width: 15px"
            >
              <span
                style="
                  left: 90%;
                  transform: translateX(-50%);
                  background-color: #dc3545;
                  display: flex;
                  font-size: 9pt;
                  font-family: 'KB_C3';
                  justify-content: center;
                "
                >{{ mileExcelData.length }}</span
              >
            </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end notification-dropdown"
            :class="{ show: isNotificationOpen }"
          >
            <div class="notification-scroll">
              <div class="notification-header">
                <span >최근 일주일 알림 내역이 보여집니다.</span>
              </div>
              <a
                v-for="(item, index) in mileExcelData"
                :key="index"
                class="dropdown-item text-start"
                :href="item.mile_description"
              >
                <span style="color: red"
                v-if="index < 5 ">new</span> &nbsp;
                {{ item.mile_name }}가 업데이트 되었습니다.
                <span style="color: gray; font-size: 10pt">
                  ({{ item.mile_excel_date.substring(0, 10) }})
                </span>

              </a>

            </div>
          </div>
        </div>
        <div class="nav-item mr-5">
          <a
            class="nav-link active hoverI"
            aria-current="page"
            @click.stop="openModal"
            style="cursor: pointer"
          >
            <i class="bi bi-calendar-check"></i>
          </a>
        </div>
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
            <a class="dropdown-item" href="/badgeStatusView">배지 취득 현황</a>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="isModalOpen" @close="closeModal" />
  </div>
</template>

<script>
import Modal from "../../components/user/AttendanceModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Modal },
  data() {
    return {
      isModalOpen: false,
      isHovered: false,
      isNotificationOpen: false,
      mileExcelData: [],
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo", "getIsChecked"]),
    ...mapGetters("mileExcel", ["getExcelNotice"]),
    profileImageUrl() {
  if (this.loginInfo && this.loginInfo.user_no) {
    if (process.env.NODE_ENV === 'development') {
      return `${process.env.VUE_APP_API_URL}/profile/${this.loginInfo.user_no}.jpg`;
    } else {
      return `/profile/${this.loginInfo.user_no}.jpg`;
    }
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
    ...mapActions("mileExcel", ["getExcelNotices"]),
    ...mapActions("login", ["logout"]),
    async fetchMileExcelData() {
      await this.getExcelNotices();
      const excelNotices = this.getExcelNotice;
      if (this.getLoginInfo.job_no == "기획") {
        this.mileExcelData = excelNotices.filter(
          (item) => item.mile_is_branch == false
        );
      } else {
        this.mileExcelData = excelNotices;
      }
    },
    Logout() {
      this.logout();
      window.location.href = "/login";
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    // warningAlert() {
    //   this.$swal({
    //     title: "안내",
    //     text: "이 기능은 추후 업데이트 예정입니다",
    //     icon: "info",
    //     scrollbarPadding: false,
    //   });
    // },
    willBeUpdate() {
      this.warningAlert();
    },
    setDefaultImage(event) {
      event.target.src = require("@/assets/img/test.png");
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
    toggleNotificationDropdown() {
      this.isNotificationOpen = !this.isNotificationOpen;
    },
    closeNotificationDropdown(event) {
      if (!event.target.closest('.nav-item.dropdown')) {
        this.isNotificationOpen = false;
      }
    },
  },
  mounted() {
    this.fetchMileExcelData();
    document.addEventListener("click", this.closeNotificationDropdown);
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        this.isHovered = false;
      }
    });
    // 3초 동안 애니메이션 적용 후 제거
  const bellIcon = document.querySelector('.bi-bell-fill');
  bellIcon.classList.add('shake');
  setTimeout(() => {
    bellIcon.classList.remove('shake');
  }, 3000);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.hideDropdown);
    document.removeEventListener("click", this.closeNotificationDropdown);
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
  font-family: "KB_C2";
}

.dropdown-menu {
  background-color: rgba(255, 255, 255, 0.894);
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
  display: block;
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
  content: "";
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

.notification-dropdown {
  min-width: 250px;
  max-height: 250px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  left: auto;
  right: 0;
  margin-top: 8px;
  overflow: hidden;
  flex-direction: column;
}


.notification-header {

  background-color: #f8f9fade;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.9rem;
  color: #6c757d;
  position: sticky;
  top: 0;
  z-index: 1;
}

.notification-scroll {
  max-height: 200px; /* 알림 내용의 최대 높이 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  flex-grow: 1;
}

/* 스크롤바 스타일링 (선택사항) */
.notification-scroll::-webkit-scrollbar {
  width: 5px;
}

.notification-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notification-scroll::-webkit-scrollbar-thumb {
  background: #c3c3c3;
  border-radius: 5px;
}

.notification-scroll::-webkit-scrollbar-thumb:hover {
  background: #a7a7a7;
}

@keyframes bell-shake {
  0%, 100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(7deg);
  }
  50% {
    transform: rotate(-7deg);
  }
  75% {
    transform: rotate(7deg);
  }
}

.shake {
  animation: bell-shake 0.7s ease-in-out;
}

</style>
