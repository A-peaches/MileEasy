<template>
  <div class="cards" style="background-color: #f9f9f9; height: 420px; ">
    <p class="text-left lg2 KB_C2 ml-2">페이지 방문자 수</p>
    <div class="cards" style="height : 330px;">
      <div class="date-container">
        <div class="dateround">
          <input type="date" class="date" id="startDate" v-model="startDate" @change="updateCharts" />
          -
          <input type="date" class="date" id="endDate" v-model="endDate" @change="updateCharts" />
        </div>
      </div>
      <div class="content-container mr-5">
        <div class="chartBox ml-3" >
          <canvas :id="chartIds[0]" style="height:280px; width: 450px; "></canvas>
        </div>
        <div class="stats-container">
  <div class="stat-row" style="margin-top : 25px">
    <div class="stat-item">
      <i class="bi bi-display"></i>
      <span class="stat-label">총 방문자 수</span>
      <div class="stat-value">{{ total }}</div>
    </div>
    <div class="stat-item">
      <i class="bi bi-reception-4"></i>
      <span class="stat-label">최고 방문자 수</span>
      <div class="stat-value">{{ maxcount }}</div>
    </div>
    <div class="stat-item">
      <i class="bi bi-reception-2"></i>
      <span class="stat-label">최소 방문자 수</span>
      <div class="stat-value">{{ mincount }}</div>
    </div>
  </div>
</div>
      </div>
    </div>
    <div  class="text-end w-100 mt-5">
         <span  style="
                    position: absolute;
                    top: 87%;
                    right : -50px;
                    transform: translateX(-50%);
                    z-index: 0;
                    
                  font-size:10pt; color:gray;">( 최대 조회 가능일 : 전영업일 )</span>
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
  name: 'PageCount',
  data() {
    return {
      startDate: '',
      endDate: '',
      total: 0,
      maxcount: 0,
      mincount: 0,
      charts: {}, // 차트 인스턴스를 저장할 객체
      chartIds: ['Chart1'], // 각 차트에 대한 고유 ID
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
        const counts = await this.chartDataCount();
        this.total = counts.reduce((acc, cur) => acc + cur, 0);
        this.maxcount = Math.max(...counts);
        this.mincount = Math.min(...counts);
        this.renderCharts(counts);
      } catch (error) {
        console.error('Error fetching login history:', error);
      }
    },
    async chartDataCount() {
      const start = this.startDate.trim();
      const end = this.endDate.trim();

      try {
        const response = await api.post(
          '/user/loginHistoryCountArray',
          null,
          {
            params: {
              startDate: start,
              endDate: end,
            },
          }
        );
        console.log('Response data:', response.data);
        const counts = response.data.map((item) => item.count);
        console.log('결과:', counts);
        return counts;
      } catch (error) {
        console.error('Error fetching login history:', error);
        return [];
      }
    },
    renderCharts(counts) {
    

      this.chartIds.forEach((chartId) => {
        const canvas = document.getElementById(chartId);
        const ctx = document.getElementById(chartId)?.getContext('2d');

        if (!ctx) {
          console.error(`Canvas element with id '${chartId}' not found.`);
          return;
        }

        if (this.charts[chartId]) {
          this.charts[chartId].destroy();
        }

        // 디바이스 픽셀 비율 설정
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = '450px';
    canvas.style.height = '280px';


        this.charts[chartId] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.weekDays(),
            datasets: [
              {
                label: `visit count`,
                borderColor: '#FFCC00',
                data: counts,
                tension: 0.3, // Line tension to round the line edges
                borderRadius: 5, // Border radius to round the line edges
              },
            ],
          },
          options: {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: dpr,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  display: true,
                },
                grid: {
                  display: true,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
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
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}


.content-container {
  display: flex;
  flex: 1;
  overflow: visible; /* 부모 요소에서 오버플로우를 허용 */
}

.chartBox {
  flex: 2;
  padding-right: 20px;

  overflow: visible; /* 차트 요소에서 오버플로우를 허용 */
  position: relative; /* 상대 위치 */
  top: -50px; /* 원하는 만큼 위로 올리기 */
}
.stats-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.date-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}


.date {
  border: 1px solid #cecece;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 14px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  margin-right: 10px;
  height: 160px;
  width: 130px;
}

.stat-item:last-child {
  margin-right: 0;
}


.stat-item i {
  font-size: 1.5rem;
  color: #55B88E;
  margin-bottom: 5px;
  font-size : 20pt;
}

.stat-label {
  display: block;
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 2px;
  font-size : 12pt;
}

.stat-value {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.favorite-card {
  width: 100%;
  height: 350px;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
}

.chartBox canvas {
  width: 450px !important;
  height: 280px !important;
}
</style>




