<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">채택하기</h2>
    <div style="padding: 0 5%">
      <div class="p-4 mt-5">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
            TOP 상위 리스트
            <span style="font-size: 10pt">
              (최근 업데이트 : {{ baseDate }})
            </span>
          </h3>
        </div>
        <div
          class="p-2"
          style="
            justify-content: space-between;
            align-items: flex-start; /* 위로 정렬 */
            background-color: #f6f6f6;
          "
        >
          <div style="display: flex">
            <div class="king" style="width: 48%">
              <div
                class="KB_C1 title"
                style="font-size: 20pt; margin-top: 30px"
              >
                마왕 TOP 5
              </div>
              <br />
              <div class="text-center mx-auto" style="width: 80%">
                <div class="KB_S1 text-center">
                  <template v-for="(item, index) in kingTop5" :key="index">
                    <div
                      :class="{ top1: index === 0 }"
                      style="
                        display: flex;
                        justify-content: space-between; /* 수평으로 간격을 벌림 */
                        align-items: center; /* 수직 가운데 정렬 */
                        text-align: center;
                        margin-bottom: 20px;
                        padding: 10px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                      "
                    >
                      <div style="flex: 1; text-align: left">
                        {{ item.ranking }}등
                      </div>
                      <div style="flex: 2; text-align: center">
                        {{ item.user_name }}
                      </div>
                      <div style="flex: 1; text-align: right">
                        {{ item.total_score }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="jump" style="width: 48%">
              <div
                class="KB_C1 title"
                style="font-size: 20pt; margin-top: 30px"
              >
                Jump UP TOP 5
              </div>
              <br />
              <div class="text-center mx-auto" style="width: 80%">
                <div class="KB_S1 text-center">
                  <template v-for="(item, index) in jumpTop5" :key="index">
                    <div
                      :class="{ top1: index === 0 }"
                      style="
                        display: flex;
                        justify-content: space-between; /* 수평으로 간격을 벌림 */
                        align-items: center; /* 수직 가운데 정렬 */
                        text-align: center;
                        margin-bottom: 20px;
                        padding: 10px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                      "
                    >
                      <div style="flex: 1; text-align: left">
                        {{ item.ranking }}등
                      </div>
                      <div style="flex: 2; text-align: center">
                        {{ item.user_name }}
                      </div>
                      <div style="flex: 1; text-align: right">
                        {{ item.score_increase }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="padding: 0 5%">
      <div class="p-4 mt-5">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
            문서 업데이트 현황
          </h3>
        </div>
        <div
          class="p-2"
          style="
            justify-content: space-between;
            align-items: flex-start; /* 위로 정렬 */
            background-color: #f6f6f6;
          "
        >
          <table class="styled-table">
            <thead>
              <tr>
                <th>마일리지</th>
                <th>최종 업데이트</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(label, index) in mileageLabels" :key="index">
                <td>{{ label }}</td>
                <td>{{ dates[index] || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KingPickView',

  data() {
    return {
      kingTop5: [],
      jumpTop5: [],
      baseDate: '',
      mileageLabels: [], // 수정: mileageLabels로 변경
      dates: [], // 수정: dates 배열 추가
    };
  },

  async mounted() {
    await this.kingData();
    await this.jumpData();
    await this.fetchMileageLabels(); // 수정: label 메서드를 fetchMileageLabels로 변경
    this.lastUpdate();
  },

  methods: {
    async kingData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/kingDataSelect'
        );
        console.log('kingDataSelect top5:', response.data);
        this.baseDate = response.data.length ? response.data[0].base_date : ''; // 첫 번째 데이터의 기준일자 설정
        this.kingTop5 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 5만 가져오기
      } catch (error) {
        console.error('kingDataSelect top5:', error);
        this.kingTop5 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },

    async jumpData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/jumpDataSelect'
        );
        console.log('점프업 top5:', response.data);
        this.jumpTop5 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 5만 가져오기
      } catch (error) {
        console.error('점프업 top5:', error);
        this.jumpTop5 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },

    async fetchMileageLabels() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/getMileage'
        );
        this.mileageLabels = response.data.map((item) => item.mile_name); // mileageLabels에 데이터를 저장
        this.dates = this.mileageLabels.map(() => this.getDummyDate()); // 더미 날짜로 채우기
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        this.mileageLabels = [];
        this.dates = [];
      }
    },

    getDummyDate() {
      // 날짜 생성, 실제 데이터에 맞게 수정 필요
      const today = new Date();
      return `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
    },

    async lastUpdate() {
      try {
        const response = await axios.get(
          'http://localhost:8090/admin/lastUpdate'
        );
        console.log('날짜 데이터', response.data);
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        this.mileageLabels = [];
        this.dates = [];
      }
    },
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
}
.btn-yellow {
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top1 {
  font-weight: bold;
  font-size: 16pt;
  background-color: #66c52f;
  border-radius: 16px;
}

/* 테이블 스타일 추가 */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 16px;
  text-align: left;
}

.styled-table thead tr {
  background-color: #5fc9ad;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #5fc9ad;
}
</style>
