<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px">
    <p class="text-left lg2 KB_C2">
      즐겨찾기 마일리지&nbsp;&nbsp;
      <i class="bi bi-plus-circle-fill" style="color: #ffca05; cursor: pointer" @click="openModal"></i>
    </p>
    <div class="flex">
      <div v-for="(item, index) in 4" :key="index" class="cards favorite-card">
        <img v-if="!favoriteList[index]" src="@/assets/img/add.png" class="addImg mx-auto" @click="openModal" />
        <div v-else>
          <p class="favorite-text KB_C2">{{ favoriteList[index].mile_no }} 마일리지</p>
          <div class="flex">
            <div class="KB_C1 mx-auto" style="font-size: 30pt; margin-bottom: 40px; margin-top: 5px">
              {{ getMileageScore(favoriteList[index]?.mile_no) }}pt
            </div>
            <div v-if="hasMileageData(favoriteList[index].mile_no)" class="chart-container">
              <canvas :id="'chart' + index" :ref="'chart' + index"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modals">
      <div class="modals-content" style="width: 40%; height: 45%; background-color: #f9f9f9">
        <span class="close" @click="closeModal">&times;</span>
        <div>
          <p class="text-left fw-bold mb-3" style="font-size: 19pt">즐겨찾기 추가하기</p>
          <div class="favorite-options">
            <div
              v-for="(item, index) in mileageInfo"
              :key="index"
              class="btn-favorite favorite-item KB_C2"
              :class="{ selected: selectedFavorites.includes(item.mile_name) }"
              @click="toggleFavorite(item.mile_name)"
            >
              {{ item.mile_name }}
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn-gray mt-3 KB_C2" @click="updateFavorites" style="font-size: 16pt; width: 20%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Chart from "chart.js/auto";

export default {
  name: "FavoriteCom",
  data() {
    return {
      isModalOpen: false,
      selectedFavorites: [],
      charts: [],
    };
  },
  computed: {
    ...mapGetters("mileage", ["getArrayMileage"]),
    ...mapGetters("favorite", ["getArrayFavorite"]),
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters("mileScore", ["getArrayMileScore"]),
    mileageInfo() {
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
      return this.mileScores.some((m) => m.mile_no === mileNo);
    },
    openModal() {
      this.isModalOpen = true;
      this.selectedFavorites = this.favoriteList.map((fav) => fav.mile_no);
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleFavorite(mileName) {
      if (this.selectedFavorites.includes(mileName)) {
        this.selectedFavorites = this.selectedFavorites.filter((name) => name !== mileName);
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
        if (this.charts[index]) {
          this.charts[index].destroy();
        }
        const ctx = canvas.getContext("2d");
        this.charts[index] = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["전월", "당월"],
            datasets: [
              {
                label: `마일리지 ${mileNo}`,
                data: [score - 10, score],
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
              },
            },
          },
        });
        console.log("Chart created for index:", index);
      } else {
        console.warn(`Canvas element with id ${chartId} not found or does not support getContext.`);
      }
    },
    async renderCharts() {
      console.log("Rendering charts...");
      for (let index = 0; index < this.favoriteList.length; index++) {
        const fav = this.favoriteList[index];
        const scoreObj = this.mileScores.find((m) => m.mile_no === fav.mile_no);
        if (scoreObj) {
          await this.createChart(index, fav.mile_no, scoreObj.mile_score_point);
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
    console.log("FavoriteCom mounted");
    if (this.loginInfo) {
      await this.$store.dispatch("mileage/getMileage");
      await this.$store.dispatch("favorite/getFavorite", this.loginInfo.user_no);
      await this.$store.dispatch("mileScore/getMileScore", this.loginInfo.user_no);
      console.log("mileScores after fetch:", this.mileScores);
      await this.renderCharts();
    }
  },
  created() {
    console.log("FavoriteCom created");
  },
};
</script>

<style>
.flex {
  display: flex;
  justify-content: space-between; /* 자식 요소들 간의 공간을 균등하게 배치 */
  flex-wrap: wrap; /* 줄바꿈을 허용 */
}

.favorite-card {
  width: 48%; /* 두 개의 카드가 한 줄에 표시되도록 50% 이하로 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  height: 160px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px; /* 카드 간격 조절 */
}

.addImg {
  width: 18%;
}

.addImg:hover {
  width: 20%;
  cursor: pointer;
}

.favorite-text {
  text-align: left !important;
  padding: 10px;
  margin: 0; /* 기본 여백 제거 */
  width: 100%; /* 필요에 따라 추가 */
  align-self: flex-start; /* 부모가 flex 컨테이너일 때 왼쪽 정렬 */
}

.chart-container {
  position: relative;
  height: 100px; /* 원하는 높이로 조절 */
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
</style>
