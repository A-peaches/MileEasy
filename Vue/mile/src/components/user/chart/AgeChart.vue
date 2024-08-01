<template>
  <div class="flex">
    <div class="chart-container mt-3 " style="width: 37%; margin-left:29px">
      <!-- 연령별 차트 그리기 -->
      <canvas id="ageChart"></canvas>
    </div>
    <div class="text-center w-60 mx-auto">
      <p>
        <!--<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: Icon Mela - Flaticon</a>-->
        <sup><img src="@/assets/img/left-quote.png" class="quote mb-2" /></sup>
        &nbsp;
        <span class="KB_C2 ageSpan"
          >{{ userData[0] + 0 + "대" }} 마일리지 총 평균 :  
        </span>
        <span class="KB_C2 ageSpan" style="font-size: 23px">
          <mark class=KB_C2 ageSpan>{{ ageChartData[userData[0]-2] }}점</mark></span>&nbsp;
        <sup><img src="@/assets/img/right-quote.png" class="quote mb-2" /></sup>
      </p>

      <div style="font-size: 13pt" v-if=" userData[1] > ageChartData[userData[0]-2]">
        "대단해요! {{ userData[0] + 0 + "대" }} 평균보다 더 많은 점수를 획득하셨어요. 멋진 성과입니다!"
      </div>
      <div v-else-if=" userData[1] == ageChartData[userData[0]-2]" style="font-size: 13pt">
      "정말 멋져요! {{ userData[0] + 0 + "대" }} 평균과 점수가 비슷해요. 계속해서 좋은 성과를 기대할게요!"
     </div>
      <div v-else-if=" userData[1] < ageChartData[userData[0]-2]" style="font-size: 13pt">
      "지금도 충분히 잘하고 계세요. 조금만 더 노력하면 {{ userData[0] + 0 + "대" }} 평균을 넘을 수 있을 거예요!"
     </div>
     
    </div>
    <div  class="text-end w-100 mt-3">
    <span class="text-end" style="font-size:10pt; color:gray;">( 최근 업데이트 : {{userData[2]}} )</span>
  </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AgeChart",
  data() {
    return {
      ageChart: null, // Chart 객체를 저장하기 위한 데이터 속성
      ageChartData: [], // 초기값을 설정합니다.
      userData: []
    };
  },
  computed: {
    ...mapGetters("mileScore", ["getMileAges"]),
    ...mapGetters("login", ["getLoginInfo"]),
    mileAges() {
      return this.getMileAges;
    },
  },
  methods: {
    ...mapActions("mileScore", ["getMileAge"]),
    createChart() {
      const ctx = document.getElementById("ageChart").getContext("2d");
      if (this.ageChart) {
        this.ageChart.destroy(); // 기존 차트를 파괴
      }
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["20대", "30대", "40대", "50대 이상"],
          datasets: [
            {
              data: this.ageChartData,
              backgroundColor: ["#FFAAE7", "#E4E4E4", "#FFE78F", "#9FEDD1"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "right", // 범례를 하단으로 이동
              padding: 20, // 범례 항목에 20px의 패딩 추가
            },
          },
        },
        layout: {
          padding: {
            top: 20,
            bottom: 30, // 하단에 30px의 여백 추가
          },
        },
      });
    },
    async loadMileAgeData() {
      await this.getMileAge(this.getLoginInfo.user_no);
      if (this.mileAges) {
        // mileAges가 객체이므로 length 대신 존재 여부를 확인
        this.ageChartData = [
          this.mileAges.mile20,
          this.mileAges.mile30,
          this.mileAges.mile40,
          this.mileAges.mile50,

        ];
        this.userData = [
        this.mileAges.user_age.toString().substring(0, 1),
        this.mileAges.user_sum,
        this.mileAges.mile_date
        ]
        this.createChart();
      } else {
        console.error("No data available for mileAges");
      }
    },
  },
  async mounted() {
    await this.loadMileAgeData();
  },
  beforeUnmount() {
    if (this.ageChart) {
      this.ageChart.destroy(); // 컴포넌트가 제거될 때 차트를 파괴
    }
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}

.quote {
  width: 25px;
  height: 25px;
}

.ageSpan {
  font-size: 23px;
  color: #4b4a4a;
}

.flex {
  align-items: center; /* 수직 가운데 정렬 */
}

</style>
