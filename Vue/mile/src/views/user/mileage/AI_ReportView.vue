<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <h2 class="bold-x-lg mt-5 mb-5 ml-5" style="font-family: KB_C3">
      김근미님의 AI 리포트
    </h2>

    <div class="text-end mb-4 mr-3">
      <button class="btn-analysis" @click="analysis">AI 맞춤형 분석하기</button>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm fade-in">
          <div class="card-body">
            <h5 class="card-title text-goal" style="font-size:20pt">
                전체 순위</h5>
            <hr />
            <p
              class="mt-4"
              style="font-size: 35pt; font-family: 'KB_C1'; font-weight: 600"
            >
              <span class="fs-4">상위</span> 25%
            </p>
            <span class="addInfo">( 순위 분석 기준일 : 2024.08.01 )</span>
          </div>
        </div>
      </div>
      <div class="col-md mb-4">
        <div class="card h-100 shadow-sm fade-in" >
          <div class="card-body card-ml">
            <h5 class="text-primary text-start " style="font-size:20pt">
            AI 종합 분석</h5>
            <p class="text-start addInfo">
              * 마일이지 AI가 예측한 마일리지 추이와 점수를 토대로 앞으로의
              마일리지 취득 전략을 제안해드립니다.
            </p>
            <div class="card-gray">
              <span>
                김근미님은 2024.08.01 기준으로 상위 25%에 해당하며, 전반적으로
                우수한 성과를 보이고 있습니다. '연수 마일리지'와 'Monthly
                Best'에 조금 더 집중하시면, 연말 평가에서 더욱 좋은 결과를
                얻으실 수 있을 것으로 예상됩니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 mb-4">
        <div class="card h-100 shadow-sm fade-in">
          <div class="card-body">
            <canvas id="myChart1" style="height: 30vh"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md mb-4">
        <div class="card h-100 shadow-sm fade-in">
          <div class="card-body card-ml">
            <h5 class="text-gray text-start">순위 분석</h5>
            <div class="card-gray">
              <span>
                김근미님은 전체 직원 중 상위 25%에 위치해 있으며, 꾸준한
                노력으로 상위권을 유지하고 계십니다. 다음 분기까지 'HotTip'
                마일리지를 20점 추가로 획득하시면 귀하의 전체 순위가 5% 정도
                상승할 것으로 예상됩니다.
              </span>
            </div>
            <h5 class="text-gray text-start mt-4">1등 추격 전략 🎯</h5>
            <div class="card-gray" style="text-align: start">
              <span>
                현재 1등과의 점수 차이는 500점입니다. 연말까지 1등을 추격하려면
                <span class="text-goal">하루 평균 5.5점</span>
                의 마일리지를 쌓으셔야 합니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md mb-4">
        <div class="card h-100 shadow-sm fade-in">
          <div class="card-body card-ml">
            <h5 class="text-gray text-start">마일리지별 분석</h5>
            <p class="text-start addInfo">
              * 마일이지가 사용자의 포지션에 따라 분석한 결과로, 마일리지 가중치 및 연간 최대 한도를 고려하여
               전략과 개선 사항을 제안해드립니다.
            </p>
            <div class="card-gray">
              <span> 김근미님이 속한 '경인지역영업' 그룹에서는 '리그 테이블' 마일리지의 가중치가 가장 높습니다. 
                이 활동에 집중하시면 더 빠른 마일리지 점수 상승이 가능할 것으로 보입니다.
                <br><br>
                다른 직원들에 비해 'BEST PG' 마일리지가 20% 낮은 편입니다.
                 이 영역에 조금 더 신경 쓰시면 전체 순위 상승에 도움이 될 것 같습니다.
                <br><br>
                '소비자 지원' 부문에서 탁월한 성과를 보여주셨습니다. 
                김근미님의 꾸준한 노력과 소비자 지원에 대한 관심도가 전체 마일리지 평균 점수를 크게 향상시켰습니다.
                이는 매우 가치 있는 기여입니다. 꾸준히 유지해주세요.
            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 mb-4">
        <div class="card h-100 shadow-sm fade-in">
          <div class="card-body">
            <canvas id="myChart2" style="height: 30vh"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="card shadow-sm mb-4 fade-in" style="background-color: #f5f5f5;
        border:#f5f5f5">
          <div class="card-body text-start card-ml">
            <h5 class="text-emphasis text-start">
              <i class="bi bi-info-circle-fill"></i> 유의 사항
            </h5>
            <span class="ml-5">
              본 리포트는 마일이지 플랫폼에 축척된 데이터를 학습한 AI 모델의
              예측에 기반하고 있습니다. <br
            /></span>
            <span class="ml-5">
              본 리포트는 마일리지 관리를 위한 참고 목적으로 활용할 수 있도록
              제공되며, 증빙 등의 다른 목적으로는 사용할 수 없습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

