<template>
  <div class="cards card-white" style="width: 24%; height: 230px">
    <p class="lg2 KB_C2 mx-auto w-100">
      <i class="bi bi-award-fill" style="color: #ffca05"></i>&nbsp;오늘의 추천
    </p>
    <img :src="randomImg" alt="randomImg" />
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
        require("@/assets/imoji/recommand/6.png"),
        require("@/assets/imoji/recommand/7.png"),
        require("@/assets/imoji/recommand/8.png"),
        require("@/assets/imoji/recommand/9.png"),
        require("@/assets/imoji/recommand/10.png"),
        require("@/assets/imoji/recommand/11.png"),
        require("@/assets/imoji/recommand/12.png"),
        require("@/assets/imoji/recommand/13.png"),
        require("@/assets/imoji/recommand/14.png"),
        require("@/assets/imoji/recommand/15.png"),
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
