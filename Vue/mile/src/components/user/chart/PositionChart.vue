<template>
    <div class="chart-container">
      <!-- 직급별 차트 그리기 -->
      <h3>직급별</h3>
      <canvas id="positionChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    name: "PositionChart",
    mounted() {
      // 직급별 차트 생성 로직
      const ctx = document.getElementById('positionChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          // 직급별 데이터
          labels: ['사원', '대리', '과장', '차장', '부장'],
          datasets: [{
            data: [15, 25, 35, 20, 5],
            backgroundColor: '#36A2EB'
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
  