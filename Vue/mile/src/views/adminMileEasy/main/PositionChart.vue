<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">직급별 방문자 수</p>
      <div class="cards favorite-card">
        <div class="sub">
          <div class="chart-container">
            <canvas :id="chartId"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'PieChartComponent',
  data() {
    return {
      chart: null,
      chartId: 'pieChart-' + Math.random().toString(36).substr(2, 9), // Unique ID for the chart
    };
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy(); // Destroy the chart when component is unmounted
    }
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/api/chart-data'
        );
        // Ensure response data is in the expected format
        return response.data;
      } catch (error) {
        console.error('Error fetching chart data:', error);
        return { labels: [], values: [] }; // Return empty data structure on error
      }
    },
    async renderChart() {
      const chartData = await this.fetchChartData();
      const ctx = document.getElementById(this.chartId).getContext('2d');

      if (this.chart) {
        this.chart.destroy(); // Destroy the existing chart
      }

      this.chart = new Chart(ctx, {
        type: 'pie', // Pie chart type
        data: {
          labels: chartData.labels, // Pie chart labels
          datasets: [
            {
              data: chartData.values, // Pie chart data
              backgroundColor: [
                '#FF6384', // Red
                '#36A2EB', // Blue
                '#FFCE56', // Yellow
                '#FF5733', // Orange
                '#33FF57', // Green
                '#5733FF', // Purple
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 80%;
  height: 400px;
}

.favorite-card {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sub {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
