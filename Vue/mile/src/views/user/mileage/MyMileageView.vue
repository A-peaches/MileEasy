<template>
 <div class="cards page-back mx-auto" style="color: #4b4a4a">
  <div class="help-container">
    <h2 class="bold-x-lg my-5 ml-5" style="font-family: KB_C3">
      나의 마일리지
      <i
        class="bi bi-question-circle help-icon"
        @click="toggleHelpPopover"
        style="font-size: 20pt"
        ref="helpIcon"
      ></i>
    </h2>

    <div v-if="showHelpPopover" class="help-popover" ref="helpPopover">
      <div style="font-size: 12pt">
        <span>
          이것은 마일리지 카드입니다. 여기에서 귀하의 마일리지 포인트와 최대
          마일리지, <br />
          그리고 다른 사용자들과 비교한 귀하의 위치를 확인할 수 있습니다.
        </span>
      </div>
    </div>
  </div>

    <div class="row mx-2" style="margin-top: 60px" v-if="dataLoaded">
      <div
        v-for="(card, index) in filteredMyMile"
        :key="index"
        class="col-6"
      >
        <div class="cards fade-up-item mx-2 my-2" style="background-color: #f9f9f9;">
          <div class="card-header">
            <div class="text-start KB_C3 fw-bolder mile-name">
              {{ card.mile_name }}
            </div>
            <div class="shortcut-link-container">
              <router-link
                :to="{
                  name: 'mileageDetail',
                  params: { mile_no: card.mile_no },
                }"
                class="KB_C3 brown shortcut-link"
              >
                <strong>바로가기 ></strong>
              </router-link>
            </div>
          </div>
          <div class="card-content">
            <div class="score-container">
              <div class="score-wrapper">
                <span class="KB_C2">
                  <span class="KB_C2 highlight">{{ card.user_point }}</span>
                  / {{ card.mile_max != 0 ? card.mile_max : "-" }}
                </span>
              </div>
            </div>
            <div class="progress-container">
              <div class="progress-bar-wrapper">
                <div class="progress-bar">
                  <div
                    class="progress"
                    :style="{
                      height: calculateProgressHeight(card.all_point) + '%',
                    }"
                  ></div>
                </div>
                <div class="markers">
                  <div class="marker top">
                    <i class="bi bi-caret-right-fill"></i>&nbsp;상위 20%
                  </div>
                  <div class="marker middle">
                    <i class="bi bi-caret-right-fill"></i>&nbsp;상위 60%
                  </div>
                  <div class="marker bottom">
                    <i class="bi bi-caret-right-fill"></i>&nbsp;상위 100%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-info">
            <div class="recent-update">
              ( 최근 업데이트 : {{ card.mile_date }} )
            </div>
            <div class="below-text">&lt; 총 평균 대비 상위 그래프 &gt;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyMileageView",

  data() {
    return {
      showHelpPopover: false,
      dataLoaded: false,
    };
  },
  methods: {
    ...mapActions("mileScore", ["getMyMiles"]),

    calculateProgressHeight(allPoint) {
      if (allPoint === 0) return 0.1;
      return Math.max(0, Math.min(100, 100 - allPoint));
    },
    setTransitionDelay(el, index) {
      el.style.setProperty("--index", index);
    },
    applyFadeUpEffect() {
      const items = this.$el.querySelectorAll(".fade-up-item");

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
    toggleHelpPopover(event) {
      event.stopPropagation();
      this.showHelpPopover = !this.showHelpPopover;
      if (this.showHelpPopover) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      if (
        this.$refs.helpPopover &&
        !this.$refs.helpPopover.contains(event.target) &&
        !this.$refs.helpIcon.contains(event.target)
      ) {
        this.showHelpPopover = false;
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo && this.getIsChecked == true)) {
          window.location.href="/noAccess"
        } 
    },
  },
  mounted() {},
  computed: {
    ...mapGetters('login', ['getLoginInfo','getIsChecked']),
    ...mapGetters("mileScore", ["getMyMile"]),

    filteredMyMile() {
      const jobNo = this.getLoginInfo ? this.getLoginInfo.job_no : null;
      if (!jobNo) {
        return [];
      }
      let filteredData =
        jobNo === "기획"
          ? this.getMyMile.filter((item) => item.mile_is_branch === false)
          : this.getMyMile;

      const uniqueData = Array.from(
        new Map(filteredData.map((item) => [item.mile_no, item])).values()
      );
      return uniqueData;
    },
  },
  watch: {
    getLoginInfo: {
      immediate: true,
      handler(newLoginInfo) {
        if (newLoginInfo && newLoginInfo.user_no) {
          this.getMyMiles(newLoginInfo.user_no).then(() => {
            this.dataLoaded = true;
            this.$nextTick(() => {
              this.applyFadeUpEffect();
            });
          });
        } else {
          this.dataLoaded = false;
        }
      },
    },
  },
  created() {
    this.checkLoginInfo();
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}

