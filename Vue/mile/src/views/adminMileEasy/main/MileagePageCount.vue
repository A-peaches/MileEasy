<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">마일리지 방문자 수</p>
      <div class="cards favorite-card">
        <div class="text-right">
          <input type="date" />
        </div>
        <br />
        <div class="chart-img-container">
          <div class="chart-container">
            <canvas id="myChart"></canvas>
          </div>

          <div>
            <img :src="randomImg" alt="randomImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'MileagePageCount',
  data() {
    return {
      chart: null,
      images: [
        require('@/assets/imoji/recommand/1.png'),
        require('@/assets/imoji/recommand/2.png'),
        require('@/assets/imoji/recommand/3.png'),
        require('@/assets/imoji/recommand/4.png'),
        require('@/assets/imoji/recommand/6.png'),
        require('@/assets/imoji/recommand/7.png'),
        require('@/assets/imoji/recommand/8.png'),
        require('@/assets/imoji/recommand/9.png'),
        require('@/assets/imoji/recommand/10.png'),
        require('@/assets/imoji/recommand/11.png'),
        require('@/assets/imoji/recommand/12.png'),
        require('@/assets/imoji/recommand/13.png'),
        require('@/assets/imoji/recommand/14.png'),
        require('@/assets/imoji/recommand/15.png'),
      ],
      randomImg: null,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getArrayMileage']),
    ...mapGetters('hitMile', ['getHitMileChart']),
    chartLabels() {
      const labels =
        this.getArrayMileage && this.getArrayMileage.length
          ? this.getArrayMileage.map((item) => item.mile_name)
          : [];
      console.log('Chart Labels:', labels);
      return labels;
    },
    chartData() {
      const data =
        this.getHitMileChart && this.getHitMileChart.length
          ? this.getHitMileChart.map((item) => item.hit_count || item.ht_count) // item.ht_count 추가
          : [];
      console.log('Chart Data:', data);
      return data;
    },
  },
  watch: {
    getArrayMileage: 'renderChart',
    getHitMileChart: 'renderChart',
  },
  methods: {
    getRandomImg() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      return this.images[randomIndex];
    },
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }

      const chartData = {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              data: this.chartData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(20, 159, 64, 0.2)',
                'rgba(200, 70, 64, 0.2)',
                'rgba(255, 159, 8, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(20, 159, 90, 1)',
                'rgba(200, 70, 90, 1)',
                'rgba(255, 159, 90, 1)',
              ],
              borderWidth: 1, // 차트 테두리 제거
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false, // 차트의 label 제거
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: false, // 왼쪽 축의 숫자 제거
              },
              grid: {
                drawBorder: false,
                display: false, // 격자선 제거
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false, // 격자선 제거
              },
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          maintainAspectRatio: false, // 차트의 비율을 유지하지 않음
          responsive: true,
        },
      };

      this.chart = new Chart(ctx, chartData);
    },
  },
  mounted() {
    console.log('Component mounted');
    this.$store.dispatch('mileage/getMileage');
    this.$store.dispatch('hitMile/hit_mileChart');
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  created() {
    this.randomImg = this.getRandomImg();
  },
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  position: relative; /* 상대 위치 설정 */
}

.chart-img-container {
  display: flex;
  position: relative; /* 절대 위치 설정 */
}

.chart-container {
  flex: 1; /* 차트 컨테이너가 남은 공간을 모두 차지하도록 설정 */
  height: 100%;
  bottom: 0;
}

.addImg {
  width: 100px; /* 이미지의 너비를 100px로 설정 */
  height: 100px; /* 이미지의 높이를 100px로 설정 */
}
.cards {
  overflow: hidden;
}
</style>
