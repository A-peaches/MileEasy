<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="left-container">

      <!-- 여기 프로필 -->
      <div key="profile" class="cards fade-up-item profile-card">
        <img
          v-if="loginInfo && loginInfo.user_no"
          :src="profileImageUrl"
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
        <button class="btn-yellow KB_C2 my-3" disabled>운영 관리자</button>
      </div>

      <!-- 여기 메뉴 -->
      <div class="cards fade-up-item menu-card">
        <div style="padding: 3% 0%">
          <a href="/kingTopAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마왕관리
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/mileageAddAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              마일리지 관리
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/m_TipMainAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              M-TIP
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/noticeListView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              공지사항
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
    </div>

    <div class="right-container">
      <PageCount class="fade-up-item" />
      <MileagePageCount class="fade-up-item" style="margin-top: 5%"/>
      <PositionChart class="fade-up-item" style="margin-top: 5%"/>
    </div>
  </div>
</template>






<script>
import { mapGetters } from 'vuex';
import moment from 'moment'; // moment.js import
import Swal from 'sweetalert2';
import PageCount from '@/views/adminMileEasy/main/PageCount.vue';
import MileagePageCount from '@/views/adminMileEasy/main/MileagePageCount.vue';
import PositionChart from '@/views/adminMileEasy/main/PositionChart.vue';

export default {
  name: 'AdminMainView',
  components: { PageCount, MileagePageCount, PositionChart },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
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
  },
  mounted() {
    this.checkFirstBusinessDay();

    this.$nextTick(() => {
      const items = this.$el.querySelectorAll('.fade-up-item');
      items.forEach((item, index) => {
        item.style.setProperty('--index', index);
        item.style.setProperty('z-index', 10 - index); // z-index 설정
        setTimeout(() => {
          item.classList.add('fade-up-active');
        }, 100 * index); // 각 아이템마다 지연 시간을 다르게 설정
      });
    });
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = require('@/assets/img/test.png');
    },
    setTransitionDelay(el, index) {
      el.style.setProperty('--index', index);
    },

    checkFirstBusinessDay() {
      // 현재 날짜를 moment 객체로 가져오기
      const currentDate = moment();

      // 이번 달의 첫 번째 영업일을 구하기 위해 반복문 사용
      let currentDay = currentDate.clone();
      while (currentDay.month() === currentDate.month()) {
        // 토요일(6) 또는 일요일(0)이 아닌 경우에만 첫 번째 영업일로 처리
        if (currentDay.day() !== 0 && currentDay.day() !== 6) {
          if (currentDay.date() === 0) {
            // 첫 번째 영업일이면 알림 표시
            Swal.fire({
              icon: 'info',
              title: '알림',
              text: '마왕 채택일입니다. 채택을 진행해주세요.',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/kingMain';
              }
            });
            break;
          }
        }
        currentDay.add(1, 'day');
      }
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.left-container {
  width: 26%;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  height: 100vh;
}

.right-container {
  width: 70%;
  margin-left: 4%;
}

.profile-card {
  height: 430px;
  width: 370px;
}

.menu-card {
  width: 370px;
  height: 360px;
  padding: 10%;
  margin-top: 11%;
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

.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
  transition-delay: calc(var(--index) * 100ms);
  position: relative; /* z-index가 작동하도록 */
}

.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}

</style>
