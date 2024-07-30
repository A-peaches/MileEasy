<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">{{ title }}</p>
    <div class="flex">
      <div class="cards favorite-card">
        <div class="dateround" style="text-align: right; margin-bottom: 20px">
          <input
            type="month"
            class="date"
            id="startDate"
            v-model="startDate"
            @change="updateCharts"
          />
        </div>
        <div class="chartWithTotalVisitors">
          <canvas :id="chartIds[0]"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
Chart.register(...registerables);

export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      startDate: '',
      managerChart2: {},
      chartIds: ['managerChart2'],
    };
  },
  mounted() {
    this.setDefaultDates();
    this.mileageCount();
    this.visitCount();
    this.updateCharts(); // Ensure chart rendering happens after setting dates
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    async updateCharts() {
      try {
        const mileageCountData = await this.mileageCount();
        const visitCountData = await this.visitCount();
        this.renderCharts(mileageCountData, visitCountData);
      } catch (error) {
        console.error('오잉:', error);
      }
    },

    async mileageCount() {
      const start = this.startDate.trim();
      const mile_no = this.loginInfo.mile_no;
      try {
        const response = await axios.post(
          'http://localhost:8090/manager/mileageCount',
          null,
          {
            params: {
              startDate: start,
              mile_no: mile_no,
            },
          }
        );
        console.log('마일리지', response.data);
        // 데이터가 없는 경우 기본값 반환
        return response.data.length > 0
          ? response.data
          : [
              {
                total_previous_month_points: 0,
                total_current_month_points: 0,
              },
            ];
      } catch (error) {
        console.error('Error fetching mileage count:', error);
        return [
          {
            total_previous_month_points: 0,
            total_current_month_points: 0,
          },
        ];
      }
    },

    async visitCount() {
      const start = this.startDate.trim();
      const mile_no = this.loginInfo.mile_no;

      try {
        const response = await axios.post(
          'http://localhost:8090/manager/visitCount',
          null,
          {
            params: {
              startDate: start,
              mile_no: mile_no,
            },
          }
        );
        console.log('방문자수', response.data);
        // 데이터가 없는 경우 기본값 반환
        return response.data.length > 0
          ? response.data
          : [
              {
                previous_month_visits: 0,
                current_month_visits: 0,
              },
            ];
      } catch (error) {
        console.error('Error fetching visit count:', error);
        return [
          {
            previous_month_visits: 0,
            current_month_visits: 0,
          },
        ];
      }
    },
    renderCharts(mileageCountData, visitCountData) {
      this.chartIds.forEach((chartId) => {
        const ctx = document.getElementById(chartId)?.getContext('2d');

        if (!ctx) {
          console.error(`Canvas element with id '${chartId}' not found.`);
          return;
        }

        // 기존 차트가 있다면 제거
        if (this.managerChart2[chartId]) {
          this.managerChart2[chartId].destroy();
        }

        // 데이터 유효성 검사
        const mileageData = mileageCountData[0] || {
          total_previous_month_points: 0,
          total_current_month_points: 0,
        };
        const visitData = visitCountData[0] || {
          previous_month_visits: 0,
          current_month_visits: 0,
        };

        // 차트 데이터와 옵션 설정
        this.managerChart2[chartId] = new Chart(ctx, {
          type: 'bar', // 차트 유형 (여기서는 바 차트)
          data: {
            labels: ['마일리지', '방문자수'], // 차트의 레이블
            datasets: [
              {
                label: '전월 데이터', // 첫 번째 데이터셋의 레이블
                data: [
                  mileageData.total_previous_month_points,
                  visitData.previous_month_visits,
                ], // 전월 데이터
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // 배경 색상
                borderColor: 'rgba(255, 99, 132, 1)', // 테두리 색상
                borderWidth: 1, // 테두리 두께
              },
              {
                label: '당월 데이터', // 두 번째 데이터셋의 레이블
                data: [
                  mileageData.total_current_month_points,
                  visitData.current_month_visits,
                ], // 당월 데이터
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // 배경 색상
                borderColor: 'rgba(54, 162, 235, 1)', // 테두리 색상
                borderWidth: 1, // 테두리 두께
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true, // 범례 표시 여부
                position: 'top', // 범례 위치
              },
            },
            scales: {
              y: {
                beginAtZero: true, // Y축이 0부터 시작
              },
              x: {
                grid: {
                  drawBorder: false, // X축 테두리 표시 여부
                  display: false, // X축 격자 표시 여부
                },
              },
            },
            maintainAspectRatio: false, // 비율 유지 여부
            responsive: true, // 반응형 차트 여부
          },
        });
      });
    },

    setDefaultDates() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');

      this.startDate = `${year}-${month}`;
    },
  },
};
</script>

<style>
.favorite-card {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column; /* Arrange children vertically */
  align-items: center; /* Center align children horizontally */
  justify-content: center; /* Center align children vertically */
}

.chartWithTotalVisitors {
  width: 100%;
  height: 100%;
}

.addImg {
  width: 18%;
}
</style>
