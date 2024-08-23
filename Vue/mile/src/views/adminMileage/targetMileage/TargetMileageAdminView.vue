<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">목표 관리</h2>
    
    <div class="menu-and-filters">
      <!-- 탭 메뉴 -->
      <div class="tab-menu">
        <button @click="currentTab = 'all'" :class="{ active: currentTab === 'all' }">전체</button>
        <button @click="currentTab = 'ongoing'" :class="{ active: currentTab === 'ongoing' }">진행 중</button>
        <button @click="currentTab = 'completed'" :class="{ active: currentTab === 'completed' }">종료</button>
      </div>

      <!-- 검색 필터 -->
      <div class="search-filters">
        <input type="date" v-model="searchStartDate" @change="filterTargets" placeholder="시작 날짜">
        <input type="date" v-model="searchEndDate" @change="filterTargets" placeholder="종료 날짜">
        <select v-model="searchStatus" @change="filterTargets">
          <option value="">모든 상태</option>
          <option value="ongoing">진행 중</option>
          <option value="scheduled">예정</option>
          <option value="completed">종료</option>
        </select>
      </div>
    </div>

    <div class="d-flex justify-content-end mr-5">
      <div class="target" @click="openModal">+ 새로운 목표 📝</div>
    </div>

    <div v-if="filteredTargets.length > 0" class="goals-list">
      <div v-for="(target, index) in filteredTargets" :key="index" class="goal-card">
        <div class="goal-info" @click="toggleExpand(index)">
          <span class="goal-date">📅 {{ target.start_date }} ~ {{ target.end_date }}</span>
          <span class="goal-mileage">🎯 {{ target.target_mileage }} 마일리지 목표</span>
          <span class="goal-status">{{ getStatusText(target) }}</span>
          <span class="goal-rate">✨ {{ target.targetRate }}% 달성</span>
          <span class="dropdown" :class="{ expanded: expandedTargets.includes(target.target_no) }"></span>
        </div>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: target.targetRate + '%' }"></div>
        </div>
        <div v-show="expandedTargets.includes(target.target_no)" class="goal-details">
          <!-- 추가 상세 정보를 여기에 넣을 수 있습니다 -->
           <div style="margin-top: 40px;">
          <!-- 참가자 목록 -->
            <!-- <div v-if="participants && participants.length > 0">
              <div v-for="(participant, index) in participants" :key="index" class="participant-card">
                <p style="font-size: 16px; font-family: 'KB_C2', sans-serif;">
                  직원 번호: {{ participant.user_no }}
                </p>
                <p style="font-size: 16px; font-family: 'KB_C2', sans-serif;">
                  현재 마일리지 : {{ participant.current_mileage_score }}
                  달성률: {{participant.achievementRate}}%
                </p>
              </div>
            </div> -->
            <span style="font-family: 'KB_C2', sans-serif; font-size: 18px;"> 참가자 수 : </span>
            <i class="bi bi-person-fill-check" style="color: #8c8c8c; font-size: 25px"></i> 
            <i class="bi bi-person-fill-x" style="color: #cf2222; font-size: 25px"></i>
            <i class="bi bi-envelope-check-fill" style="color: #8c8c8c; font-size: 25px"></i>
            <span style="font-family: 'KB_C2', sans-serif; font-size: 17px;"> 문자발송 </span>

          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>참가자가 없습니다.</p>
    </div>
  </div>

  <!-- 모달 (기존 코드 유지) -->
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
      currentTab: 'all',
      searchStartDate: '',
      searchEndDate: '',
      searchStatus: '',
      expandedTargets: [],
      participants: [] // 참가자 데이터를 저장할 배열
    }
  },
  computed: {
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
          ...target,
          targetRate: target.achievementRate,
          startDate,
          endDate,
          expanded: false
        }
      });
    },
    filteredTargets() {
      let targets = this.formattedTargets;
      
      // 탭 필터링
      if (this.currentTab === 'ongoing') {
        targets = targets.filter(t => this.isOngoing(t) || this.isScheduled(t));
      } else if (this.currentTab === 'completed') {
        targets = targets.filter(t => this.isCompleted(t));
      }

       // 날짜 검색 수정
       if (this.searchStartDate && this.searchEndDate) {
        const startDate = new Date(this.searchStartDate);
        const endDate = new Date(this.searchEndDate);
        targets = targets.filter(t => {
          const targetStart = new Date(t.start_date);
          const targetEnd = new Date(t.end_date);
          return targetStart >= startDate && targetEnd <= endDate;
        });
      }

      // 상태 검색
      if (this.searchStatus) {
        targets = targets.filter(t => {
          if (this.searchStatus === 'ongoing') return this.isOngoing(t);
          if (this.searchStatus === 'scheduled') return this.isScheduled(t);
          if (this.searchStatus === 'completed') return this.isCompleted(t);
          return true;
        });
      }

      return targets.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo']),
    ...mapActions('mileage', ['addTarget', 'fetchMileTarget', 'targetDelete']),
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
            location.reload();
          }else{
            this.$router.push(r);
          }
        }
      })
    },
    async deleteTarget(target_no) {
      const response = await this.targetDelete(target_no);

      if(response && response.data.success){
        this.showAlert('목표가 삭제되었습니다', 'success', '#');
      }else{
        this.showAlert('목표 삭제에 실패했습니다', 'fail', '#');
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    isOngoing(target) {
      const now = new Date();
      return target.startDate <= now && now <= target.endDate;
    },
    isScheduled(target) {
      const now = new Date();
      return target.startDate > now;
    },
    isCompleted(target) {
      const now = new Date();
      return target.endDate < now;
    },
    getStatusText(target) {
      if (this.isOngoing(target)) return '진행 중';
      if (this.isScheduled(target)) return '예정';
      if (this.isCompleted(target)) return '종료';
      return '알 수 없음';
    },
    filterTargets() {
      // 필터링 로직은 computed 속성에서 처리됩니다.
    },
    toggleExpand(index) {
    const targetId = this.filteredTargets[index].target_no;
    const expandedIndex = this.expandedTargets.indexOf(targetId);
    if (expandedIndex === -1) {
      this.expandedTargets.push(targetId);
      this.loadParticipants(targetId);  // 확장될 때만 참가자 데이터 로드
    } else {
      this.expandedTargets.splice(expandedIndex, 1);
    }
  },
  
  async loadParticipants(targetId) {
  const mileNo = this.loginInfo.mile_no;  // 로그인 정보에서 mile_no 가져오기

  try {
    const response = await this.$store.dispatch('target/loadParticipants', {
      targetNo: targetId,
      mileNo: mileNo
    });

    this.participants = response;
  } catch (error) {
    console.error('참가자 로드 실패:', error);
  }
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

<style scoped>
.delete-wrapper{
  width: 10%;
}

.delete-btn{
  color: #dc3545;
  font-size: 14pt;
  font-family: 'KB_C2';
}

.future-wrapper{
  width: 80%;
}

.page-back {
  padding-bottom: 5%;
}

.target {
  width: 8vw;
  height: 5vh;
  font-weight: bold;
  font-size: 15pt;
  font-family: 'KB_C3', sans-serif;
  margin-bottom: 10px;
  margin-right: 40px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.target-box:hover {
  transform: scale(1.05);
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
}

.submit-button {
  background-color: #ffca05;
  color: #4b4a4a;
  border: none;
  padding: 10px 25px;
  font-size: 14pt;
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
  padding-right: 2rem;
}

.select-icon {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.target-list {
  font-family: 'KB_C2';
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
  transform: translateY(-3px);
}
.mileage-goals-container {
  width: 90%;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mileage-goals-title {
  font-family: 'KB_C2', sans-serif;
  font-size: 20px;
  color: #333;
  /* margin-bottom: 1.5rem; */
  margin-top: 0px;
  text-align: left;
  margin-left: 7%;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.goal-card {
  background-color: #fff8dd;
  border-radius: 8px;
  padding: 1.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.goal-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.goal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.goal-date, .goal-mileage, .goal-status, .goal-rate {
  font-family: 'KB_C2', sans-serif;
  font-size: 18px;
  color: #4b4a4a;
}

.goal-mileage {
  font-weight: bold;
  color: #333;
}

.goal-rate {
  font-weight: bold;
  color: #4285f4;
}

.progress-container {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
  width: 100%;
}

.progress-bar {
  height: 100%;
  background-color: #ffca05;
  transition: width 0.5s ease-in-out;
}

.goal-details {
  overflow: hidden;
  transition: padding 0.3s ease;
  padding: 0 1rem;
}

.goal-details.expanded {
  padding: 1rem;
}

.expand-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}


.menu-and-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
  margin-top: 100px;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.menu-filters {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  width: 85%;
  margin-left: auto;
  margin-right: 65px; /* 오른쪽 정렬 */
}

.tab-menu {
  display: flex;
}

.tab-menu button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  font-family: 'KB_C3', sans-serif; /* 폰트 변경 */
  font-size: 14pt ;
}

.tab-menu button.active {
  background-color: #ffca05;
  color: d9d9d9;
}

.search-filters {
  display: flex;
}

.search-filters input,
.search-filters select {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>