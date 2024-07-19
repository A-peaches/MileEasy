<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">페이지 방문자 수</p>
    <div class="flex">
      <div class="cards favorite-card">
        <div
          class="subBox"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>
            <p class="text-left brown md KB_C2">최근 일주일 간 방문자 수</p>
          </div>
          <div class="dateround">
            <input
              type="date"
              class="date"
              id="startDate"
              v-model="startDate"
              @change="updateCharts"
            />
            -
            <input
              type="date"
              class="date"
              id="endDate"
              v-model="endDate"
              @change="updateCharts"
            />
          </div>
        </div>
        <div class="chartBox">
          <canvas :id="chartIds[0]"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'PageCount',
  data() {
    return {
      startDate: '',
      endDate: '',
      charts: {}, // 차트 인스턴스를 저장할 객체
      chartIds: ['Chart1', 'Chart2'], // 각 차트에 대한 고유 ID
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
      // 날짜 유효성 검사
      if (new Date(this.startDate) > new Date(this.endDate)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '시작 날짜는 종료 날짜보다 이전이어야 합니다.',
        });
        return; // 유효성 검사 실패 시 차트 업데이트를 중단합니다.
      }

      // 데이터 가져오기
      try {
        const counts = await this.chartDataCount();
        this.renderCharts(counts); // 데이터가 준비된 후 차트 렌더링
      } catch (error) {
        console.error('Error fetching login history:', error);
      }
    },
    async chartDataCount() {
      const start = this.startDate.trim();
      const end = this.endDate.trim();

      try {
        const response = await axios.post(
          'http://localhost:8090/user/loginHistoryCountArray',
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
        return []; // 에러 발생 시 빈 배열 반환
      }
    },
    renderCharts(counts) {
      // 차트 ID 배열을 순회하여 각 차트를 렌더링
      this.chartIds.forEach((chartId, index) => {
        const ctx = document.getElementById(chartId).getContext('2d');

        // 기존 차트 인스턴스가 있는 경우 제거
        if (this.charts[chartId]) {
          this.charts[chartId].destroy();
        }

        this.charts[chartId] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.weekDays(),
            datasets: [
              {
                label: `Dataset ${index + 1}`,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: counts,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
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

      // 두 날짜 사이의 모든 날짜를 배열에 추가
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        // 형식을 MM-DD로 변경
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getDate();
        daysArray.push(`${month}-${day}`);
      }

      return daysArray;
    },
  },
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.date {
  border: 1px solid;
  border-radius: 8px;
  border-color: #cecece;
}
.dateround {
  text-align: right;
}
.chartBox {
  flex: 1;
  height: 90% !important;
}
.chartBox canvas {
  width: auto;
  height: auto;
}
</style>
