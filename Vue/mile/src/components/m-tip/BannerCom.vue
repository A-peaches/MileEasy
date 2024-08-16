<template>
  <div class="cards banner-back">
    <video autoplay muted loop playsInline webkit-playsinline class="video-background">
      <source :src="currentVideoSrc" type="video/mp4" />
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
      desktopVideo: require('@/assets/M-Tip.mp4'),
      mobileVideo: require('@/assets/M-Tip_mobile.mp4'),
      windowWidth: window.innerWidth
    };
  },
  methods :{
    navigate() {
      window.location.href = '/m_TipWriteView';
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    currentVideoSrc() {
      return this.windowWidth <= 768 ? this.mobileVideo : this.desktopVideo;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  };
  </script>
  
  <style scoped>
.banner-back {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 320px;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 101%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.video-overlay {
  position: absolute;
  top: 85%;
  left: 5%;
  width: 22%;
  height: 15%;
  cursor: pointer;
  z-index: 2;
}

  
@media (max-width: 768px) {
  .banner-back {
    min-height: 200px;
  }
  
  .video-overlay {
    width: 30%;
  }

  
}

@media (max-width: 480px) {
  .banner-back {
    min-height: 150px;
  }
  
  .video-overlay {
    width: 40%;
  }
}
  </style>