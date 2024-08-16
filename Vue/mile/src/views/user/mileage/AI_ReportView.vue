<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <h2 class="bold-x-lg mt-5 mb-5 ml-5" style="font-family: KB_C3">
      {{ this.loginInfo.user_name }}님의 AI 리포트
    </h2>

    <div class="text-end mb-4 mr-3">
      <button class="btn-analysis" @click="analysis">AI 맞춤형 분석하기</button>
    </div>

    <!-- 데이터가 없을 때 메시지 표시 -->
    <div
      v-if="!all"
      class="text-center"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
      "
    >
      <h4 class="text-center">조회한 이력이 없습니다.</h4>
    </div>

    <div v-else>
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="card h-100 shadow-sm fade-in">
            <div class="card-body">
              <h5 class="card-title text-goal" style="font-size: 20pt">
                전체 순위
              </h5>
              <hr />
              <p
                class="mt-4"
                style="font-size: 35pt; font-family: 'KB_C1'; font-weight: 600"
              >
                <span class="fs-4">상위</span> {{ myRank }}%
              </p>
              <span class="addInfo">( 순위분석 기준일 : {{ dateAi }} )</span>
            </div>
          </div>
        </div>
        <div class="col-md mb-4">
          <div class="card h-100 shadow-sm fade-in">
            <div class="card-body card-ml">
              <h5 class="text-primary text-start" style="font-size: 20pt">
                AI 종합 분석
              </h5>
              <p class="text-start addInfo">
                * 마일이지 AI가 예측한 마일리지 추이와 점수를 토대로 앞으로의
                마일리지 취득 전략을 제안해드립니다.
              </p>
              <div class="card-gray">
                <span>{{ all }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-flex">
        <div class="col-md-5 mb-4">
          <div class="card shadow-sm fade-in">
            <div v-if="successYN" class="text-center">
              <div class="card-body">
                <canvas id="myChart1" style="height: 35vh"></canvas>
              </div>
              <!-- <canvas ref="makeChart1" style="height: 30vh"></canvas> -->
            </div>
          </div>
        </div>
        <div class="col-md mb-4">
          <div class="card shadow-sm fade-in">
            <div class="card-body card-ml">
              <h5 class="text-gray text-start">순위 분석</h5>
              <div class="card-gray">
                <span>{{ rank }}</span>
              </div>
              <h5 class="text-gray text-start mt-4">1등 추격 전략 🎯</h5>
              <div class="card-gray" style="text-align: start">
                <span> {{ catchTop }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-flex">
        <div class="col-md mb-4">
          <div class="card shadow-sm fade-in">
            <div class="card-body card-ml">
              <h5 class="text-gray text-start">마일리지별 분석</h5>
              <p class="text-start addInfo">
                * 마일이지가 사용자의 포지션에 따라 분석한 결과로, 마일리지
                가중치 및 연간 최대 한도를 고려하여 전략과 개선 사항을
                제안해드립니다.
              </p>
              <div class="card-gray">
                <span> {{ mile }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 mb-4">
          <div class="card shadow-sm fade-in">
            <div class="card-body">
              <canvas id="myChart2" style="height: 30vh"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md">
          <div
            class="card shadow-sm mb-4 fade-in"
            style="background-color: #f5f5f5; border: #f5f5f5"
          >
            <div class="card-body text-start card-ml">
              <h5 class="text-emphasis text-start">
                <i class="bi bi-info-circle-fill"></i> 유의 사항
              </h5>
              <span class="ml-5">
                본 리포트는 마일이지 플랫폼에 축척된 데이터를 학습한 AI 모델의
                예측에 기반하고 있습니다. <br />
              </span>
              <span class="ml-5">
                본 리포트는 마일리지 관리를 위한 참고 목적으로 활용할 수 있도록
                제공되며, 증빙 등의 다른 목적으로는 사용할 수 없습니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import api from '@/api/axios';
import Swal from 'sweetalert2';

Chart.register(annotationPlugin);

export default {
  name: 'AI_ReportView',

  data() {
    return {
      hasReport: true, // 리포트 데이터 존재 여부
    };
  },
  methods: {
    async aitest() {
      try {
        const response = await api.post('bot/chat', null, {
          params: {
            prompt: `이름: ${this.loginInfo.user_name}, 사번: ${this.loginInfo.user_no}님을`,

            user_no: this.loginInfo.user_no,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error during API request:', error);
      }
    },

    async airank() {
      try {
        const response = await api.post('bot/chatRank', null, {
          params: {
            prompt: `이름: ${this.loginInfo.user_name}, 사번: ${this.loginInfo.user_no}님`,

            user_no: this.loginInfo.user_no,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error during API request:', error);
      }
    },

    async aiCatch() {
      try {
        const response = await api.post('bot/chatCatchup', null, {
          params: {
            prompt: `이름: ${this.loginInfo.user_name}, 사번: ${this.loginInfo.user_no}님`,

            user_no: this.loginInfo.user_no,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error during API request:', error);
      }
    },
    async aiMile() {
      try {
        const response = await api.post('bot/chatMile', null, {
          params: {
            prompt: `이름: ${this.loginInfo.user_name}, 사번: ${this.loginInfo.user_no}`,

            user_no: this.loginInfo.user_no,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error during API request:', error);
      }
    },

    async runAnalysis() {
      // 순차적으로 메소드를 실행
      await this.aitest();
      await this.delay(5000);
      await this.airank();
      await this.delay(5000);
      await this.aiMile();
      await this.delay(10000);
      await this.aiCatch();
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    ...mapActions('aireport', ['getReport']),
    // async
    getReport() {
      try {
        // await
        this.$store.dispatch('aireport/getReport', this.loginInfo.user_no);
        if (this.all) {
          // 데이터가 있는 경우에만 차트 생성
          this.createCharts();
        }
      } catch (error) {
        console.error('Failed to get report:', error);
        // 에러 처리 로직 (예: 사용자에게 알림)
      }
    },

    async createCharts() {
      this.createChart1();
      this.createChart2();
    },

    async analysis() {
      const today = new Date().toISOString().split('T')[0];
      if (this.dateAi === today) {
        Swal.fire({
          title: '알림',
          text: '하루에 한 번만 조회가 가능합니다.',
          icon: 'info',
          confirmButtonText: '확인',
        });
        return;
      }

      try {
        // 분석 알림창을 표시하고, 동시에 백그라운드에서 분석 작업을 시작합니다.
        const alertPromise = this.analysisAlert();
        const analysisPromise = this.runAnalysis();

        // 두 작업이 모두 완료될 때까지 기다립니다.
        await Promise.all([alertPromise, analysisPromise]);

        Swal.fire({
          title: '분석 완료',
          text: '마일리지 분석이 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        // 분석이 완료되면 데이터를 가져옵니다.
        await this.getReport();

        // 분석 완료 메시지를 표시합니다.
      } catch (error) {
        console.error('분석 중 오류가 발생했습니다:', error);
        Swal.fire({
          title: '오류',
          text: '분석 중 문제가 발생했습니다. 다시 시도해 주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    },

    async analysisAlert() {
      return new Promise((resolve) => {
        Swal.fire({
          timer: 45000,
          timerProgressBar: true,
          imageUrl: require('@/assets/img/analysis.gif'),
          imageClass: 'custom-image-class',
          scrollbarPadding: false,
          title: '분석중..',
          html: `${this.getLoginInfo.user_name}님의 마일리지를 분석중입니다`,
          showCloseButton: true,
          didOpen: () => {
            const popup = Swal.getPopup();
            const image = Swal.getImage();
            const title = popup.querySelector('.swal2-title');
            const img = popup.querySelector('.swal2-image');

            title.style.marginTop = '0';
            title.style.paddingTop = '0';
            popup.style.height = '400px';
            img.style.margin = '15px auto 0px auto';
            image.style.width = '200px';
            image.style.height = 'auto';
            image.style.padding = '0px 0px 0px 30px';

            Swal.showLoading();
          },
          willClose: () => {
            resolve();
          },
        });
      });
    },

    createChart1() {
      console.log('차트1', document.getElementById('myChart1'));
      let myChart1 = document.getElementById('myChart1');
      // const myChart1 = this.$refs.makeChart1;
      const ctx = myChart1.getContext('2d');
      if (Chart.getChart(myChart1)) {
        Chart.getChart(myChart1)?.destroy();
      }

      if (!ctx) {
        return;
      }
      const score = parseInt(this.chartRank);

      const getPointColor = (score) => {
        if (score > 70) return 'rgba(146, 183, 255)';
        if (score >= 30) return 'rgba(39, 234, 182)';
        return 'rgba(255, 206, 86)';
      };

      // 선형 보간 함수
      const linearInterpolation = (x, x0, x1, y0, y1) => {
        return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
      };

      // 점수에 따른 x 위치 계산
      const getXPosition = (score) => {
        if (score <= 30) return linearInterpolation(score, 0, 30, 0, 1);
        if (score <= 70) return linearInterpolation(score, 30, 70, 1, 2);
        return linearInterpolation(score, 70, 100, 2, 3);
      };

      const xPosition = getXPosition(score);

      myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['0%', '30%', '70%', '100%'],
          datasets: [
            {
              data: [
                { x: 0, y: 0 },
                { x: 1, y: 30 },
                { x: 2, y: 70 },
                { x: 3, y: 100 },
              ],
              borderColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  return null;
                }
                const gradient = ctx.createLinearGradient(
                  chartArea.left,
                  0,
                  chartArea.right,
                  0
                );
                gradient.addColorStop(0, 'rgba(255, 206, 86, 1)');
                gradient.addColorStop(0.31, 'rgba(255, 206, 86, 1)');
                gradient.addColorStop(0.35, 'rgba(39, 234, 182, 1)');
                gradient.addColorStop(0.66, 'rgba(39, 234, 182, 1)');
                gradient.addColorStop(0.69, 'rgba(146, 183, 255, 1)');
                gradient.addColorStop(1, 'rgba(146, 183, 255, 1)');
                return gradient;
              },
              borderWidth: 2,
              fill: true,
              backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  return null;
                }
                const gradient = ctx.createLinearGradient(
                  chartArea.left,
                  0,
                  chartArea.right,
                  0
                );
                gradient.addColorStop(0, 'rgba(255, 206, 86, 0.5)');
                gradient.addColorStop(0.31, 'rgba(255, 206, 86, 0.5)');
                gradient.addColorStop(0.35, 'rgba(39, 234, 182, 0.5)');
                gradient.addColorStop(0.66, 'rgba(39, 234, 182, 0.5)');
                gradient.addColorStop(0.69, 'rgba(146, 183, 255, 0.5)');
                gradient.addColorStop(1, 'rgba(146, 183, 255, 0.5)');
                return gradient;
              },
              pointRadius: 0,
              order: 2, // 라인 그래프를 뒤로 보냅니다
            },
            {
              data: [{ x: xPosition, y: score }],
              pointBackgroundColor: getPointColor(score),
              pointBorderColor: getPointColor(score),
              pointRadius: 6,
              pointHoverRadius: 8,
              type: 'scatter',
              order: 1, // 스캐터 포인트를 앞으로 가져옵니다
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              min: 0,
              max: 3,
              ticks: {
                stepSize: 1,
                callback: function (value, index) {
                  return ['0%', '30%', '70%', '100%'][index];
                },
              },
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                display: true,
              },
              ticks: {
                // display: false
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  if (context.datasetIndex === 1) {
                    return 'Me: ' + context.parsed.y + '%';
                  }
                },
              },
            },
          },
          elements: {
            point: {
              radius: 0,
            },
            line: {
              tension: 0.2,
            },
          },
        },
        plugins: [
          {
            afterDraw: (chart) => {
              const ctx = chart.ctx;
              const xAxis = chart.scales.x;
              const yAxis = chart.scales.y;

              const x = xAxis.getPixelForValue(xPosition);
              const y = yAxis.getPixelForValue(score);

              ctx.save();
              ctx.fillStyle = getPointColor(score);
              ctx.font = 'bold 14px Arial';
              ctx.textAlign = 'center';

              if (score < 79) {
                // 화살표 그리기
                ctx.strokeStyle = getPointColor(score);

                // 막대기 부분
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y - 40);
                ctx.lineWidth = 2;
                ctx.stroke();

                // 삼각형 화살표 부분
                ctx.beginPath();
                ctx.moveTo(x, y - 40);
                ctx.lineTo(x - 6, y - 34);
                ctx.lineTo(x + 6, y - 34);
                ctx.closePath();
                ctx.fill();

                // "Me!" 텍스트 그리기
                ctx.fillText('Me!', x, y - 50);
              } else {
                // score가 79 이상일 때는 scatter 바로 위에 "Me!" 표시
                ctx.fillText('Me!', x, y - 15);
              }

              ctx.restore();
            },
          },
        ],
      });
    },

    createChart2() {
      let myChart2 = document.getElementById('myChart2');

      const ctx = myChart2.getContext('2d');
      if (Chart.getChart(myChart2)) {
        Chart.getChart(myChart2)?.destroy();
      }

      if (!ctx) {
        return;
      }

      this.label = this.avg_score_json.map((item) => item.mile_name);
      this.avg_data = this.avg_score_json.map((item) => item.average_score);
      this.my_data = this.my_score_json.map((item) => item.total_score);

      console.log();
      let data = {
        labels: this.label,

        datasets: [
          {
            label: '내 점수',
            data: this.my_data,
            backgroundColor: 'rgba(255, 0, 46, 0.3)',
            borderColor: 'rgba(255, 0, 46, 0.5)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
          {
            label: '평균 점수',
            data: this.avg_data,
            backgroundColor: 'rgba(0, 122, 255, 0.2)',
            borderColor: 'rgba(0, 122, 255, 0.4)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
          },
        ],
      };

      const config = {
        type: 'radar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 3,
            },
          },
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                stepSize: 20, // 간격을 20으로 설정 (5개의 간격: 20, 40, 60, 80, 100)
                display: false, // 눈금 숫자를 표시하지 않음
              },
              pointLabels: {
                font: {
                  size: 12, // 레이블 폰트 크기 조정
                },
              },
              grid: {
                // circular: true,
                color: 'rgba(0, 0, 0, 0.2)', // 그리드 선 색상 설정 (필요시)
              },
            },
          },
        },
      };

      myChart2 = new Chart(ctx, config);
    },
  },
  mounted() {
    this.getReport();
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    ...mapGetters('aireport', [
      'getAll',
      'getRank',
      'getCatchTops',
      'getDateAi',
      'getMyRank',
      'getChartRank',
      'getAvg_score_json',
      'getMy_score_json',
      'getSuccessYN',
      'getMile',
    ]),

    loginInfo() {
      return this.getLoginInfo;
    },
    all() {
      return this.getAll;
    },
    rank() {
      return this.getRank;
    },
    catchTop() {
      return this.getCatchTops;
    },
    mile() {
      return this.getMile;
    },
    dateAi() {
      return this.getDateAi;
    },
    myRank() {
      return this.getMyRank;
    },
    chartRank() {
      return this.getChartRank;
    },
    avg_score_json() {
      return this.getAvg_score_json;
    },
    my_score_json() {
      return this.getMy_score_json;
    },
    successYN() {
      return this.getSuccessYN;
    },
  },

  watch: {
    loginInfo: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.getReport();
        }
      },
    },
    all: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.createCharts();
          });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.text-emphasis {
  font-size: 13pt;
  font-family: 'KB_S5';
  font-weight: 600;
  color: #4b4a4a;
}

.card {
  transition: all 0.3s ease;
}

.card-ml {
  margin-left: 10px;
  text-align: start;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.text-primary {
  color: #32ab8b !important;
  font-weight: 600;
  font-family: 'KB_S5';
}

.text-secondary {
  color: #4a90e2 !important;
  font-weight: 600;
  font-family: 'KB_S5';
}

.text-goal {
  color: #ff7e5e !important;
  font-weight: 600;
  font-family: 'KB_S5';
}

.text-gray {
  color: #3b3b3b !important;
  font-weight: 600;
  font-family: 'KB_S5';
}

.addInfo {
  color: rgb(152, 152, 152);
  font-size: 12pt;
}

.card-gray {
  border-radius: 7px;
  padding: 15px 10px 15px 10px;
  text-align: start;
}

span {
  font-size: 14pt;
  font-family: 'KB_S5';
}

.row {
  margin: 17px 0px 17px 0px;
}

.highlight {
  background-color: #fff6d4;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8px; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
}

.page-back {
  padding-left: 5%;
  padding-right: 5%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.row.d-flex {
  display: flex;
  flex-wrap: wrap;
}

.row.d-flex > [class*='col-'] {
  display: flex;
  flex-direction: column;
}

.row.d-flex > [class*='col-'] > .card {
  flex: 1;
}

.mileReport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-gray {
  flex: 1;
  overflow-y: auto;
}

#myChart2 {
  height: 100% !important;
  width: 100% !important;
}
</style>
