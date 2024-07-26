<template>
  <div ref="mainContainer">
  <div class="flex" style="margin-left: 10%; margin-right: 10%;">
    <div class="cards fade-up-item" style="width: 24% ;height : 400px;">
      <img
      v-if="loginInfo && loginInfo.user_no"
          :src="`http://localhost:8090/profile/${loginInfo.user_no}.jpg`"
          class="profile-large my-3"
          alt="Profile Picture"
          @error="setDefaultImage"
      />
      <h2 class="lg KB_S5 my-3">{{ loginInfo ? loginInfo.user_name : '' }}</h2>
      <p class="md" style="margin-bottom: 0px">
        {{ loginInfo ? `${loginInfo.level_no} ${loginInfo.position_no} | ${loginInfo.job_no} 직무` : '' }}
      </p>
      <p class="md" style="margin-bottom: 10px">{{ loginInfo ? loginInfo.dp_no : '' }}</p>
      <button class="btn-yellow KB_C2" disabled>마일리지 관리자</button>
    </div>
    <CardComponent title="최근 일주일 간 방문자 수" class="fade-up-item" style="width: 70%; margin-left:6%;"/>
  </div>
    <div class="flex" style="margin-left: 10%; margin-right: 10%;">
      <div class="cards fade-up-item" style="width: 24% ;height : 400px; padding: 3% 3% 4% 3%; margin-top: 3%;">
        <div style="padding: 3% 0%;">
          <a href="/introduceMileageAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">마일리지 소개
            <i class="bi bi-chevron-compact-right icon-right" style="margin-left: auto;"></i>
            </p>
          </a>
          <a href="/commentMieageeAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">마일리지 멘트
            <i class="bi bi-chevron-compact-right icon-right" style="margin-left: auto;"></i>
            </p>
          </a>
          <a href="/documentsMileageAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">마일리지 문서
            <i class="bi bi-chevron-compact-right icon-right" style="margin-left: auto;"></i>
            </p>
          </a>
          <a href="/scoreMileageAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">마일리지 점수
            <i class="bi bi-chevron-compact-right icon-right" style="margin-left: auto;"></i>
            </p>
          </a>
          <a href="/qnaListView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">QnA
            <i class="bi bi-chevron-compact-right icon-right" style="margin-left: auto;"></i>
            </p>
          </a>
          <a href="/mileEasyContactView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">업무별 연락처
            <i class="bi bi-chevron-compact-right icon-right" style="margin-left: auto;"></i>
            </p>
          </a>
        </div>
      </div>
      <CardComponent title="전년도 비교" class="fade-up-item" style="width: 70%; margin-left:6%; margin-top: 3%;"/>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/manager/CardComponent.vue';
import { mapGetters } from 'vuex';

export default {
  name: "ManagerMainView",
  components: { CardComponent },
  methods :{
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    setTransitionDelay(el, index) {
      el.style.setProperty('--index', index);
    }
  },
  computed :{
    ...mapGetters('login', ['getLoginInfo']),
    
    loginInfo() {
      return this.getLoginInfo;
    }
  },
  mounted() {
    this.$nextTick(() => {
    if (this.$refs.mainContainer) {
      const items = this.$refs.mainContainer.querySelectorAll('.fade-up-item');
      items.forEach((item, index) => {
        item.style.setProperty('--index', index);
        item.style.setProperty('z-index', 10 - index);
        setTimeout(() => {
          item.classList.add('fade-up-active');
        }, 100 * index);
      });
    }
  });
  }
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
</style>
