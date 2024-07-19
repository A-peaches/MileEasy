<template>
  <div class="cards card-white" style="width: 24%; height: 220px">
    <p class="lg2 KB_S4" style="margin-right: 90px; margin-bottom: 10px;">
      <i class="bi bi-award-fill" style="color: #ffca05; "></i>&nbsp;오늘의 추천
    </p>
    <div class="flex" v-if="recommand" style="margin-left: 15px;
    margin-top:30px; width:65%;">
      <div>
        <div class="KB_S5">
          {{ recommand.mile_mention }}
        </div>
        <br />
        <div>
          <router-link :to="recommand.mile_link" style="color:#3C2511 ; 
          text-decoration: none;" class="fw-bold">바로가기 ></router-link>
        </div>
      </div>

      <img :src="randomImg" alt="randomImg" class="card-image" />
    </div>
  </div>
</template>
    
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "MileRecommand",
  data() {
    return {
      images: [
        require("@/assets/imoji/recommand/1.png"),
        require("@/assets/imoji/recommand/2.png"),
        require("@/assets/imoji/recommand/3.png"),
        require("@/assets/imoji/recommand/4.png"),
        require("@/assets/imoji/recommand/5.png"),
        require("@/assets/imoji/recommand/6.png"),
        require("@/assets/imoji/recommand/7.png"),
        require("@/assets/imoji/recommand/8.png"),
        require("@/assets/imoji/recommand/9.png"),
      ],
      randomImg: null,
      recommand: null,
      checkLoginInfoInterval: null,
    };
  },
  methods: {
    getRandomImg() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      return this.images[randomIndex];
    },
    async getRecommand() {
      try {
        console.log("Fetching recommendation data...");
        const response = await axios.get(
          `http://localhost:8090/mileage/getRecommand/${this.loginInfo.user_no}`
        );
        this.recommand = response.data;
        console.log("Fetched recommendation data:", this.recommand);
      } catch (error) {
        console.error("Error getRecommand data:", error);
      }
    },
    checkLoginInfo() {
      if (this.loginInfo) {
        console.log("loginInfo available:", this.loginInfo);
        clearInterval(this.checkLoginInfoInterval);
        this.getRecommand();
      }
    },
  },
  created() {
    console.log("Created lifecycle hook");
    this.randomImg = this.getRandomImg();

    this.checkLoginInfoInterval = setInterval(() => {
      console.log("Checking loginInfo...");
      this.checkLoginInfo();
    }, 1000); // 1초마다 확인
  },
  beforeUnmount() {
    if (this.checkLoginInfoInterval) {
      clearInterval(this.checkLoginInfoInterval);
    }
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
};
</script>

<style>
.cards {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 80px; /* 원하는 크기로 조정 */
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 40px; /* 원하는 위치로 조정 */
  right: 30px; /* 원하는 위치로 조정 */
  z-index: 0;
}
</style>