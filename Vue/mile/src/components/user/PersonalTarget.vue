<template>
  <div>
    <div class="d-flex justify-content-start align-items-center mb-5" style="margin-left: 5%;">
    <div class="radio-container p-3 lg2 mr-3">
      <!-- 총 건수 -->
      <div style="display: flex; align-items: center;">
        <span style="font-family: 'KB_C2'; font-size: 18px; margin-left: -40px; margin-right: 25px; margin-bottom: 2px; color: #333;">
          총 {{ totalTargetsCount }}건
        </span>
      </div>
      <input class="radio-input" type="radio" name="targetList" id="finished" value="finished" v-model="sortBy" />
      <label class="radio-label" for="finished">
        <span class="custom-radio"></span>
        종료
      </label>
    </div>
  <div class="radio-container p-3 lg2">
      <input class="radio-input" type="radio" name="targetList" id="notFinished" value="not-finished" v-model="sortBy" />
      <label class="radio-label" for="notFinished">
        <span class="custom-radio"></span>
        진행중
      </label>
    </div>
  </div>
<!-- 목표가 없는 경우 메시지 표시 -->
    <div v-if="filteredMileages.length === 0" class="text-center mb-4" style="color: gray;">
      진행 중인 목표가 없습니다.
    </div>

    <div class="row">
      <div v-for="(targets, index) in filteredMileages" :key="targets.target_no" class="col-md-4 mb-3">
        <div class="p-3">
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 370px; height:320px; transition: transform 0.3s ease; border-radius: 1px; " class="mx-auto rounded-4 target-box">
            <div class="py-1" style="display: flex; align-items: center; margin-bottom: -10px; position: relative;">
                <span :class="getStatusClass(targets)" class="status-label" style="margin-left: 20px;">{{ getStatusText(targets) }}</span>
                <div style="text-align: left; margin-left: 10px; margin-top: 10px; font-weight: bold; font-family: KB_C2; font-size: 13pt;" class="mb-2">
                  {{ targets.mile_name }} 마일리지 
                </div>
                <div class="button-container">
                  <button class="delete-button" @click="deleteTarget(targets.target_no)">
                    삭제
                  </button>
                </div>
              </div>
         <div class="py-3" style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 20px;">
            <span class="lg2" style="font-family: 'KB_C1'; font-size: 20px; margin-bottom: -25px;">개인 진행률</span><br>
              <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%; margin-right: 10px;">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width: calculateProgress(targets), backgroundColor: '#FB773C'}"></div>
                </div>
                <span style="font-weight: bold; white-space: nowrap; font-family: 'KB_C2'; font-size: 25px; margin-right: 10px;">  {{ calculateProgress(targets) }}</span>
              </div>
                <span class="md" style="margin-top: 5px; font-size: 13px; font-family: 'KB_C2';">{{ targets.start_date }} - {{ targets.end_date }}</span>
            </div>
           
            <span class="lg2" style="font-family: 'KB_C1'; font-size: 17px; "> 🎯 나의 마일리지 / 목표 마일리지 </span>
              <div class="py-3">
                <span class="bold-x-lg" style="font-family: 'KB_C1';">
                  <span class="highlight-score">{{ targets.achievementRate}}</span>  / {{targets.target_mileage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="d-flex justify-content-center" style="margin-top: 12vh;">
      <button class="addbtn" @click="openModal" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2; background-color: #ffca05; border-radius: 10px;">
        목표 추가
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
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import api from '@/api/axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Swal from 'sweetalert2';

export default {
  name:  "PersonalTarget",
  emits: ['dataLoaded'], // 이 이벤트를 컴포넌트에서 처리함을 선언
  components: { 
    Datepicker, //이 컴포넌트가 사용할 하위 컴포넌트
  },
  data() {
    return {
      mileages: [],
      isModalOpen: false,
      labels:[],
      selectedLabel: null,
      startDate: null,
      endDate: null,
      targetScore: 0,
      backgroundColors: ["#F5F5F5"],
      sortBy: 'not-finished',
      //  dropDownVisible: {},
    };
  },
  methods: {
    ...mapActions('target', ['addPersonalTarget','fetchPersonalTargets','deleteTarget']),

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
          '/notice/mileage'
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
        mile_no: this.selectedLabel.mile_no,
        user_no: this.loginInfo.user_no, // 유저 아이디를 적절히 변경
        start_date: this.startDate,
        end_date: this.endDate,
        target_mileage: this.targetScore,
        is_together: false,
        is_manager_plan: false,
        month: new Date().getMonth() + 1, //1~12월 범위를 맞추기 위해서
        achievementRate: 0 //목표 달성률
      };
      console.log('target이 서버로 데이터 넘기는 것 :',target);
      try {
        await this.addPersonalTarget(target);
        this.closeModal();
        window.location.reload(); // 페이지 새로고침 추가
      } catch (error) {
        console.error('Error adding target:', error.response ? error.response.data : error.message);
      }
    },
    calculateProgress(target) {
    if (!target.target_mileage || target.target_mileage === 0) return '0%'; // 목표 마일리지가 0이면 진행률은 0
    if (this.getStatusText(target) === '예정') return '0%'; // 예정 상태이면 진행률은 0%
    const progress = (target.achievementRate / target.target_mileage) * 100;
    return progress > 100 ? '100%' : Math.round(progress) + '%'; // 최대 진행률은 100%
  },



   getStatusClass(target) {
      const currentDate = new Date();
      const startDate = new Date(target.start_date);
      const endDate = new Date(target.end_date);

      if (currentDate < startDate) {
        return 'upcoming';
      } else if (currentDate > endDate) {
        return 'completed';
      } else {
        return 'ongoing';
      }
    },
   getStatusText(target) {
      const currentDate = new Date();
      const startDate = new Date(target.start_date);
      const endDate = new Date(target.end_date);

      if (currentDate < startDate) {
        return '예정';
      } else if (currentDate > endDate) {
        return '종료';
      } else {
        return '진행중';
      }
    },
    sortTargets(targets) {
  return targets.sort((a, b) => {
    const statusA = this.getStatusText(a);
    const statusB = this.getStatusText(b);

    if (statusA === '진행중' && statusB !== '진행중') {
      return -1;
    }
    if (statusA !== '진행중' && statusB === '진행중') {
      return 1;
    }
    if (statusA === '예정' && statusB !== '예정') {
      return -1; // '예정'인 경우 '종료' 앞으로 정렬
    }
    if (statusA !== '예정' && statusB === '예정') {
      return 1;
    }
    // '종료' 상태는 자동으로 맨 뒤로 정렬됨
    return 0;
  });
},

  filteredTargets(filter) {
      const currentDate = new Date();
      return this.adminTargets.filter(target => {
        const endDate = new Date(target.end_date);
        if (filter === 'finished') {
          return currentDate > endDate;
        } else {
          return currentDate <= endDate;
        }
      });
    },
  sortedAdminTargets(targets) {
    return targets.sort((a, b) => a.mile_no - b.mile_no);
  },
 
  async loadUserParticipatedTargets() {
      try {
        const targetNos = this.adminTargets.map(target => target.target_no);
        console.log('5. Target numbers:', targetNos);

        for (const targetNo of targetNos) {
          const isParticipating = await this.checkParticipation(targetNo);
          if (isParticipating) {
            this.userParticipatedTargets.push(targetNo);
          }
        }

        console.log('7. Updated userParticipatedTargets:', this.userParticipatedTargets);
      } catch (error) {
        console.error('Failed to load user participated targets:', error);
      } finally {
        this.isLoading = false; // 로딩 상태 해제
      }
  },
  async deleteTarget(targetNo) {
    Swal.fire({
        title: '경고',
        text: '정말로 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        scrollbarPadding: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false,
        willOpen: () => {
            // 스크롤바 패딩 제거
            document.body.style.paddingRight = '0px';
        },
        willClose: () => {
            // 스크롤바 패딩 제거
            document.body.style.paddingRight = '0px';
        }
    }).then(async result => {
        if (result.isConfirmed) {
            try {
                const userNo = this.$store.getters['login/getLoginInfo'].user_no;
                await this.$store.dispatch('target/deleteTarget', { userNo, targetNo });
                Swal.fire({
                    title: '삭제 완료',
                    text: '삭제가 완료되었습니다.',
                    icon: 'success',
                    scrollbarPadding: false,
                    willOpen: () => {
                        document.body.style.paddingRight = '0px';
                    },
                    willClose: () => {
                        document.body.style.paddingRight = '0px';
                    }
                });
            } catch (error) {
                console.error('Error deleting target:', error);
                Swal.fire({
                    title: '오류 발생',
                    text: '삭제 중 오류가 발생했습니다. 다시 시도해 주세요.',
                    icon: 'error',
                    scrollbarPadding: false,
                    willOpen: () => {
                        document.body.style.paddingRight = '0px';
                    },
                    willClose: () => {
                        document.body.style.paddingRight = '0px';
                    }
                });
            }
        } else {
            Swal.fire({
                title: '취소됨',
                text: '삭제가 취소되었습니다.',
                icon: 'info',
                scrollbarPadding: false,
                willOpen: () => {
                    document.body.style.paddingRight = '0px';
                },
                willClose: () => {
                    document.body.style.paddingRight = '0px';
                }
            });
        }
    });
},
  showAlert(message, icon) {
      this.$swal({
        title: message,
        icon: icon,
        confirmButtonText: '확인',
        confirmButtonColor: '#4b4a4a',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        scrollbarPadding: false,
        backdrop: true,
        didOpen: () => {
          document.body.classList.add('no-scroll');
          document.documentElement.style.overflow = 'hidden';
        },
        willClose: () => {
          document.body.classList.remove('no-scroll');
          document.documentElement.style.overflow = '';
        }
      });
    },
 
  },

 async created() {
  console.log('targer loginInfo 이 찍히나요 ?:', this.loginInfo);
  console.log('isLoggedIn:', this.isLoggedIn);
  console.log('isChecked:', this.isChecked);
  this.isLoading = true;
  try {
    await this.fetchMileages();
    await this.fetchPersonalTargets(this.loginInfo.user_no).then(() => {
    console.log('Targets after fetch:', this.getPersonalTargets); 
  });
  } catch (error) {
    console.error('Error initializing component:', error);
  } finally {
    this.isLoading = false;
  }
},

  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapState('login', ['loginInfo']),
    ...mapGetters('target', ['getPersonalTargets']),

    adminTargets() {
      return this.getPersonalTargets || []; // getTargets가 undefined일 경우 빈 배열 반환
    },
    displayedTargets() {
    const filtered = this.filteredTargets(this.sortBy);
    const sorted = this.sortedAdminTargets(filtered);
    return this.sortBy === 'not-finished' ? this.sortTargets(sorted) : sorted;
    },
    totalTargetsCount() {
      return this.displayedTargets.length;
    },
    targets(){
        const targets = this.getPersonalTargets;
      console.log('Targets:', targets);
      return Array.isArray(targets) ? targets : []; // 배열이 아니면 빈 배열을 반환
    },

    filteredMileages() {
    const currentDate = new Date();
     // mile_no 기준으로 오름차순 정렬

    const sortedTargets = [...this.targets]
    .sort((a, b) => a.mile_no - b.mile_no)
    .sort((a, b) => {
      const statusA = this.getStatusText(a);
      const statusB = this.getStatusText(b);
      if (statusA === '진행중' && statusB !== '진행중') return -1;
      if (statusA !== '진행중' && statusB === '진행중') return 1;
      if (statusA === '예정' && statusB !== '예정') return -1;
      if (statusA !== '예정' && statusB === '예정') return 1;
      return 0;
    });

    return sortedTargets.filter((mileage) => {
      if (!mileage || !mileage.end_date) {
        console.warn('Skipping mileage due to missing endDate:', mileage);
        return false;
      }

      const endDate = new Date(mileage.end_date);
      if (isNaN(endDate.getTime())) {
        console.warn('Invalid date format in endDate:', mileage.end_date);
        return false;
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

.target-box:hover {
  transform: scale(1.05); /* 마우스를 올렸을 때 5% 확대 */
}
.status-label {
  display: inline-block;
  padding: 0.2em 0.6em;
  font-size: 12pt;
  font-family: KB_C2;
  /* font-weight: bold; */
  border-radius: 12px;
  margin-left: 10px; /* 마일리지 이름과 상태 라벨 사이의 간격 조정 */
}

.status-label.ongoing {
  background-color: #5cb85c; /* 초록색 - 진행중 */
  color: white;
}

.status-label.completed {
  background-color: #d9534f; /* 빨간색 - 종료 */
  color: white;
}

.status-label.upcoming {
  background-color: #f0ad4e; /* 주황색 - 예정 */
  color: white;
}

.radio-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.radio-input {
  display: none; /* 기본 라디오 버튼을 숨깁니다 */
}

.custom-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 10px;
  display: inline-block;
  position: relative;
}

.radio-input:checked + .radio-label .custom-radio {
  background-color: #FC8A58; /* 체크된 상태일 때 배경색 */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.radio-input:checked + .radio-label .custom-radio::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px; /* 체크된 상태일 때 체크 표시 스타일 */
}

.radio-label {
  display: flex; /* label을 flex로 설정하여 전체가 클릭 가능하도록 */
  align-items: center;
  font-family: 'KB_C2';
  font-size: 20px;
  color: #333; /* 라벨 텍스트 색상 */
}

.highlight-score {
  background-color: #FFE2B5;
  padding: 2px 4px;
  border-radius: 20px;
}

.participation-info {
  display: flex;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* 트랜지션을 위한 추가 클래스 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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
  z-index:10000;
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

.py-1 {
  position: relative;  /* 부모 요소에 relative 포지션 설정 */
}

.button-container {
  position: absolute;  /* 절대 위치 설정 */
  top: 50%;  /* 상위 요소의 중앙에 위치 */
  right: 10px;  /* 오른쪽에서 10px 떨어진 위치 */
  transform: translateY(-50%);  /* 세로 중앙 정렬을 위한 조정 */
}

.delete-button {
  font-family: KB_C2;
  font-size: 11pt;
  color: #e6342e;
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.delete-button:hover {
  text-decoration: underline;
}

</style>