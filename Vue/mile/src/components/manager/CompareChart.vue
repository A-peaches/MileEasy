<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">{{ title }}</p>
    <div class="flex-container">
      <!-- <div class="date-container" style="text-align: right; margin-bottom: 20px">
        <input
          type="month"
          class="date"
          id="startDate"
          v-model="startDate"
          @change="updateCharts"
        />
      </div> -->
      <div class="chart-container">
        <canvas :id="chartIds[0]"></canvas>
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
      thisYearData: [],
      lastYearData: []
    };
  },
  mounted() {
    this.setDefaultDates();
    // this.mileageCount();
    // this.visitCount();
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
        this.processData(mileageCountData, visitCountData);
        this.renderCharts();
      } catch (error) {
        console.error('오잉:', error);
      }
    },

    async mileageCount() {
      const mile_no = this.loginInfo.mile_no;
      try {
        const response = await axios.post(
          'http://localhost:8090/manager/mileageCount',
          null,
          {
            params: {
              mile_no: mile_no,
            },
          }
        );
        console.log('마일리지', response.data);
        // 데이터가 없는 경우 기본값 반환
        return {
          thisYear: response.data.thisYear.length > 0 ? response.data.thisYear : this.getDefaultMonthlyData(),
          lastYear: response.data.lastYear.length > 0 ? response.data.lastYear : this.getDefaultMonthlyData(),
        };
      } catch (error) {
        console.error('Error fetching mileage count:', error);
        return {
          thisYear: this.getDefaultMonthlyData(),
          lastYear: this.getDefaultMonthlyData(),
        };
      }
    },

    async visitCount() {
      const mile_no = this.loginInfo.mile_no;

      try {
        const response = await axios.post(
          'http://localhost:8090/manager/visitCount',
          null,
          {
            params: {
              mile_no: mile_no,
            },
          }
        );
        console.log('방문자수', response.data);
        // 데이터가 없는 경우 기본값 반환
        return {
          thisYear: response.data.thisYear.length > 0 ? response.data.thisYear : this.getDefaultMonthlyData(),
          lastYear: response.data.lastYear.length > 0 ? response.data.lastYear : this.getDefaultMonthlyData(),
        };
      } catch (error) {
        console.error('Error fetching visit count:', error);
        return {
          thisYear: this.getDefaultMonthlyData(),
          lastYear: this.getDefaultMonthlyData(),
        };
      }
    },
    getDefaultMonthlyData() {
      return Array.from({ length: 12 }, (_, index) => ({
        month: `${index + 1}`,
        points: 0,
        visits: 0,
      }));
    },
    processData(mileageCountData, visitCountData) {
      this.thisYearData = mileageCountData.thisYear.map((data, index) => ({
        month: data.month,
        total_points: data.total_points,
        visits: visitCountData.thisYear[index] ? visitCountData.thisYear[index].visits : 0,
      }));

      this.lastYearData = mileageCountData.lastYear.map((data, index) => ({
        month: data.month,
        total_points: data.total_points,
        visits: visitCountData.lastYear[index] ? visitCountData.lastYear[index].visits : 0,
      }));
    },
    renderCharts() {
      this.chartIds.forEach((chartId) => {
        const ctx = document.getElementById(chartId)?.getContext('2d');

        if (!ctx) {
          console.error(`Canvas element with id '${chartId}' not found.`);
          return;
        }

        if (this.managerChart2[chartId]) {
          this.managerChart2[chartId].destroy();
        }

        const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        this.managerChart2[chartId] = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [
              {
                label: '올해 마일리지',
                data: this.thisYearData.map(item => item.total_points),
                type: 'line',
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y-axis-1',
              },
              {
                label: '작년 마일리지',
                data: this.lastYearData.map(item => item.total_points),
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y-axis-1',
              },
              {
                label: '올해 방문자 수',
                data: this.thisYearData.map(item => item.visits),
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-2',
              },
              {
                label: '작년 방문자 수',
                data: this.lastYearData.map(item => item.visits),
                backgroundColor: 'rgba(255, 159, 64, 0.7)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-2',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              'y-axis-1': {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                  display: true,
                  text: '마일리지',
                },
              },
              'y-axis-2': {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                  display: true,
                  text: '방문자 수',
                },
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
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
.flex-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 300px;
}

.date-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
}

.chart-container {
  flex: 2;
  height: 100%;
  max-width: 60%;
}

.date {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.addImg {
  width: 18%;
}
</style>
