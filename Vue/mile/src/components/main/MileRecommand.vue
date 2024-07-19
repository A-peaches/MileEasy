<template>
  <div class="cards card-white" style="width: 24%; height: 220px">
    <p class="lg2 KB_C2 " style="margin-right: 30px">
      <i class="bi bi-award-fill" style="color: #ffca05;"></i>&nbsp;오늘의 추천
    </p>
    <div class="flex mx-3">
      <div class="my-3">뀨뀪뀨뀨!ㄴ</div>
      <img :src="randomImg" alt="randomImg" class="card-image" />
    </div>
  </div>
</template>
    
<script>
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
    };
  },
  methods: {
    getRandomImg() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      return this.images[randomIndex];
    },
  },
  created() {
    this.randomImg = this.getRandomImg();
  },
};
</script>

<style>
.cards {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 70px;
  height: auto;
  object-fit: cover;
}
</style>
