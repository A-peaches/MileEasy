<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px">
    <div class="tab-container" style="margin">
      <span @click="selectedTab = 'age'" :class="{ active: selectedTab === 'age' }">연령별</span>
      <span @click="selectedTab = 'position'" :class="{ active: selectedTab === 'position' }">직급별</span>
      <span @click="selectedTab = 'job'" :class="{ active: selectedTab === 'job' }">직무별</span>
    </div>
    <div class="chart-display">
      <AgeChart v-if="selectedTab === 'age'" />
      <PositionChart v-if="selectedTab === 'position'" />
      <JobChart v-if="selectedTab === 'job'" />
    </div>

  </div>
</template>
  
  <script>
  import AgeChart from './chart/AgeChart.vue';
import PositionChart from './chart/PositionChart.vue';
import JobChart from './chart/JobChart.vue';

export default {
  
  name: "AttendanceCom",
  components: { AgeChart, PositionChart, JobChart },
  data() {
    return {
      selectedTab: 'age'
    };
  },
  computed: {},
  methos: {},
};
</script>
  
<style scoped>
.tab-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-container span {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
}

.tab-container .active {
  background-color: #42b983;
  color: white;
}

.chart-display {
  width: 100%;
  height: 300px;
}
</style>
  