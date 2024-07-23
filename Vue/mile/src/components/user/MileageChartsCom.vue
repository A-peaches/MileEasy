<template>
  <div class="cards" style="background-color: #f9f9f9; height: 450px">
    <div class="container d-flex justify-content-between">
      <div class="title lg2 KB_C2">별별 마일리지</div>
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
    };
  },
  computed: {},
  methos: {},
};
</script>
  
<style scoped>
.chartTab {
  cursor: pointer;
  font-size: 16pt;
  color: #4b4a4a;
  font-family: 'KB_C3';
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
  font-family: 'KB_C2';
}

</style>
  