.cards {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 250px;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.mile-name {
  font-size: 18pt;
  margin: 0;
  flex-grow: 1;
  padding-right: 10px;
}

.shortcut-link-container {
  flex-shrink: 0;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.score-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.score-wrapper {
  text-align: center;
}

.progress-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.progress-bar-wrapper {
  display: flex;
  width: 100%;
  max-width: 200px;
  align-items: center;
  justify-content: center;
}

.page-back {
  padding-left: 2%;
  padding-right: 2%;
}
.progress-bar {
  width: 60px;
  height: 200px;
  background-color: #e0e0e0;
  position: relative;
  border-radius: 5px;
  overflow: visible;
}

.bold-x-lg {
  display: inline-flex;
  align-items: center;
}


.progress {
  width: 100%;
  background-color: #ffca05;
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  transition: height 0.5s;
}

.markers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  margin-left: 10px;
}

.marker {
  font-size: calc(10px + 0.2vw);
  white-space: nowrap;
}

.bottom-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
}

.recent-update, .below-text {
  font-size: calc(10px + 0.2vw);
  color: gray;
}

.help-container {
  position: relative;
  display: inline-block;
}

.help-icon {
  cursor: pointer;
  /* position: relative;
  display: inline-block; */
  margin-left: 10px; /* 아이콘과 텍스트 사이 간격 */
  /* vertical-align: middle; */
}

.help-popover {
  position: absolute;
  left:  calc(50%);
  top: calc(100% - 35px); /* 아이콘 바로 아래에 위치 */
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  width: 600px; /* 너비를 600px로 설정 */
  background-color: white;
  border: 2px solid #e4e4e4;
}

.highlight {
  background-color: #fff6d4;
  border-radius: 30px;
  padding: 4px 8px;
  display: inline-block;
}

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

h2.bold-x-lg {
  font-size: calc(24px + 1vw);
}

.help-icon {
  font-size: calc(16px + 0.5vw) !important;
}

.KB_C3.fw-bolder {
  font-size: calc(16px + 0.5vw);
}

.KB_C3.brown strong {
  font-size: calc(8px + 0.5vw);
}

.KB_C2 {
  font-size: calc(24px + 1vw);
}

.shortcut-link {
  text-decoration: none;
  font-size: 12pt;
}

@media (max-width: 1200px) {
  .help-popover {
    width: 90%;
    max-width: 600px;
    left: 0;
  }
  
  .mile-name {
    font-size: 16pt;
  }
}

@media (max-width: 992px) {
  .col-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .mile-name {
    font-size: 14pt;
  }
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
    align-items: center;
  }

  .score-container, .progress-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .bottom-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .recent-update, .below-text {
    margin-bottom: 5px;
  }
/* 
  h2.bold-x-lg {
    font-size: calc(20px + 1vw);
  } */

  .KB_C2 {
    font-size: calc(20px + 1vw);
  }

  .KB_C3.fw-bolder {
    font-size: calc(16px + 0.5vw);
  }

  .mile-name {
    font-size: 14pt;
  }
}

@media (max-width: 480px) {
  /* h2.bold-x-lg {
    font-size: calc(18px + 1vw);
  } */

  .KB_C2 {
    font-size: calc(24px + 1vw);
  }

  .KB_C3.fw-bolder {
    font-size: calc(19px + 0.5vw);
  }

  .progress-bar {
    height: 150px;
  }

  .markers {
    height: 150px;
  }

  .mile-name {
    font-size: 14pt;
  }

  .KB_C3.brown strong {
  font-size: calc(14px + 0.5vw);
}

}
</style>