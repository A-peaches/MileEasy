<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a; padding-bottom:90px">
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <h2  style="margin-bottom:60px">배지 취득 현황</h2>
    <div class="d-flex mx-auto w-100 justify-content-center my-5">
      <div class="cards d-flex" style="background-color:#f9f9f9; width: 35% ; margin-right:50px">
        <div style="width:35%">
        <img
          :src="kingImage"
          style="width: 100%; margin: 0 auto"
          @error="handleImageError"
        />
        </div>
        <div style="width:63%">
        <span class="badge-title">마왕 배지</span>
        <p class="mt-4">전월 기준 마일리지 취득 점수가 <br>
            높은 상위 3명이 채택됩니다.</p>
        <p class="brown mt-4">취득일 : 2024-07-01</p>
        </div>
      </div>
      <div class="cards  d-flex" style="background-color:#f9f9f9;  width: 35% ;">
        <div style="width:35%">
        <img
          :src="jumpImage"
          style="width: 100%; margin: 0 auto"
          @error="handleImageError"
        />
        </div>
        <div style="width:63%">
        <span class="badge-title">Jump UP 배지</span>
        <p class="mt-4">최근 2개월간 마일리지 증가 폭이 <br>
           큰 상위 3명이 채택됩니다.</p>
        <p class="brown mt-4">취득일 : 2024-07-01</p>
        </div>
      </div>
    </div>

    <div class="w-75 mx-auto" style="margin-top:90px">
    <h3 class="sub-title">&nbsp;취득 이력 </h3>
    <hr>
    <div class="row text-start KB_C3">
        <div class="col-md-4">2024-07-01 ~ 2024-07-31</div>
        <div class="col-md-4">마왕 배지</div>
        <div class="col-md-4">기간경과</div>
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
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("badge", ["getKingBadge"]),
    ...mapGetters("badge", ["getJumpBadge"]),

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
    ...mapActions("badge", ["badgeKingImage"]),
    ...mapActions("badge", ["badgeJumpImage"]),
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
  },
  mounted() {
    this.badgeKingImage();
    this.badgeJumpImage();
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
    font-family: 'KB_C2';
    font-size: 16pt;
    margin-top: 6px;
    text-align: center;
}


.brown {
    font-size:10pt;
}

.sub-title{
    font-size: 22pt;
    font-family: "KB_S3", sans-serif;
}
</style>
     