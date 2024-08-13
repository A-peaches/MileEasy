<template>
  <div v-if="!isMobile">
    <div key="profile" class="cards fade-up-item profile-cards mx-auto" >
      <div class="profile-container">
        <img
          v-if="loginInfo && loginInfo.user_no"
          :src="profileImageUrl"
          class="profile-large my-3"
          alt="Profile Picture"
          @error="setDefaultImage"
        />
      </div>
      <div class="profile-header mt-3">
        <h2 class="lg KB_S4 my-1">
          {{ loginInfo ? loginInfo.user_name : '' }}
        </h2>
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
      <button class="btn-yellow KB_C2 my-3" @click="goToAIView">
        나의 AI 리포트
      </button>
    </div>
  </div>
  <div v-else>
    <div key="profile" class="cards fade-up-item profile-cards mx-auto" >
      <div class="profile-container d-flex justify-content-between align-items-center">
        <img
          v-if="loginInfo && loginInfo.user_no"
          :src="profileImageUrl"
          class="profile-large my-3"
          alt="Profile Picture"
          @error="setDefaultImage"
        />
        <div class="mr-4 mt-2 pl-4">
          <div class="profile-header mt-3">
            <h2 class="lg KB_S4 my-1">
              {{ loginInfo ? loginInfo.user_name : '' }}
            </h2>
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
          <button class="btn-yellow KB_C2 my-3" @click="goToAIView">
            나의 AI 리포트
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import api from '@/api/axios';
import MobileDetect from "mobile-detect";

export default {
  name: 'ProfileCom',
  data() {
    return {
      badgeList: [], // 초기값을 빈 배열로 설정
      isMobile: false,
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
    goToAIView() {
      window.location.href = '/AI_Report';
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
    const md = new MobileDetect(window.navigator.userAgent);
    this.isMobile = md.mobile() !== null;

    if (this.loginInfo && this.loginInfo.user_no) {
      this.badgeData(); // 컴포넌트가 마운트 될 때 배지 데이터를 가져옵니다.
    }
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .profile-cards {
    height: 230px !important;
    width: 97% !important;
  }
  .profile-large {
    width: 90px !important;
    height: 90px !important;
  }
  .profile-container {
    width: 90% !important;
  }
}

.cards {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-cards {
  height: 430px;
}

.profile-container {
  width: 100%;
  position: relative;
}


.profile-large {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
.badge-container {
  position: absolute;
  top: -22px;
  left: -25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
}

.chat-icon {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.profile-header {
  text-align: center;
  margin-top: 10px;
}

.profile-header h2 {
  margin: 0;
}
</style>