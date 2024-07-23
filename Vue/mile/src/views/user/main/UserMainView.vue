<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%  " >
    <!-- 나의 마일리지, 추천 멘트, 출석 체크 묶음 -->
    <div class="left-container" style="width: 24%; margin-right: 1%">
      <div class="cards" style="height: 430px">
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
          {{ loginInfo ? `${loginInfo.dp_no}` : '' }}
        </p>
        <button class="btn-yellow KB_C2 my-3">나의 마일리지</button>
      </div>
      <recommand class="my-5" style="height: 210px" v-if="loginInfo" />
      <attendance style="height: 395px" v-if="loginInfo" />
    </div>

    <!-- 즐겨찾기, 마일리지 차트 묶음 -->
    <div class="right-container" style="width: 70%; margin-left: 1%; position: sticky; top: 20px;  height: 100vh;">
      <favorite style="width: 100%; margin-bottom: 49px;" />
      <milageCharts style="width: 100%; height: 430px" v-if="loginInfo" />
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
