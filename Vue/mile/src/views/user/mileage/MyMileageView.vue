<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <h2
      class="bold-x-lg my-5 ml-5"
      ref="helpIcon"
      style="font-family: KB_C3"
    >
      나의 마일리지
      <i
        class="bi bi-question-circle help-icon"
        @click="toggleHelpPopover"
        style="font-size: 20pt"
      ></i>
    </h2>

    <div v-if="showHelpPopover" class="help-popover" ref="helpPopover">
      <div style="font-size: 12pt">
        <span
          >이것은 마일리지 카드입니다. 여기에서 귀하의 마일리지 포인트와 최대
          마일리지, <br />
          그리고 다른 사용자들과 비교한 귀하의 위치를 확인할 수 있습니다.</span
        >
      </div>
    </div>
    <div class="row mx-2" style="margin-top: 100px" v-if="dataLoaded">
      <div
        v-for="(card, index) in filteredMyMile"
        :key="index"
        class="col-6 mb-3"
      >
        <div
          class="cards mx-3 fade-up-item"
          style="background-color: #f9f9f9; height: 280px; position: relative"
        >
          <div class="flex-between">
            <div class="flex mb-2">
              <div
                class="text-start KB_C3 fw-bolder"
                style="font-size: 18pt; margin: 0"
              >
                {{ card.mile_name }}
              </div>
              <div class="text-end" style="top: -12px; position: relative">
                <router-link
                  :to="{
                    name: 'mileageDetail',
                    params: { mile_no: card.mile_no },
                  }"
                  class="KB_C3 brown"
                  style="text-decoration: none; font-size: 12pt"
                >
                  <strong>바로가기 ></strong>
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="flex justify-content-between align-items-center"
            style="padding-bottom: 60px"
          >
            <div style="width: 55%; font-size: 32pt; position: relative">
              <span class="KB_C2">
                <span class="KB_C2 highlight">{{ card.user_point }}</span>
                / {{ card.mile_max != 0 ? card.mile_max : "-" }}</span
              >
              <div class="text-start recent-update">
                ( 최근 업데이트 : {{ card.mile_date }} )
              </div>
            </div>
            <div
              class="flex progress-container"
              style="
                width: 43%;
                height: 105%;
                position: relative;
                padding-right: 5%;
              "
            >
              <div class="progress-bar mb-4">
                <div
                  class="progress"
                  :style="{
                    height: getProgressHeight(card.user_point, card.all_point),
                  }"
                ></div>
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
              <div class="below-text mb-2 ml-">
                &lt; 총 평균 대비 상위 그래프 &gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5"></div>
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

    getProgressHeight(current, total) {
      if (total === "-") total = 1;
      const percentage = (current / total) * 100;
      return `${percentage}%`;
    },

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
        const delay = baseDelay + 50 * index;

        setTimeout(() => {
          item.classList.add("fade-up-active");
        }, delay);
      });
    },
    toggleHelpPopover(event) {
      event.stopPropagation(); // 이벤트 전파 중지
      console.log("toggleHelpPopover 클릭");
      this.showHelpPopover = !this.showHelpPopover;
      console.log("showHelpPopover:", this.showHelpPopover); // 추가
      if (this.showHelpPopover) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      console.log("handleClickOutside 실행");
      if (
        this.$refs.helpPopover &&
        !this.$refs.helpPopover.contains(event.target) &&
        !this.$refs.helpIcon.contains(event.target)
      ) {
        console.log("팝오버 닫기");
        this.showHelpPopover = false;
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
  },
  mounted() {},
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("mileScore", ["getMyMile"]),

    filteredMyMile() {
  const jobNo = this.getLoginInfo ? this.getLoginInfo.job_no : null;
  if (!jobNo) {
    return [];
  }
  let filteredData = jobNo === "기획" 
    ? this.getMyMile.filter((item) => item.mile_is_branch === false)
    : this.getMyMile;
  
  // 고유 식별자를 사용한 중복 제거
  const uniqueData = Array.from(new Map(filteredData.map(item => [item.mile_no, item])).values());
  return uniqueData;
}
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
          // 로그인 정보가 없을 때 데이터 초기화
          this.dataLoaded = false;
        }
      },
    },
  },
};
</script>

<style scoped>
.help-icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.help-popover {
  position: absolute;
  left: 980px; /* 조정 가능 */
  top: 335px; /* 조정 가능 */
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  width: 600px;
  margin-left: 10px; /* 아이콘과의 간격 */
  display: block; /* 추가 */
  background-color: white; /* 임시로 눈에 띄는 색상 사용 */
  border: 2px solid #e4e4e4;
}
.page-back {
  width: 70%;
  height: 100%;
  margin-top: 5%;
}

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
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 살짝의 그림자 추가 */
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 0px;
}

.recent-update {
  font-size: 10pt;
  position: absolute;
  margin-top: 60px;
  color: gray;
}

.progress-bar {
  width: 60px;
  height: 95%;
  background-color: #e0e0e0;
  position: relative;
  border-radius: 5px;
  margin: 0 auto;
  overflow: visible;
}

.progress {
  width: 100%;
  background-color: #ffca05;
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  transition: height 0.5s;
}

.marker {
  position: absolute;
  left: 70px;
  font-size: 12px;
  white-space: nowrap;
}

.top {
  top: 20%;
}

.middle {
  top: 60%;
}

.bottom {
  bottom: 0;
}

.below-text {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
  color: gray; /* 텍스트 색상 변경 */
}

.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.highlight {
  background-color: #fff6d4;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8spx; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
}

.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
  transition-delay: calc(var(--index) * 100ms);
  position: relative; /* z-index가 작동하도록 */
}
.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}
</style>
