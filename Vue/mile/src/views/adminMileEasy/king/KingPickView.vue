<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <div class="button-container mt-3">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>

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
            align-items: flex-start;
            background-color: #f6f6f6;
          "
        >
          <div style="display: flex; justify-content: space-between">
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
                    <div :class="{ top1: index === 0 }" class="top-item">
                      <div class="item-rank">{{ item.ranking }}등</div>
                      <div class="item-name">{{ item.user_name }}</div>
                      <div class="item-score">{{ item.total_score }}</div>
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
                    <div :class="{ top1: index === 0 }" class="top-item">
                      <div class="item-rank">{{ item.ranking }}등</div>
                      <div class="item-name">{{ item.user_name }}</div>
                      <div class="item-score">{{ item.score_increase }}</div>
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
            align-items: flex-start;
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
                <td>{{ dates[index] || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="btn-container" style=" margin-right: 75px;">
      <button class="btn-yellow KB_S4" @click="checkValidDates">
        채택하기
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import Swal from 'sweetalert2';

export default {
  name: 'KingPickView',

  data() {
    return {
      kingTop5: [],
      jumpTop5: [],
      baseDate: '',
      mileageLabels: [],
      dates: [],
      kingUserList: [],
      jumpUserList: [],
    };
  },

  async mounted() {
    await this.kingData();
    await this.jumpData();
    await this.fetchMileageLabels();
    await this.lastUpdate();
  },

  methods: {
    async kingData() {
      try {
        const response = await api.get(
          '/mileage/kingDataSelect'
        );
        console.log('kingDataSelect top5:', response.data);
        this.baseDate = response.data.length ? response.data[0].base_date : '';
        this.kingTop5 = response.data.slice(0, 5);
        // 사용자 점수별로 정렬
        const sortedData = response.data.sort((a, b) => b.score - a.score);

        // 공동 3등까지 포함한 사용자 목록 추출
        let rank = 1;
        let lastScore = sortedData[0].score;
        const kingUserList = [];

        for (const item of sortedData) {
          if (item.score !== lastScore) {
            rank++;
            lastScore = item.score;
          }
          if (rank > 3) break;
          kingUserList.push(item.user_no);
        }

        this.kingUserList = kingUserList;
      } catch (error) {
        console.error('kingDataSelect top5:', error);
        this.kingTop5 = [];
        this.kingUserList = [];
      }
    },

    async jumpData() {
      try {
        const response = await api.get(
          '/mileage/jumpDataSelect'
        );
        console.log('점프업 top5:', response.data);
        this.jumpTop5 = response.data.slice(0, 5);
        // 사용자 점수별로 정렬
        const sortedData = response.data.sort((a, b) => b.score - a.score);

        // 공동 3등까지 포함한 사용자 목록 추출
        let rank = 1;
        let lastScore = sortedData[0].score;
        const jumpUserList = [];

        for (const item of sortedData) {
          if (item.score !== lastScore) {
            rank++;
            lastScore = item.score;
          }
          if (rank > 3) break;
          jumpUserList.push(item.user_no);
        }

        this.jumpUserList = jumpUserList;
      } catch (error) {
        console.error('점프업 top5:', error);
        this.jumpTop5 = [];
        this.jumpUserList = [];
      }
    },

    async fetchMileageLabels() {
      try {
        const response = await api.get(
          '/mileage/getMileage'
        );
        this.mileageLabels = response.data.map((item) => item.mile_name);
        this.dates = new Array(this.mileageLabels.length).fill('-');
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        this.mileageLabels = [];
        this.dates = [];
      }
    },

    async lastUpdate() {
      try {
        const response = await api.get(
          '/admin/lastUpdate'
        );
        console.log('날짜 데이터', response.data);
        this.dates = response.data.map((item) => item.date || '-');
      } catch (error) {
        console.error('Error fetching last update dates:', error);
        this.dates = new Array(this.mileageLabels.length).fill('-');
      }
    },

    isLastDayOfPreviousMonth(dateString) {
      if (!dateString || dateString === '-') return false;

      const date = new Date(dateString);
      const today = new Date();

      // 오늘 날짜의 전달 마지막 날 계산
      const firstDayOfCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth - 1);

      // 전달의 마지막 날과 비교
      return (
        date.getFullYear() === lastDayOfPreviousMonth.getFullYear() &&
        date.getMonth() === lastDayOfPreviousMonth.getMonth() &&
        date.getDate() === lastDayOfPreviousMonth.getDate()
      );
    },

    checkValidDates() {
      // 유효하지 않은 날짜가 있는지 검사
      const invalidDates = this.dates
        .map((date, index) => ({ date, index }))
        .filter(
          ({ date }) => date === '-' || !this.isLastDayOfPreviousMonth(date)
        );

      if (invalidDates.length > 0) {
        const invalidDatesList = invalidDates
          .map(
            ({ index }) =>
              `${this.mileageLabels[index]} (${
                this.dates[index] === '-' ? '날짜 없음' : this.dates[index]
              })`
          )
          .join('<br>');

        Swal.fire({
          icon: 'warning',
          title: '업데이트 날짜 오류',
          html: `
        <div>최종 업데이트 날짜가 말일이 아닌 것이 있습니다.</div>
        <div class="swal-dates-list" style="color: red;">${invalidDatesList}</div>
      `,
          confirmButtonText: '확인',
          heightAuto: true, // 높이 자동 조절 비활성화
          scrollbarPadding: false,

          customClass: {
            container: 'my-swal-container',
            content: 'my-swal-content',
          },
        });
      } else {
        this.pickBadge();
      }
    },
    async pickBadge() {
      try {
        const params = new URLSearchParams();
        this.kingUserList.forEach((user) => params.append('king', user));
        this.jumpUserList.forEach((user) => params.append('jump', user));

        const response = await api.post(
          `/admin/pickBadge?${params.toString()}`
        );
        console.log('Response:', response.data);
        Swal.fire({
          icon: 'success',
          title: '채택완료',
          text: '성공적으로 완료되었습니다',
          scrollbarPadding: false,
        });
      } catch (error) {
        console.error('Error picking badge:', error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
  padding-bottom : 70px;
}

.btn-yellow {
  width: 120px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}

.top1 {
  font-weight: bold;
  font-size: 16pt;
  background-color: #66c52f;
  border-radius: 16px;
}

.styled-table {
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 16px;
}
.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5b5b5b;
  font-size: 18px;
  cursor: pointer;
  margin-top: 0;
  font-family: 'KB_S5', sans-serif;
}

.back-button .arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 8px;
  font-size: 17px;
  font-family: 'KB_S5', sans-serif;
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

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #5fc9ad;
}

.btn-container {
  text-align: right;
  padding: 10px;
}

.top-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.item-rank,
.item-name,
.item-score {
  flex: 1;
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 10px;
  flex: 1;
}

.my-swal-container .swal2-title {
  margin-bottom: 15px; /* 제목과 본문 사이의 여백 */
}

.swal-dates-list {
  white-space: pre-wrap; /* 줄바꿈 유지 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
  color: red; /* 텍스트 색상 빨간색으로 설정 */
}

.swal2-html-container {
  overflow: visible; /* 스크롤이 없고 내용이 모두 보이도록 설정 */
}
.swal2-popup {
  height: auto;
}
</style>