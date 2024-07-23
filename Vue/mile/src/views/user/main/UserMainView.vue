<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="cards" style="width: 24%; height: 430px">
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
      <p class="md mb-2" style="margin-bottom: 0px">
        {{
          loginInfo
            ? `${loginInfo.dp_no}`
            : ''
        }}
      </p>
      <button class="btn-yellow KB_C2 my-3">나의 마일리지</button>
    </div>
    <favorite style="width: 70%; margin-left: 3%" />
  </div>

  <!-- 추천 멘트 및 마일리지 차트 -->
  <div
    class="flex-container"
    style="margin-left: 10%; margin-right: 10%; display: flex; align-items: flex-start;"
  >
    <!-- 오늘의 추천 및 출석체크 -->
    <div
      class="left-column"
      style="width: 24%; display: flex; flex-direction: column; margin-right: 2%;"
    >
      <recommand class="my-5" style="height: 210px" v-if="loginInfo" />
      <attendance style="height: 395px;" v-if="loginInfo" />
    </div>
    <!-- 뀨! -->
    <div
      class="right-column"
      style="flex: 1; margin-left: 3%; height: 430px;"
    >
      <milageCharts class="my-5" style="height: 100%;" v-if="loginInfo" />
    </div>
  </div>
</template>

<script>
import favorite from '@/components/user/FavoriteCom.vue';
import recommand from '@/components/user/MileRecommand.vue';
import milageCharts from '@/components/user/MileageChartsCom.vue';
import attendance from '@/components/user/AttendanceCom.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'UserMainView',
  components: { favorite, recommand, milageCharts, attendance },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
};
</script>
