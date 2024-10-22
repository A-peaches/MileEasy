<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px; padding: 20px;">
    <p class="text-left lg2 KB_C2">{{ title }} &nbsp;
      <i class="bi bi-download" @click="downloadChart"></i>
    </p>
   
    <div v-if="showHelpPopover" class="help-popover" ref="helpPopover">
      <div style="font-size: 12pt">
        <span
          >직원들이 조회한 기간 동안 해당 마일리지 페이지에 방문한 횟수를 보여줍니다.<br>
          마일리지에 대한 직원들의 관심도를 알 수 있습니다.</span
        >
      </div>
    </div>
    <div class="cards" style="height: 335px;">
      <div class="chart-container" style="padding-top: 10px">
        <div class="chart-wrapper">
          <canvas :id="chartIds[0]"></canvas>
        </div>
        <div class="date-selector" style="width: 35%;">
          <div class="d-flex justify-content-between align-items-center" style="width: 80%;">
            <span class="md  highlight fw-bold">시작일자</span>
            <span class="md highlight  fw-bold">종료일자</span>
          </div>
          <div class="date-inputs" style="width: 100%; margin-top: 5%;">
            <input
              type="date"
              class="date"
              id="startDate"
              v-model="startDate"
              @change="updateCharts"
            />
            <span class="date-separator">-</span>
            <input
              type="date"
              class="date"
              id="endDate"
              v-model="endDate"
              @change="updateCharts"
            />
          </div><br>
          <div class="total-visitors mt-3" style="text-align: center; font-family: 'KB_S5'; font-size:13pt">
            <!-- 조회 기간의 총 방문자 수는 {{ total }}명 입니다.<br><br> -->
            조회 기간 중 직원들이 가장 많이 방문한 날짜는
            <div class="mt-2"></div>
            <span class="date-text">
              <sup><img src="@/assets/img/left-quote.png" class="quote" style="width:6%;" /></sup>
              {{ maxcountDate }}
              <sup><img src="@/assets/img/right-quote.png" class="quote" style="width:6%;" /></sup>
            </span> 입니다. 
          </div>
  
          <div  class="text-end w-100 mt-5">
          <span  style="
                      position: absolute;
                      top: 87%;
                      right : -45px;
                      transform: translateX(-50%);
                      z-index: 0;
                      
                    font-size:10pt; color:gray;">( 최대 조회 가능일 : 전영업일 )</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import api from '@/api/axios';
