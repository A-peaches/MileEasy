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
        <span class="goal-mileage">🎯 목표: {{ target.target_mileage }} 마일리지</span>
        <span class="goal-rate">✨ 달성률: {{ target.targetRate }}%</span>
      </div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: target.targetRate + '%' }"></div>
      </div>
    </div>
  </div>
  
  <div v-else class="no-goals">
    <p>현재 진행중인 목표가 없습니다.</p>
    <button class="create-goal-btn">새 목표 만들기</button>
  </div>
</div>
    <!-- <div style="width:90%; height: 40vh; margin-top: 4%; margin-bottom: 10%;" class="mx-auto">
      <h3 class="lg p-3 ml-5" style="text-align: left; font-family: 'KB_S4'; font-size: 18pt;">현재 진행중인 마일리지 목표</h3>
      <div v-if="currentTargets.length>0" >
        <div v-for="(target, index) in currentTargets" :key="index" class="cards mx-auto my-3 pointer" style="height: 100%; width: 90%; background-color: #FFF9EB">
          <div class="d-flex justify-content-between pr-3 pl-3">
            <span class="cur-target-list">목표기간: {{ target.start_date }} ~ {{ target.end_date }}</span>&nbsp;
            <span class="cur-target-list">목표 마일리지: {{ target.target_mileage }}</span>&nbsp;
            <span class="cur-target-list">달성률: {{ target.targetRate }}%</span>
          </div>
          <div class="progress mx-auto mt-3" role="progressbar" aria-label="Animated striped example" :aria-valuenow="target.targetRate" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">
            <div class="progress-bar progress-bar-striped progress-bar-animated " :style="{width: target.targetRate + '%', backgroundColor: '#ffca05'}"></div>
          </div>
        </div>
      </div>
      <div v-else class="cards card-lemon mx-auto" style="height: 90%; width: 80%;">
        <div class="d-flex justify-content-center align-items-center lg2" style="height: 100%;">
          현재 진행중인 목표가 없습니다.
        </div>
      </div>
    </div> -->
    <!-- 지난 마일리지 목표 내역 -->
    <div style="width:90%;" class="mx-auto mt-5">
      <h3 class="lg p-3 ml-5" style="text-align: left; font-family: 'KB_S4'; font-size: 18pt;">지난 마일리지 목표 내역</h3>
      <div v-for="detail in pastTargets" :key="detail.month" class="cards card-gray mx-auto m-3 pointer" style="width: 90%; height: 6vh;">
        <div class="d-flex justify-content-between pr-3 pl-3">
          <span class=" target-list">목표기간: {{ detail.start_date }} ~ {{ detail.end_date }}</span>&nbsp;
          <span class=" target-list">목표 마일리지: {{ detail.target_mileage }}</span>&nbsp;
          <span class=" target-list">달성률: {{ detail.targetRate }}%</span>
        </div>
      </div>
    </div>
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
      targets: [
        {
          month: '07',
          start_date: '2024-07-01',
          end_date: '2024-07-31',
          target_mileage: 50,
          is_together: 1,
          is_manager_plan: 1,
          overall_avg: 36
        },
        {
          month: '06',
          start_date: '2024-06-01',
          end_date: '2024-06-30',
          target_mileage: 40,
          is_together: 1,
          is_manager_plan: 1,
          overall_avg: 22
        },
        {
          month: '08',
          start_date: '2024-08-01',
          end_date: '2024-08-31',
          target_mileage: 40,
          is_together: 1,
          is_manager_plan: 1,
          overall_avg: 22
        },
        {
          month: '08',
          start_date: '2024-08-01',
          end_date: '2024-09-15',
          target_mileage: 40,
          is_together: 1,
          is_manager_plan: 1,
          overall_avg: 10
        },
        {
          month: '08',
          start_date: '2024-08-16',
          end_date: '2024-08-31',
          target_mileage: 40,
          is_together: 1,
          is_manager_plan: 1,
          overall_avg: 10
        }
      ]
    }
  },
  computed :{ // 데이터를 가공하는 곳. 
    ...mapGetters('mile', ['getMileInfo', 'getArrayMiles']),
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    formattedTargets(){
      return this.targets.map(target => {
        const startDate = new Date(target.start_date);

        return{
            ...target, // ...은 복사의 의미 
          targetRate: ((target.overall_avg/target.target_mileage)*100).toFixed(2),
          month: String(startDate.getMonth()+1).padStart(2, '0'),
          year: startDate.getFullYear(),
        }
      }
    );
    },
    currentTargets(){
      const currentDate =new Date();
      const currentMonth = String(currentDate.getMonth()+1).padStart(2, '0');
      const currentYear = currentDate.getFullYear();
      
      const targets = this.formattedTargets.filter(target =>
        target.month === currentMonth && target.year === currentYear
      );
      
      return this.targets.length>0 ? targets : [];
    },
    pastTargets() {
      const currentMonth = String(new Date().getMonth()+1).padStart(2, '0'); // JavaScript에서 월은 0부터 시작하므로 +1 필요
      const currentYear = new Date().getFullYear();

      return this.formattedTargets.filter(target => target.month !== currentMonth || target.year !== currentYear);
    }
  },
  methods: {
  ...mapActions('mile', ['fetchMileInfo']),
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
  font-size: 16pt;
}

.goal-date, .goal-mileage, .goal-rate {
  background-color: #FFE082;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-family: 'KB_S5';
}

.progress-container {
  height: 20px;
  background-color: #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 90%;
  background-color: #FFCA05;
  transition: width 0.5s ease-in-out;
}

.no-goals {
  text-align: center;
  padding: 2rem;
  background-color: #F5F5F5;
  border-radius: 8px;
}

.create-goal-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #FFCA05;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-goal-btn:hover {
  background-color: #FFC107;
}
</style>