<template>
  <div v-if="!isMobile">
    <div class="flex" style="margin-left: 10%; margin-right: 10%">
      <div class="left-container" style="width: 25%">
        <profile class="fade-up-item" />
        <recommand class="my-5 fade-up-item recommand-cards"/>
        <attendance class="fade-up-item attendance-cards"  />
      </div>

      <div class="right-container" style="width: 70%; margin-left: 5%; position: sticky; top: 20px; height: 100vh;">
        <favorite class="fade-up-item favorite-cards"  />
        <milageCharts class="fade-up-item mileageCharts-cards"  />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="">
      <profile class="fade-up-item mx-auto" />
      <favorite class="fade-up-item favorite-cards mx-auto"  />
      <milageCharts class="fade-up-item mileageCharts-cards mx-auto" />
      <recommand class="my-5 fade-up-item recommand-cards"/>
      <attendance class="fade-up-item attendance-cards" />
    </div>
  </div>
</template>

<script>
import favorite from '@/components/user/FavoriteCom.vue';
import recommand from '@/components/user/MileRecommand.vue';
import milageCharts from '@/components/user/MileageChartsCom.vue';
import attendance from '@/components/user/AttendanceCom.vue';
import profile from '@/components/user/ProfileCom.vue';
import { mapGetters } from 'vuex';
import MobileDetect from "mobile-detect";

export default {
  name: 'UserMainView',
  components: { favorite, recommand, milageCharts, attendance, profile },
  data() {
    return {
      isMobile: false,
    }
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods : {
  

    setTransitionDelay(el, index) {
      el.style.setProperty('--index', index);
    }
  },
  mounted() {
    // 모바일 기기 판단 여부 
    const md = new MobileDetect(window.navigator.userAgent);
    this.isMobile = md.mobile() !== null;

    this.$nextTick(() => {
      const items = this.$el.querySelectorAll('.fade-up-item');
      items.forEach((item, index) => {
        item.style.setProperty('--index', index);
        item.style.setProperty('z-index', 10 - index); // z-index 설정
        setTimeout(() => {
          item.classList.add('fade-up-active');
        }, 100 * index); // 각 아이템마다 지연 시간을 다르게 설정
      });
    });
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .fade-up-item {
    margin-bottom: 20px !important;
  }
  .mileageCharts-cards{
    width: 100%; 
    height: 500px; 
    overflow: scroll; 
  }

}

.attendance-cards {
  min-height: 395px; 
  overflow: visible;
}

.recommand-cards{
  height: 210px;
}

.mileageCharts-cards{
  width: 100%; 
  height: 430px; 
  overflow: visible; 
}

.favorite-cards{
  width: 100%; 
  margin-bottom: 49px;
}

.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
  transition-delay: calc(var(--index) * 100ms);
  position: relative; /* z-index가 작동하도록 */
}
.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}
.main-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
/* 출석 체크 컴포넌트에 대한 추가 스타일 */
/* .left-container > :last-child {
  margin-bottom: 20px; 
} */
</style>