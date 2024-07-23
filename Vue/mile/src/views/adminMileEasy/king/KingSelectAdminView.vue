<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <!-- 좌측 카드 -->
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
    <!-- 우측 카드 -->
    <div style="width: 70%; margin-left: 3%">
      <div class="cards" style="background-color: #f9f9f9; height: 400px">
        <div>
          <p class="text-left lg2 KB_C2">
            채택하기 <span style="font-size: 10pt">({{ baseDate }}기준)</span>
          </p>
          <div class="cards favorite-card" style="display: flex">
            <div class="king" style="width: 40%">
              <div class="KB_C1 title" style="font-size: 20pt">마왕 TOP 3</div>
              <br />
              <div class="text-center mx-auto" style="width: 70%">
                <table class="table table-borderless KB_S1 text-center">
                  <tbody class="text-center">
                    <template v-for="(item, index) in kingTop3" :key="index">
                      <tr :class="{ top1: index === 0 }">
                        <td>{{ item.ranking }}등</td>
                        <td>{{ item.user_name }}</td>
                        <td>{{ item.total_score }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="jump" style="width: 40%">
              <div class="KB_C1 title" style="font-size: 20pt">
                Jump UP TOP 3
              </div>
              <!-- Jump UP TOP 5의 추가적인 UI 및 데이터 표시 -->
              <br />
              <div class="text-center mx-auto" style="width: 70%">
                <table class="table table-borderless KB_S1 text-center">
                  <tbody class="text-center">
                    <template v-for="(item, index) in jumpTop3" :key="index">
                      <tr :class="{ top1: index === 0 }">
                        <td>{{ item.ranking }}등</td>
                        <td>{{ item.user_name }}</td>
                        <td>{{ item.score_increase }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br />

  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <!-- 하단 메뉴 -->
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
          'http://localhost:8090/mileage/kingDataSelect'
        );
        console.log('kingDataSelect top3:', response.data);
        this.baseDate = response.data.length ? response.data[0].base_date : ''; // 첫 번째 데이터의 기준일자 설정
        this.kingTop3 = response.data.slice(0, 3); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error('kingDataSelect top3:', error);
        this.kingTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
    async jumpData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/jumpDataSelect'
        );
        console.log('점프업 top3:', response.data);
        this.jumpTop3 = response.data.slice(0, 3); // 받아온 데이터에서 TOP 3만 가져오기
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
.table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: none; /* 테이블 선 없애기 */
}

/* .top1 클래스에 스타일 추가 */
.top1 {
  font-weight: bold;
  font-size: 16pt;
  background-color: red;
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
