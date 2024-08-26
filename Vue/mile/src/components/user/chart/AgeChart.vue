<template>
  <div v-if="!isMobile">
    <div class="flex">
      <div class="chart-container mt-3 ">
        <!-- 연령별 차트 그리기 -->
        <canvas id="ageChart"></canvas>
      </div>
      <div class="text-center w-60 mx-auto">
        <p>
          <!--<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: Icon Mela - Flaticon</a>-->
          <sup><img src="@/assets/img/left-quote.png" class="quote mb-2" /></sup>
          &nbsp;
          <span class="KB_C2 ageSpan"
            >{{ userData[0] ? userData[0] + 0 + "대" : '' }} 마일리지 총 평균 :  
          </span>
          <span class="KB_C2 ageSpan" style="font-size: 23px">
            <mark class=KB_C2 ageSpan>{{ ageChartData[userData[0]-2] }}점</mark></span>&nbsp;
          <sup><img src="@/assets/img/right-quote.png" class="quote mb-2" /></sup>
        </p>

        <div style="font-size: 13pt" v-if=" userData[1] > ageChartData[userData[0]-2]">
          "대단해요! {{ userData[0] ? userData[0] + 0 + "대" : '' }} 평균보다 더 많은 점수를 획득하셨어요. 멋진 성과입니다!"
        </div>
        <div v-else-if=" userData[1] == ageChartData[userData[0]-2]" style="font-size: 13pt">
          "정말 멋져요! {{ userData[0] ? userData[0] + 0 + "대" : '' }} 평균과 점수가 비슷해요. 계속해서 좋은 성과를 기대할게요!"
        </div>
          <div v-else-if=" userData[1] < ageChartData[userData[0]-2]" style="font-size: 13pt">
          "지금도 충분히 잘하고 계세요. 조금만 더 노력하면 {{ userData[0] ? userData[0] + 0 + "대" : '' }} 평균을 넘을 수 있을 거예요!"
        </div>
      </div>
    </div>
    <div  class="text-end w-100 mt-3">
      <span class="text-end" style="font-size:10pt; color:gray;">( 최근 업데이트 : {{userData[2]}} )</span>
    </div>
  </div>
  <div v-else>
    <div class="flex">
      <div class="chart-container" >
        <!-- 연령별 차트 그리기 -->
        <canvas id="ageChart"></canvas>
      </div>
      <div class="text-center w-60 mx-auto mt-5">
        <p>
          <sup><img src="@/assets/img/left-quote.png" class="quote mb-2" /></sup>
          &nbsp;
          <span class="KB_C2 ageSpan"
            >{{ userData[0] + 0 + "대" }} 마일리지 총 평균 :  
          </span>
          <span class="KB_C2 ageSpan">
            <mark class="KB_C2 ageSpan">{{ ageChartData[userData[0]-2] }}점</mark></span>&nbsp;
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
  </div>
</template>

<script>
import { Chart } from "chart.js";
import { mapActions, mapGetters } from "vuex";
import MobileDetect from "mobile-detect";

export default {
  name: "AgeChart",
  data() {
    return {
      ageChartData: [], // 초기값을 설정합니다.
      userData: [],
      isMobile: false,
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
      Chart.getChart('ageChart')?.destroy(); // this.chart.destroy()가 먹히지 않았음! Chart.getChart('ageChart')가 null이 아니면 destroy() 시킨다. 
      
      const ctx = document.getElementById("ageChart").getContext("2d");
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

        this.$nextTick(() => {
          this.createChart();
        });
      } else {
        console.error("No data available for mileAges");
      }
    },
  },
  mounted() {
    const md = new MobileDetect(window.navigator.userAgent);
    this.isMobile = md.mobile() !== null;

    // await this.loadMileAgeData();
  },
  async created() {
    await this.loadMileAgeData();
  },
  beforeUnmount() {
    Chart.getChart('ageChart')?.destroy();
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .flex {
    flex-direction: column !important;
    align-items: center !important;
  }

  .chart-container, .text-container {
    width: 100% !important;
    margin-top: 20px !important;
  }

  .chart-container {
    height: 200px !important; /* 적절한 높이로 조정 */
  }

  .ageSpan {
    font-size: 20px !important;
  }

  .mobile-text {
    padding-top: 3% !important;
  }
}
.chart-container {
  height: 100%;
  width: 37%; 
  margin-left:29px;
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