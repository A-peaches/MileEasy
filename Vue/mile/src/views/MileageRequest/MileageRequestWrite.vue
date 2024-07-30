<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 요청</h2>
    <div style="padding: 0 5%">
      <div style="text-align: left; margin-left: 25px; display: flex">
        <label class="checkbox-container">
          <input
            type="radio"
            name="action"
            value="add"
            v-model="selectedAction"
          />
          <span class="custom-checkbox"></span>
          <span class="checkbox-label">추가</span>
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

      <div class="p-4">
        <!-- 조건부 렌더링 -->
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
  },
  methods: {
    handleCheckboxChange() {
      // 체크박스 상태 변경 처리
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
.btn-yellow {
  width: 120px;
  height: 40px;
}
.top1 {
  font-weight: bold;
  font-size: 16pt;
  background-color: #66c52f;
  border-radius: 16px;
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

@import url('C: \MileEasy\Vue\mile\src\assets\css\css.css');
</style>