import * as XLSX from 'xlsx';

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
      endDate: '',
      managerChart1: {},
      chartIds: ['managerChart1'],
      mile_no: null,
      total: 0,
      maxcountDate: '',
      mincountDate: '',
      maxcount: 0,
      mincount: 0,
      dates: [],
    };
  },
  mounted() {
    this.setDefaultDates();
    this.updateCharts(); // Ensure chart rendering happens after setting dates
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapActions('loginHistory', ['loginHistoryCountArray']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    downloadChart() {
      const wsData = [['날짜', '방문자 수']]; // 엑셀 파일의 첫번째 행에 컬럼명을 추가
      this.dates.forEach((date, index) => {
        wsData.push([this.formatted(new Date(date)), this.counts[index]]);
      });

      const worksheet = XLSX.utils.aoa_to_sheet(wsData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

      XLSX.writeFile(workbook, 'chart_data.xlsx'); // 엑셀 파일 다운로드 
    },
    setDefaultDates() {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - 1); // Set endDate to yesterday
      const endDateFormatted = endDate.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

      today.setDate(today.getDate() - 7);
      const startDate = today.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

      this.startDate = startDate;
      this.endDate = endDateFormatted;

      // Set the max attribute for endDate input to yesterday
      const endDateInput = document.getElementById('endDate');
      endDateInput.setAttribute('max', endDateFormatted);
    },
    async updateCharts() {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '시작 날짜는 종료 날짜보다 이전이어야 합니다.',
        });
        return;
      }

      try {
        const {counts, dates} = await this.chartDataCount();
        this.dates = dates;
        this.counts = counts;
        this.total = counts.reduce((acc, cur) => acc + cur, 0);
        this.maxcount = Math.max(...counts);
        this.mincount = Math.min(...counts);
        const maxIndex = counts.indexOf(this.maxcount);
        const minIndex = counts.indexOf(this.mincount);
        this.maxcountDate = this.formatted(new Date(dates[maxIndex]));
        this.mincountDate = this.formatted(new Date(dates[minIndex]));
        this.renderCharts(counts);
      } catch (error) {
        console.error('에러', error);
      }
    },
    formatted(date){
      const month = String(date.getMonth()+1).padStart(2, '0'); // 01, 02... 형식
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}월 ${day}일`;
    },
    async chartDataCount() {
      const start = this.startDate.trim();
      const end = this.endDate.trim();
      const mile_no = this.getLoginInfo.mile_no;
    
      try {
        const response = await api.post(
          '/mana/mileCount',
          null, // POST 요청의 본문을 비워둡니다.
          {
            params: {
              startDate: start,
              endDate: end,
              mile_no: mile_no,
            },
          }
        );
        const counts = response.data.map((item) => item.hit_count);
        const dates = response.data.map((item) => item.hit_date);
        
        return {counts, dates};
      } catch (error) {
        console.error('Error fetching login history:', error);
        return {counts: [], dates: []};
      }
    },
    renderCharts(counts) {
      this.chartIds.forEach((chartId) => {
        const ctx = document.getElementById(chartId)?.getContext('2d');

        if (!ctx) {
          console.error(`Canvas element with id '${chartId}' not found.`);
          return;
        }

        if (this.managerChart1[chartId]) {
          this.managerChart1[chartId].destroy();
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(255, 231, 143, 1)');  // 노란색
        gradient.addColorStop(1, 'rgba(255, 231, 143, 1)'); 
        this.managerChart1[chartId] = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.weekDays(),
            datasets: [
              {
                label: `방문자 수`,
                backgroundColor: gradient,
                data: counts,
                maxBarThickness: 30, // 막대의 너비를 설정합니다.
                
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
                labels: {
                  font: {
                    family: 'KB_C2',
                    size: 14
                  }
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                  family: 'KB_C2',
                  size: 14,
                },
                bodyFont: {
                  family: 'KB_C2',
                  size: 12,
                },
                padding: 10,
                displayColors: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    family: 'KB_C2',
                    size: 10,
                  },
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  drawBorder: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: 'KB_C2',
                    size: 12,
                  },
                },
              },
            },
            animation: {
              duration: 1500,
              easing: 'easeOutQuart',
            },
          },
        });
      });
    },
    weekDays() {
      const daysArray = [];
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        daysArray.push(`${month}.${day}`);
      }

      return daysArray;
    },
  },
};
</script>

<style scoped>
.cards {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.chart-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 280px;
  
}

.chart-wrapper {
  width: 48%;
  height: 110%;
  padding-top: 10px;
}

.date-selector {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
}

.date-inputs {
  display: flex;
  justify-content:space-between;
  flex-direction: row;
  align-items: flex-start;
}

.date {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  /* border-radius: 4px; */
  font-family: 'KB_C2';
  font-size: 14px;
  margin-bottom: 10px;
}

.date-separator {
  margin: 5px 0;
  font-weight: bold;
}

.total-visitors {
  margin-top: 20px;
}

.highlight {
  background-color: #e1fcef;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 3px 10px; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
}

.help-icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.help-popover {
  position: absolute;
  left: 250px; /* 조정 가능 */
  top: 50px; /* 조정 가능 */
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  width: 600px;
  margin-left: 10px; /* 아이콘과의 간격 */
  display: block; /* 추가 */
  background-color: white; /* 임시로 눈에 띄는 색상 사용 */
  border: 2px solid #e4e4e4;
}

.date-text {
  font-size : 18pt;
  font-family: 'KB_C2'
}

.bi-question-circle:hover {
  cursor: pointer;
}

.bi-download:hover {
  cursor: pointer;
}
</style>