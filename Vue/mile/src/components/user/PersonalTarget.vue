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
          진행중
        </label>
      </div>
    </div>

    <!-- 목표가 없는 경우 메시지 표시 -->
    <div v-if="filteredMileages.length === 0" class="text-center mb-4" style="color: gray;">
      진행 중인 목표가 없습니다.
    </div>

    <div class="row">
      <div v-for="(targets, index) in filteredMileages" :key="targets.mile_no" class="col-md-4 mb-3">
        <div class="p-3">
          <div style="text-align: center; font-family: KB_C2; font-size: 16pt;" class="mb-2">{{ targets.mile_name }} 마일리지</div>
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 250px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box">
            <!-- 여기 하드코딩 한 부분 데이터 불러오기!! -->
            <div class="py-4">
              <span class="lg2" style="font-family: 'KB_C1';">목표기간</span><br>
              <span class="md">{{ targets.start_date }} - {{ targets.end_date }}</span>
            </div>
            <div class="py-3">
              <span class="lg2" style="font-family: 'KB_C1';">목표 마일리지</span><br>
              <span class="lg2">{{targets.target_mileage}}</span>
            </div>
            <div class="py-3">
              <span class="bold-x-lg" style="font-family: 'KB_C1';">{{ targets.achievementRate }} / {{targets.target_mileage }}</span>
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
            <select  v-model="selectedLabel" id="mileage-select" class="form-select">
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
import {mapState, mapGetters, mapActions } from "vuex";
import api from '@/api/axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {

//====================================================================
  name: "PersonalTarget", //컴포넌트의 이름
  emits: ['dataLoaded'], // 이 이벤트를 컴포넌트에서 처리함을 선언
//====================================================================
  components: { 
    Datepicker, //이 컴포넌트가 사용할 하위 컴포넌트
  },

//====================================================================
  data() { //컴포넌트의 반응형 상태를 정의,컴포넌트의 메서드나 계산된 속성에서 참조
    return {
      backgroundColors: ["#F4FBF2", "#F3FBFE", "#F5F5FF", "#FFF2FD", "#F4F4F4", "#FDF5F5", "#FBF4EE", "#FCFBF1"],
      // mileages: [], // 초기 데이터 배열 
      isModalOpen: false,
      labels:[],
      selectedLabel: null,
      startDate: null,
      endDate: null,
      targetScore: 0,
      sortBy: "not-finished", // 미완료 필터링 기본 값
    };
  },

//===================================================================
  methods: {  //컴포넌트에서 수행할 함수
    ...mapActions('target',['addTarget','fetchTargets']),

    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo;
    },
    async fetchMileages() {  // 마일리지 카테고리 가져오기
      try {
          const response = await api.get(
          'http://localhost:8090/notice/mileage'
          );
          console.log('fetchMileages 메소드 :', response.data); // 응답 데이터를 콘솔에 출력
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
    async addAction() {
      const target = {
        mileNo: this.selectedLabel.mile_no,
        userNo: this.loginInfo.user_no, // 유저 아이디를 적절히 변경
        startDate: this.startDate,
        endDate: this.endDate,
        targetMileage: this.targetScore,
        isTogether: false,
        isManagerPlan: false,
        month: new Date().getMonth() + 1, //1~12월 범위를 맞추기 위해서
        achievementRate: 0 //목표 달성률
      };
      console.log('target이 서버로 데이터 넘기는 것 :',target);
      try {
        await this.addTarget(target);
        this.closeModal();
      } catch (error) {
        console.error('Error adding target:', error.response ? error.response.data : error.message);
      }
    },
  },
    
//====================================================================
  created() { //컴포넌트가 생성될 때 실행되는 훅
    console.log('targer loginInfo 이 찍히나요 ?:', this.loginInfo);
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('isChecked:', this.isChecked);
    // const userNo = this.loginInfo.user_no;
    this.fetchMileages();
    this.fetchTargets(this.loginInfo.user_no).then(() => {
    console.log('Targets after fetch:', this.getTargets); 
  });
  },

//=====================================================================
  computed: { //감시자 데이터가 변경될 때 자동으로 다시 계산
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapState('login', ['loginInfo']),
    ...mapGetters('target',['getTargets']),

    targets(){
      const targets = this.getTargets;
      console.log('Targets:', targets);
      return Array.isArray(targets) ? targets : []; // 배열이 아니면 빈 배열을 반환
    },

    filteredMileages() {
    const currentDate = new Date();
    return this.targets.filter((mileage) => {
      if (!mileage || !mileage.end_date) { // end_date가 없으면 경고 메시지를 출력
        console.warn('Skipping mileage due to missing endDate:', mileage);
        return false;
      }

      // end_date를 Date 객체로 변환
      const endDate = new Date(mileage.end_date);

      if (isNaN(endDate.getTime())) {
        console.warn('Invalid date format in endDate:', mileage.end_date);
        return false; // 날짜 형식이 유효하지 않으면 제외
      }

      if (this.sortBy === 'finished') {
        return endDate < currentDate;
      } else if (this.sortBy === 'not-finished') {
        return endDate >= currentDate;
      } else {
        return true;
      }
    });
  },
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