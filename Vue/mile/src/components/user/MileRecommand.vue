<template>
  <div class="cards card-white" >
    <p class="lg2 KB_S4 recommand-title" >
      <i class="bi bi-award-fill" style="color: #ffca05;"></i>&nbsp;오늘의 추천
    </p>
    <div class="flex" style="margin-left: 15px; margin-top:30px; width:65%;">
      <div v-if="recommand && recommand.mile_mention">
        <div class="KB_S5 recommand-mention">
          {{ recommand.mile_mention }}
        </div>
        <br />
        <div>
          <router-link :to="recommand.mile_link" style="color:#3C2511; text-decoration: none;" class="fw-bold">바로가기 ></router-link>
        </div>
      </div>
      <div v-else>
        <div class="KB_S5">
          마일리지 점수가 하나 이상 있어야 멘트가 활성화됩니다.
        </div>
      </div>
      <img :src="randomImg" alt="randomImg" class="card-image" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from '@/api/axios';

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
      dataLoaded: false,
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
        const response = await api.get(
          `/mileage/getRecommand/${this.loginInfo.user_no}`
        );
        this.recommand = response.data;
        this.dataLoaded = true;
      } catch (error) {
        this.dataLoaded = true;
      }
    },
    checkLoginInfo() {
      if (this.loginInfo) {
        clearInterval(this.checkLoginInfoInterval);
        this.getRecommand();
      }
    },
  },
  mounted() {
    this.randomImg = this.getRandomImg();

    this.checkLoginInfoInterval = setInterval(() => {
      this.checkLoginInfo();
    }, 1000);
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

<style scoped>
@media (max-width: 768px) {
  .recommand-title {
    margin-right: 50px !important; 
  }
  .recommand-mention {
    font-size: 15pt !important;
  }
}

.recommand-title {
  margin-right: 90px; 
  margin-bottom: 10px;
}

.cards {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 80px;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 40px;
  right: 30px;
  z-index: 0;
}
</style>
