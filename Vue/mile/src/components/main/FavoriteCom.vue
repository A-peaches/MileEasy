<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px">
    <p class="text-left lg2 KB_C2">
      즐겨찾기 마일리지&nbsp;&nbsp;<i
        class="bi bi-plus-circle-fill"
        style="color: #ffca05; cursor: pointer"
        @click="openModal"
      ></i>
    </p>
    <div class="flex">
      <!-- 첫 번째 줄: 최대 2개의 카드 표시 -->
      <div v-for="index in 2" :key="index" class="cards favorite-card">
        <img
          v-if="!favoriteList[index - 1]"
          src="@/assets/img/add.png"
          class="addImg"
          @click="openModal"
        />
        <div v-else>
          <p class="favorite-text KB_C2">
            {{ favoriteList[index - 1].mile_no }} 마일리지
          </p>

          <div class="flex">
            <div
              class="KB_C1 mx-auto"
              style="font-size: 30pt; margin-bottom: 40px; margin-top: 5px"
            >
            {{ getMileageScore(favoriteList[index - 1]?.mile_no) }}pt
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <!-- 두 번째 줄: 최대 2개의 카드 표시 -->
      <div v-for="index in 2" :key="index + 2" class="cards favorite-card">
        <img
          v-if="!favoriteList[index + 1]"
          src="@/assets/img/add.png"
          class="addImg mx-auto"
          @click="openModal"
        />
        <div v-else>
          <p class="favorite-text KB_C2">
            {{ favoriteList[index + 1].mile_no }} 마일리지
          </p>
          <div class="flex">
            <!-- <div
              class="KB_C1 mx-auto"
              style="font-size: 30pt; margin-bottom: 40px; margin-top: 5px"
            >
              10 / {{ getMileageMax(favoriteList[index + 1].mile_no) }}
            </div> -->
            <div
              class="KB_C1 mx-auto"
              style="font-size: 30pt; margin-bottom: 40px; margin-top: 5px"
            >
              {{ getMileageScore(favoriteList[index - 1]?.mile_no) }}pt
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modals">
      <div
        class="modals-content"
        style="width: 40%; height: 45%; background-color: #f9f9f9"
      >
        <span class="close" @click="closeModal">&times;</span>
        <div>
          <p class="text-left fw-bold mb-3" style="font-size: 19pt">
            즐겨찾기 추가하기
          </p>
          <!-- 즐겨찾기 선택 목록 -->
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
            <button
              class="btn-gray mt-3 KB_C2"
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
    </div>
  </div>
</template>
  
<script >
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FavoriteCom",
  data() {
    return {
      isModalOpen: false,
      selectedFavorites: [],
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
      return mileage?.mile_max ?? "-";
    },
    getMileageScore(mileNo) {
      const mileage = this.mileScores.find((m) => m.mile_no == mileNo);
      console.log("쀼", mileNo);
      console.log("쀼쀼", this.mileScores);
      return mileage?.mile_score_point ?? "-";
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
      });
    },
    updateFavorites() {
        this.$store.dispatch("favorite/changeFavorite", {
          user_no: this.loginInfo.user_no,
          favorites: this.selectedFavorites, 
          //서버로 접근하여 DB favorite 업데이트 
        }).then(() => {
        //   this.$store.dispatch("favorite/getFavorite", this.loginInfo.user_no); 
        // 감시자 존재로 재호출 안해도됨, computed..
          this.closeModal();
        });
      console.log(this.selectedFavorites);
      this.closeModal();
    },
  },
  watch: {
    mileScores(newMileScores) {
      console.log("mileScores updated:", newMileScores);
    },
    favoriteList(newFavoriteList) {
      console.log("favoriteList updated:", newFavoriteList);
    },
  },
  created() {
    this.$store.dispatch("mileage/getMileage");
    if (this.loginInfo) {
      this.$store.dispatch("favorite/getFavorite", this.loginInfo.user_no);
      this.$store
        .dispatch("mileScore/getMileScore", this.loginInfo.user_no)
        .then(() => {
          console.log("mileScores after fetch:", this.mileScores);
        });
    }
  },
};
</script>

  
  <style>
.flex {
  display: flex;
  justify-content: space-between; /* 자식 요소들 간의 공간을 균등하게 배치 */
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
  