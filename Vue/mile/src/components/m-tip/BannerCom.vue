<template>
    <div class="cards banner-back" style="height: 320px">
    <video autoplay muted loop class="video-background">
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="video-overlay" @click="navigate"></div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'BannerCom',
    data() {
    return {
      videoSrc: require('@/assets/M-Tip.mp4')
    };
  },
  methods :{
    navigate() {
      window.location.href = '/m_TipWriteView';
    }
  }
  };
  </script>
  
  <style scoped>
.banner-back {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-49.92%, -50%);
  z-index: 1; /* 콘텐츠 뒤로 배치 */
}
.video-overlay {
  position: absolute;
  top: 85%;
  left: 5%;
  width: 22%; /* 왼쪽 반만 클릭 가능하게 */
  height: 15%;
  cursor: pointer;
  z-index : 2;
}
  </style>