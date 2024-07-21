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
<<<<<<< HEAD
            @change="updateCharts2"
=======
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
          />
        </div>
        <br />
        <div class="sub">
          <div class="chart-container">
<<<<<<< HEAD
            <canvas :id="mileChartId[0]" class="chartMile"></canvas>
=======
            <canvas :id="chartId" class="chartMile"></canvas>
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
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
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'MileagePageCount',
  data() {
    return {
<<<<<<< HEAD
      mileChart: {}, // 차트 객체를 저장할 객체
      date: '', // 날짜 값을 저장할 변수
      mileChartId: ['MileChart'], // 랜덤 문자열로 유니크 ID 생성
      todayDate: new Date().toISOString().split('T')[0], // 오늘 날짜를 ISO 문자열로 저장
      best: '-', // 초기값 설정
=======
      chart: null,
      date: '', // 날짜 값을 저장할 변수
      chartId: 'myChart-' + Math.random().toString(36).substr(2, 9), // 랜덤 문자열로 유니크 ID 생성
      chartBest: 'N/A', // 차트의 최고값을 저장할 변수
      todayDate: new Date().toISOString().split('T')[0], // 오늘 날짜를 ISO 문자열로 저장
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
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
<<<<<<< HEAD
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
        const response = await axios.get(
          'http://localhost:8090/mileage/getMileage'
        );
        const mileageLabel = response.data.map((item) => item.mile_name);
        return mileageLabel;
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        return []; // 에러 발생 시 빈 배열 반환
      }
    },

    async realChartData() {
=======
    ...mapGetters('mileage', ['getArrayMileage']),
    ...mapGetters('hitMile', ['getHitMileChart']),
    chartLabels() {
      if (!this.getArrayMileage || this.getArrayMileage.length === 0) {
        console.warn('getArrayMileage is empty or undefined');
        return [];
      }
      const labels = this.getArrayMileage.map((item) => item.mile_name);
      console.log('Chart Labels:', labels);
      return labels;
    },
    chartData() {
      if (!this.getHitMileChart || this.getHitMileChart.length === 0) {
        console.warn('getHitMileChart is empty or undefined');
        return [];
      }
      const data = this.getHitMileChart.map(
        (item) => item.hit_count || item.ht_count
      );
      console.log('Chart Data:', data);
      return data;
    },
  },
  watch: {
    date: 'fetchData', // date 값이 변경되면 fetchData 호출
  },
  methods: {
    async fetchData() {
      try {
        await this.renderChart(); // 차트 업데이트
        this.updateChartBest(); // 차트가 렌더링 된 후 차트Best 업데이트
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    },
    async realChartData() {
      console.log('내가 넘길', this.date);
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
      try {
        const response = await axios.post(
          'http://localhost:8090/mileage/hit_mileChartDATE',
          { date: this.date } // POST 본문에 데이터 포함
        );
<<<<<<< HEAD

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

=======
        const hitCounts = response.data.map((item) => item.hit_count);
        console.log('마일리지 결과', hitCounts);
        return hitCounts;
      } catch (error) {
        console.error('Error fetching chart data:', error);
        return [];
      }
    },
    async renderChart() {
      // 이전 차트가 존재하면 삭제
      if (this.chart) {
        this.chart.destroy();
        this.chart = null; // 차트 인스턴스 초기화
      }

      const ctx = document.getElementById(this.chartId).getContext('2d');
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
      if (!ctx) {
        console.error(`Canvas element with id '${chartId}' not found.`);
        return;
      }

<<<<<<< HEAD
      // 이전에 생성된 차트 객체가 있다면 파괴
      if (this.mileChart[chartId]) {
        this.mileChart[chartId].destroy();
      }
=======
      const chartDataValues = await this.realChartData();
      const chartData = {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              data: chartDataValues, // 여기서 데이터를 사용합니다.
              backgroundColor: [
                '#FF93E1',
                '#64EDBC',
                '#FF93E1',
                '#64EDBC',
                '#FF93E1',
                '#64EDBC',
                '#FF93E1',
                '#64EDBC',
              ],
              borderWidth: 1,
              barThickness: 40, // 막대 두께 설정 (픽셀 단위)
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
      };
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e

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
                  '#FF93E1',
                  '#64EDBC',
                  '#FF93E1',
                  '#64EDBC',
                  '#FF93E1',
                  '#64EDBC',
                  '#FF93E1',
                  '#64EDBC',
                ],
                borderWidth: 1,
                barThickness: 40,
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
<<<<<<< HEAD

=======
    async updateChartBest() {
      const chartDataValues = await this.realChartData();

      if (chartDataValues.length === 0 || !this.getArrayMileage) {
        this.chartBest = 'N/A';
        return;
      }

      let maxIndex = 0;
      let allZero = true;

      for (let i = 0; i < chartDataValues.length; i++) {
        if (chartDataValues[i] > 0) {
          allZero = false;
        }
        if (chartDataValues[i] > chartDataValues[maxIndex]) {
          maxIndex = i;
        }
      }

      if (allZero) {
        this.chartBest = '-';
      } else {
        this.chartBest = this.getArrayMileage[maxIndex]
          ? this.getArrayMileage[maxIndex].mile_name
          : 'N/A';
      }
    },
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
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
<<<<<<< HEAD
    this.updateCharts2(); // 초기 차트 렌더링
=======
    this.$nextTick().then(() => {
      // DOM 업데이트가 완료된 후 차트 그리기
      this.fetchData();
      this.$store.dispatch('mileage/getMileage');
      this.$store.dispatch('hitMile/hit_mileChart');
    });
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy(); // 컴포넌트 언마운트 시 차트 제거
    }
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
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
