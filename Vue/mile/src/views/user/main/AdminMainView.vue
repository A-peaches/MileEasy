<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="cards" style="width: 24%; height: 400px">
      <img
        src="@/assets/img/test.png"
        class="profile-large my-3"
        alt="Profile Picture"
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
    <div style="width: 24%; height: 400px; padding: 3% 3% 4% 3%"></div>
    <PositionChart style="width: 70%; margin-left: 4%" />
  </div>
</template>

asw nns dx
<script>
import { mapGetters } from 'vuex';
import PageCount from '@/views/adminMileEasy/main/PageCount.vue';
import MileagePageCount from '@/views/adminMileEasy/main/MileagePageCount.vue';
import PositionChart from '@/views/adminMileEasy/main/PositionChart.vue';

export default {
  name: 'AdminMainView',
  components: { PageCount, MileagePageCount, PositionChart },
  methods: {},
  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
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
  color: #848282; /* 원하는 색상으로 변경 */
}
.link-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
}
.icon-right {
  margin-left: auto; /* 아이콘을 오른쪽 끝으로 밀기 위해 추가 */
}
</style>