export default {
  name: "AI_ReportView",

  data() {
    return {};
  },
  methods: {
    analysis() {
      this.analysisAlret();
    },
    analysisAlret() {
      this.$swal({
        timer: 5000,
        timerProgressBar: true,
        imageUrl: require("@/assets/img/analysis.gif"),
        imageClass: "custom-image-class",
        scrollbarPadding: false,
        title: "분석중..",
        html: `${this.getLoginInfo.user_name}님의 마일리지를 분석중입니다`,
        showCloseButton: true, // X 버튼 추가
        didOpen: () => {
          const popup = this.$swal.getPopup();
          const image = this.$swal.getImage();
          const title = popup.querySelector(".swal2-title");
          const img = popup.querySelector(".swal2-image");

          title.style.marginTop = "0"; // 타이틀 상단 마진 제거
          title.style.paddingTop = "0"; // 타이틀 상단 패딩 제거

          popup.style.height = "400px"; // 원하는 높이로 조정
          img.style.margin = "15px auto 0px auto";
          image.style.width = "200px";
          image.style.height = "auto";
          image.style.padding = "0px 0px 0px 30px";

          this.$swal.showLoading();
        },
      }).then((result) => {
        if (result.dismiss === this.$swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        } else if (result.dismiss === this.$swal.DismissReason.close) {
          console.log("I was closed by the close button");
        }
      });
    },
    createChart1() {
      const ctx = document.getElementById("myChart1");

      const score = 75; // 실제 점수를 여기에 설정하세요

      const getPointColor = (score) => {
        if (score > 70) return "rgba(146, 183, 255)";
        if (score >= 30) return "rgba(39, 234, 182)";
        return "rgba(255, 206, 86)";
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

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["0%", "30%", "70%", "100%"],
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
                gradient.addColorStop(0, "rgba(255, 206, 86, 1)");
                gradient.addColorStop(0.31, "rgba(255, 206, 86, 1)");
                gradient.addColorStop(0.35, "rgba(39, 234, 182, 1)");
                gradient.addColorStop(0.66, "rgba(39, 234, 182, 1)");
                gradient.addColorStop(0.69, "rgba(146, 183, 255, 1)");
                gradient.addColorStop(1, "rgba(146, 183, 255, 1)");
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
                gradient.addColorStop(0, "rgba(255, 206, 86, 0.5)");
                gradient.addColorStop(0.31, "rgba(255, 206, 86, 0.5)");
                gradient.addColorStop(0.35, "rgba(39, 234, 182, 0.5)");
                gradient.addColorStop(0.66, "rgba(39, 234, 182, 0.5)");
                gradient.addColorStop(0.69, "rgba(146, 183, 255, 0.5)");
                gradient.addColorStop(1, "rgba(146, 183, 255, 0.5)");
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
              type: "scatter",
              order: 1, // 스캐터 포인트를 앞으로 가져옵니다
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "linear",
              min: 0,
              max: 3,
              ticks: {
                stepSize: 1,
                callback: function (value, index) {
                  return ["0%", "30%", "70%", "100%"][index];
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
                    return "Me: " + context.parsed.y + "%";
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
              ctx.font = "bold 14px Arial";
              ctx.textAlign = "center";

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
                ctx.fillText("Me!", x, y - 50);
              } else {
                // score가 79 이상일 때는 scatter 바로 위에 "Me!" 표시
                ctx.fillText("Me!", x, y - 15);
              }

              ctx.restore();
            },
          },
        ],
      });
    },
    createChart2() {
        const ctx = document.getElementById('myChart2').getContext('2d');

const data = {
    labels: [
        'HRD',
        'Monthly Best',
        'Monthly Base',
        'HotTip',
        'BEST PG',
        'BEST Branch',
        '소비자 지원',
        '리그 테이블'
    ],
    datasets: [
    {
        label: '내 점수',
        data: [45, 50, 45, 72, 30, 68, 90, 82],
        backgroundColor: 'rgba(255, 0, 46, 0.3)',
        borderColor: 'rgba(255, 0, 46, 0.5)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    },{
        label: '평균 점수',
        data: [90, 65, 80, 75, 68, 72, 85, 78],
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        borderColor: 'rgba(0, 122, 255, 0.4)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }] 
};

const config = {
    type: 'radar',
    data: data,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20,  // 간격을 20으로 설정 (5개의 간격: 20, 40, 60, 80, 100)
                    display: false, // 눈금 숫자를 표시하지 않음
                },
                pointLabels: {
                    font: {
                        size: 12 // 레이블 폰트 크기 조정
                    }
                },
                grid: {
                    // circular: true,
                    color: 'rgba(0, 0, 0, 0.2)' // 그리드 선 색상 설정 (필요시)
                }
            }
        }
    },
};

new Chart(ctx, config);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createChart1();
      this.createChart2();
    });
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
  },
  watch: {},
};
</script>
  
  <style scoped>

.text-emphasis {
  font-size: 13pt;
  font-family: "KB_S5";
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
  font-family: "KB_S5";
}

.text-secondary {
  color: #4a90e2 !important;
  font-weight: 600;
  font-family: "KB_S5";
}

.text-goal {
  color: #ff7e5e !important;
  font-weight: 600;
  font-family: "KB_S5";
}

.text-gray {
  color: #3b3b3b !important;
  font-weight: 600;
  font-family: "KB_S5";
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
  font-family: "KB_S5";
}

.row {
  margin: 17px 0px 17px 0px;
}

.highlight {
  background-color: #fff6d4;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8spx; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
}


@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>
  