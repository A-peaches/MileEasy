<template>
    <div class="chart-container">
      <!-- 직무별 차트 그리기 -->
  
      <canvas id="jobChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    name: "JobChart",
    mounted() {
      // 직무별 차트 생성 로직
      const ctx = document.getElementById('jobChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          // 직무별 데이터
          labels: ['개발', '기획', '디자인', '마케팅'],
          datasets: [{
            data: [25, 25, 25, 25],
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
  