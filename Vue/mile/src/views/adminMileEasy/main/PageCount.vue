<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">페이지 방문자 수</p>
    <div class="flex">
      <div
        class="cards favorite-card"
        style="display: flex; flex-direction: column; width: 100%"
      >
        <div
          class="subBox"
          style="width: 100%; padding: 0 20px; text-align: right"
        >
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
        <div class="chartWithTotalVisitors" style="display: flex">
          <div class="chartBox" style="flex: 1; padding: 20px">
            <canvas :id="chartIds[0]" width="400" height="235"></canvas>
          </div>

          <div
            class="boxs"
            style="
              flex: 0.5;
              display: contents;
              flex-direction: column;
              justify-content: center;
              padding: 20px;
              margin-top: 50px;
              margin-left: 20px;
            "
          >
            <div class="bu">
              <div>
                <div style="display: flex; justify-content: center">
                  <i
                    class="bi bi-display"
                    style="color: #868686; font-size: 2.3rem"
                  ></i>
                </div>
                <span>총 방문자 수</span>
                <div
                  class="KB_C1"
                  style="font-size: 1.5rem; font-weight: bold; font-size: 23pt"
                >
                  {{ total }}
                </div>
              </div>
            </div>
            <div class="bu">
              <div style="display: flex; justify-content: center">
                <i
                  class="bi bi-reception-4"
                  style="color: #868686; font-size: 2.3rem"
                ></i>
              </div>
              <div>
                최고 방문자 수
                <div
                  class="KB_C1"
                  style="font-size: 1.5rem; font-weight: bold; font-size: 23pt"
                >
                  {{ maxcount }}
                </div>
              </div>
            </div>
            <div class="bu">
              <div style="display: flex; justify-content: center">
                <i
                  class="bi bi-reception-2"
                  style="color: #868686; font-size: 2.3rem"
                ></i>
              </div>
              <div>
                최소 방문자 수
                <div
                  class="KB_C1"
                  style="font-size: 1.5rem; font-weight: bold; font-size: 23pt"
                >
                  {{ mincount }}
                </div>
              </div>
            </div>
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
import axios from 'axios';

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
        return [];
      }
    },
    renderCharts(counts) {
      this.chartIds.forEach((chartId, index) => {
        const ctx = document.getElementById(chartId)?.getContext('2d');

        if (!ctx) {
          console.error(`Canvas element with id '${chartId}' not found.`);
          return;
        }

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
                borderColor: '#FFCC00',
                backgroundColor: '#FFCC00',
                data: counts,
                fill: true,
                tension: 0.4, // Line tension to round the line edges
                borderRadius: 5, // Border radius to round the line edges
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

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const month = date.getMonth() + 1;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.date {
  border: 1px solid;
  border-radius: 8px;
  border-color: #cecece;
}
.dateround {
  text-align: right;
}

.bu {
  border-radius: 15px;

  width: 130px;
  height: 130px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 10px;
  margin-top: 50px;
}
.bi {
  font-size: 40px;
}

canvas#Chart1 {
  max-height: 235px;
  max-width: 100%; /* Add this to ensure the chart width does not exceed its container */
}
</style>
