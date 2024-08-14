<template>
  <div class="cards mileage-container" >
    <div class="container d-flex justify-content-between">
      <div class="title lg2 KB_C2">
        별별 마일리지
        <!-- 도움말 -->
        <span class="mx-2 help-icon" @click="toggleHelpPopover" ref="helpIcon">
          <i class="bi bi-question-circle"></i>
        </span>
        <!-- 팝오버 -->
        <div v-if="showHelpPopover" class="help-popover" ref="helpPopover">
          <div style="font-size:12pt">
            <span>최근 업데이트일자는 마일리지 정보가 가장 최근에 업데이트된 일자를 의미합니다. <br>
              모든 마일리지가 이 날짜에 변경된 것은 아닐 수 있습니다.</span>

          </div>
        </div>
      </div>

      <div class="tabs text-end lg2">
        <span
          @click="selectedTab = 'age'"
          :class="{ active: selectedTab === 'age', chartTab: true }"
          class="chartTab"
          >연령별</span
        >&nbsp;|&nbsp;
        <span
          @click="selectedTab = 'position'"
          :class="{ active: selectedTab === 'position', chartTab: true }"
          class="chartTab"
          >직급별</span
        >&nbsp;|&nbsp;
        <span
          @click="selectedTab = 'job'"
          :class="{ active: selectedTab === 'job', chartTab: true }"
          class="chartTab"
          >직무별</span
        >
      </div>
    </div>
    <div class="chart-display">
      <AgeChart v-if="selectedTab === 'age'" />
      <PositionChart v-if="selectedTab === 'position'" />
      <JobChart v-if="selectedTab === 'job'" />
    </div>
  </div>
</template>
  
  <script>
import AgeChart from "./chart/AgeChart.vue";
import PositionChart from "./chart/PositionChart.vue";
import JobChart from "./chart/JobChart.vue";

export default {
  name: "AttendanceCom",
  components: { AgeChart, PositionChart, JobChart },
  data() {
    return {
      selectedTab: "age",
      showHelpPopover: false,
    };
  },
  computed: {},
  methods: {
    toggleHelpPopover(event) {
      event.stopPropagation(); // 이벤트 전파 중지
      console.log('toggleHelpPopover 클릭');
      this.showHelpPopover = !this.showHelpPopover;
      console.log('showHelpPopover:', this.showHelpPopover); // 추가
      if (this.showHelpPopover) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      console.log('handleClickOutside 실행');
      if (this.$refs.helpPopover && !this.$refs.helpPopover.contains(event.target) && 
          !this.$refs.helpIcon.contains(event.target)) {
        console.log('팝오버 닫기');
        this.showHelpPopover = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
  },
  mounted() {
  },
  beforeUnmount() {
    // 컴포넌트가 언마운트되기 전에 이벤트 리스너 제거
    document.removeEventListener('click', this.handleClickOutside);
  },
};

</script>
  
<style scoped>
@media (max-width: 768px) {
  .mileage-container {
    width: 100% !important;
    height: 520px !important;
  }
  .chartTab {
    font-size: 13pt !important;
  }
  .tabs {
    margin-top: 3% !important;
  }
  .help-popover {
    width: 80% !important;
    overflow: auto !important;
    will-change: transform !important;
    left: 50px !important;  /* 조정 가능 */
    top: 45px !important;   /* 조정 가능 */
  }
  
}
.mileage-container{
  background-color: #f9f9f9; 
  height: 450px;
}

.chartTab {
  cursor: pointer;
  font-size: 16pt;
  color: #4b4a4a;
  font-family: "KB_C3";
}
.chart-display {
  width: 100%;
  height: 300px;
}

.tabs {
  display: flex;
  justify-content: flex-end;
}

.chartTab.active {
  font-family: "KB_C2";
}
.help-icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.help-popover {
  position: absolute;
  left: 190px;  /* 조정 가능 */
  top: 15px;   /* 조정 가능 */
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
  z-index: 10000;
  width: 600px;
  margin-left: 10px; /* 아이콘과의 간격 */
  display: block; /* 추가 */
  background-color: white; /* 임시로 눈에 띄는 색상 사용 */
  border: 2px solid #E4E4E4;
}
</style>
  