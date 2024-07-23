<template>
    <div class="chart-container">
      <!-- 연령별 차트 그리기 -->
      <h3>연령별</h3>
      <canvas id="ageChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    name: "AgeChart",
    mounted() {
      // 연령별 차트 생성 로직
      const ctx = document.getElementById('ageChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          // 연령별 데이터
          labels: ['20대', '30대', '40대', '50대 이상'],
          datasets: [{
            data: [10, 20, 30, 40],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  </style>
  