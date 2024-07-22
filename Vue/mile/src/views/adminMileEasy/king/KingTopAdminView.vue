<!--🚨운영관리자 마왕 top 화면(kinng 메인화면)-->
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
    <div style="width: 70%; margin-left: 3%">
      <div class="cards" style="background-color: #f9f9f9; height: 400px">
        <div>
          <p class="text-left lg2 KB_C2">TOP</p>
          <div class="cards favorite-card" style="display: flex">
            <div class="king" style="width: 50%">
              <div Class="KB_C1" style="font-size: 20pt">마왕 TOP 5</div>
            </div>
            <div class="jump" style="width: 50%">
              <div Class="KB_C1" style="font-size: 20pt">Jump UP TOP 5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br />

  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="cards" style="width: 24%; height: 215px; padding: 3% 3% 3% 3%">
      <div>
        <a href="/kingTopAdminView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            TOP
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/kingSelectAdminView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            채택하기
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
        <a href="/kingBadgeOptionAdminView" class="mileage-link">
          <p class="lg2 link-text" style="text-align: left">
            배지 디자인 변경
            <i
              class="bi bi-chevron-compact-right icon-right"
              style="margin-left: auto"
            ></i>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'KingTopAdminView',
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
.hiddencards {
  padding: 20px;
  margin: 5px 5px 5px 5px;
}

.favorite-card {
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cards {
  overflow: hidden;
}
</style>
