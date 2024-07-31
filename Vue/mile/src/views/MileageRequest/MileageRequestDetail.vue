<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 요청</h2>
    <div style="padding: 0 5%">
      <div>
        <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
          마일리지 수정
        </h3>
        <div
          class="p-2"
          style="
            text-align: left;
            background-color: #f6f6f6;
            padding: 10px 140px 60px 140px !important;
          "
        >
          <div class="mt-5" style="text-align: left">마일리지 이름</div>
          <input
            v-model="mileageName"
            type="text"
            class="input-base input-white"
            style="width: 800px; text-align: left"
            readonly
          /><br />

          <div class="mt-3" style="text-align: left">기타사항</div>
          <textarea
            v-model="additionalNotes"
            class="input-base input-white"
            style="width: 800px; height: 200px; text-align: left"
            placeholder="기타 요청사항을 입력하세요."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MileageRequestDetail',

  data() {
    return {};
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },

  mounted() {},
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
  height: auto;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  top: -5px; /* 위치를 살짝 위로 올립니다 */
}

.checkbox-container input[type='radio'] {
  display: none; /* 기본 라디오 버튼을 숨깁니다 */
}

.checkbox-container .custom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.checkbox-container input[type='radio']:checked + .custom-checkbox {
  background-color: #f6a319; /* 체크된 상태일 때 배경색 변경 (노란색) */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.checkbox-container input[type='radio']:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  margin-left: 10px; /* 체크박스와 텍스트 사이 간격 */
  font-family: 'KB_S5', sans-serif;
  font-size: 20px;
}

.button-container {
  display: flex;
  align-items: center;
  padding-left: 10px;
  flex: 1;
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border-radius: 8px;
  padding: 5px 10px;
  color: #5b5b5b;
  font-size: 18px;
  cursor: pointer;
  margin-top: 0;
  font-family: 'KB_S5', sans-serif;
}

.back-button .arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 8px;
  font-size: 17px;
  font-family: 'KB_S5', sans-serif;
}
</style>
