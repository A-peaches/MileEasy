<template>
  <footer
    style="
      padding-top: 20px;
      text-align: center;
      height: 100%;
      background-color: #fbfbfb;
      margin-bottom: 10px;
    "
  >
    <div style="margin-top: 80px"></div>

    <div class="notice-container">
      <button @click="prev" class="nav-button left-button">‹</button>
      <div class="recent-notice">
        <span class="recent-notice-text">최근 공지사항 :</span>
      </div>
      <div class="notice-item-wrapper">
        <transition name="slide">
          <router-link
            :to="
              currentNoticeId
                ? { name: 'noticeDetailView', params: { id: currentNoticeId } }
                : ''
            "
            class="notice-item"
            :key="currentIndex"
            v-if="currentNoticeId !== null"
            style="text-decoration: none; color: #4b4b4b"
          >
            <span class="notice-title">
              {{ currentNotice.notice_board_title }}&nbsp; &nbsp; &nbsp;
              <span class="notice-date" style="color: gray; font-size: 10pt">
                {{
                  currentNotice.notice_board_date
                    ? currentNotice.notice_board_date.substring(0, 10)
                    : ""
                }}
              </span>
            </span>
          </router-link>
          <div v-else class="notice-item" :key="currentNotice.notice_board_no">
            공지사항이 없습니다.
          </div>
        </transition>
      </div>
      <button @click="next" class="nav-button right-button">›</button>
    </div>

    <!-- 여기서 전체메뉴 -->

    <div class="w-100 mt-5" style="padding-left: 190px; color: #5e5e5e">
      <div class="w-100 mx-auto text-start mb-2">
        <template v-if="getIsChecked == false">
          <span class="menu-title">My Mileage</span>
          <span
            v-for="(item, index) in filteredMileageInfo"
            :key="index"
            class="menu"
          >
            <router-link
              :to="{
                name: 'mileageDetail',
                params: { mile_no: item.mile_no },
              }"
              class="link-menu"
            >
              {{ item.mile_name }}</router-link
            >
          </span>
        </template>
        <template v-else-if="getLoginInfo?.user_is_admin">
          <span class="menu-title">Management</span>
          <span class="menu"><a href="/kingMain" class="link-menu">마왕 관리</a></span>
          <span class="menu"><a href="/mileageManagementView" class="link-menu">마일리지 관리</a></span>
          <span class="menu"><a href="/m_TipListView" class="link-menu">M-Tip 관리</a></span>
        </template>
        <template v-else-if="getLoginInfo?.user_is_manager">
          <span class="menu-title">Management</span>
          <span class="menu"><a href="/introduceMileageAdminView" class="link-menu">마일리지 소개</a></span>
          <span class="menu"><a href="/commentMieageeAdminView" class="link-menu">추천 멘트</a></span>
          <span class="menu"><a href="/documentsMileageAdminView" class="link-menu">문서 관리</a></span>
          <span class="menu"><a href="/scoreMileageAdminView" class="link-menu">점수 관리</a></span>
        </template>
      </div>
      <div class="w-100 mx-auto text-start mb-2">
        <span class="menu-title">Info Zone</span>
        <template v-if="getIsChecked == false">
          <span class="menu"
            ><a href="/documentsView" class="link-menu">문서모아</a></span
          >
          <span class="menu"
            ><a href="/m_TipMainView" class="link-menu">M-Tip</a></span
          >
        </template>
        <span class="menu"
          ><a href="/noticeListView" class="link-menu">공지사항</a></span
        >
      </div>
      <div class="w-100 mx-auto text-start">
        <span class="menu-title">Help Desk</span>
        <span class="menu"
          ><a href="/qnaListView" class="link-menu">Q&A</a></span
        >
        <span class="menu"
          ><a href="/mileEasyContactView" class="link-menu"
            >업무별 연락처</a
          ></span
        >
      </div>
    </div>

    <div class="text-start" style="padding-left: 190px; margin-top: 50px">
      <span class="text-end" style="float: right; padding-right: 190px">
        <template v-if="getLoginInfo?.user_is_admin && isChecked">
          <p class="contact-info" @click="sendEmail" style="cursor: pointer"><i class="bi bi-envelope-at icon" ></i> mileage@kbfg.com</p>
        </template>
        <template v-else>
          <p class="contact-info" style="cursor: pointer">
            <i class="bi bi-send-plus icon"></i> <a href="/mileageRequesList"
            style="text-decoration:none; color: #989898">마일리지 요청</a>
          </p>
        </template>
        <p class="contact-info" style="cursor: pointer" @click="connecting">
          <i class="bi bi-telephone-outbound icon"></i> +82 02-2073-5959
        </p>
      </span>
    </div>

    <div style="margin-top: 120px; margin-bottom: 10px">
      <img
        src="@/assets/img/mini_logo2.png"
        class="mr-2 mb-2"
        style="width: 1.2%; color: black"
      />MileEasy
    </div>
    <div>&copy; 2024 MileEasy. All rights reserved.</div>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FooterView",
  data() {
    return {
      lastUpdateTime: Date.now(),
      pausedTime: 0,
      currentIndex: 0,
      autoSlide: null,
      loginInfoLoaded: false,
    };
  },
  async mounted() {
    await this.getFooterNotice();

    // loginInfo가 로드될 때까지 기다린다.
    const checkLoginInfo = async () => {
      while (!this.getLoginInfo) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      this.loginInfoLoaded = true;
      await this.$store.dispatch("mileage/getMileage"); // mileage 스토어의 getMileage 액션 디스패치
    };

    await checkLoginInfo();

    if (this.getFooterNotices.length > 0) {
      this.startAutoSlide();
    }

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  beforeUnmount() {
    this.stopAutoSlide();
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo", "getIsChecked"]),
    ...mapGetters("notice", ["getFooterNotices"]),
    ...mapGetters("mileage", ["getArrayMileage"]),
    filteredMileageInfo() {
      if (!this.loginInfoLoaded || !this.getLoginInfo) {
        return [];
      }

      if (this.getLoginInfo.job_no === "기획") {
        return this.getArrayMileage.filter(
          (item) => item.mile_is_branch === false
        );
      }
      return this.getArrayMileage;
    },
    currentNotice() {
      return this.getFooterNotices[this.currentIndex] || {};
    },
    currentNoticeId() {
      return this.currentNotice.notice_board_no || null;
    },
    isChecked() {
      return this.getIsChecked;
    },
  },
  methods: {
    ...mapActions("notice", ["getFooterNotice"]),
    ...mapActions("mileage", ["getMileage"]), // mileage 스토어의 액션 매핑
    next() {
      if (this.getFooterNotices.length > 0) {
        this.currentIndex =
          (this.currentIndex + 1) % this.getFooterNotices.length;
      }
    },
    prev() {
      if (this.getFooterNotices.length > 0) {
        this.currentIndex =
          (this.currentIndex - 1 + this.getFooterNotices.length) %
          this.getFooterNotices.length;
      }
    },
    startAutoSlide() {
      if (this.getFooterNotices.length === 0) return;

      this.stopAutoSlide();
      this.lastUpdateTime = Date.now();
      this.autoSlide = setInterval(() => {
        const now = Date.now();
        if (now - this.lastUpdateTime + this.pausedTime >= 3000) {
          this.next();
          this.lastUpdateTime = now;
          this.pausedTime = 0;
        }
      }, 100);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlide);
    },
    handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        this.pausedTime = Date.now() - this.lastUpdateTime;
        this.stopAutoSlide();
      } else {
        this.startAutoSlide();
      }
    },
    resetSlide() {
      this.stopAutoSlide();
      this.currentIndex = 0;
      this.$nextTick(() => {
        this.startAutoSlide();
      });
    },
    connecting() {
      document.body.classList.add('swal-open');
     this.connectAlret();
     document.body.classList.remove('swal-open');
   },
   connectAlret() {
    let timerInterval;
    let timeLeft = 3; // 3초부터 시작
    
    this.$swal({
      title: "+82 02-2073-5959",
      html: "<b>${timeLeft}</b>초 후에 연결됩니다....",
      timer: 3000,
      timerProgressBar: true,
      scrollbarPadding: false,
      
      didOpen: () => {
        const popup = this.$swal.getPopup();
        popup.style.height = '200px'; // 원하는 높이로 조정

        this.$swal.showLoading();
        const timer = this.$swal.getHtmlContainer().querySelector("b");
        timer.textContent = `${timeLeft}`; // 초기 시간 설정
        timerInterval = setInterval(() => {
          timeLeft -= 1;
          timer.textContent = `${timeLeft}`;
          if (timeLeft === 0) {
            clearInterval(timerInterval);
          }
        }, 1000); // 1초마다 업데이트
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === this.$swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
   },
   sendEmail() {
      const email = "mileage@kbfg.com"; // 수신자 이메일 주소
      const subject = "MileEasy 관련하여 문의드립니다.";
      const body = "직원번호 : \n 이름: \n 문의 주제 : \n 내용 : ";

      // mailto 링크 생성
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // 새 창으로 mailto 링크 열기
      window.location.href = mailtoLink;
    }
  },
  watch: {
    getLoginInfo(newVal) {
      if (!newVal) {
        this.loginInfoLoaded = false; // 로그아웃 시 loginInfoLoaded를 false로 설정
      }
    },
  },
};
</script>


<style scoped>
.notice-container {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 190px;
  overflow: hidden;
  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;
  height: 70px;
}

.notice-item-wrapper {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.recent-notice {
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 150px; /* 고정 너비 설정 */
}

.megaphone-icon {
  width: 24px;
  margin-right: 8px;
}

.recent-notice-text {
  font-family: "KB_C3";
}

.notice-item {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 왼쪽 정렬로 변경 */
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}

.notice-title {
  font-family: "KB_C3";
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  z-index: 10;
  position: absolute; /* 버튼 위치 고정 */
}

.left-button {
  left: 10px;
}

.right-button {
  right: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.menu-title {
  display: inline-block;
  width: 120px; /* 원하는 너비 설정 */
  text-align: left;
  font-weight: bold;
}

.menu {
  margin-left: 30px;
  cursor: pointer;
}

.link-menu {
  text-decoration: none;
  color: #5e5e5e;
}

.contact-info {
  display: inline-block;
  padding: 2px 5px;
  color: #989898;
  border: 1px solid #ccc; /* 회색 테두리 */
  background-color: #f9f9f9;
  margin-right: 10px;
}

.icon {
  margin-right: 3px;
}

.contact-info p {
  margin: 0;
}

.circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f6f6f6;
  border: 1px solid #ccc;
  margin: 3px;
  font-size: 18px;
  color: #656565;
}

.circle i {
  display: inline-block;
  text-align: center;
  line-height: 1;
}


</style>