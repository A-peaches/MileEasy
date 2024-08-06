<template>
  <div>
    <!-- 완료(오늘날짜 지난것) / 미완료 필터링 -->
    <div class="d-flex justify-content-start align-items-center mb-5" style="margin-left: 5%;">
      <div class="form-check p-3 lg2 mr-3">
        <input class="form-check-input" type="radio" name="targetList" id="finished" value="finished" v-model="sortBy" />
        <label class="form-check-label" for="finished">
          완료
        </label>
      </div>
      <div class="form-check p-3 lg2">
        <input class="form-check-input" type="radio" name="targetList" id="notFinished" value="not-finished" v-model="sortBy" >
        <label class="form-check-label" for="notFinished">
          미완료
        </label>
      </div>
    </div>
    <div class="row">
      <div v-for="(mileage, index) in filteredMileages" :key="mileage.mile_no" class="col-md-4 mb-3">
        <div class="p-3">
          <div style="text-align: center; font-family: KB_C2; font-size: 16pt;" class="mb-2">{{ mileage }} 마일리지</div>
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 250px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box">
            <!-- 여기 하드코딩 한 부분 데이터 불러오기!! -->
            <div class="py-4">
              <span class="lg2" style="font-family: 'KB_C1';">목표기간</span><br>
              <span class="md">2024.08.06 - 2024.08.17</span>
            </div>
            <div class="py-3">
              <span class="lg2" style="font-family: 'KB_C1';">목표 마일리지</span><br>
              <span class="lg2">20</span>
            </div>
            <div class="py-3">
              <span class="bold-x-lg" style="font-family: 'KB_C1';">12 / 20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center" style="margin-top: 12vh;">
    <button
      class="btn-green mt-2 KB_C2"
      @click="openModal"
      style="
        width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;
      "
    >
      추가하기
    </button>
  </div>

  <!-- 모달 -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">개인별 목표 설정하기</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="mileage-select">목표 마일리지</label>
          <div class="select-wrapper">
            <select id="mileage-select" class="form-select">
              <option v-for="label in labels" :key="label" :value="label">{{ label.mile_name }}</option>
            </select>
            <i class="bi bi-caret-down-fill select-icon"></i>
          </div>
        </div>
        <div class="form-group">
          <label>목표 기간</label>
          <div class="date-range">
            <Datepicker v-model="startDate" :format="formatDate" placeholder="시작일" />
            <span class="date-separator">~</span>
            <Datepicker v-model="endDate" :format="formatDate" placeholder="종료일" />
          </div>
        </div>
        <div class="form-group">
          <label for="mileage-score">목표 마일리지 점수</label>
          <input type="number" id="mileage-score" v-model="targetScore" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="submit-button" @click="addAction">등록</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import api from '@/api/axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "PersonalTarget",
  components: {
    Datepicker,
  },
  data() {
    return {
      backgroundColors: ["#F4FBF2", "#F3FBFE", "#F5F5FF", "#FFF2FD", "#F4F4F4", "#FDF5F5", "#FBF4EE", "#FCFBF1"],
      mileages: ["HRD", "HRD", "리그테이블"], // 개인별 목표 db에서 가져오기 
      isModalOpen: false,
      labels:[],
      startDate: null,
      endDate: null,
      targetScore: 0,
      sortBy: "not-finished", // 미완료 필터링 기본 값
    };
  },
  methods: {
    async fetchMileages() {
        // 마일리지 카테고리 가져오기
      try {
          const response = await api.get(
          'http://localhost:8090/notice/mileage'
          );
          this.labels = response.data;
      } catch (error) {
          console.error(
          'Error fetching mileages:',
          error.response ? error.response.data : error.message
          );
      }
    },
    handleCheckboxChange(sortType) {
      if (sortType === 'finished' && this.sortByFin) {
        this.sortByNotFin = false;
      } else if (sortType === 'not-finished' && this.sortByNotFin) {
        this.sortByFin = false;
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  created() {
    this.fetchMileages();
  },
  computed: {
    // 여기서 완료/미완료 필터링 처리하면 됨!

    // filteredMileages() {
    //   if(this.sortBy === "finished"){
    //     return this.mileages.filter(item => /* 완료 조건: 오늘날짜 지난 것들 */);
    //   }else if(this.sortBy === "not-finished"){
    //     return this.mileages.filter(item => /* 미완료 조건 */);
    //   }else{
    //     return this.mileages;
    //   }
    // }
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem; /* 하단 여백 추가 */
}
.target-box:hover {
  transform: scale(1.05); /* 호버 시 크기를 1.05배로 확대 */
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  /* border-bottom: 1px solid #e0e0e0; */
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.date-range {
  display: flex;
  align-items: center;
}

.date-separator {
  margin: 0 10px;
}

.modal-footer {
  padding: 20px;
  text-align: center;
  /* border-top: 1px solid #e0e0e0; */
}

.submit-button {
  background-color: #ffca05;
  color: #4b4a4a;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
}

.submit-button:hover {
  background-color: #edbb00;
}

.select-wrapper {
  position: relative;
}

.form-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2rem; /* 아이콘을 위한 여백 */
}

.select-icon {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* 아이콘이 선택을 방해하지 않도록 */
}

.form-check-input:checked {
  background-color: #32ab8b;
  border-color: #32ab8b;
}

.form-check-input:checked::before {
  color: #fff; /* 체크 마크 색상 */
}
</style>