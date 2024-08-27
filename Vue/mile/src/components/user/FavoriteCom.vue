<template>
  <div v-if="!isMobile">
    <div class="cards favorite-container" >
      <p class="text-left lg2 KB_C2">
        즐겨찾기 마일리지&nbsp;
        <i
          class="bi bi-plus-circle-fill icon-wrapper"
          @click="openModal"
        ></i>
      </p>
      <div class="flex">
        <div v-for="(item, index) in 4" :key="index" class="cards favorite-card"
        @click="favoriteList[index] && navigateToLink(favoriteList[index].mile_no)"
        style="cursor: pointer;">
        <img
            v-if="!favoriteList[index]"
            src="@/assets/img/add.png"
            class="addImg mx-auto"
            @click.stop="openModal"
          />
          <div v-else style="z-index: 10;">
            <p class="favorite-text KB_C2 mt-5">
              {{ favoriteList[index].mile_no }} 마일리지 
            </p>
            <div class="flex">
              <div
                class="KB_C1 mileage-score"
                
              >
                {{ getMileageScore(favoriteList[index]?.mile_no) }}pt
              </div>
              <div
                class="chart-wrapper mx-auto"
                
              >
                <div v-if="hasMileageData(favoriteList[index].mile_no)" class="chart-container">
                  <canvas
                    :id="'chart' + index"
                    :ref="'chart' + index"
                    style="
                      position: absolute;
                      top: -20px;
                      left: 50%;
                      transform: translateX(-50%);
                      z-index: 0;
                      height: 190px;
                    "
                  ></canvas>
                </div>
                <div v-else class="no-data-message chart-container">
                  <div class="mb-3 " style=" position: absolute;  z-index: 0;  top: -10px;">
                    <span><i class="bi bi-exclamation-circle-fill" style="color:#FFCA05; font-size: 17pt;"></i></span>
                    <p class="mt-2">마일리지 점수가 없습니다.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 모달 -->
      <teleport to="body">
        <div v-if="isModalOpen" class="modal-overlay">
          <div class="modals-content">
            <span class="close" @click="closeModal">&times;</span>
            <div class="modal-body">
              <p class="text-left fw-bold mb-3" style="font-size: 19pt">
                즐겨찾기 추가하기
              </p>
              <div class="favorite-options">
                <div
                  v-for="(item, index) in filteredMileageInfo"
                  :key="index"
                  class="btn-favorite favorite-item KB_C2"
                  :class="{ selected: selectedFavorites.includes(item.mile_name) }"
                  @click="toggleFavorite(item.mile_name)"
                >
                  {{ item.mile_name }}
                </div>
              </div>
            </div>
            <div class="mt-3 text-end">
              <button
                class="btn-gray KB_C2"
                @click="updateFavorites"
                style="
                      font-size: 16pt;
                      width: 20%;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    "
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>
  <div v-else>
    <div class="cards favorite-container" >
      <p class="text-left lg2 KB_C2 ">
        즐겨찾기 마일리지&nbsp;
        <i
          class="bi bi-plus-circle-fill icon-wrapper"
          @click="openModal"
          style="position: absolute; z-index: 1000;"
        ></i>
      </p>
      <div class="flex">
        <div v-for="(item, index) in 4" :key="index" class="cards favorite-card"
        @click="favoriteList[index] && navigateToLink(favoriteList[index].mile_no)"
        style="cursor: pointer;">
        <img
            v-if="!favoriteList[index]"
            src="@/assets/img/add.png"
            class="addImg mx-auto"
            @click.stop="openModal"
          />
          <div  v-else>
            <p class="favorite-text KB_C2 pt-5">
              {{ favoriteList[index].mile_no }} 마일리지 
            </p>
            <div class="flex">
              <div
                class="KB_C1 mileage-score"
                
              >
                {{ getMileageScore(favoriteList[index]?.mile_no) }}pt
              </div>
              <div
                class="chart-wrapper mx-auto"
                
              >
                <div v-if="hasMileageData(favoriteList[index].mile_no)" class="chart-container">
                  <canvas
                    :id="'chart' + index"
                    :ref="'chart' + index"
                    style="
                      position: absolute;
                      top: -20px;
                      left: 50%;
                      transform: translateX(-50%);
                      z-index: 0;
                      height: 190px;
                    "
                  ></canvas>
                </div>
                <div v-else class="no-data-message chart-container">
                  <div class="mb-3 " style=" position: absolute;  z-index: 0;  top: -10px;">
                    <span><i class="bi bi-exclamation-circle-fill" style="color:#FFCA05; font-size: 17pt;"></i></span>
                    <p class="mt-2">마일리지 점수가 없습니다.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 모달 -->
      <teleport to="body">
        <div v-if="isModalOpen" class="modal-overlay">
          <div class="modals-content">
            <span class="close" @click="closeModal">&times;</span>
            <div class="modal-body">
              <p class="text-left fw-bold mb-3" style="font-size: 19pt">
                즐겨찾기 추가하기
              </p>
              <div class="favorite-options">
                <div
                  v-for="(item, index) in filteredMileageInfo"
                  :key="index"
                  class="btn-favorite favorite-item KB_C2"
                  :class="{ selected: selectedFavorites.includes(item.mile_name) }"
                  @click="toggleFavorite(item.mile_name)"
                >
                  {{ item.mile_name }}
                </div>
              </div>
            </div>
            <div class="mt-3 text-end">
              <button
                class="btn-gray KB_C2 btn-submit"
                @click="updateFavorites"
                
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Chart from "chart.js/auto";
import MobileDetect from "mobile-detect";

