<template>
  <div class="chart-container">
    <!-- 연령별 차트 그리기 -->
    <canvas id="ageChart"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "AgeChart",
  data() {
    return {
      ageChartData: [0, 0, 0, 0] // 초기값을 설정합니다.
    };
  },
  computed: {
    ...mapGetters("mileScore", ["getMileAges"]),
    ...mapGetters("login", ["getLoginInfo"]),
    mileAges() {
      return this.getMileAges;
    }
  },
  methods: {
    ...mapActions("mileScore", ["getMileAge"]),
    createChart() {
      const ctx = document.getElementById('ageChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['20대', '30대', '40대', '50대 이상'],
          datasets: [{
            data: this.ageChartData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    async loadMileAgeData() {
      await this.getMileAge(this.getLoginInfo.user_no);
      if (this.mileAges) { // mileAges가 객체이므로 length 대신 존재 여부를 확인
        this.ageChartData = [
          this.mileAges.mile20,
          this.mileAges.mile30,
          this.mileAges.mile40,
          this.mileAges.mile50
        ];
        this.createChart();
      } else {
        console.error('No data available for mileAges');
      }
    }
  },
  async mounted() {
    await this.loadMileAgeData();
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
