<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">직급별 방문자 수</p>
      <div class="cards favorite-card">
        <div class="text-right">
          <input
            type="date"
            class="date"
            id="date"
            v-model="date"
            :max="maxDate"
            @change="updateCharts3"
          />
        </div>
        <br />
        <div class="sub">
          <div class="chart-container">
            <canvas :id="positionChartId[0]" class="positionchart"></canvas>
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
  name: 'PositionChart',
  data() {
    return {
      positionChart: {}, // 차트 객체를 저장할 객체
      date: '', // 날짜 값을 저장할 변수
      positionChartId: ['PositionChart'], // 랜덤 문자열로 유니크 ID 생성
      todayDate: new Date().toISOString().split('T')[0], // 오늘 날짜를 ISO 문자열로 저장
      best: '-', // 초기값 설정
    };
  },
  computed: {
    maxDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // 하루 전 날짜를 구함
      return yesterday.toISOString().split('T')[0]; // ISO 문자열로 반환
    },
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },

  methods: {
    async updateCharts3() {
      try {
        const { hitCounts } = await this.realChartData();
        this.renderChart3(hitCounts); // renderChart3 메서드 호출
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },

    async realChartData() {
      try {
        const response = await axios.post(
          'http://localhost:8090/mileage/levelChartData',
          { date: this.date } // POST 요청에 날짜 데이터 포함
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response data format');
        }

        const levelChartData = response.data.map((item) => item.hit_count);
        console.log('원형차트 결과', levelChartData);

        return { levelChartData };
      } catch (error) {
        console.error('Error fetching chart data:', error);
        return { levelChartData: [] }; // 에러 발생 시 빈 배열 반환
      }
    },

    renderChart3(levelChartData) {
      const chartId = this.positionChartId[0]; // 첫 번째 chartId 가져옴
      const ctx = document.getElementById(chartId);

      if (!ctx) {
        console.error(`Canvas element with id '${chartId}' not found.`);
        return;
      }

      // 이전에 생성된 차트 객체가 있다면 파괴
      if (this.positionChart[chartId]) {
        this.positionChart[chartId].destroy();
      }

      try {
        this.positionChart[chartId] = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['L0', 'L1', 'L2', 'L3', 'L4'],
            datasets: [
              {
                data: levelChartData, // 실제 데이터로 변경
                backgroundColor: ['#FF93E1', '#64EDBC', '#FF93E1', '#64EDBC'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'right', // 범례를 오른쪽에 표시
              },
            },
            maintainAspectRatio: false,
          },
        });
      } catch (error) {
        console.error('Error rendering chart:', error);
      }
    },

    setInitialDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // 하루 전 날짜로 설정

      const formattedDate = yesterday.toISOString().split('T')[0];

      this.date = formattedDate; // 초기 날짜 설정
    },
  },

  mounted() {
    this.setInitialDate(); // 초기 날짜 설정
    this.updateCharts3(); // 초기 차트 렌더링
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
.positionchart {
  margin-bottom: 50px;
  width: 200px;
}
</style>
