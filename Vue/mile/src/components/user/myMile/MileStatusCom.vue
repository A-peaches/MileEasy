<template>
  <div>
    <div class="mx-auto" style="color: #4b4a4a">
      <div
        class="row"
        style="margin-left: 7%; margin-right: 7%; margin-top: 7%"
        v-if="dataLoaded && getMileStatus && getMileStatus.length > 0"
      >
        <div
          v-for="(item, index) in getMileStatus"
          :key="index"
          class="col-6 mb-3"
        >
          <div
            class="cards fade-up-item mx-3"
            style="background-color: #f9f9f9; height: 200px; position: relative"
          >
            <div class="flex-between">
              <div class="flex mb-2">
                <div
                  class="text-start KB_C3 fw-bolder"
                  style="font-size: 16pt; margin: 0"
                >
                  {{ item.score_name }}
                </div>
              </div>
            </div>
            <div class="justify-content-between align-items-center mt-3">
              <div class="w-100">
                <span v-if="item.user_point - item.prev_point > 0" class="mb-5"
                  ><i
                    class="bi bi-caret-up-fill"
                    style="color: #ff5c5c; font-size: 25pt"
                  ></i></span
                >&nbsp;

                <span v-else-if="item.user_point - item.prev_point == 0">
                  <!-- <i class="bi bi-dash-lg"
                  style="color: #FFA15C; font-size: 25pt"
                  ></i> -->
                  <span class="fw-bold" style="color: #FFA15C; font-size: 25pt" > - </span>
                </span>
                <span v-else-if="item.user_point - item.prev_point < 0">
                  <i class="bi bi-caret-down-fill"
                  style="color: #4D7EFF; font-size: 25pt"
                  ></i> 
                </span>


                <span class="KB_C2" style="font-size: 32pt"
                  >{{ item.user_point }}pt</span
                >

                &nbsp;
                <span class="" style="color: gray"
                  >({{ item.user_point - item.prev_point }}pt 증가)</span
                >
              </div>
            </div>
            <div class="text-star " style="font-size: 10pt; color:gray; margin-top:35px">
              ( 과거 업데이트 일자 : {{ item.prev_date }} / 최신 업데이트 일자 :
              {{ item.mile_date }} )
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AttendanceCom",
  props: ["mile_no"],
  data() {
    return {
      dataLoaded: false,
    };
  },
  methods: {
    ...mapActions("mileScore", ["getMyMileStatus"]),

    setTransitionDelay(el, index) {
      el.style.setProperty("--index", index);
    },

    applyFadeUpEffect() {
  console.log("Applying fade-up effect");
  const items = this.$el.querySelectorAll(".fade-up-item");
  console.log(`Found ${items.length} items to animate`);
  
  items.forEach((item, index) => {
    item.style.setProperty("--index", index);
    item.style.setProperty("z-index", items.length - index);
    
    // 모든 항목에 대해 약간의 기본 지연 시간을 설정
    const baseDelay = 50;
    const delay = baseDelay + (50 * index);
    
    setTimeout(() => {
      item.classList.add("fade-up-active");
    }, delay);
  });
},


async loadData() {
  try {
    const loginInfo = this.getLoginInfo;
    if (loginInfo && loginInfo.user_no) {
      await this.getMyMileStatus({
        user_no: loginInfo.user_no,
        mile_no: this.mile_no,
      });
      console.log("상속:", this.getMileStatus[0].mile_name);
      this.$emit("data-loaded", this.getMileStatus[0].mile_name);
      
      this.dataLoaded = true;
      this.$nextTick(() => {
        this.applyFadeUpEffect();
      });
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
  },
mounted() {
  this.loadData().then(() => {
    // 데이터 로딩 완료 후 애니메이션 적용
    this.$nextTick(() => {
      this.applyFadeUpEffect();
    });
  });
},
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("mileScore", ["getMileStatus"]),
  },
};
</script>
<style scoped>
.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
  transition-delay: calc(var(--index) * 100ms);
  position: relative;
}
.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}
</style>
