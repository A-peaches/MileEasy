<template>
  <div class="flex">
    <div class="chart-container mt-4">
      <!-- 직급별 차트 그리기 -->
      <canvas id="positionChart" ></canvas>
    </div>
    <div class="text-container mx-auto mt-3 ">

      <div v-if="userData[1] > positionData[userData[0]-1]">
        <p class="KB_C2 lg2"><span class="lg">🙌🏻</span> 정말 대단하세요! </p>
        <p>당신의 마일리지 점수는 직급별 평균점수보다 높습니다. </p>
      </div>
      <div v-else-if="userData[1] == positionData[userData[0]-1]">
        <p class="KB_C2 lg2"><span class="lg">🙌🏻</span> 정말 대단하세요!</p>
        <p>당신의 마일리지 점수는 직급별 평균점수와 비슷합니다. </p>
      </div>
      <div v-else-if="userData[1] < positionData[userData[0]-1]">
        <p class="KB_C2 lg2"><span class="lg">💪🏻</span> 아자아자 화이팅!</p>
        <p>"{{getLoginInfo.position_no }}" 직급의 평균에 도달하는 날이 멀지 않았어요. </p>
      </div>

      <table class="table  table-bordered  table-gray mt-3">
        <caption class="text-end" style="font-size:10pt; color: gray;">( 최근 업데이트 : {{userData[2]}} )</caption>
        <thead>
          <tr>
            <td class="KB_C2">{{getLoginInfo.position_no }} 직급 평균</td>
            <td class="KB_C2" >나의 평균</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{positionData[userData[0]-1]}}</td>
            <td>{{userData[1]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PositionChart",
  data() {
    return {
      positionData: [], // 차트데이터
      userData: [],
      positionChart: null, // 차트 인스턴스 저장
    };
  },
  computed: {
    ...mapGetters("mileScore", ["getMilePositions"]),
    ...mapGetters("login", ["getLoginInfo"]),
  },
  methods: {
    ...mapActions("mileScore", ["getMilePosition"]),
    // 직급별 차트 생성 로직
    createChart() {
      const ctx = document.getElementById("positionChart").getContext("2d");
      if (this.positionChart) {
        this.positionChart.destroy(); // 기존 차트를 파괴
      }
      const userData = this.userData;
      //이벤트 처리 
      const customPlugin = {
        id: 'customPlugin',
        afterDatasetsDraw: (chart) => {
          const { ctx, data, chartArea: { top } } = chart;
          ctx.save();
          const dataset = data.datasets[0];
          dataset.data.forEach((value, index) => {
            const meta = chart.getDatasetMeta(0);
            const bar = meta.data[index];
            const barPosition = bar.getCenterPoint();
            const padding = 10;
            const balloonWidth = 60;
            const balloonHeight = 30;
            const arrowWidth = 10;
            const arrowHeight = 10;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = '#000';

            if (index === userData[0]-1) { // 해당하는 직급에 My표시
              // Draw balloon
              ctx.fillStyle = 'white';
              ctx.strokeStyle = '#CBCBCB';
              ctx.lineWidth = 1;

              // Draw rectangle
              ctx.beginPath();
              ctx.moveTo(barPosition.x - balloonWidth / 2 +15, top + bar.y - balloonHeight - arrowHeight - padding+5);
              ctx.lineTo(barPosition.x + balloonWidth / 2 -15, top + bar.y - balloonHeight - arrowHeight - padding+5);
              ctx.lineTo(barPosition.x + balloonWidth / 2 -15, top + bar.y - arrowHeight - padding-3);
              ctx.lineTo(barPosition.x + arrowWidth / 2, top + bar.y - arrowHeight - padding-3);
              ctx.lineTo(barPosition.x, top + bar.y - padding-5);
              ctx.lineTo(barPosition.x - arrowWidth / 2, top + bar.y - arrowHeight - padding-3);
              ctx.lineTo(barPosition.x - balloonWidth / 2 +15, top + bar.y - arrowHeight - padding-3);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Draw text
              ctx.fillStyle = '#000';
              ctx.fillText('My', barPosition.x, top + bar.y - balloonHeight - padding+13);
            }
          });
          ctx.restore();
        }
      };

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          // 직급별 데이터
          labels: ["계장", "대리", "과장", "차장", "부장"],
          datasets: [
            {
              data: this.positionData,
              backgroundColor: ["#FFD46A","#FFDA81","#FFE196","#FFE9B5","#FFEDC1"],
              barThickness: 30, // 막대의 너비를 설정합니다.
              maxBarThickness: 30 // 최대 막대 너비를 설정합니다.
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
          display: false, // 범례를 숨김
        },
          },
          
        },
        plugins: [customPlugin]
      });
    },
    async loadMilePositionData() {
      await this.getMilePosition(this.getLoginInfo.user_no);
      // Vuex 스토어의 상태가 업데이트될 때까지 잠시 기다립니다
      await this.$nextTick();
      if (this.getMilePositions) {
        const milePosition = this.getMilePositions;
        this.positionData = [
          milePosition.mile_position1,
          milePosition.mile_position2,
          milePosition.mile_position3,
          milePosition.mile_position4,
          milePosition.mile_position5,
        ];
        this.userData = [milePosition.user_position, milePosition.user_sum, milePosition.mile_date];
        this.createChart();
      } else {
        console.error("No data available for milePosition");
      }
    },
  },
  beforeUnmount() {
    if (this.positionChart) {
      this.positionChart.destroy(); // 컴포넌트가 제거될 때 차트를 파괴
    }
  },
  async mounted() {
    await this.loadMilePositionData();
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .flex {
    flex-direction: column;
    align-items: center;
  }

  .chart-container, .text-container {
    width: 100%;
    margin: 10px 0;
  }

  .chart-container {
    height: 300px; /* 적절한 높이로 조정 */
  }
}

.flex {
  display: flex;
  flex-direction: row; /* 수평으로 나열 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: space-between; /* 양쪽 끝 정렬 */
  height:100%;
  margin-bottom: 0px;
}

.chart-container {
  width: 43%;
  height : 100%;
  margin-left: 50px;
}

.text-container {
  display: flex; /* Flexbox를 사용 */
  flex-direction: column; /* 수직 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  width: 40%;
  text-align: center;
}
</style>
