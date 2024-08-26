<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3;">목표 관리</h2>
    
    <div class="menu-and-filters">

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
      <div class="target" @click="openModal"> 📝 목표 등록 </div>
    </div>

    <div v-if="filteredTargets.length > 0" class="goals-list">
      <div v-for="(target, index) in filteredTargets" :key="index" class="goal-card">
        <div class="goal-info" @click="toggleExpand(index)">
          <span class="goal-date">📅 {{ target.start_date }} ~ {{ target.end_date }}</span>
          <span class="goal-mileage">🎯 {{ target.target_mileage }} 마일리지 목표</span>
          <span class="goal-status" :class="{ 'status-completed': isCompleted(target),
              'status-ongoing': isOngoing(target),'status-scheduled': isScheduled(target)}">
            {{ getStatusText(target) }}
          </span>
          <span class="goal-rate">✨  
            {{target.totalParticipants > 0 ? Math.round((target.achievedCount / target.totalParticipants) * 100) : 0}}%  달성
          </span>
        </div>
        <div class="progress-container">
          <!-- <div class="progress-bar" :style="{ width: target.totalParticipants > 0 ? 
            Math.round((target.achievedCount / target.totalParticipants) * 100) + '%' : '0%' }">
          </div> -->
          <div class="progress-bar" :style="{ width: animatedWidths[index] + '%' }"></div>
        </div>
        <div v-show="expandedTargets.includes(target.target_no)" class="goal-details">
          <div style="margin-top: 40px;">
            <span style="font-size: 20px; font-family: 'KB_C2', sans-serif; margin-right: 70px;">참가자 {{ target.totalParticipants }} 명</span>
            <i class="bi bi-person-fill-check" style=" color: #19c99b; font-size: 27px; margin-right: 10px;"></i>
            <span style="font-size: 20px;font-family: 'KB_C2', sans-serif; color: #19c99b;">달성 </span>
            <span style="font-size: 20px; font-family: 'KB_C2', sans-serif; color: #19c99b; margin-right: 70px;"> {{ target.achievedCount }} 명</span>
            <i class="bi bi-person-fill-x" style="color:#cf2222; font-size: 27px; margin-right: 10px;"></i>
            <span style="font-size: 20px; font-family: 'KB_C2', sans-serif; color: #cf2222;">미달성 </span>
            <span style="font-size: 20px; font-family: 'KB_C2', sans-serif; color: #cf2222; margin-right: 70px;"> {{ target.notAchievedCount }} 명</span>
            <i class="bi bi-envelope-check-fill" style="color: #8c8c8c; font-size: 27px; margin-top: 10px; margin-right: 10px;"></i>
            <span v-if="isOngoing(target)" @click="generateAIContent(target, index)"  style="cursor: pointer; font-size: 18px; font-family: 'KB_C2', sans-serif;"> 문자 발송</span>

            <!-- 진행 중이 아닐 때 "문자 발송 불가" 메시지 표시 -->
            <span v-else style="font-size: 18px; font-family: 'KB_C2', sans-serif;">
              문자발송 불가
            </span>

            <span class="loading-dots" v-if="loading[index]">{{ loadingText[index] }}</span>
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
import api from "@/api/axios";


