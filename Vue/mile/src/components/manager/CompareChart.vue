<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px; padding: 20px;">
    <div class="d-flex justify-content-between align-items-center">
      <p class="text-left lg2 KB_C2">{{ title }}</p>
      <div class="tabs text-end lg2 mr-3">
        <span
          @click="selectedTab = 'mileage'"
          :class="{ active: selectedTab === 'mileage', chartTab: true }"
          class="chartTab"
          >마일리지 총점</span
        >&nbsp;|&nbsp;
        <span
          @click="selectedTab = 'visitor'"
          :class="{ active: selectedTab === 'visitor', chartTab: true }"
          class="chartTab"
          >방문자 수</span
        >
      </div>
    </div>
    <div class="chart-wrapper d-flex justify-content-evenly">
      <div v-if="selectedTab==='mileage'" class="chart-container">
        <canvas id="mileageChart"></canvas>
      </div>
      <div v-if="selectedTab==='visitor'" class="chart-container">
        <canvas id="visitsChart"></canvas>
      </div>
      <div class="" style="width: 30%; height: 80%;">
        <div class="stats-container d-flex justify-content-between" style="height: 100%;">
          <div class="stats-content ml-4">
            <span class="md" style="display: block; margin-bottom: 10px; color: #333; font-weight: bold;">전월 대비 5% 증가했습니다.</span>
            <span class="" style="display: block; font-size: 9pt; color: #666;">(작년 동월 대비)</span>
          </div>
        </div>
      </div>
      <img src="@/assets/imoji/lamu/라무다짐.png" style="width: 3vw; margin-top: 20px; align-self: flex-end;"/>
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
      chartIds: ['mileageChart', 'visitsChart'],
      thisYearData: [],
      lastYearData: [],
      selectedTab: 'mileage'
    };
  },
  mounted() {
    this.setDefaultDates();
    this.updateCharts(); // Ensure chart rendering happens after setting dates
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  watch: {
    selectedTab(){
      this.$nextTick(() => {
        this.renderCharts();
      });
    }
  },
  methods: {
    async updateCharts() {
      try {
        const mileageCountData = await this.mileageCount();
        const visitCountData = await this.visitCount();
        this.processData(mileageCountData, visitCountData);
        this.renderCharts();
      } catch (error) {
        console.error('updateCharts error:', error);
      }
    },
    // 마일리지 총합 (작년, 올해) 
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
    // 방문자 수 (작년, 올해)
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
    // 작년, 올해 월별로 데이터 가져오기 
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
    // 차트 렌더링 
    renderCharts() {
      const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
      const chartConfigs = [
        {
          id: 'mileageChart',
          title: '마일리지',
          dataKey: 'total_points',
          yAxisLabel: '마일리지',
          colors: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)']
        },
        {
          id: 'visitsChart',
          title: '방문자 수',
          dataKey: 'visits',
          yAxisLabel: '방문자 수',
          colors: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)']
        }
      ]

      chartConfigs.forEach((config) => {
        const ctx = document.getElementById(config.id)?.getContext('2d');

        if (!ctx) {
          console.error(`Canvas element with id '${config.id}' not found.`);
          return;
        }

        if (this.managerChart2[config.id]) {
          this.managerChart2[config.id].destroy();
        }

        this.managerChart2[config.id] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              {
                label: `올해 ${config.title}`,
                data: this.thisYearData.map(item => item[config.dataKey]),
                borderColor: config.colors[0],
                backgroundColor: config.colors[0].replace('1)', '0.2)'),
                borderWidth: 2,
                fill: false,
                tension: 0.4
              },
              {
                label: `작년 ${config.title}`,
                data: this.lastYearData.map(item => item[config.dataKey]),
                borderColor: config.colors[1],
                backgroundColor: config.colors[1].replace('1)', '0.2)'),
                borderWidth: 2,
                fill: false,
                tension: 0.4
              }
            ]
          },              
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  font: {
                    family: 'KB_C2',
                    size: 14
                  }
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                  family: 'KB_C2',
                  size: 14
                },
                bodyFont: {
                  family: 'KB_C2',
                  size: 12
                }
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  // display: true,
                  // text: config.yAxisLabel,
                  // font: {
                  //   family: 'KB_C2',
                  //   size: 14
                  // }
                },
                ticks: {
                  font: {
                    family: 'KB_C2',
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: 'KB_C2',
                    size: 12
                  }
                }
              },
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
            }
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

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items:flex-start;
  height: 400px;
}
.date-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
}
.chart-wrapper {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  height: 280px;
}
.chart-container {
  width: 60%;
  height: 100%;
  padding-top: 20px
}
.date {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.addImg {
  width: 18%;
}
.chartTab {
  cursor: pointer;
  font-size: 16pt;
  color: #4b4a4a;
  font-family: "KB_C3";
  transition: color 0.3s ease;
}
.chartTab.active {
  font-family: "KB_C2";
}
.chart-display {
  width: 100%;
  height: 300px;
}
.tabs {
  display: flex;
  justify-content: flex-end;
}
.stats-container {
  width: 100%; 
  height: 80%; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
}
.stats-content {
  text-align: center; 
  background-color: #f0f0f0; 
  padding: 15px; 
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
