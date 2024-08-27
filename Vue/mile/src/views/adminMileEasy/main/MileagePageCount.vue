<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px">
    <div>
      <p class="text-left lg2 KB_C2">
        마일리지 방문자 수 &nbsp;
        <i class="bi bi-download" @click="downloadChart"></i>
      </p>
      <div class="cards favorite-card" style="height: 335px">
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
            <!-- <img
              src="@/assets/imoji/kolly/콜리얼굴최고.png"
              style="width: 80px; height: 80px"
            /> -->
            <div class="best-info">
              <div class="lg2 best-title">
                <i
                  class="bi bi-hand-thumbs-up-fill"
                  style="font-size: 22pt"
                ></i>
                <p class="lg best-name" style="font-size: 17pt">
                  {{ best }}
                </p>
                <br />
                <i
                  class="bi bi-hand-thumbs-down-fill"
                  style="font-size: 22pt"
                ></i>
                <p class="lg best-name" style="font-size: 17pt">
                  {{ worst }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-end w-100 mt-5">
      <span
        style="
          position: absolute;
          top: 87%;
          right: -50px;
          transform: translateX(-50%);
          z-index: 0;

          font-size: 10pt;
          color: gray;
        "
        >( 최대 조회 가능일 : 전영업일 )</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Chart, registerables } from 'chart.js';
import api from '@/api/axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

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
      worst: '-', // 초기값 설정
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
    async downloadChart() {
      try {
        const { hitCounts } = await this.realChartData();
        const mileageLabels = await this.label();
        const date = this.date;

        const wsData = [['기준일자', '마일리지', '방문자 수']]; // 엑셀 파일의 첫번째 행에 컬럼명을 추가
        wsData.push([date]);
        mileageLabels.forEach((mileage, index) => {
          wsData.push(['', mileage, hitCounts[index] || 0]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        XLSX.writeFile(workbook, `mileage_visitors_data_${date}.xlsx`); // 엑셀 파일 다운로드
      } catch (error) {
        console.error('Error downloading mileage_visitors data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '차트 데이터 다운로드 중 오류가 발생했습니다.',
          scrollbarPadding: false,
        });
      }
    },
    async updateCharts2() {
      try {
        const { hitCounts } = await this.realChartData();
        const mileageLabel = await this.label(); // 라벨 데이터 비동기 호출

        this.findMaxAndMinAndSet(hitCounts, mileageLabel);

        // 차트 렌더링
        this.renderChart2(hitCounts, mileageLabel);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },

    async label() {
      try {
        const response = await api.get('/mileage/getMileage');
        const mileageLabel = response.data.map((item) => item.mile_name);
        return mileageLabel;
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        return []; // 에러 발생 시 빈 배열 반환
      }
    },

    async realChartData() {
      try {
        const response = await api.post('/mileage/hit_mileChartDATE', {
          date: this.date,
        }); // POST 본문에 데이터 포함

        // Check if response.data is valid and an array
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response data format');
        }

        const hitCounts = response.data.map((item) => item.hit_count);

        return { hitCounts };
      } catch (error) {
        console.error('Error fetching chart data:', error);
        return { hitCounts: [] }; // 에러 발생 시 빈 배열 반환
      }
    },

    findMaxAndMinAndSet(hitCounts, mileageLabel) {
      if (hitCounts.length === 0 || mileageLabel.length === 0) {
        this.best = '-';
        this.worst = '-';
        return;
      }

      let maxIndex = 0;
      let minIndex = 0;
      let maxValue = hitCounts[0];
      let minValue = hitCounts[0];
      let count = 0;
      for (let i = 0; i < hitCounts.length; i++) {
        if (hitCounts[i] === 0) {
          count = count + 1;
        }
        if (hitCounts[i] > maxValue) {
          maxValue = hitCounts[i];
          maxIndex = i;
        }
        if (
          hitCounts[i] < minValue ||
          (hitCounts[i] === minValue && hitCounts[i] !== 0)
        ) {
          minValue = hitCounts[i];
          minIndex = i;
        }
      }

      this.best = mileageLabel[maxIndex];
      this.worst = mileageLabel[minIndex];

      if (count === hitCounts.length) {
        this.best = '-';
        this.worst = '-';
      }
    },

    renderChart2(counts, mileageLabel) {
      const chartId = this.mileChartId[0]; // chartIds 배열에서 첫 번째 chartId를 가져옴
      const ctx = document.getElementById(chartId);

      if (!ctx) {
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
                  'rgba(155, 241, 218,0.8)', // 연한 녹색
                  'rgba(255, 235, 163,0.8)', // 연한 노란색
                  'rgba(216,216,216,0.8)', // 연한 회색
                ],
                borderColor: [
                  'rgba(155, 241, 218,1)', // 연한 녹색
                  'rgba(255, 235, 163,1)', // 연한 노란색
                  'rgba(216,216,216,1)', // 연한 회색
                ],
                borderWidth: 1,
                barThickness: 40, // 막대 두께 줄임
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
                  display: true,
                },
                grid: {
                  drawBorder: false,
                  display: true,
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
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sub {
  display: flex;
  position: relative;
}

.chart-container {
  flex: 2;
  height: 280px;
  padding-left: 15px;
  overflow: visible; /* 부모 요소에서 오버플로우를 허용 */
}

.best {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: visible; /* 부모 요소에서 오버플로우를 허용 */
}

.best-info {
  text-align: center;
  overflow: visible; /* 차트 요소에서 오버플로우를 허용 */
  position: relative; /* 상대 위치 */
  top: -18px; /* 원하는 만큼 위로 올리기 */
}

.best-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.best-name {
  font-size: 16px;
  font-weight: bold;
}

.bi-hand-thumbs-up-fill {
  color: #ffd700;
}

.bi-hand-thumbs-down-fill {
  color: #ffea74;
}

.chartMile {
  overflow: visible; /* 차트 요소에서 오버플로우를 허용 */
  position: relative; /* 상대 위치 */
  top: -50px; /* 원하는 만큼 위로 올리기 */
}
.date {
  border: 1px solid #cecece;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

/* 차트 스타일 수정 */
.chartMile {
  max-width: 100%;
  height: 100% !important;
}

.bi-download:hover {
  cursor: pointer;
}
</style>
