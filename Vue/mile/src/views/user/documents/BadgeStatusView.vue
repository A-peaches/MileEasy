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
    <h2 style="margin-bottom: 60px">배지 취득 현황</h2>
    <div class="d-flex mx-auto w-100 justify-content-center my-5">
      <div
        class="cards d-flex cards-color"
        style=" width: 35%; margin-right: 50px; "
        :class="{ 'cards-active': badgeData[0]?.current_month && badgeData[0]?.mile_is_king }"
      >
        <div class="align-center justify-content-center" style="width: 35%; height:100%; display: flex;">
          <img
            :src="kingImage"
            style="width: 100%; margin: 0 auto"
            :class="{ 'darken-image':!badgeData[0]?.current_month || !badgeData[0]?.mile_is_king }"
            @error="handleImageError"
          />

        </div>
        <div style="width: 63%">
          <span class="badge-title">마왕 배지</span>
          <p class="mt-4">
            전월 기준 마일리지 취득 점수가 <br />
            높은 상위 3명이 채택됩니다.
          </p>
          <div v-if="badgeData[0]?.mile_is_king">
          <p class="brown mt-4">취득일 : {{badgeData[0]?.start_date}}</p>
          </div>
          <div v-else>
            <p class="brown mt-4">기준 미달성
            </p>
          </div>
        </div>
      </div>
      <div class="cards d-flex cards-color" style=" width: 35%; "
      :class="{ 'cards-active': badgeData[0]?.current_month && badgeData[0]?.mile_is_jump }"
    >
    
        <div class="align-center justify-content-center" style="width: 35%; height:100%; display: flex;">
          <img
            :src="jumpImage"
            style="width: 100%; margin: 0 auto"
            :class="{  'darken-image': !badgeData[0]?.current_month || !badgeData[0]?.mile_is_jump  }"
            @error="handleImageError"
          />
        </div>
        <div style="width: 63%">
          <span class="badge-title">Jump UP 배지</span>
          <p class="mt-4">
            최근 2개월간 마일리지 증가 폭이 <br />
            큰 상위 3명이 채택됩니다.
          </p>
          <div v-if="badgeData[0]?.mile_is_jump">
          <p class="brown mt-4">취득일 : {{badgeData[0]?.start_date}}</p>
          </div>
          <div v-else>
            <p class="brown mt-4">기준 미달성
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-75 mx-auto" style="margin-top: 90px">
      <h3 class="sub-title">&nbsp;취득 이력</h3> 
      <hr />
      <div v-for="(item, index) in badgeData" :key="index">
    <div class="row text-start KB_C3 align-items-center">
      <div class="col-md-4 mb-1 brown">{{ item.start_date }} ~ {{ item.end_date }}</div>
      <div class="col-md-4 mb-1">{{ item.mile_is_king ? '마왕 배지' : 'Jump-Up 배지' }}</div>
      <div class="col-md-4 mb-1">{{ item.current_month ? '유효' : '기간경과'}}</div>
    </div>
  </div>
</div>
  </div>
</template>
     
     <script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
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
        const response = await axios.get(
          "http://localhost:8090/mileage/kingData"
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
        const response = await axios.get(
          "http://localhost:8090/mileage/jumpData"
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
          const response = await axios.get(
            `http://localhost:8090/myMile/loadBadgeData/${this.getLoginInfo.user_no}`
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
.button-container {
  display: flex;
  align-items: center;
  padding-left: 15px;
}

h2 {
  margin-bottom: 50px;
  text-align: center;
  font-family: "KB_S3", sans-serif;
}

.page-back {
  width: 70%;
  height: 100%;
  margin-top: 5%;
}

.badge-title {
  font-family: "KB_C2";
  font-size: 16pt;
  margin-top: 6px;
  text-align: center;
}

.brown {
  font-size: 10pt;
}

.sub-title {
  font-size: 22pt;
  font-family: "KB_S3", sans-serif;
}

.darken-image {
    display: block;
  width: 100%;
  height: auto;
  filter: grayscale(100%) !important; /* 이미지 흑백으로 만들기 */
}

.cards-color {
    background-color: #fafafa;
}

.cards-active{
    background-color: #FAFFD9;
}
</style>
     