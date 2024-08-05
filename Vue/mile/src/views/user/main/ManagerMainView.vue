<template>
  <div ref="mainContainer">
    <div class="flex" style="margin-left: 10%; margin-right: 10%">
      <div class="cards fade-up-item" style="width: 24%; height: 400px">
        <img
          v-if="loginInfo && loginInfo.user_no"
    :src="profileImageUrl"
          class="profile-large my-3"
          alt="Profile Picture"
          @error="setDefaultImage"
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
        <p class="md" style="margin-bottom: 10px">
          {{ loginInfo ? loginInfo.dp_no : '' }}
        </p>
        <button @click="goToMileageIntroView" class="btn-yellow KB_C2">{{ mile_name }}</button>

      </div>
      <CardComponent
        title="기간별 페이지 방문자 수"
        class="fade-up-item"
        style="width: 70%; margin-left: 6%"
      />
    </div>
    <div class="flex" style="margin-left: 10%; margin-right: 10%">
      <div
        class="cards fade-up-item"
        style="width: 24%; height: 400px; padding: 3% 3% 4% 3%; margin-top: 3%"
      >
        <div style="padding: 3% 0%">
          <a href="/introduceMileageAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 소개
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/commentMieageeAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 멘트
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/documentsMileageAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 문서
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/scoreMileageAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 점수
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
      <CompareChart
        title="전년도 비교"
        class="fade-up-item"
        style="width: 70%; margin-left: 6%; margin-top: 3%"
      />
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/manager/CardComponent.vue';
import CompareChart from '@/components/manager/CompareChart.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ManagerMainView',
  components: { CardComponent, CompareChart },
  data(){
    return{
      mile_name: '',
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo']),
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    
    goToMileageIntroView() {
      this.$router.push('/introduceMileageAdminView');
    },
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mile', ['getMileInfo']),
    profileImageUrl() {
  if (this.loginInfo && this.loginInfo.user_no) {
    if (process.env.NODE_ENV === 'development') {
      return `${process.env.VUE_APP_API_URL}/profile/${this.loginInfo.user_no}.jpg`;
    } else {
      return `/profile/${this.loginInfo.user_no}.jpg`;
    }
  }
  return ''; // 또는 기본 이미지 URL
},
    loginInfo() {
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
  },
  async created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      await this.fetchMileInfo(user_no);
      const mileInfo = this.getMileInfo;
      if(mileInfo){
        this.mile_name = mileInfo.mile_no;
      }else{
        console.error('마일리지 이름을 가져올 수 없습니다.');
      }
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.mainContainer) {
        const items =
          this.$refs.mainContainer.querySelectorAll('.fade-up-item');
        items.forEach((item, index) => {
          item.style.setProperty('--index', index);
          item.style.setProperty('z-index', 10 - index);
          setTimeout(() => {
            item.classList.add('fade-up-active');
          }, 100 * index);
        });
      }
    });
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
.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  z-index: 1;
  transition: all 0.5s ease-out;
  transition-delay: calc(var(--index) * 100ms);
  position: relative; /* z-index가 작동하도록 */
}
.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}
.chart-display {
  width: 100%;
  height: 300px;
}
</style>
