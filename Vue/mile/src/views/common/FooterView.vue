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
    <div class="container-fuild mt-5" style=" color : #5E5E5E">
      <div class="row justify-content-center mx-auto w-100">

      <div class="col-lg-2 " style="width:8%" >
        <div class="menu">나의 마일리지</div>
        <div class="menu">HRD</div>
        <div class="menu">Monthly Best</div>
        <div class="menu">Monthly Base</div>
        <div class="menu">HotTip</div>

      </div>

      <div class="col-md-2" style="width:8%">
        <div class="menu">Best PG</div>
        <div class="menu">Best Branch</div>
        <div class="menu">소비자 지원</div>
        <div class="menu">리그 테이블</div>
      </div>


      <div class="col-md-2" style="width:8%">
        <div class="menu">문서모아</div>
        <div class="menu">M-Tip</div>
        <div class="menu">공지사항</div>
      </div>

      <div class="col-md-1" style="width:8%">
        <div class="menu">Q&A</div>
        <div class="menu">업무별 연락처</div>
        <div class="menu">담당자 연락처</div>
      </div>
    </div>
  </div>
    <div class="text-start mt-5" style="padding-left: 190px">
      <div class="contact-info">
        <p><i class="bi bi-send-plus icon"></i> 마일리지 요청</p>
      </div>
      <div class="contact-info">
        <p><i class="bi bi-telephone-outbound icon"></i> +82 02-2073-5959</p>
      </div>
      <div class="contact-info">
        <p><i class="bi bi-envelope-at icon"></i> mileEasy@kbfg.com</p>
      </div>
      <span class="text-end" style="float: right; padding-right: 190px">
        <span class="circle"><i class="bi bi-chat-left-dots"></i></span>
        <span class="circle"><i class="bi bi-cloud-check"></i></span>
        <span class="circle"><i class="bi bi-wifi"></i></span>
      </span>
    </div>

    <div style="margin-top: 50px; margin-bottom: 10px">
      <!-- <img src="@/assets/img/logo.png" alt="MileEasy Logo" style="height: 40px" />
        -->
      <i class="bi bi-apple mr-3"></i>MileEasy
    </div>
    <div>&copy; 2024 MileEasy. All rights reserved.</div>
  </footer>
</template>



<script>
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
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  beforeUnmount() {
    this.stopAutoSlide();
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  },
  methods: {
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
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.menu {
  margin: 0px 5px;
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