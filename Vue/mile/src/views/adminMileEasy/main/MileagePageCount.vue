<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">마일리지 방문자 수</p>
      <div class="cards favorite-card">
        <div class="text-right">
          <input type="date" class="date" id="date" />
        </div>
        <br />
        <div class="sub">
          <div class="chart-container">
            <canvas id="myChart"></canvas>
          </div>
          <div class="best">
            <img
              src="@/assets/imoji/kolly/콜리얼굴최고.png"
              style="width: 100px; height: 100px"
            />
            <div class="lg2 KB_C2" style="font-weight: bold">
              <i class="bi bi-trophy-fill"></i> 1위
            </div>
            <p class="lg2 KB_C2" style="font-weight: bold">
              <mark>{{ chartBest }}</mark>
            </p>
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
          ? this.getHitMileChart.map((item) => item.hit_count || item.ht_count)
          : [];
      console.log('Chart Data:', data);
      return data;
    },
    chartBest() {
      if (this.chartData.length === 0) return -1; // 빈 배열이면 -1 반환

      let maxIndex = 0;
      for (let i = 0; i < this.chartData.length; i++) {
        if (this.chartData[i] > this.chartData[maxIndex]) {
          maxIndex = i;
        }
      }

      console.log('Index of max value:', maxIndex);
      return this.getArrayMileage[maxIndex].mile_name;
    },
  },
  watch: {
    getArrayMileage: 'renderChart',
    getHitMileChart: 'renderChart',
  },
  methods: {
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
              borderWidth: 1,
              barThickness: 40, // 막대 두께 설정 (픽셀 단위)
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                display: false,
              },
              grid: {
                drawBorder: false,
                display: false,
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
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
          maintainAspectRatio: false,
          responsive: true,
        },
      };

      this.chart = new Chart(ctx, chartData);
    },
    setInitialDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const formattedDate = yesterday.toISOString().split('T')[0];

      const dateInput = document.getElementById('date');
      dateInput.value = formattedDate;
      dateInput.setAttribute('max', formattedDate); // 최대 날짜를 오늘의 전날로 설정
    },
  },
  mounted() {
    console.log('Component mounted');
    this.setInitialDate(); // 날짜 입력 필드 초기화
    this.$store.dispatch('mileage/getMileage');
    this.$store.dispatch('hitMile/hit_mileChart');
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.sub {
  display: flex;
  position: relative;
}

.chart-container {
  flex: 1;
  height: 100%;
  bottom: 0;
  height: 230px;
  width: 65%;
  padding-left: 25px;
}

.best {
  width: 25%;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  margin-top: 35px;
}

.cards {
  overflow: hidden;
}
.bi-trophy-fill {
  color: #ffca05;
}
.date {
  border: 1px solid;
  border-radius: 8px;
  border-color: #cecece;
}
</style>
