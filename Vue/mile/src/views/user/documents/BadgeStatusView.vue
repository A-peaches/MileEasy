<template>
  <div
    class="cards page-back mx-auto"
    style="color: #4b4a4a; padding-bottom: 90px"
  >
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <h2 class="mt-3 main-title">배지 취득 현황</h2>
    <div class="badge-container">
      <div class="badge-card" :class="{ 'cards-active': badgeData[0]?.current_month && badgeData[0]?.mile_is_king }">
        <div class="badge-image-container">
          <img :src="kingImage" :class="{ 'darken-image': !badgeData[0]?.current_month || !badgeData[0]?.mile_is_king }" @error="handleImageError" alt="마왕 배지" />
        </div>
        <div class="badge-info">
          <span class="badge-title">마왕 배지</span>
          <p class="badge-description">전월 기준 마일리지 취득 점수가 높은 상위 3명이 채택됩니다.</p>
          <p class="badge-date" v-if="badgeData[0]?.mile_is_king">취득일 : {{badgeData[0]?.start_date}}</p>
          <p class="badge-date" v-else>기준 미달성</p>
        </div>
      </div>
      <div class="badge-card" :class="{ 'cards-active': badgeData[0]?.current_month && badgeData[0]?.mile_is_jump }">
        <div class="badge-image-container">
          <img :src="jumpImage" :class="{ 'darken-image': !badgeData[0]?.current_month || !badgeData[0]?.mile_is_jump }" @error="handleImageError" alt="Jump UP 배지" />
        </div>
        <div class="badge-info">
          <span class="badge-title">Jump UP 배지</span>
          <p class="badge-description">최근 2개월간 마일리지 증가 폭이 큰 상위 3명이 채택됩니다.</p>
          <p class="badge-date" v-if="badgeData[0]?.mile_is_jump">취득일 : {{badgeData[0]?.start_date}}</p>
          <p class="badge-date" v-else>기준 미달성</p>
        </div>
      </div>
    </div>

    <div class="history-container">
      <h3 class="sub-title">취득 이력</h3> 
      <hr />
      <div v-for="(item, index) in badgeData" :key="index" class="history-item">
        <div class="history-date">{{ item.start_date }} ~ {{ item.end_date }}</div>
        <div class="history-badge">{{ item.mile_is_king ? '마왕 배지' : 'Jump-Up 배지' }}</div>
        <div class="history-status">{{ item.current_month ? '유효' : '기간경과'}}</div>
      </div>
    </div>
  </div>
</template>

     
     <script>
import { mapGetters, mapActions } from "vuex";
import api from '@/api/axios';
export default {
  name: "BadgeStatusView",
  data() {
    return {
      msg: "",
      badgeData: [],
      loginInfoLoaded: false,
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("badge", ["getKingBadge", "getJumpBadge"]),

    kingImage() {
      return this.getKingBadge;
    },
    jumpImage() {
      return this.getJumpBadge;
    },
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    ...mapActions("badge", ["badgeKingImage", "badgeJumpImage"]),
    handleImageError() {
      console.error("이미지 로드 실패");
    },

    async kingData() {
      try {
        const response = await api.get(
          "/mileage/kingData"
        );
        console.log("마왕 top3:", response.data);
        this.kingTop3 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error("마왕 top3:", error);
        this.kingTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
    async jumpData() {
      try {
        const response = await api.get(
          "/mileage/jumpData"
        );
        console.log("점프업 top3:", response.data);
        this.baseDate = response.data.length ? response.data[0].base_date : ""; // 첫 번째 데이터의 기준일자 설정
        this.jumpTop3 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error("점프업 top3:", error);
        this.jumpTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    warningAlert() {
      this.$swal({
        title: "경고",
        text: this.msg,
        icon: "warning",
        scrollbarPadding: false,
      });
    },
    errorAlert() {
      this.$swal({
        title: "에러",
        text: this.msg,
        icon: "error",
        scrollbarPadding: false,
      });
    },
    successAlert() {
      this.$swal({
        title: "성공",
        text: this.msg,
        icon: "success",
        scrollbarPadding: false,
      });
    },
    async loadBadgeData() {
      if (this.getLoginInfo && this.getLoginInfo.user_no) {
        try {
          const response = await api.get(
            `/myMile/loadBadgeData/${this.getLoginInfo.user_no}`
          );
          this.badgeData = response.data;
          console.log(this.badgeData);
        } catch (error) {
          console.error("배지 데이터 로드 실패:", error);
        }
      }
    },
    watch: {
      getLoginInfo: {
        immediate: true,
        handler(newVal) {
          if (newVal && newVal.user_no) {
            this.loginInfoLoaded = true;
            this.loadBadgeData();
          }
        },
      },
    },
  },
  mounted() {
    this.badgeKingImage();
    this.badgeJumpImage();
    if (this.getLoginInfo && this.getLoginInfo.user_no) {
      this.loadBadgeData();
    }
  },
};
</script>
     
<style scoped>

.main-title {
  margin-bottom: 50px;
  text-align: center;
  font-family: "KB_S3", sans-serif;
}

.badge-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 70px;
  margin-bottom: 90px;
}

.badge-card {
  display: flex;
  width: 100%;
  max-width: 450px;
  height: 203px;
  background-color: #fafafa;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding : 20px;
}

.badge-image-container {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;

}
.badge-image-container img {
  width: 90%;
  height: auto;
  object-fit: contain;
}

.badge-info {
  width: 55%;
  padding : 0px 6px 15px 6px;
}

.badge-date {
  font-size: 10pt;
  color:brown;
}

.badge-title {
  font-family: "KB_C2";
  display: block;
  font-size: 16pt;
  margin-top: 6px;
  margin-bottom: 10px;
  text-align: center;
}

.badge-description {
  margin-top :20px ;
  margin-bottom : 20px ;
  font-size:16px;
}



.history-container {
  width: 78%;
  max-width: 1200px;
  margin: 0 auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.history-date, .history-badge, .history-status {
  flex: 1;
  font-size: 14px;
}


h2 {
  margin-bottom: 50px;
  text-align: center;
  font-family: "KB_S3", sans-serif;
}


.sub-title {
  font-family: "KB_S3", sans-serif;
  margin-bottom: 20px;
}

.cards-active {
  background-color: #FAFFD9;
}


.darken-image {
  filter: grayscale(100%) !important;
}


@media (max-width: 768px) {
  .main-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .badge-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .badge-card {
    max-width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
  }

  .badge-image-container {
    width: 100%;
    margin-bottom: 15px;
  }

  .badge-info {
    width: 100%;
    text-align: center;
  }

  .badge-title {
    font-size: 14pt;
  }

  .badge-description {
    font-size: 14px;
  }

  .history-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .history-date, .history-badge, .history-status {
    margin-bottom: 5px;
  }

  .sub-title {
    font-size: 20px;
  }

  .badge-image-container img {
  width: 50%;
}
}

@media (max-width: 480px) {
  .main-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .badge-card {
    padding: 15px;
  }

  .badge-title {
    font-size: 12pt;
  }

  .badge-description {
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .badge-date {
    font-size: 9pt;
  }

  .history-container {
    width: 95%;
  }

  .history-date, .history-badge, .history-status {
    font-size: 12px;
  }

  .sub-title {
    font-size: 18px;
  }
}

</style>
     