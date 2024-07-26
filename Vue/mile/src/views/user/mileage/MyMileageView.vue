<template>
  <div class="cards page-back mx-auto" style="color: #4B4A4A">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">나의 마일리지</h2>

    <div class="row mx-2" style="margin-top: 100px">
      <div
        v-for="(card, index) in mileageCards"
        :key="index"
        class="col-6 mb-3"
      >
        <div
          class="cards mx-3 fade-up-item"
          style="background-color: #f9f9f9; height: 280px; position: relative;"
        >
         <div class="flex-between">
          <div class= "flex mb-2">
            <div class="text-start KB_C3 fw-bolder" style="font-size: 18pt; margin: 0;">
              {{ card.title }}
            </div>
            <div class="text-end " style="top:-12px; position:relative; ">
              <a class=" KB_C3 brown"  style="text-decoration: none; font-size: 12pt;
              "><strong>바로가기 ></strong></a>
            </div>
          </div>
          </div>
          <div
            class="flex justify-content-between align-items-center"
            style="padding-bottom: 60px"
          >
            <div style="width: 55%; font-size: 32pt; position: relative;">
              <span class="KB_C2"> 
                <span class="KB_C2 highlight">{{ card.current }}</span> 
                / {{ card.total }}</span>
              <div class="text-start recent-update">
                ( 최근 업데이트 : 2024-07-15 )
              </div>
            </div>
            <div class="flex progress-container" style="width: 43%; height: 105%; position: relative;
            padding-right: 5%">
              <div class="progress-bar mb-4">
                <div
                  class="progress"
                  :style="{ height: getProgressHeight(card.current, card.total) }"
                ></div>
                <div class="marker top"><i class="bi bi-caret-right-fill"></i>&nbsp;상위 20%</div>
                <div class="marker middle"><i class="bi bi-caret-right-fill"></i>&nbsp;상위 60%</div>
                <div class="marker bottom"><i class="bi bi-caret-right-fill"></i>&nbsp;상위 100%</div>
              </div>
              <div class="below-text mb-2 ml-">&lt; 총 평균 대비 상위 그래프 &gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyMileageView",
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  data() {
    return {
      mileageCards: [
        {
          title: "연수 마일리지",
          current: 100,
          total: 200
        },
        {
          title: "Hot TIP 마일리지",
          current: 50,
          total: "-"
        },
        {
          title: "Monthly Best 마일리지",
          current: 100,
          total: 500
        },
        {
          title: "Monthly Base 마일리지",
          current: 300,
          total: 700
        },
        {
          title: "Best PG 마일리지",
          current: 100,
          total: "-"
        },
        {
          title: "Best 지점 마일리지",
          current: 180,
          total: 200
        },
        {
          title: "리그데이블 마일리지",
          current: 20,
          total: 200
        },
        {
          title: "소비자 지원부 마일리지",
          current: 70,
          total: 400
        },
      ],
    };
  },
  methods: {
    getProgressHeight(current, total) {
      if (total === "-") total = 200;
      const percentage = (current / total) * 100;
      return `${percentage}%`;
    },
    
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
  },
  created() {},
};
</script>

<style scoped>
.page-back {
  width: 70%;
  height: 100%;
  margin-top: 5%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding-right: 15px;
  padding-left: 15px;
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 살짝의 그림자 추가 */
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 0px;
}

.recent-update {
  font-size: 10pt;
  position: absolute;
  margin-top: 60px;
  color: gray;
}

.progress-bar {
  width: 60px;
  height: 95%;
  background-color: #e0e0e0;
  position: relative;
  border-radius: 5px;
  margin: 0 auto;
  overflow: visible;
}

.progress {
  width: 100%;
  background-color: #FFCA05;
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  transition: height 0.5s;
}

.marker {
  position: absolute;
  left: 70px;
  font-size: 12px;
  white-space: nowrap;
}

.top {
  top: 20%;
}

.middle {
  top: 60%;
}

.bottom {
  bottom: 0;
}

.below-text {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
  color: gray; /* 텍스트 색상 변경 */
}

.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.highlight {
  background-color: #FFF6D4;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8spx; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
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

</style>
