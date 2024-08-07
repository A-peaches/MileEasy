<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px; padding: 20px;">
    <div>
      <p class="text-left lg2 KB_C2">직급별 방문자 수 &nbsp;
        <i class="bi bi-download" @click="downloadChart"></i>
      </p>
      <div class="cards favorite-card" style="height: 330px; display: flex; align-items: center;">
        <div class="sub" style="width: 100%;">
          <div class="container2 mt-5" style="width: 45%;">
            <canvas :id="positionChartId[0]" class="positionchart" style="height: 250px;"></canvas>
          </div>
          <div class="chart-container mt-4" style="width: 40%; padding-left: 20px;">
            <div class="text-right mb-5">
              <input
                type="date"
                class="date"
                id="date"
                v-model="date"
                :max="maxDate"
                @change="updateCharts3"
              />
            </div>
            <div class="d-flex justify-content-center" style="width:100%; margin-top :60px;">
              <table class="table table-sm custom-table ml-3" style="width:80%">
                <thead>
                  <tr>
                    <th>직급</th>
                    <td>L0</td>
                    <td>L1</td>
                    <td>L2</td>
                    <td>L3</td>
                    <td>L4</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>카운트</th>
                    <td>{{ data[0] }}</td>
                    <td>{{ data[1] }}</td>
                    <td>{{ data[2] }}</td>
                    <td>{{ data[3] }}</td>
                    <td>{{ data[4] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  class="text-end w-100 mt-5">
         <span  style="
                    position: absolute;
                    top: 86%;
                    right : -50px;
                    transform: translateX(-50%);
                    z-index: 0;
                    
                  font-size:10pt; color:gray;">( 최대 조회 가능일 : 전영업일 )</span>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Chart, registerables } from "chart.js";
import api from "@/api/axios";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

Chart.register(...registerables);

export default {
  name: "PositionChart",
  data() {
    return {
      positionChart: {}, // 차트 객체를 저장할 객체
      date: "", // 날짜 값을 저장할 변수
      positionChartId: ["PositionChart"], // 랜덤 문자열로 유니크 ID 생성
      todayDate: new Date().toISOString().split("T")[0], // 오늘 날짜를 ISO 문자열로 저장
      data: Array.from({ length: 5 }, () => "-"), // L0부터 L4까지 초기화된 데이터
    };
  },
  computed: {
    maxDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // 하루 전 날짜를 구함
      return yesterday.toISOString().split("T")[0]; // ISO 문자열로 반환
    },
    ...mapGetters("login", ["getLoginInfo"]),
    loginInfo() {
      return this.getLoginInfo;
    },
  },

  methods: {
    async downloadChart() {
      try{
        const levelChartData = await this.realChartData();
        const positionLabels = ["L0", "L1", "L2", "L3", "L4"]; 
        const date = this.date;

        const wsData = [['기준일자', '직급별', '방문자 수']]; // 엑셀 파일의 첫번째 행에 컬럼명을 추가
        wsData.push([date]);
        positionLabels.forEach((position, index) => {
          wsData.push([
            '',
            position,
            levelChartData[index] || 0,
          ]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        XLSX.writeFile(workbook, `position_visitors_data_${date}.xlsx`); // 엑셀 파일 다운로드 
      }catch (error) {
        console.error('Error downloading position_visitors data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '차트 데이터 다운로드 중 오류가 발생했습니다.',
        });
      }
    },
    async updateCharts3() {
      try {
        const levelChartData = await this.realChartData();
        this.data = levelChartData; // 데이터 업데이트
        this.renderChart3(levelChartData); // renderChart3 메서드 호출
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    },

    async realChartData() {
      try {
        const response = await api.post(
          "/user/levelChartData",
          { date: this.date } // POST 요청에 날짜 데이터 포함
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response data format");
        }

        const levelChartData = response.data.map((item) => item.visitorCount);
        console.log("원형차트 결과", levelChartData);

        return levelChartData;
      } catch (error) {
        console.error("Error fetching chart data:", error);
        return []; // 에러 발생 시 빈 배열 반환
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
          type: "pie",
          data: {
            labels: ["L0", "L1", "L2", "L3", "L4"],
            datasets: [
              {
                data: levelChartData, // 실제 데이터로 변경
                backgroundColor: [
                  "#FFAAE7",
                  "#FFE78F",
                  "#9FEDD1",
                  "#B5EDFF",
                  "#E4E4E4",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: {
                display: true,
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
      } catch (error) {
        console.error("Error rendering chart:", error);
      }
    },

    setInitialDate() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // 하루 전 날짜로 설정

      const formattedDate = yesterday.toISOString().split("T")[0];

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

.container2 {
  width: 40%;
}

.chart-container {
  flex: 1;
  height: 100%;
  bottom: 0;
  width: 50%;
  flex-direction: column;
  justify-content: center;
}

.sub {
  display: flex;
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

.custom-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 1rem;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}

.custom-table th,
.custom-table td {
  padding: 0.8rem; /* 셀 안의 내용과 셀 사이의 여백 조정 */
  text-align: center; /* 텍스트 가운데 정렬 */
  border: 1px solid #dee2e6; /* 테이블 테두리 스타일 */
}

.custom-table th {
  background-color: #f4f4f4; /* 테이블 헤더 배경색 */
}

.custom-table tbody tr:nth-child(odd) {
  background-color: #f2f2f2; /* 짝수 번째 행 배경색 */
}

.custom-table tbody tr:hover {
  background-color: #e2e2e2; /* 마우스 호버시 배경색 */
}

.custom-table thead th,
.custom-table thead tr,
.custom-table thead td,
.custom-table tbody tr
 {
  vertical-align: middle; /* 셀 내용 수직 가운데 정렬 */
}

.date {
  border: 1px solid #cecece;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 14px;
}

.bi-download:hover {
  cursor: pointer;
}
</style>
