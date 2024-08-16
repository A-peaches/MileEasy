<template>
  <div>
    <div class="mx-auto" style="color: #4b4a4a">
      <div
        class="row"
        style="margin-left: 7%; margin-right: 7%; margin-top: 7%"
        v-if="dataLoaded && filteredMileStatus.length > 0"
      >
        <div
          v-for="(item, index) in filteredMileStatus"
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
                <span v-if="item.user_point - item.prev_point > 0" class="mb-5">
                  <i
                    class="bi bi-caret-up-fill"
                    style="color: #ff5c5c; font-size: 25pt"
                  ></i>
                </span>
                &nbsp;
                <span v-else-if="item.user_point - item.prev_point == 0">
                  <span class="fw-bold" style="color: #ffa15c; font-size: 25pt">
                    -
                  </span>
                </span>
                <span v-else-if="item.user_point - item.prev_point < 0">
                  <i
                    class="bi bi-caret-down-fill"
                    style="color: #4d7eff; font-size: 25pt"
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
            <div v-if="!isMobile" class="text-star" style="font-size: 10pt; color: gray; margin-top: 35px">
      ( 과거 업데이트 일자 : {{ item.prev_date }} / 최신 업데이트 일자 : {{ item.mile_date }} )
    </div>
    <div v-else class="text-star" style="font-size: 9pt; color: gray; margin-top: 20px">
      과거 업데이트 : {{ item.prev_date }} <br>
      최신 업데이트 : {{ item.mile_date }}
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
        const baseDelay = 50;
        const delay = baseDelay + 50 * index;
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
    },
  },
  mounted() {
    this.loadData().then(() => {
      this.$nextTick(() => {
        this.applyFadeUpEffect();
      });
    });
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("mileScore", ["getMileStatus"]),
    isMobile() {
      return window.innerWidth <= 768; // 768px 이하를 모바일로 간주
    },
    filteredMileStatus() {
      const jobNo = this.getLoginInfo ? this.getLoginInfo.job_no : null;
      if (!jobNo) {
        return [];
      }
      return this.getMileStatus.filter((item) => {
        if (jobNo === "개인") {
          return item.job_name === "공통" || item.job_name === "개인";
        } else if (jobNo === "기업") {
          return item.job_name === "공통" || item.job_name === "기업";
        } else {
          return true; // 필터링 조건에 맞지 않는 경우 모든 항목을 반환
        }
      });
    },
  },
};
</script>

<style scoped>
.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}
.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}

.cards {
  background-color: #f9f9f9;
  height: 200px;
  position: relative;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.cards:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-start {
  font-size: 16pt;
  margin: 0;
}

.KB_C2 {
  font-size: 32pt;
}

.text-star {
  font-size: 10pt;
  color: gray;
  margin-top: 35px;
}

/* 반응형 스타일 */
@media (max-width: 1200px) {
  .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 992px) {
  .cards {
    height: auto;
    min-height: 200px;
  }

  .text-start {
    font-size: 14pt;
  }

  .KB_C2 {
    font-size: 28pt;
  }
}

@media (max-width: 768px) {
  .col-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .cards {
    margin-bottom: 20px;
  }

  .text-start {
    font-size: 16pt;
  }

  .KB_C2 {
    font-size: 30pt;
  }
}

@media (max-width: 576px) {
  .text-start {
    font-size: 14pt;
  }

  .KB_C2 {
    font-size: 26pt;
  }

  .text-star {
    font-size: 9pt;
  }
}
</style>
