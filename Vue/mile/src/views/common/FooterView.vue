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
          <div class="notice-item" :key="currentIndex">
            <span class="notice-title">
              {{ notices[currentIndex].title }}&nbsp; &nbsp; &nbsp;
              <span class="notice-date" style="color: gray; font-size: 10pt">{{
                notices[currentIndex].date
              }}</span>
            </span>
          </div>
        </transition>
      </div>
      <button @click="next" class="nav-button right-button">›</button>
    </div>

    <!-- 여기서 전체메뉴 -->
    <div class="w-100 mt-5" style="padding-left: 190px; color : #5E5E5E">
      <div class="w-100 mx-auto text-start mb-2">
        <span class="menu-title">My Mileage</span> 
        <span class="menu">HRD</span>
        <span class="menu">Monthly Best</span>
        <span class="menu">Monthly Base</span>
        <span class="menu">HotTip</span>
        <span class="menu">Best PG</span>
        <span class="menu">Best Branch</span>
        <span class="menu">소비자 지원</span>
        <span class="menu">리그 테이블</span>
      </div>
      <div class="w-100 mx-auto text-start mb-2">
        <span class="menu-title">Info Zone</span> 
        <span class="menu">문서모아</span>
        <span class="menu">M-Tip</span>
        <span class="menu">공지사항</span>
      </div>
      <div class="w-100 mx-auto text-start">
        <span class="menu-title">Help Desk</span> 
        <span class="menu">Q&A</span>
        <span class="menu">업무별 연락처</span>
        <span class="menu">담당자 연락처</span>
      </div>
    </div>



    <div class="text-start" style="padding-left: 190px; margin-top:50px">
      <!-- <div class="contact-info"> -->
        <span class="text-end " style="float: right; padding-right: 190px">

        <p class="contact-info"><i class="bi bi-send-plus icon"></i> 마일리지 요청</p>
        <p class="contact-info"><i class="bi bi-telephone-outbound icon"></i> +82 02-2073-5959</p>
        <!-- <p class="contact-info"><i class="bi bi-envelope-at icon"></i> mileage@kbfg.com</p> -->
      </span>
      <!-- </div> -->
      <!-- <div class="contact-info">
       
      </div>
      <div class="contact-info">
       
      </div> -->
      <!-- <span class="text-end" style="float: right; padding-right: 190px">
        <span class="circle"><i class="bi bi-chat-left-dots"></i></span>
        <span class="circle"><i class="bi bi-cloud-check"></i></span>
        <span class="circle"><i class="bi bi-wifi"></i></span>
      </span> -->
    </div>

    <div style="margin-top: 130px; margin-bottom: 10px">
      <!-- <img src="@/assets/img/logo.png" alt="MileEasy Logo" style="height: 40px" />
        -->
      <i class="bi bi-apple mr-3"></i>MileEasy
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
      notices: [
        { date: "2024.01.22", title: "이것은 공지사항 입니다1" },
        { date: "2024.01.23", title: "공지를 공지공지 합니다2" },
        { date: "2024.01.24", title: "공지를 숑숑숑숑 떄립니다3" },
      ],
      lastUpdateTime: Date.now(),
      pausedTime: 0,
      currentIndex: 0,
      autoSlide: null,
    };
  },
  mounted() {
    this.startAutoSlide();
    this.getFooterNotice();
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
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("notice", ["getFooterNotices"]),

    filteredMyMile() {
      const jobNo = this.getLoginInfo ? this.getLoginInfo.job_no : null;
      if (!jobNo) {
        return [];
      }
      if (jobNo === "기획") {
        return this.getMyMile.filter((item) => item.mile_is_branch === false);
      }
      return this.getMyMile;
    },
  },
  methods: {
    ...mapActions("notice", ["getFooterNotice"]),
    ...mapActions("mileScore", ["getMyMiles"]),
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.notices.length) % this.notices.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.notices.length;
    },
    startAutoSlide() {
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