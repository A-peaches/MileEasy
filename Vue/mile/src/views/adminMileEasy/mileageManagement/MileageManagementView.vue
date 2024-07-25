<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="left-container" style="width: 24%; margin-right: 1%">
      <div class="cards" style="height: 400px">
        <img
          src="@/assets/img/test.png"
          class="profile-large my-3"
          alt="Profile Picture"
        />
        <h2 class="lg KB_S5 my-3">
          {{ loginInfo ? loginInfo.user_name : '' }}
        </h2>
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
        <button class="btn-yellow KB_C2 my-3">운영 관리자</button>
      </div>
      <br />

      <div div class="cards" style="height: 150px">
        <div style="padding: 5% 5%">
          <a href="#" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 추가
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="#" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 수정
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
        </div>
      </div>
    </div>

    <div
      class="right-container"
      style="
        width: 70%;
        margin-left: 1%;
        position: sticky;
        top: 20px;
        height: 100vh;
      "
    >
      <Add style="width: 100%; margin-left: 3%" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Add from '@/views/adminMileEasy/mileageManagement/MileageAddAdminView.vue';

export default {
  name: 'MileageManagementView',
  components: { Add },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },

  data() {
    return {};
  },

  methods: {},

  mounted() {},
};
</script>

<style scoped>
.centered-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
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

.favorite-card {
  justify-content: center;
  align-items: center;
  position: relative;
}

.cards {
  overflow: hidden;
}
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
