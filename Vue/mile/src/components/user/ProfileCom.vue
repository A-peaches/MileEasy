<template>
  <div key="profile" class="cards fade-up-item" style="height: 430px">
    <img
      v-if="loginInfo && loginInfo.user_no"
      :src="profileImageUrl"
      class="profile-large my-3"
      alt="Profile Picture"
      @error="setDefaultImage"
    />
    <div class="profile-header mt-3">
      <h2 class="lg KB_S4 my-3">
        {{ loginInfo ? loginInfo.user_name : '' }}
      </h2>
      <div class="badge-container">
        <img
          v-if="hasKingBadge"
          src="@/assets/img/king.png"
          alt="King"
          class="chat-icon"
        />
        <img
          v-if="hasJumpBadge"
          src="@/assets/img/jump.png"
          alt="Jump"
          class="chat-icon"
        />
      </div>
    </div>
    <p class="md" style="margin-bottom: 0px">
      {{
        loginInfo
          ? `${loginInfo.level_no || ''} ${loginInfo.position_no || ''} | ${
              loginInfo.job_no || ''
            } 직무`
          : ''
      }}
    </p>
    <p class="md mb-2" style="margin-bottom: 0px">
      {{ loginInfo ? `${loginInfo.dp_no}` : '' }}
    </p>
    <button class="btn-yellow KB_C2 my-3" @click="goToMyMileageView">
      나의 마일리지
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api/axios';

export default {
  name: 'ProfileCom',
  data() {
    return {
      badgeList: [], // 초기값을 빈 배열로 설정
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    profileImageUrl() {
      if (this.loginInfo && this.loginInfo.user_no) {
        return process.env.NODE_ENV === 'development'
          ? `${process.env.VUE_APP_API_URL}/profile/${this.loginInfo.user_no}.jpg`
          : `/profile/${this.loginInfo.user_no}.jpg`;
      }
      return ''; // 기본 이미지 URL
    },
    loginInfo() {
      const info = this.getLoginInfo;
      return info
        ? {
            ...info,
            position_no: info.position_no || '',
            level_no: info.level_no || '',
            job_no: info.job_no || '',
            dp_no: info.dp_no || '',
          }
        : null;
    },

    hasKingBadge() {
      return this.badgeList.some(
        (badge) =>
          badge.user_no === this.loginInfo.user_no && badge._king === true
      );
    },
    hasJumpBadge() {
      return this.badgeList.some(
        (badge) =>
          badge.user_no === this.loginInfo.user_no && badge._jump === true
      );
    },
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    goToMyMileageView() {
      window.location.href = '/myMileageView';
    },
    async badgeData() {
      try {
        const response = await api.post('/user/badgeList', {
          user_no: this.loginInfo.user_no,
        });
        this.badgeList = response.data;
        console.log('배지 서비스:', this.badgeList); // 데이터 로그
      } catch (error) {
        console.error('배지 서비스 오류:', error); // 오류 로그
      }
    },
  },
  mounted() {
    if (this.loginInfo && this.loginInfo.user_no) {
      this.badgeData(); // 컴포넌트가 마운트 될 때 배지 데이터를 가져옵니다.
    }
  },
};
</script>
<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-header {
  position: relative; /* position을 relative로 설정 */
  display: flex;
  align-items: center;
  margin-top: -20px; /* 프로필 이미지 아래로 위치 조정 */
}

.profile-header h2 {
  margin: 0;
  padding-right: 10px; /* 배지와의 간격 조정 */
}

.badge-container {
  display: flex;
  align-items: center;
}

.chat-icon {
  width: 20pt;
  height: 40px;
  margin-left: 5px;
}
</style>
