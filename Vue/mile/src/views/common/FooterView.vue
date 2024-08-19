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
    <div v-if="!isMobile">
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
                  ? {
                      name: 'noticeDetailView',
                      params: { id: currentNoticeId },
                    }
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
                      : ''
                  }}
                </span>
              </span>
            </router-link>
            <div
              v-else
              class="notice-item"
              :key="currentNotice.notice_board_no"
            >
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
            <span class="menu"
              ><a href="/kingMain" class="link-menu">마왕 관리</a></span
            >
            <span class="menu"
              ><a href="/mileageManagementView" class="link-menu"
                >마일리지 관리</a
              ></span
            >
            <span class="menu"
              ><a href="/mTipMainAdminView" class="link-menu">M-Tip 관리</a></span
            >
          </template>
          <template v-else-if="getLoginInfo?.user_is_manager">
            <span class="menu-title">Management</span>
            <span class="menu"
              ><a href="/introduceMileageAdminView" class="link-menu"
                >마일리지 소개</a
              ></span
            >
            <span class="menu"
              ><a href="/commentMieageeAdminView" class="link-menu"
                >추천 멘트</a
              ></span
            >
            <span class="menu"
              ><a href="/documentsMileageAdminView" class="link-menu"
                >문서 관리</a
              ></span
            >
            <span class="menu"
              ><a href="/scoreMileageAdminView" class="link-menu"
                >점수 관리</a
              ></span
            >
          </template>
        </div>
        <div class="w-100 mx-auto text-start mb-2">
          <span class="menu-title">Info Zone</span>
          <template v-if="getIsChecked == false">
            <span class="menu"
              ><a href="/documentsView" class="link-menu">문서모아</a></span
            >
            <span class="menu"
              ><a href="/M-Tip" class="link-menu">M-Tip</a></span
            >
          </template>
          <span class="menu"
            ><a href="/noticeListView" class="link-menu">공지사항</a></span
          >
        </div>
        <div class="w-100 mx-auto text-start">
          <span class="menu-title">Help Desk</span>
          <!-- <span class="menu"
          ><a href="/qnaListView" class="link-menu">Q&A</a></span
        > -->
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
            <p class="contact-info" @click="sendEmail" style="cursor: pointer">
              <i class="bi bi-envelope-at icon"></i> mileage@kbfg.com
            </p>
          </template>
          <template v-else>
            <p class="contact-info" style="cursor: pointer">
              <i class="bi bi-send-plus icon"></i>
              <a
                href="/mileageRequesList"
                style="text-decoration: none; color: #989898"
                >마일리지 요청</a
              >
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
    </div>

    <!-- 모바일 버전 코드 -->
    <div v-else>
      <div class="mobile-notice-container">
        <div class="mobile-recent-notice">
          <span class="mobile-recent-notice-text">최근 공지사항</span>
        </div>
        <div class="mobile-notice-item-wrapper">
          <transition name="slide">
            <router-link
              :to="
                currentNoticeId
                  ? {
                      name: 'noticeDetailView',
                      params: { id: currentNoticeId },
                    }
                  : ''
              "
              class="mobile-notice-item"
              :key="currentIndex"
              v-if="currentNoticeId !== null"
              style="text-decoration: none; color: #4b4b4b"
            >
              <div class="d-flex align-items-center mt-2">
                <span class="mobile-notice-date" style="width: 150px">
                  {{
                    currentNotice.notice_board_date
                      ? currentNotice.notice_board_date.substring(0, 10)
                      : ''
                  }}
                </span>
                <span class="mobile-notice-title">
                  {{
                    currentNotice.notice_board_title
                      ? currentNotice.notice_board_title.substring(0, 20)
                      : ''
                  }}
                </span>
              </div>
            </router-link>
            <div v-else class="mobile-notice-item" :key="currentIndex">
              공지사항이 없습니다.
            </div>
          </transition>
          <div class="mobile-notice-nav">
            <button @click="prev" class="mobile-nav-button">&lt;</button>
            <button @click="next" class="mobile-nav-button">&gt;</button>
          </div>
        </div>
      </div>

      <div class="mobile-contact-info">
        <template v-if="getLoginInfo?.user_is_admin && isChecked">
          <p class="mobile-contact-item" @click="sendEmail">
            <i class="bi bi-envelope-at icon"></i> mileage@kbfg.com
          </p>
        </template>
        <p class="mobile-contact-item">
          <i class="bi bi-send-plus icon"></i>
          <a
            href="/mileageRequesList"
            style="text-decoration: none; color: #989898"
            >마일리지 요청</a
          >
        </p>
        <p class="mobile-contact-item" @click="connecting">
          <i class="bi bi-telephone-outbound icon"></i> +82 02-2073-5959
        </p>
      </div>

      <div class="mobile-footer-logo">
        <img src="@/assets/img/mini_logo2.png" class="mobile-logo-image" />
        MileEasy
      </div>
      <div class="mobile-copyright">
        &copy; 2024 MileEasy. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FooterView',
  data() {
    return {
      lastUpdateTime: Date.now(),
      pausedTime: 0,
      currentIndex: 0,
      autoSlide: null,
      loginInfoLoaded: false,
      isMobile: false,
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
      await this.$store.dispatch('mileage/getMileage'); // mileage 스토어의 getMileage 액션 디스패치
    };

    await checkLoginInfo();

    if (this.getFooterNotices.length > 0) {
      this.startAutoSlide();
    }

    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    this.stopAutoSlide();
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );
    window.removeEventListener('resize', this.checkMobile);
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters('notice', ['getFooterNotices']),
    ...mapGetters('mileage', ['getArrayMileage']),
    filteredMileageInfo() {
      if (!this.loginInfoLoaded || !this.getLoginInfo) {
        return [];
      }

      if (this.getLoginInfo.job_no === '기획') {
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
    ...mapActions('notice', ['getFooterNotice']),
    ...mapActions('mileage', ['getMileage']), // mileage 스토어의 액션 매핑
    checkMobile() {
      this.isMobile = window.innerWidth <= 768; // 768px 이하를 모바일로 간주
    },
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
      if (document.visibilityState === 'hidden') {
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
        title: '+82 02-2073-5959',
        html: '<b>${timeLeft}</b>초 후에 연결됩니다....',
        timer: 3000,
        timerProgressBar: true,
        scrollbarPadding: false,

        didOpen: () => {
          const popup = this.$swal.getPopup();
          popup.style.height = '200px'; // 원하는 높이로 조정

          this.$swal.showLoading();
          const timer = this.$swal.getHtmlContainer().querySelector('b');
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
          console.log('I was closed by the timer');
        }
      });
    },
    sendEmail() {
      const email = 'mileage@kbfg.com'; // 수신자 이메일 주소
      const subject = 'MileEasy 관련하여 문의드립니다.';
      const body = '직원번호 : \n 이름: \n 문의 주제 : \n 내용 : ';

      // mailto 링크 생성
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // 새 창으로 mailto 링크 열기
      window.location.href = mailtoLink;
    },
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
/* 모바일 버전 스타일 */
@media (max-width: 768px) {
  .mobile-notice-container {
    padding: 10px !important;
    border-bottom: 1px solid #dedede !important;
    position: relative !important;
  }

  .mobile-recent-notice-text {
    font-weight: bold !important;
    margin-bottom: 5px !important;
  }

  .mobile-notice-item-wrapper {
    height: 40px !important;
    overflow: hidden !important;
    position: relative !important;
  }

  .mobile-notice-item {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    position: absolute !important;
    width: 100% !important;
    transition: all 0.5s ease !important;
  }

  .mobile-notice-title {
    font-size: 0.9rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    width: 100% !important;
  }

  .mobile-notice-date {
    font-size: 0.8rem !important;
    color: gray !important;
  }

  .mobile-notice-nav {
    position: absolute !important;
    right: 10px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }

  .mobile-nav-button {
    background: none !important;
    border: none !important;
    font-size: 18px !important;
    cursor: pointer !important;
    padding: 5px !important;
  }

  .mobile-menu-container {
    padding: 15px !important;
  }

  .mobile-menu-section {
    margin-bottom: 20px !important;
  }

  .mobile-menu-title {
    font-weight: bold !important;
    display: block !important;
    margin-bottom: 10px !important;
  }

  .mobile-menu-items {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
  }

  .mobile-menu-link {
    text-decoration: none !important;
    color: #5e5e5e !important;
    margin-right: 15px !important;
    margin-bottom: 5px !important;
  }

  .mobile-contact-info {
    padding: 15px !important;
    text-align: center !important;
  }

  .mobile-contact-item {
    margin-bottom: 10px !important;
    cursor: pointer !important;
  }

  .mobile-footer-logo {
    margin-top: 20px !important;
    text-align: center !important;
  }

  .mobile-logo-image {
    width: 30px !important;
    margin-right: 5px !important;
  }

  .mobile-copyright {
    font-size: 0.8rem;
    text-align: center !important;
    margin-top: 10px !important;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease !important;
  }

  .slide-enter-from {
    transform: translateY(100%) !important;
    opacity: 0 !important;
  }

  .slide-leave-to {
    transform: translateY(-100%) !important;
    opacity: 0 !important;
  }

  .slide-enter-to,
  .slide-leave-from {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }
}

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
  font-family: 'KB_C3';
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
  font-family: 'KB_C3';
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