export default {
  name: "FavoriteCom",
  data() {
    return {
      isModalOpen: false,
      selectedFavorites: [],
      favCharts: {},
      isMobile: false,
    };
  },
  computed: {
    ...mapGetters("mileage", ["getArrayMileage"]),
    ...mapGetters("favorite", ["getArrayFavorite"]),
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("mileScore", ["getArrayMileScore"]),
    filteredMileageInfo() {
      // loginInfo.job_no가 '기획'인 경우 item.is_branch가 0인 항목만 반환
      if (this.loginInfo.job_no == '기획') {
        return this.getArrayMileage.filter(item => item.mile_is_branch == false);
      }
      // 그렇지 않은 경우 모든 항목을 반환
      return this.getArrayMileage;
    },
    favoriteList() {
      return this.getArrayFavorite;
    },
    loginInfo() {
      return this.getLoginInfo;
    },
    mileScores() {
      return this.getArrayMileScore;
    },
  },
  methods: {
    ...mapActions("favorite", ["changeFavorite"]),
    getMileageMax(mileNo) {
      const mileage = this.mileageInfo.find((m) => m.mile_name == mileNo);
      return mileage?.mile_max ?? "a";
    },
    getMileageScore(mileNo) {
      const mileage = this.mileScores.find((m) => m.mile_no == mileNo);
      return mileage?.mile_score_point ?? "0";
    },
    hasMileageData(mileNo) {
      const score = this.mileScores.find((m) => m.mile_no === mileNo);
      return score && (score.mile_prev_score !== 0 || score.mile_score_point !== 0);
    },
    navigateToLink(mileNo) {
      const scoreObj = this.mileScores.find(score => score.mile_no === mileNo);
      const link = scoreObj ? scoreObj.mile_link : null;
      if (link) {
        window.location.href = link;
      }
  
    },
    openModal() {
      document.body.style.overflow = 'hidden';
      this.isModalOpen = true;
      this.selectedFavorites = this.favoriteList.map((fav) => fav.mile_no);
    },
    closeModal() {
      document.body.style.overflow = '';
      this.isModalOpen = false;
    },
    toggleFavorite(mileName) {
      if (this.selectedFavorites.includes(mileName)) {
        this.selectedFavorites = this.selectedFavorites.filter(
          (name) => name !== mileName
        );
      } else {
        if (this.selectedFavorites.length < 4) {
          this.selectedFavorites.push(mileName);
        } else {
          this.showAlert();
        }
      }
    },
    showAlert() {
      this.$swal({
        title: "경고",
        text: "즐겨찾기는 최대 4개까지 선택할 수 있습니다.",
        icon: "warning",
        scrollbarPadding: false
      });
    },
    updateFavorites() {
      this.$store
        .dispatch("favorite/changeFavorite", {
          user_no: this.loginInfo.user_no,
          favorites: this.selectedFavorites,
        })
        .then(() => {
          this.$store.dispatch("favorite/getFavorite", this.loginInfo.user_no);
          this.closeModal();
        });
      this.closeModal();
    },
    async createChart(index, mileNo, score) {
      const chartId = "chart" + index;
      await this.$nextTick();
      const canvas = this.$refs[chartId]?.[0];
      if (canvas && canvas.getContext) {
        if (this.favCharts[chartId]) {
          this.favCharts[chartId].destroy();
        }

        const ctx = canvas.getContext("2d");
        this.favCharts[chartId] = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["전월", "당월"],
            datasets: [
              {
                label: `마일리지 ${mileNo}`,
                data: [score.mile_prev_score, score.mile_score_point],
                backgroundColor: ["#FF93E1", "#64EDBC"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 10, // y축의 최대값을 설정하여 형태를 유지
              },
            },
            plugins: {
              legend: {
                display: false, // 범례 제거
              },
            },
          },
        });
      } else {
        console.warn(
          `Canvas element with id ${chartId} not found or does not support getContext.`
        );
      }
    },
    async renderCharts() {
      for (let index = 0; index < this.favoriteList.length; index++) {
        const fav = this.favoriteList[index];
        const scoreObj = this.mileScores.find((m) => m.mile_no === fav.mile_no);
        if (scoreObj) {
          await this.createChart(index, fav.mile_no, scoreObj);
        }
      }
    },
  },
  watch: {
    mileScores(newMileScores) {
      console.log("mileScores updated:", newMileScores);
      this.renderCharts();
    },
    favoriteList(newFavoriteList) {
      console.log("favoriteList updated:", newFavoriteList);
      this.renderCharts();
    },
  },
  async mounted() {
    const md = new MobileDetect(window.navigator.userAgent);
    this.isMobile = md.mobile() !== null;

    if (this.loginInfo) {
      await this.$store.dispatch("mileage/getMileage");
      await this.$store.dispatch(
        "favorite/getFavorite",
        this.loginInfo.user_no
      );
      await this.$store.dispatch(
        "mileScore/getMileScore",
        this.loginInfo.user_no
      );
      await this.renderCharts();
    }
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 모든 차트를 파괴
    for (let chart in this.favCharts) {
      if (this.favCharts[chart]) {
        this.favCharts[chart].destroy();
      }
    }
  },
  created() {
    console.log("FavoriteCom created");
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .favorite-container {
    width: 97% !important;
    height: 530px !important;
    overflow: auto !important;
    will-change: transform !important;
  }
  .chart-container {
    will-change: transform !important;
  }
  .favorite-card {
    width: 100% !important;
    padding: 5px !important;
  }
  .chart-wrapper {
    will-change: transform !important;
  }
  .modals-content {
    width: 90% !important;
  }
  .btn-favorite {
    margin: 8px !important;
    border-radius: 30px !important;
    width: 90% !important;
    height: 60px !important;
    font-size: 14pt !important;
    transition: background-color 0s !important;
  }
  .btn-favorite.selected:hover {
    background-color: #ffd849 !important;
  }
  .favorite-item:hover {
    background-color: #fff !important;
  }
  .btn-submit {
    width: 30% !important;
    font-size: 14pt !important;
  }
  .favorite-container {
    position: relative !important;
  }
  .mileage-score {
    font-size: 27pt;
    margin-bottom: 40px;
    margin-top: 5px;
    text-align: center;
    flex: 1;
    margin-left: 10px; 
    margin-right: 10px; 
    width: 140px;
  }
}

