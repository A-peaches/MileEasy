<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px">
    <p class="text-left lg2 KB_C2">즐겨찾기 마일리지</p>
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
        <p  class="favorite-text KB_C2">
            {{ favoriteList[index - 1].mile_no }} 마일리지
        </p>

          <div class="flex">
            <div class="KB_C1 mx-auto" style="font-size: 30pt; margin-bottom: 40px; margin-top: 5px;">
              10 / {{ getMileageMax(favoriteList[index - 1].mile_no) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <!-- 두 번째 줄: 최대 2개의 카드 표시 -->
      <div v-for="index in 2" :key="index + 2" class="cards favorite-card ">
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
            <div class="KB_C1 mx-auto" style="font-size: 30pt;  margin-bottom: 40px; margin-top: 5px;">
              10 / {{ getMileageMax(favoriteList[index + 1].mile_no) }}
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- 모달 -->
        <div v-if="isModalOpen" class="modals">
      <div class="modals-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>모달 내용</p>
      </div>
    </div>
  </div>



</template>
  
  <script>
import { mapGetters } from "vuex";

export default {
  name: "FavoriteCom",
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters("mileage", ["getArrayMileage"]),
    ...mapGetters("favorite", ["getArrayFavorite"]),
    ...mapGetters("login", ["getLoginInfo"]),

    mileageInfo() {
      return this.getArrayMileage;
    },
    favoriteList() {
      return this.getArrayFavorite;
    },
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    getMileageMax(mileNo) {
      const mileage = this.getArrayMileage.find((m) => m.mile_name === mileNo);
      return mileage.mile_max != 0 ? mileage.mile_max : "-";
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  watch: {
    loginInfo(newLoginInfo) {
      if (newLoginInfo) {
        this.$store.dispatch("favorite/getFavorite", newLoginInfo.user_no);
      }
    },
  },
  created() {
    this.$store.dispatch("mileage/getMileage");
    if (this.loginInfo) {
      this.$store.dispatch("favorite/getFavorite", this.loginInfo.user_no);
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

</style>
  