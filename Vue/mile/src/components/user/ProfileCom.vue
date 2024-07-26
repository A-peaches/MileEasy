<template>
  <div key="profile" class="cards fade-up-item" style="height: 430px">
    <img
      v-if="loginInfo && loginInfo.user_no"
      :src="`http://localhost:8090/profile/${loginInfo.user_no}.jpg`"
      class="profile-large my-3"
      alt="Profile Picture"
      @error="setDefaultImage"
    />
    <h2 class="lg KB_S4 my-3">{{ loginInfo ? loginInfo.user_name : '' }}</h2>
    <p class="md" style="margin-bottom: 0px">
      {{
        loginInfo
          ? `${loginInfo.level_no || ''} ${loginInfo.position_no || ''} | ${loginInfo.job_no || ''} 직무`
          : ''
      }}
    </p>
    <p class="md mb-2" style="margin-bottom: 0px">
      {{ loginInfo ? `${loginInfo.dp_no}` : '' }}
    </p>
    <button class="btn-yellow KB_C2 my-3" @click="goToMyMileageView">나의 마일리지</button>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';


export default {
  name: "ProfileCom",
  data() {

  },
  computed: {
  ...mapGetters('login', ['getLoginInfo']),
  loginInfo() {
    const info = this.getLoginInfo;
    return info ? {
      ...info,
      position_no: info.position_no || '',
      level_no: info.level_no || '',
      job_no: info.job_no || '',
      dp_no: info.dp_no || ''
    } : null;
  },
},
  methods: {
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    goToMyMileageView() {
      window.location.href = '/myMileageView';
    },
  }
};
</script>

<style scoped>

</style>