<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">마일리지 방문자 수</p>
      <div class="cards favorite-card">
        <div class="text-right">
          <input
            type="date"
            class="date"
            id="date"
            v-model="date"
            :max="maxDate"
            @change="updateCharts2"
          />
        </div>
        <br />
        <div class="sub">
          <div class="chart-container">
            <canvas :id="mileChartId[0]" class="chartMile"></canvas>
          </div>
          <div class="best">
            <img
              src="@/assets/imoji/kolly/콜리얼굴최고.png"
              style="width: 100px; height: 100px"
            />
            <div class="lg2 KB_C2" style="font-weight: bold">
              <i class="bi bi-trophy-fill"></i> 1위
            </div>
            <p class="lg2 KB_C2" style="font-weight: bold">
              <mark>{{ best }}</mark>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
import api from '@/api/axios';

Chart.register(...registerables);

export default {
  name: 'MileagePageCount',
  data() {
    return {
      mileChart: {}, // 차트 객체를 저장할 객체
      date: '', // 날짜 값을 저장할 변수
      mileChartId: ['MileChart'], // 랜덤 문자열로 유니크 ID 생성
      todayDate: new Date().toISOString().split('T')[0], // 오늘 날짜를 ISO 문자열로 저장
      best: '-', // 초기값 설정
    };
  },
  computed: {
    maxDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return yesterday.toISOString().split('T')[0]; // 하루 전 날짜를 ISO 문자열로 반환
    },
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },

  methods: {
    async updateCharts2() {
      try {
        const { hitCounts } = await this.realChartData();
        const mileageLabel = await this.label(); // 라벨 데이터 비동기 호출

        // 최대값을 찾아서 best에 설정
        this.findMaxAndSetBest(hitCounts, mileageLabel);

        // 차트 렌더링
        this.renderChart2(hitCounts, mileageLabel);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },

    async label() {
      try {
        const response = await api.get(
          '/mileage/getMileage'
        );
        const mileageLabel = response.data.map((item) => item.mile_name);
        return mileageLabel;
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        return []; // 에러 발생 시 빈 배열 반환
      }
    },

    async realChartData() {
      try {
        const response = await api.post(
          '/mileage/hit_mileChartDATE',
          { date: this.date } // POST 본문에 데이터 포함
        );

        // Check if response.data is valid and an array
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response data format');
        }

        const hitCounts = response.data.map((item) => item.hit_count);
        console.log('마일리지 결과', hitCounts);

        return { hitCounts };
      } catch (error) {
        console.error('Error fetching chart data:', error);
        return { hitCounts: [] }; // 에러 발생 시 빈 배열 반환
      }
    },

    findMaxAndSetBest(hitCounts, mileageLabel) {
      const maxIndex = this.findMaxIndex(hitCounts);
      if (maxIndex !== -1 && mileageLabel.length > maxIndex) {
        this.best = hitCounts[maxIndex] === 0 ? '-' : mileageLabel[maxIndex];
      } else {
        this.best = '-';
      }
    },

    findMaxIndex(array) {
      if (array.length === 0) return -1;

      let maxIndex = -1;
      let maxValue = Number.MIN_SAFE_INTEGER;
      for (let i = 0; i < array.length; i++) {
        if (array[i] > maxValue) {
          maxValue = array[i];
          maxIndex = i;
        }
      }
      return maxIndex;
    },

    renderChart2(counts, mileageLabel) {
      const chartId = this.mileChartId[0]; // chartIds 배열에서 첫 번째 chartId를 가져옴
      const ctx = document.getElementById(chartId);

      if (!ctx) {
        console.error(`Canvas element with id '${chartId}' not found.`);
        return;
      }

      // 이전에 생성된 차트 객체가 있다면 파괴
      if (this.mileChart[chartId]) {
        this.mileChart[chartId].destroy();
      }

      try {
        this.mileChart[chartId] = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: mileageLabel,
            datasets: [
              {
                label: '방문자 수',
                data: counts,
                backgroundColor: [
                  '#ADE98A',
                  '#36A2EB',
                  '#ADE98A',
                  '#36A2EB',
                  '#ADE98A',
                  '#36A2EB',
                  '#ADE98A',
                  '#36A2EB',
                ],
                borderWidth: 1,
                barThickness: 55,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  display: false,
                },
                grid: {
                  drawBorder: false,
                  display: false,
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                },
              },
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          },
        });
      } catch (error) {
        console.error('Error rendering chart:', error);
      }
    },
    setInitialDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const formattedDate = yesterday.toISOString().split('T')[0];

      this.date = formattedDate; // 날짜 초기화
    },
  },

  mounted() {
    this.setInitialDate(); // 날짜 입력 필드 초기화
    this.updateCharts2(); // 초기 차트 렌더링
  },
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.sub {
  display: flex;
  position: relative;
}

.chart-container {
  flex: 1;
  height: 100%;
  bottom: 0;
  height: 230px;
  width: 65%;
  padding-left: 25px;
}

.best {
  width: 25%;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
}

.cards {
  overflow: hidden;
}
.bi-trophy-fill {
  color: #ffca05;
}
.date {
  border: 1px solid;
  border-radius: 8px;
  border-color: #cecece;
}
</style>
