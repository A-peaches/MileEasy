<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="cards" style="width: 24%; height: 400px">
      <img
        v-if="loginInfo && loginInfo.user_no"
        :src="`http://localhost:8090/profile/${loginInfo.user_no}.jpg`"
        class="profile-large my-3"
        alt="Profile Picture"
        @error="setDefaultImage"
      />
      <h2 class="lg KB_S5 my-3">{{ loginInfo ? loginInfo.user_name : '' }}</h2>
      <p class="md" style="margin-bottom: 0px">
        {{
          loginInfo
            ? `${loginInfo.level_no} ${loginInfo.position_no} | ${loginInfo.job_no} 직무`
            : ''
        }}
      </p>
      <p class="md" style="margin-bottom: 10px">
        {{ loginInfo ? loginInfo.dp_no : '' }}
      </p>
      <button class="btn-yellow KB_C2" disabled>운영 관리자</button>
    </div>
    <PageCount style="width: 70%; margin-left: 3%" />
  </div>

  <br />

  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="cards" style="width: 24%; height: 400px; padding: 3% 3% 4% 3%">
      <div style="padding: 3% 0%">
        <a href="/kingTopAdminView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            마왕관리
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/mileageAddAdminView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            마일리지 관리
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/m_TipMainAdminView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            M-TIP
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/noticeListView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            공지사항
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/qnaListView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            QnA
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/mileEasyContactView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            업무별 연락처
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
      </div>
    </div>
    <MileagePageCount style="width: 70%; margin-left: 3%" />
  </div>

  <br />

  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div
      class="hiddencards"
      style="width: 24%; height: 400px; padding: 3% 3% 4% 3%"
    ></div>
    <PositionChart style="width: 70%; margin-left: 3%" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment'; // moment.js import
import Swal from 'sweetalert2';
import PageCount from '@/views/adminMileEasy/main/PageCount.vue';
import MileagePageCount from '@/views/adminMileEasy/main/MileagePageCount.vue';
import PositionChart from '@/views/adminMileEasy/main/PositionChart.vue';

export default {
  name: 'AdminMainView',
  components: { PageCount, MileagePageCount, PositionChart },
  methods: {
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  mounted() {
    this.checkFirstBusinessDay();
  },
  methods: {
    checkFirstBusinessDay() {
      // 현재 날짜를 moment 객체로 가져오기
      const currentDate = moment();

      // 이번 달의 첫 번째 영업일을 구하기 위해 반복문 사용
      let currentDay = currentDate.clone();
      while (currentDay.month() === currentDate.month()) {
        // 토요일(6) 또는 일요일(0)이 아닌 경우에만 첫 번째 영업일로 처리
        if (currentDay.day() !== 0 && currentDay.day() !== 6) {
          if (currentDay.date() === 1) {
            // 첫 번째 영업일이면 알림 표시
            Swal.fire({
              icon: 'info',
              title: '알림',
              text: '마왕 채택일입니다. 채택을 진행해주세요.',
            });
            break;
          }
        }
        currentDay.add(1, 'day');
      }
    },
  },
};
</script>

<style scoped>
.mileage-link {
  text-decoration: none;
  color: #4b4a4a;
}
.mileage-link:hover > p {
  color: #848282;
}
.link-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
}
.icon-right {
  margin-left: auto;
}
.hiddencards {
  padding: 20px;
  margin: 5px;
}
</style>