export default {
  name: 'TargetMileageAdminView',
  components: {
    Datepicker,
  },
  data() {
    return {
      // // currentTab: 'all',
      // totalParticipants: 0,  // 총 참가자 수
      // achievedCount: 0,  // 달성한 사람 수
      // notAchievedCount: 0,  // 미달성한 사람 수
      // notAchievedPhones: [],  // 미달성한 사람의 전화번호
      // rates: [],  // 각 타겟에 대한 달성률 배열
      isModalOpen: false,
      startDate: null,
      endDate: null,
      targetScore: 0,
      mile_name: '',
      searchStartDate: '',
      searchEndDate: '',
      searchStatus: '',
      expandedTargets: [], // 확장된 목표 목록 추적
      loading: [],
      loadingText: [], // 로딩 텍스트
      loadingInterval: [], // 로딩 애니메이션 인터벌
      animatedWidths: [], // 각 목표에 대한 애니메이션 너비를 저장하는 배열
    }
  },
  computed: {
    ...mapGetters('mile', ['getMileInfo', 'getArrayMiles']),
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getTargets']),
    ...mapGetters('target', ['getParticipantsData']),

    // achievementRate() {
    // if (this.totalParticipants > 0 && !isNaN(this.achievedCount) && !isNaN(this.totalParticipants)) {
    //   return ((this.achievedCount / this.totalParticipants) * 100).toFixed(2);
    // }
    // return 0;  // 참가자 수가 0이거나 NaN일 때는 0%로 처리
    // },
    participantsData() {
        return this.getParticipantsData(this.targetNo); // 예시로 현재 타겟 번호 사용
    },
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
          // expanded: false,
          animatedWidth: 0, // 초기값은 0
        }
      });
    },
    filteredTargets() {
      let targets = this.formattedTargets;

      // 상태 검색
      if (this.searchStatus) {
        targets = targets.filter(t => {
          if (this.searchStatus === 'ongoing') return this.isOngoing(t);
          if (this.searchStatus === 'scheduled') return this.isScheduled(t);
          if (this.searchStatus === 'completed') return this.isCompleted(t);
          return true;
        });
      }

       // 날짜 필터링
       if (this.searchStartDate && this.searchEndDate) {
        const startDate = new Date(this.searchStartDate);
        const endDate = new Date(this.searchEndDate);
        targets = targets.filter(t => {
          const targetStart = new Date(t.start_date);
          const targetEnd = new Date(t.end_date);
          return targetStart >= startDate && targetEnd <= endDate;
        });
      }

      return targets.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    },
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo']),
    ...mapActions('mileage', ['addTarget', 'fetchMileTarget', 'targetDelete']),
    // ...mapActions('target', ['loadParticipants']),

    warningAlert(alret) {
      this.$swal({
        title: '경고',
        text: alret,
        icon: 'warning',
        scrollbarPadding: false,
      });
    },
    succesAlert() {
      this.$swal({
        title: "성공",
        text: "메시지 발송이 완료되었습니다.",
        icon: "success",
        scrollbarPadding: false,
      });
    },
   errorAlert(message) {
    alert(`에러: ${message}`);
    },

   // startLoadingAnimation 메서드에 index 추가
  startLoadingAnimation(index) {
    let dots = '';
    this.loading[index] = true; // 인덱스별로 로딩 시작
    this.loadingInterval[index] = setInterval(() => {
      if (dots.length < 3) {
        dots += '.';
      } else {
        dots = '';
      }
      this.loadingText[index] = '중' + dots; // 인덱스에 맞게 loadingText 업데이트
    }, 500); // 0.5초마다 점 추가
  },


 // AI 문구 생성 및 문자 발송 기능
 async generateAIContent(target, index) {

      try {
        // 로딩 시작
        this.startLoadingAnimation(index);

        let notAchievedNames = target.not_achieved_names || '';
        let notAchievedPhones = target.not_achieved_phones || '';

        if (typeof notAchievedNames === 'string') {
          notAchievedNames = notAchievedNames.split(',').map(name => name.trim()).filter(name => name.length > 0);
        }

        if (typeof notAchievedPhones === 'string') {
          notAchievedPhones = notAchievedPhones.split(',').map(phone => phone.trim()).filter(phone => phone.length > 0);
        }

        if (notAchievedPhones.length === 0 || notAchievedNames.length === 0) {
          this.loading[index] = false;
          clearInterval(this.loadingInterval[index]);
          this.loadingText[index] = ''; // 애니메이션 텍스트 초기화

          this.warningAlert('발송할 대상이 없습니다.');
          return;
        }


        // AI 문구 생성
        const response = await api.post('bot/sms', null, {
          params: {
            prompt: `우리 회사 인사고과와 연결되는 마일리지 관리 사이트에서 ${target.mile_name} 마일리지에 관해서 홍보성 문자메시지를 만들어줘.` +
              `마일리지가 ${target.end_date}까지 달성되지 않으면 마왕 점수를 획득할 수 없다는 소식도 알려줘.`+
              '회사 이름은 안 밝히지 않고 100자 이내로 보내줘.'+
              '마무리 멘트는 활기차게 도전해보자는 내용으로 !를 넣었으면 좋겠어' +
              '일상생활 속에서 쓰지 않는 어려운 단어는 쓰지 말아줘'+
              '${target.mile_name} 마일리지 종류에 따라 멘트를 정해줄게. ${target.mile_name}이 HRD 마일리지라면 동영상 시청을 하면서 마일리지를 쌓아보자는 멘트를 넣어줘.${target.mile_name}이 Monthly Best랑 Monthly Base랑 Best PG 랑 Best Branch랑 리그 테이블라면 직원들과의 힘을 합쳐서 열심히 마일리지를 쌓아보자는 말을 문구에 넣어줘. ${target.mile_name}이 HotTip라면 노하우를 직원들과 공유해봅시다라는 문구를 넣어줘. ${target.mile_name}이 소비자 지원라면 직원 칭찬이나 꿀Tip 참여,제도개선관련 의견 제시를 통해 마일리지를 쌓아봅시다 라는 문구를 넣어줘'
          },
        });

        const aiMessage = response.data;

       // 모든 수신자에게 동일한 AI 메시지 발송
    const messages = notAchievedPhones.map((phone) => {
      return {
        to: phone,
        text: aiMessage, // 동일한 AI 문구를 사용
      };
    });

        await api.post('/user/sendSmsAction', {
          to: messages.map(m => m.to),
          texts: messages.map(m => m.text),
          mile: target.mile_name
        });

          // 로딩 종료 후 애니메이션을 멈추고 알림 표시
        this.loading[index] = false;
        clearInterval(this.loadingInterval[index]);
        this.loadingText[index] = ''; // 애니메이션 텍스트 초기화

        this.succesAlert();
      } catch (error) {
        this.loading[index] = false;
        clearInterval(this.loadingInterval[index]);
        this.loadingText[index] = ''; // 애니메이션 텍스트 초기화

        this.errorAlert(error.message || "문자 발송 중 오류가 발생했습니다.");
      }
    },
    animateProgressBars() {
    this.filteredTargets.forEach((target, index) => {
      const finalWidth = target.totalParticipants > 0 
        ? Math.round((target.achievedCount / target.totalParticipants) * 100)
        : 0;

      let currentWidth = 0;
      this.animatedWidths[index] = currentWidth; // 애니메이션 초기화

      const interval = setInterval(() => {
        if (currentWidth < finalWidth) {
          currentWidth += 1;
          this.animatedWidths[index] = currentWidth; // 현재 너비 업데이트
        } else {
          clearInterval(interval);
        }
      }, 2); // 애니메이션 속도 (밀리초)
    });
  },
  resetModalData() {
    this.startDate = null;
    this.endDate = null;
    this.targetScore = 0;
  },
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
        this.succesAlert('목표가 등록되었습니다', 'success', '#');
        this.resetModalData(); // 데이터 초기화
        this.closeModal(); // 목표가 성공적으로 등록된 후 모달 창을 닫습니다.
        await this.refreshTargets(); // 목표 목록을 새로 고침
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
      showAlert(type, message, path = null) {
    this.$swal({
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      if (path) {
        this.navigateTo(path);
      }
    });
  },
        navigateTo(path) {
      if (path) {
        this.$router.push(path);
      }
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
      this.expandedTargets = [targetId];  // 다른 목표는 축소하고, 선택된 목표만 확장
    } else {
      this.expandedTargets.splice(expandedIndex, 1);  // 선택된 목표를 축소
    }
  },
  async refreshTargets() {
    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    if (mile_no) {
      try {
        await this.fetchMileTarget(mile_no); // 서버에서 최신 목표 목록을 불러옴
        this.animateProgressBars(); // 새로고침 후 애니메이션 갱신
      } catch (error) {
        console.error('목표 목록을 불러오는 중 오류가 발생했습니다:', error);
      }
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
        this.animateProgressBars(); // 페이지 로딩 후 애니메이션 시작
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
  margin-bottom: 50px;
  margin-right: 25px;
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

.status-completed {
  font-family: 'KB_C2', sans-serif;
  font-size: 18px;
  /* font-weight: bold; */
  color: #dc3545; /* 종료 - 빨간색 */
}

.status-ongoing {
  color: #19c99b; /* 진행 중 - 초록색 */
  font-family: 'KB_C2', sans-serif;
  font-size: 18px;
}

.status-scheduled {
  color: #f0ad4e; /* 예정 - 주황색 (필요시 색상 변경 가능) */
  font-family: 'KB_C2', sans-serif;
  font-size: 18px;
}


.goal-mileage {
  font-weight: bold;
  color: #333;
  font-family: 'KB_C2', sans-serif;
  flex: 0 0 190px; /* 고정 너비 설정 */
  text-align: left; /* 왼쪽 정렬 */
  font-size: 18px;
}
.goal-staus {
  flex: 0 0 100px; /* 고정 너비 설정 */
  text-align: left; /* 왼쪽 정렬 */
  margin-right: auto; /* 오른쪽 여백을 자동으로 설정하여 왼쪽으로 밀기 */
}
.goal-date {
  font-weight: bold;
  color: #333;
  font-family: 'KB_C2', sans-serif;
  font-size: 15px;
}

.goal-rate {
  font-weight: bold;
  color: #4285f4;
  font-family: 'KB_C2', sans-serif;
  font-size: 18px;
  text-align: left; /* 왼쪽 정렬 */
  flex: 0 0 150px; /* 고정 너비 설정 */

}

.progress-container {
  height: 15px;
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
  font-family: 'KB_C2', sans-serif; /* 폰트 변경 */
  font-size: 13pt ;
  margin-bottom: -150px;
}

.search-filters input,
.search-filters select {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.loading-dots {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  margin-left: 3px;
  font-family: 'KB_C2', sans-serif;
}
</style>