<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px; padding: 20px;">
    <p class="text-left lg2 KB_C2">{{ title }}
      <i
        class="bi bi-question-circle"
        @click="toggleHelpPopover"
        style="font-size: 15pt"
      ></i>
    </p>
   
    <div v-if="showHelpPopover" class="help-popover" ref="helpPopover">
      <div style="font-size: 12pt">
        <span
          >직원들이 조회한 기간 동안 해당 마일리지 페이지에 방문한 횟수를 보여줍니다.<br>
          마일리지에 대한 직원들의 관심도를 알 수 있습니다.</span
        >
      </div>
    </div>

    <div class="chart-container" style="padding-top: 20px">
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
        <div class="total-visitors mt-4" style="text-align: center; font-family: 'KB_S5'; font-size:14pt">
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
                    top: 90%;
                    right : -60px;
                    transform: translateX(-50%);
                    z-index: 0;
                    
                  font-size:10pt; color:gray;">( 최대 조회 가능일 : 전영업일 )</span>
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
      showHelpPopover: false,
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
    toggleHelpPopover(event) {
      event.stopPropagation(); // 이벤트 전파 중지
      console.log("toggleHelpPopover 클릭");
      this.showHelpPopover = !this.showHelpPopover;
      console.log("showHelpPopover:", this.showHelpPopover); // 추가
      if (this.showHelpPopover) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      console.log("handleClickOutside 실행");
      if (
        this.$refs.helpPopover &&
        !this.$refs.helpPopover.contains(event.target) &&
        !this.$refs.helpIcon.contains(event.target)
      ) {
        console.log("팝오버 닫기");
        this.showHelpPopover = false;
        document.removeEventListener("click", this.handleClickOutside);
      }
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
        this.total = counts.reduce((acc, cur) => acc + cur, 0);
        this.maxcount = Math.max(...counts);
        this.mincount = Math.min(...counts);
        const maxIndex = counts.indexOf(this.maxcount);
        const minIndex = counts.indexOf(this.mincount);
        this.maxcountDate = this.formatted(new Date(dates[maxIndex]));
        this.mincountDate = this.formatted(new Date(dates[minIndex]));
        this.renderCharts(counts);
      } catch (error) {
        console.error('오잉:', error);
      }
    },
    formatted(date){
      // const year = date.getFullYear();
      const month = String(date.getMonth()+1).padStart(2, '0'); // 01, 02... 형식
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}월 ${day}일`;
      // return `${day}`;
    },
    async chartDataCount() {
      const start = this.startDate.trim();
      const end = this.endDate.trim();
      const mile_no = this.getLoginInfo.mile_no;
      console.log('마일넘', mile_no);

      try {
        const response = await api.post(
          '/manager/mileCount',
          null, // POST 요청의 본문을 비워둡니다.
          {
            params: {
              startDate: start,
              endDate: end,
              mile_no: mile_no,
            },
          }
        );
        console.log('Response data:', response.data);
        const counts = response.data.map((item) => item.hit_count);
        const dates = response.data.map((item) => item.hit_date);
        console.log('결과:', counts);
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
        // gradient.addColorStop(0, 'rgba(255, 170, 231, 1)');  // 핑크색 
        // gradient.addColorStop(1, 'rgba(255, 170, 231, 0.2)'); 

        // gradient.addColorStop(0, 'rgba(228, 228, 228, 1)');  // 회색
        // gradient.addColorStop(1, 'rgba(228, 228, 228, 0.2)'); 

        gradient.addColorStop(0, 'rgba(255, 231, 143, 1)');  // 노란색
        gradient.addColorStop(1, 'rgba(255, 231, 143, 1)'); 

        // gradient.addColorStop(0, 'rgba(159, 237, 209, 1)');  // 초록색
        // gradient.addColorStop(1, 'rgba(159, 237, 209, 1)'); 

        // gradient.addColorStop(0, 'rgba(170, 204, 255, 1)');  // 파란색
        // gradient.addColorStop(1, 'rgba(170, 204, 255, 1)'); 

        this.managerChart1[chartId] = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.weekDays(),
            datasets: [
              {
                label: `방문자 수`,
                backgroundColor: gradient,
                data: counts,
                // borderRadius: 5,
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
                // padding: 2,
                labels: {
                  font: {
                    family: 'KB_C2',
                    size: 14
                  }
                }
              },
              // title: {
              //   display: false,
                
              // },
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
                // cornerRadius: 5,
                displayColors: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  // display: true,
                  font: {
                    family: 'KB_C2',
                    size: 10,
                  },
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  drawBorder: false,
                },
                // title: {
                //   display: true,
                //   text: '방문자 수',
                //   font: {
                //     family: 'KB_C2',
                //     size: 14,
                //     weight: 'bold',
                //   },
                // }
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
  width: 45%;
  height: 120%;
  padding-top: 20px;
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
  /* font-family: 'KB_C2';
  font-size: 16px; */
  /* font-weight: bold; */
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
</style>