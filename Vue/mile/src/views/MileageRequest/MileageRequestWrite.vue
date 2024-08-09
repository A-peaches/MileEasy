<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 요청</h2>
    <div style="padding: 0 5%">
      <!-- mile_no가 있을 때만 라디오 버튼 그룹을 표시 -->
      <div
        v-if="hasMileageNumber"
        style="text-align: left; margin-left: 25px; display: flex"
      >
        <label class="checkbox-container">
          <input
            type="radio"
            name="action"
            value="add"
            v-model="selectedAction"
          />
          <span class="custom-checkbox"></span>
          <span class="checkbox-label">요청</span>
        </label>
        <label class="checkbox-container">
          <input
            type="radio"
            name="action"
            value="modify"
            v-model="selectedAction"
          />
          <span class="custom-checkbox"></span>
          <span class="checkbox-label">수정</span>
        </label>
        <label class="checkbox-container">
          <input
            type="radio"
            name="action"
            value="delete"
            v-model="selectedAction"
          />
          <span class="custom-checkbox"></span>
          <span class="checkbox-label">삭제</span>
        </label>
      </div>

      <!-- mile_no가 없을 때 자동으로 WriteAdd 렌더링 -->
      <div v-if="!hasMileageNumber" class="p-4">
        <WriteAdd style="width: 70%; margin-left: 3%" />
      </div>

      <!-- mile_no가 있는 경우 라디오 버튼에 따라 컴포넌트를 렌더링 -->
      <div v-if="hasMileageNumber" class="p-4">
        <WriteAdd
          v-if="selectedAction === 'add'"
          style="width: 70%; margin-left: 3%"
        />
        <WriteModify
          v-if="selectedAction === 'modify'"
          style="width: 70%; margin-left: 3%"
        />
        <WriteDelete
          v-if="selectedAction === 'delete'"
          style="width: 70%; margin-left: 3%"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WriteAdd from '@/components/mileageRequest/MileageRequestWriteAdd';
import WriteModify from '@/components/mileageRequest/MileageRequestWriteModify';
import WriteDelete from '@/components/mileageRequest/MileageRequestWriteDelete';

export default {
  name: 'MileageRequestWrite',
  components: { WriteAdd, WriteModify, WriteDelete },

  data() {
    return {
      selectedAction: 'add', // 초기값을 'add'로 설정하여 '추가'가 기본 선택되도록
    };
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
    },

    hasMileageNumber() {
      // 로그인 정보에서 mile_no가 있는지 확인
      return this.loginInfo && this.loginInfo.mile_no;
    },
  },

  methods: {
    handleCheckboxChange() {
      // 체크박스 상태 변경 처리
    },
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
