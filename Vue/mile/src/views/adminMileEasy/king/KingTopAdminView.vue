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

      <div div class="cards" style="height: 200px">
        <div style="padding: 5% 5%">
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
      <div
        class="cards"
        style="
          background-color: #f9f9f9;
          width: 100%;
          margin-bottom: 49px;
          height: 570px;
        "
      >
        <div>
          <p class="text-left lg2 KB_C2">TOP</p>
          <div class="cards favorite-card" style="height: 470px">
            <div style="display: flex">
              <div class="king" style="width: 50%">
                <div>
                  <img
                    src="mile/src/assets/img/add.png"
                    style="width: 120px; height: 120px"
                  />
                </div>
                <div class="KB_C1 title" style="font-size: 20pt">
                  마왕 TOP 5
                </div>
                <br />
                <div class="text-center mx-auto" style="width: 40%">
                  <div class="KB_S1 text-center">
                    <template v-for="(item, index) in kingTop3" :key="index">
                      <div
                        :class="{ top1: index === 0 }"
                        style="
                          display: flex;
                          justify-content: center; /* 수평 가운데 정렬 */
                          align-items: center; /* 수직 가운데 정렬 */
                          text-align: center;
                          margin-bottom: 20px;
                        "
                      >
                        <div style="padding-right: 10px">
                          {{ item.ranking }}등
                        </div>
                        <div style="padding-right: 10px">
                          {{ item.user_name }}
                        </div>
                        <div style="padding-right: 10px">
                          {{ item.total_score }}
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="jump" style="width: 50%">
                <div>
                  <img
                    src="mile/src/assets/img/add.png"
                    style="width: 120px; height: 120px"
                  />
                </div>
                <div class="KB_C1 title" style="font-size: 20pt">
                  Jump UP TOP 5
                </div>
                <!-- Jump UP TOP 5의 추가적인 UI 및 데이터 표시 -->
                <br />
                <div class="text-center mx-auto" style="width: 40%">
                  <div class="KB_S1 text-center">
                    <template v-for="(item, index) in jumpTop3" :key="index">
                      <div
                        :class="{ top1: index === 0 }"
                        style="
                          display: flex;
                          justify-content: center; /* 수평 가운데 정렬 */
                          align-items: center; /* 수직 가운데 정렬 */
                          text-align: center;
                          margin-bottom: 20px;
                        "
                      >
                        <div style="padding-right: 10px">
                          {{ item.ranking }}등
                        </div>
                        <div style="padding-right: 10px">
                          {{ item.user_name }}
                        </div>
                        <div style="padding-right: 10px">
                          {{ item.score_increase }}
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align: right">
              <span style="font-size: 10pt; text-align: right">
                ({{ baseDate }}기준)</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'KingTopAdminView',
  data() {
    return {
      kingTop3: [], // 마왕 TOP 3 데이터를 담을 배열
      jumpTop3: [],
      baseDate: '',
    };
  },
  methods: {
    async kingData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/kingData'
        );
        console.log('마왕 top3:', response.data);
        this.kingTop3 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error('마왕 top3:', error);
        this.kingTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
    async jumpData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/jumpData'
        );
        console.log('점프업 top3:', response.data);
        this.baseDate = response.data.length ? response.data[0].base_date : ''; // 첫 번째 데이터의 기준일자 설정
        this.jumpTop3 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error('점프업 top3:', error);
        this.jumpTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
    },
  },
  mounted() {
    this.kingData(); // 컴포넌트가 마운트되면 데이터 요청
    this.jumpData();
  },
};
</script>

<style scoped>
/* 테이블 스타일링 */

/* .top1 클래스에 스타일 추가 */
.top1 {
  font-weight: bold;
  font-size: 16pt;
  background-color: #b2da9a;
  border-radius: 16px;
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
