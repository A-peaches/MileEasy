<template>
    <div class="cards banner-back" style="height: 105%">
    <video autoplay muted loop class="video-background">
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  </template>
  
  <script>
  export default {
    name: 'BannerCom',
    data() {
    return {
      videoSrc: require('@/assets/M-Tip.mp4')
    };
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
  transform: translate(-49.9%, -49.9%);
  z-index: 1; /* 콘텐츠 뒤로 배치 */
}

  </style>