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
    <div v-if="isLoading" class="loading-indicator">데이터 로딩 중...</div>
    <div v-else class="chart-wrapper d-flex justify-content-evenly">
      <div v-if="selectedTab==='mileage'" class="chart-container" style="margin-right: 3%;" >
        <canvas id="mileageChart"></canvas>
      </div>
      <div v-if="selectedTab==='visitor'" class="chart-container" style="margin-right: 3%;">
        <canvas id="visitsChart"></canvas>
      </div>
      <div class="" style="width: 35%; height: 80%;">
        <div class="stats-container" style="height: 100%;">
          <table style="border: 1px solid #EBEBEB; background-color: #fff; width: 100%; height:100%;">
            <tr class="md" style="border: 1px solid #EBEBEB;">
              <th>기준</th>
              <th>{{ selectedTab === 'mileage' ? '마일리지 총점' : '방문자 수' }}</th>
            </tr>
            <tr >
              <td class="md" style="font-size: 15pt;">전년도 대비</td>
              <td class="lg2" style="font-family: 'KB_S4';">
                <i
                  :class="yearOverYearChange >= 0 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"
                  :style="{ color: yearOverYearChange >= 0 ? '#F28080' : '#808BF2', fontSize: '20pt' }"
                ></i>
                {{ Math.abs(yearOverYearChange) }}%
              </td>
            </tr>
            <tr >
              <td class="md" style="font-size: 15pt;">전월 대비</td>
              <td class="lg2" style="font-family: 'KB_S4';">
                <i
                  :class="monthOverMonthChange >= 0 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"
                  :style="{ color: monthOverMonthChange >= 0 ? '#F28080' : '#808BF2', fontSize: '20pt' }"
                ></i>
                {{ Math.abs(monthOverMonthChange) }}%
              </td>
            </tr>
          </table>
        </div>
        <div  class="text-end w-100 mt-5">
         <span  style="
                    position: absolute;
                    top: 90%;
                    right : -40px;
                    transform: translateX(-50%);
                    z-index: 0;
                    
                  font-size:10pt; color:gray;">( 기준일자 : {{ startDate}} )</span>
        </div>
      </div>
      
      <!-- <img src="@/assets/imoji/ago/아거다짐.png" style="width: 5vw; align-self: flex-end;"/> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
import api from '@/api/axios';
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
      selectedTab: 'mileage',
      isLoading: true,
      mileageCountData: null,
      visitCountData: null,
    };
  },
  created() {
    this.setDefaultDates();
    this.loadData();
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
    lastMonthIndex() {
      const currentMonth = new Date().getMonth();
      return currentMonth === 0 ? 11 : currentMonth - 1;
    },
    currentYearTotal() {
      const key = this.selectedTab === 'mileage' ? 'total_points' : 'visits';
      return this.thisYearData.reduce((sum, item) => sum + (item[key] || 0), 0);
    },
    previousYearTotal() {
      const key = this.selectedTab === 'mileage' ? 'total_points' : 'visits';
      return this.lastYearData.reduce((sum, item) => sum + (item[key] || 0), 0);
    },
    yearOverYearChange() {
      if (this.previousYearTotal === 0) return 0;
      return ((this.currentYearTotal - this.previousYearTotal) / this.previousYearTotal * 100).toFixed(2);
    },
    monthOverMonthChange() {
      const key = this.selectedTab === 'mileage' ? 'total_points' : 'visits';
      const thisMonth = this.thisYearData[this.lastMonthIndex]?.[key] || 0;
      const lastMonth = this.thisYearData[this.lastMonthIndex - 1]?.[key] || 0;
      if (lastMonth === 0) return 0;
      return ((thisMonth - lastMonth) / lastMonth * 100).toFixed(2);
    }
  },
  watch: {
    selectedTab(){
      this.updateTotals();
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
        const response = await api.post(
          '/manager/mileageCount',
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
        const response = await api.post(
          '/manager/visitCount',
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
      // 기본 데이터 구조 설정
      const defaultData = this.getDefaultMonthlyData();

      // mileageCountData와 visitCountData가 올바른 구조인지 확인
      const mileageThisYear = mileageCountData?.thisYear || defaultData;
      const mileageLastYear = mileageCountData?.lastYear || defaultData;
      const visitThisYear = visitCountData?.thisYear || defaultData;
      const visitLastYear = visitCountData?.lastYear || defaultData;

      this.thisYearData = mileageThisYear.map((data, index) => ({
        month: data.month,
        total_points: data.total_points || 0,
        visits: visitThisYear[index]?.visits || 0,
      }));

      this.lastYearData = mileageLastYear.map((data, index) => ({
        month: data.month,
        total_points: data.total_points || 0,
        visits: visitLastYear[index]?.visits || 0,
      }));

      this.updateTotals();
      
    },
    updateTotals() {
      const key = this.selectedTab === 'mileage' ? 'total_points' : 'visits';
      this.thisYearTotal = this.thisYearData.reduce((sum, item) => sum + (item[key] || 0), 0);
      this.lastYearTotal = this.lastYearData.reduce((sum, item) => sum + (item[key] || 0), 0);
    },
    async loadData() {
      this.isLoading = true;
      try {
        this.mileageCountData = await this.mileageCount();
        this.visitCountData = await this.visitCount();
        this.processData(this.mileageCountData, this.visitCountData);
        this.renderCharts();
      } catch (error) {
        console.error('loadData error:', error);
      } finally {
        this.isLoading = false;
      }
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
          colors: ['rgba(255, 170, 231, 1)', 'rgba(192, 192, 192, 1)']
        },
        {
          id: 'visitsChart',
          title: '방문자 수',
          dataKey: 'visits',
          yAxisLabel: '방문자 수',
          colors: ['rgba(170, 204, 255, 1)', 'rgba(192, 192, 192, 1)']
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
                position: 'top',
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
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // 주말인 경우 금요일로 설정
      while (yesterday.getDay() === 0 || yesterday.getDay() === 6) {
        yesterday.setDate(yesterday.getDate() - 1);
      }

      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, '0');
      const date = String(yesterday.getDate()).padStart(2, '0');

      this.startDate = `${year}-${month}-${date}`;
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
  width: 48%;
  height: 120%;
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
  height: 100%; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
  margin-right: 5%;
}
.stats-content {
  width: 100%;
  height: 70%;
  padding: 15px; 
  background-color: #f5f6f5; 
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
