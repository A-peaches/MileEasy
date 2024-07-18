<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">마일리지 방문자 수</p>
    <div class="flex">
      <div class="cards favorite-card">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from 'chart.js/auto'; // Chart.js를 import

export default {
  name: 'MileagePageConunt',
  data() {
    return {
      isModalOpen: false,
      chart: null, // 차트 인스턴스를 저장할 변수 추가
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart');
      if (!ctx) return; // DOM이 아직 준비되지 않았으면 종료

      const chartData = {
        type: 'bar',
        data: {
          labels: [
            'HRD',
            'MonthlyBest',
            'MonthlyBase',
            'Hot Tip',
            'BEST PG',
            'BEST 지점',
            '소비자 지원',
            '리그 테이블 ',
          ],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3, 2, 9],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(20, 159, 64, 0.2)',
                'rgba(255, 10, 64, 0.2)',
                'rgba(255, 159, 8, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(20, 159, 64, 0.2)',
                'rgba(255, 10, 64, 0.2)',
                'rgba(255, 159, 8, 0.2)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      this.chart = new Chart(ctx, chartData);
    },
  },
  watch: {},
  mounted() {
    this.renderChart(); // 컴포넌트가 마운트될 때 차트를 렌더링합니다.
  },
  unmounted() {
    if (this.chart) {
      this.chart.destroy(); // 컴포넌트가 파괴될 때 차트 인스턴스를 제거합니다.
    }
  },
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  display: flex;
  height: 300px;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}
.addImg {
  width: 18%;
}
</style>
