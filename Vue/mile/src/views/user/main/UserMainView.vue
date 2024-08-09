<template>
  <div class="container-fluid">
    <div class="row" style="margin-left: 10%; margin-right: 10%">
      <div class="col-12 col-md-3 mb-4">
        <profile class="fade-up-item" />
        <recommand class="my-5 fade-up-item" style="height: 210px" />
        <attendance class="fade-up-item" style="min-height: 395px; overflow: visible;" />
      </div>

      <div class="col-12 col-md-9" style="position: sticky; top: 20px;">
        <favorite class="fade-up-item" style="width: 100%; margin-bottom: 49px;" />
        <milageCharts class="fade-up-item" style="width: 100%; height: 430px; overflow: visible;" />
      </div>
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

export default {
  name: 'UserMainView',
  components: { favorite, recommand, milageCharts, attendance, profile },
  data() {
    return {}
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
  .left-container,
  .right-container {
    width: 100% !important;
  }
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
