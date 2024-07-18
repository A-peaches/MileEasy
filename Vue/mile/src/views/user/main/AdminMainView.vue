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
      <p class="md" style="margin-bottom: 10px">
        {{ loginInfo ? loginInfo.dp_no : '' }}
      </p>
      <button class="btn-yellow KB_C2 my-3">운영관리자</button>
    </div>
    <PageCount style="width: 70%; margin-left: 3%" />
  </div>

  <h1>여기는 운영 관리자 메인 페이지 입니다.</h1>
  <h3>유저 프로필</h3>
  <h3>나의 마일리지 버튼</h3>
  <h3>오늘의 추천</h3>
  <h3>출석체크</h3>
  <h3>즐겨찾기 마일리지</h3>
  <h3>별별 마일리지</h3>
</template>

asw nns dx
<script>
import { mapGetters } from 'vuex';
import PageCount from '@/views/adminMileEasy/main/PageCount.vue';
export default {
  name: 'AdminMainView',
  components: { PageCount },
  methods: {},
  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
    },
  },
};
</script>
