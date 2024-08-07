<!--🚨마일리지 관리자 :  마일리지 목표설정 화면-->
<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">목표 설정</h2>
    <div class="d-flex justify-content-end mr-5">
      <button class="btn-green target-btn" @click="openModal">목표 등록하기</button>
    </div>
    <!-- 현재 진행중인 마일리지 목표 -->
    <div class="mileage-goals-container">
      <h3 class="mileage-goals-title">현재 진행중인 마일리지 목표</h3>
      
      <div v-if="currentTargets.length > 0" class="goals-list">
        <div v-for="(target, index) in currentTargets" :key="index" class="goal-card">
          <div class="goal-info">
            <span class="goal-date">📅 {{ target.start_date }} ~ {{ target.end_date }}</span>
            <span class="goal-mileage">🎯 {{ target.target_mileage }} 마일리지 목표</span>
            <span class="goal-rate">✨ {{ target.targetRate }}% 달성</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: target.targetRate + '%' }"></div>
          </div>
        </div>
      </div>
      
      <div v-else class="no-goals">
        <p class="lg2">현재 진행중인 목표가 없습니다.</p>
      </div>
    </div>
    
    <!-- 예정된 마일리지 목표 내역 -->
    <div style="width:90%;" class="mx-auto mt-5">
      <h3 class="lg p-3 ml-5" style="text-align: left; font-family: 'KB_S4'; font-size: 18pt;">예정된 마일리지 목표 내역</h3>
      <div v-for="detail in futureTargets" :key="detail.target_no" class="cards card-red mx-auto m-3 pointer" style="width: 90%; height: 6vh;">
        <div class="d-flex justify-content-evenly pr-3 pl-3">
          <span class=" target-list">목표기간: {{ detail.start_date }} ~ {{ detail.end_date }}</span>
          <span class=" target-list">목표 마일리지: {{ detail.target_mileage }}</span>
        </div>
      </div>
    </div>

    <!-- 지난 마일리지 목표 내역 -->
    <div style="width:90%;" class="mx-auto mt-5">
      <h3 class="lg p-3 ml-5" style="text-align: left; font-family: 'KB_S4'; font-size: 18pt;">지난 마일리지 목표 내역</h3>
      <div v-for="detail in pastTargets" :key="detail.target_no" class="cards card-gray mx-auto m-3 pointer" style="width: 90%; height: 6vh;">
        <div class="d-flex justify-content-between pr-3 pl-3">
          <span class=" target-list">목표기간: {{ detail.start_date }} ~ {{ detail.end_date }}</span>
          <span class=" target-list">목표 마일리지: {{ detail.target_mileage }}</span>
          <span class=" target-list">달성률: {{ detail.targetRate }}%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ mile_name }} 목표 등록하기</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>목표 기간</label>
          <div class="date-range">
            <Datepicker v-model="startDate" :format="formatDate" placeholder="시작일"></Datepicker>
            <span class="date-separator">~</span>
            <Datepicker v-model="endDate" :format="formatDate" placeholder="종료일"></Datepicker>
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
import { mapActions, mapGetters } from 'vuex';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'TargetMileageAdminView',
  components: {
    Datepicker,
  },
  data() {
    return {
      isModalOpen: false,
      startDate: null,
      endDate: null,
      targetScore: 0,
      mile_name: '',
    }
  },
  computed :{ // 데이터를 가공하는 곳. 
    ...mapGetters('mile', ['getMileInfo', 'getArrayMiles']),
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getTargets']),
    targets() {
      return this.getTargets || [];
    },
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    formattedTargets(){
      if(!this.targets) return [];
      return this.targets.map(target => {
        const startDate = new Date(target.start_date);
        const endDate = new Date(target.end_date);

        return{
            ...target, // ...은 복사의 의미 
          targetRate: target.achievement_rate,
          startDate,
          endDate
        }
      }
    );
    },
    currentTargets(){
      const currentDate =new Date();
      currentDate.setHours(0, 0, 0, 0);
      
      return this.formattedTargets.filter(target =>
        target.startDate <= currentDate && currentDate <= target.endDate
      );
    },
    pastTargets() {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return this.formattedTargets.filter(target =>
        target.endDate < currentDate
      );
    },
    futureTargets() {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return this.formattedTargets.filter(target =>
        target.startDate > currentDate
      );
    }
  },
  methods: {
  ...mapActions('mile', ['fetchMileInfo']),
  ...mapActions('mileage', ['addTarget', 'fetchMileTarget']),
    async addAction() {
      const targetInfo = {
        mile_no: this.loginInfo.mile_no,
        user_no: this.loginInfo.user_no,
        start_date: this.formatDate(this.startDate),
        end_date: this.formatDate(this.endDate),
        target_mileage: this.targetScore,
      }

      const response = await this.addTarget(targetInfo);

      if(response && response.data.success){
        this.showAlert('목표가 등록되었습니다', 'success', '#');
      }else{
        this.showAlert('목표 등록에 실패했습니다', 'fail', '#');
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    showAlert(t, i, r) {
      this.$swal({
        title: t,
        icon: i,
        scrollbarPadding: false
      }).then((result) => {
        if(result.isConfirmed){
          if(r == '#'){
            location.reload(); // 현재 페이지 새로고침
          }else{
            this.$router.push(r);
          }
        }
      })
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  async created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      await this.fetchMileInfo(user_no);
      const mileInfo = this.getMileInfo;
      if(mileInfo){
        this.mile_name = mileInfo.mile_no;
      }else{
        console.error('마일리지 이름을 가져올 수 없습니다.');
      }
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }

    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    if (mile_no) {
      try {
        await this.fetchMileTarget(mile_no);
      } catch (error) {
        console.error('마일리지 목표 리스트를 가져오는 중 오류 발생:', error);
      }
    } else {
      console.error('mile_no가 유효하지 않습니다.');
    }
  },
 
};
</script>

<style scope>
.page-back {
  width: 70%;
  height: 140%;
  /* height: 800px; */
  margin-top: 5%;
}

.target-btn {
  width: 9vw;
  height: 6vh;
  font-weight: bold;
  font-size: 15pt;
}

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
  margin-bottom: 8px;
  font-weight: bold;
  text-align: left;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 8px;
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
  padding: 10px 25px;
  font-size: 14pt;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
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

.target-list {
  font-family: 'KB_C3';
  font-size: 14pt;
}

.cur-target-list {
  font-family: 'KB_S5';
  font-size: 18pt;
}

.pointer {
  transition: transform 0.3s ease;
}

.pointer:hover {
  transform: scale(1.02); /* 호버 시 크기를 1.02배로 확대 */
}

.mileage-goals-container {
  width: 90%;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mileage-goals-title {
  font-family: 'KB_S4', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 2.5rem;
  text-align: left;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.goal-card {
  background-color: #FFF9EB;
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.2s ease-in-out;
}

.goal-card:hover {
  transform: translateY(-3px);
}

.goal-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.3rem;
  
}

.goal-mileage, .goal-rate {
  background-color: #FFE082;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-family: 'KB_S5';
  font-size: 16pt;
}

.goal-date {
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-family: 'KB_S5';
  font-size: 14pt;
}

.progress-container {
  height: 20px;
  background-color: #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #FFCA05;
  transition: width 0.5s ease-in-out;
}

.no-goals {
  text-align: center;
  padding: 2rem;
  background-color: #F5F5F5;
  border-radius: 8px;
}
</style>