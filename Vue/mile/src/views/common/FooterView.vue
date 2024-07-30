<template>
  <footer style="padding-top: 20px; text-align: center; height: 500px; background-color: #fbfbfb;">
    <div style="margin-top: 80px"></div>

    <div class="notice-container">
      <button @click="prev" class="nav-button left-button">‹</button>
      <div class="recent-notice">
        <span class="recent-notice-text">최근 공지사항 :</span>
      </div>
      <div class="notice-item-wrapper">
        <transition-group name="slide">
          <div class="notice-item" v-for="(notice, index) in notices" :key="index" v-show="index === currentIndex">
            
            <span class="notice-title">{{ notice.title }}&nbsp; &nbsp; &nbsp; 
              <span class="notice-date" style="color : gray; font-size:10pt">{{ notice.date }}</span>
            </span>
          </div>
        </transition-group>
      </div>
      <button @click="next" class="nav-button right-button">›</button>
    </div>

    <div style="margin-top: 50px; margin-bottom: 10px">
      <img src="footer-logo.png" alt="MileEasy Logo" style="height: 40px" />
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
      currentIndex: 0,
      autoSlide: null
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
  methods: {
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.notices.length) % this.notices.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.notices.length;
    },
    startAutoSlide() {
      this.autoSlide = setInterval(this.next, 3000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlide);
    }
  }
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
  font-family: 'KB_C3';
}

.notice-item {
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬을 위해 변경 */
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}

.notice-title {
  font-family: 'KB_C3';
  font-size: 1rem;
  text-align: center; /* 텍스트 중앙 정렬 */
  width: 100%; /* 전체 너비 사용 */
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
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>