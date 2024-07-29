<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">{{ title }}</p>
    <div class="flex">
      <div class="cards favorite-card">
        <div class="dateround" style="text-align: right; margin-bottom: 20px">
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
        <div class="chartWithTotalVisitors">
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
        console.error('오잉:', error);
      }
    },
    async chartDataCount() {
      const start = this.startDate.trim();
      const end = this.endDate.trim();
      const mile_no = this.getLoginInfo.mile_no;
      console.log('마일넘', mile_no);

      try {
        const response = await axios.post(
          'http://localhost:8090/manager/mileCount',
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

        if (this.managerChart1[chartId]) {
          this.managerChart1[chartId].destroy();
        }

        this.managerChart1[chartId] = new Chart(ctx, {
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