.icon-wrapper {
  color: #ffca05; 
  cursor: pointer;
  position: relative;
  z-index: 11;
}

.btn-submit {
  font-size: 16pt;
  width: 20%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.favorite-container{
  background-color: #f9f9f9; 
  height: 430px;
}

.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.favorite-card {
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 160px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
}

.addImg {
  width: 18%;
}

.addImg:hover {
  width: 20%;
  cursor: pointer;
}

.favorite-text {
  text-align: left;
  padding: 10px;
  margin: 0;
  width: 100%;
  align-self: flex-start;
}

.mileage-score {
  font-size: 30pt;
  margin-bottom: 40px;
  margin-top: 5px;
  text-align: center;
  flex: 1;
  margin-left: 10px; 
  margin-right: 10px; 
  width: 200px;
}

.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 290px; 
  position: relative; 
  margin-left : 0px;
}

.chart-container {
  position: relative;
  height: 150px;
  width: 190px;
  z-index: 1;
}

.favorite-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
}

.btn-favorite {
  background-color: #ffffff;
  color: #4b4a4a;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 100%;
  font-size: 17pt;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.btn-favorite.selected {
  background-color: #ffd849;
  color: #4b4a4a;
}

.btn-favorite.selected:hover {
  background-color: #e7b501;
}

.favorite-item {
  cursor: pointer;
  text-align: center;
}

.favorite-item:hover {
  background-color: #d5d5d5;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modals-content {
  width: 40%;
  max-width: 600px; /* 최대 너비 설정 */
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
  /* height 자동 조정 */
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>