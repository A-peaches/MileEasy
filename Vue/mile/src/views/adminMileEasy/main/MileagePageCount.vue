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
              label: '방문자 수',
              data: this.chartData,
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
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
}
.addImg {
  width: 18%;
}
</style>
