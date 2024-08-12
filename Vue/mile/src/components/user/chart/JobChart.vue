<template>
  <div class="flex">
    <div class="chart-container mt-3" style="width: 45%; margin-left: 29px">
      <canvas id="jobChart"></canvas>
    </div>
    <div class="text-center mx-auto" style="width: 45%">
      <p class="KB_C2 lg2">직무별 마일리지 인사이트</p>
      <hr />
      <div v-if="userData[0] > jobChartData[jobNo]">
      <span><strong>"{{ userData[2] }}"</strong> 직무의 평균 점수를 뛰어넘는 성과를 이루셨습니다. <br>
        뛰어난 성과에 박수를 보냅니다! 앞으로도 많은 발전을 기원합니다. </span>
      </div>
      <div v-if="userData[0] == jobChartData[jobNo]">
      <span><strong>"{{ userData[2] }}"</strong> 직무의 평균 점수에 도달했습니다. <br>
        좋은 성과입니다! 앞으로 더 높은 목표를 향해 나아가세요.</span>
      </div>
      <div v-if="userData[0] < jobChartData[jobNo]">
      <span><strong>"{{ userData[2] }}"</strong> 직무의 평균 점수에 도달하지 못했습니다. <br>
        지금도 충분히 잘하고 계십니다. 앞으로 더 좋은 성과를 기대합니다! </span>
      </div>

      
      <div class="progress-container mx-auto " style="margin-top : 80px; width:90%">
        <span>나의 직급위치</span>
        <div class="progress-bar"></div>
        <div class="indicator" :style="{ left: relativeUserScorePercentage + '%'  }">
          <span>My</span>
        </div>
        <div
          class="indicator average " style="left: 50%; margin-bottom: 12px"
        >
          <span>{{ userData[2] }}</span>
        </div>
      </div>
    </div>  
  </div>
  <div class="text-end w-100 mt-3">
    <span class="text-end" style="font-size: 10pt; color: gray">( 최근 업데이트 : {{ userData[1] }} )</span>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "JobChart",
  data() {
    return {
      jobChart: null,
      jobChartData: [],
      userData: [],
      jobs: ["개인", "기업", "기획"],
      maxValue: null,
      minValue: null,
      idxMax: null,
      jobNo: null,
      colors : ["rgba(255,170,231,0.7)","rgba(111,191,244,0.7)","rgba(255,231,143,0.7)" ]
    };
  },
  computed: {
    ...mapGetters("mileScore", ["getMileJobs"]),
    ...mapGetters("login", ["getLoginInfo"]),
    mileJobs() {
      return this.getMileJobs;
    },
    relativeUserScorePercentage() {
      const averageScore = this.jobChartData[this.jobNo];
      const userScore = this.userData[0];
      const diff = userScore - averageScore;
      const maxDiff = Math.max(this.maxValue - averageScore, averageScore - this.minValue);
      return 50 + (diff / maxDiff) * 50 >= 100 ? 100 : 50 + (diff / maxDiff) * 50;
    

  },
  },
  methods: {
    ...mapActions("mileScore", ["getMileJob"]),

    createChart() {
      var ctx = document.getElementById("jobChart").getContext("2d");
      
      new Chart(ctx, {
        type: "bubble",
        data: {
          datasets: [
            {
              label: this.jobs[0],
              data: [
                {
                  x: this.jobChartData[0],
                  y: this.jobChartData[0],
                  r: this.jobChartData[0] / 10,
                },
              ],
              backgroundColor: this.colors[0],
            },
            {
              label: this.jobs[1],
              data: [
                {
                  x: this.jobChartData[1],
                  y: this.jobChartData[1],
                  r: this.jobChartData[1] / 10,
                },
              ],
              backgroundColor: this.colors[1],
            },
            {
              label: this.jobs[2],
              data: [
                {
                  x: this.jobChartData[2],
                  y: this.jobChartData[2],
                  r: this.jobChartData[2] / 50,
                },
              ],
              backgroundColor: this.colors[2],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
              min: Math.floor(this.minValue / 100) * 100 - 500,
              max: Math.ceil(this.maxValue / 100) * 100 + 500,
              ticks: {
             stepSize: 100,
        },
            },
            y: {
              min: Math.floor(this.minValue / 100) * 100 - 500,
              max: Math.ceil(this.maxValue / 100) * 100 + 500,
              ticks: {
            stepSize: 100, 
        },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = context.dataset.label || "";
                  var xValue = context.parsed.x;
                  return label + ": " + xValue;
                },
              },
            },
          },
        },
      });
    },
    async loadMileJobData() {
      try {
        await this.getMileJob(this.getLoginInfo.user_no);
        if (this.mileJobs) {
          console.log("Fetched mileJobs:", this.mileJobs); // 데이터를 제대로 가져왔는지 확인하기 위해 로그 추가
          this.jobChartData = [
            this.mileJobs.job1,
            this.mileJobs.job2,
            this.mileJobs.job3,
          ];
          this.userData = [
            this.mileJobs.user_sum,
            this.mileJobs.mile_date,
            this.mileJobs.user_job,
          ];
          this.idxMax = this.jobChartData.indexOf(
            Math.max(...this.jobChartData)
          );
          this.maxValue = Math.max(...this.jobChartData);
          this.minValue = Math.min(...this.jobChartData);
          this.jobNo = this.jobs.indexOf(this.userData[2]);
          this.$nextTick(() => {
            this.createChart();
          })
          
        } else {
          console.error("No data available for mileJobs");
        }
      } catch (error) {
        console.error("Error loading mileJobs data:", error);
      }
    },
  },
  async mounted() {
    await this.loadMileJobData();
  },
  beforeUnmount() {
    if (this.jobChart) {
      this.jobChart.destroy();
    }
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 0px;
}

.progress-container {
  width: 100%;
  height: 20px;
  background-color: #A3F3D7;
  border-radius: 15px;
  margin: 20px 0;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #A3F3D7;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.indicator {
  position: absolute;
  bottom: -45px; /* Further below the progress bar */
  transform: translateX(-50%);
  background-color: #FFE895;
  color: #4b4a4a;
  padding: 7px;
  border-radius: 25px;
  white-space: nowrap;
}

.indicator:after {
  content: "";
  position: absolute;
  top: -5px; /* Adjust to make the arrow point up */
  left: 50%;
  
  transform: translateX(-50%) rotate(180deg); /* Rotate arrow to point up */
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #FFE895 transparent;
}

.indicator.average {
  background-color: #E3E3E3;
  bottom: 72%; /* Position above the progress bar */
}

.indicator.average:after {
  border-color: #E3E3E3 transparent transparent transparent;
  top: 86%;
}
</style>