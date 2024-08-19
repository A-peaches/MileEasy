<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <h2 class="bold-x-lg mt-5 mb-5 ml-5" style="font-family: KB_C3">
      MileEasy 프로모션
    </h2>
    <div
      class="card shadow-sm mb-4 fade-in"
      style="background-color: #f5f5f5; border: #f5f5f5"
    >
      <div class="card-body text-start card-ml">
        <h5 class="text-emphasis text-start">
          <i class="bi bi-info-circle-fill"></i> 유의 사항
        </h5>
        <span class="ml-5" style="font-size: 13pt">
          본 서비스는 직원들의 MileEasy 사이트 대한 관심을 높이고, 관련 혜택을
          적극적으로 알리기 위해 제작되었습니다. MileEasy 홍보 이외의
          <span class="ml-5">목적으로는 사용이 제한됩니다.</span>
          <br />
        </span>
        <span class="ml-5">
          <strong class="text-red"
            >(일일 최대 발송 가능 횟수 : 1회 / 주중 최대 발송 가능 횟수 :
            3회)</strong
          >
        </span>
      </div>
    </div>

    <div class="row" style="margin-top: 60px">
      <div class="left-item">
        <div class="phone-container">
          <img src="@/assets/img/iphone.png" class="iphone" />
          <div class="phone-overlay">
            <div class="receiver-area">{{ receiverDisplay || '' }}</div>
            <div class="message-area">
              <div v-if="message" class="message-bubble">
                {{ message || '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-item">
        <div class="message-input-container">
          <p class="sub-title mb-3" style="text-align: start">
            수신인 지정
            <i class="bi bi-plus-lg" @click="openModal"></i>
          </p>
          <div></div>
        </div>
        <div class="flex">
          <input
            v-model="receiverDisplay"
            type="text"
            class="form-control"
            style="width: 100%; height: 50px"
            placeholder="수신인을 추가해주세요."
            @click="openModal"
            readonly
          />
        </div>

        <div class="message-input-container mt-4">
          <div class="sub-title">메시지 입력</div>
          <button class="btn-yellow mb-4" @click="generateAIContent">
            AI 내용 자동 생성
          </button>
        </div>

        <textarea
          v-model="message"
          class="form-control"
          style="height: 250px"
          placeholder="메시지를 입력하세요 (100자 이내)"
          maxlength="100"
        ></textarea>

        <div class="sample-messages">
          <p class="sub-title my-3" style="text-align: start">샘플 메시지</p>
          <div class="button-container">
            <button
              v-for="(sample, index) in sampleMessages"
              :key="index"
              class="sample-button"
              @click="selectSampleMessage(sample)"
            >
              {{ sample?.title }}
            </button>
          </div>
        </div>
        <div class="action-buttons mt-5">
          <button class="btn btn-primary" @click="sendSms">메시지 발송</button>
          <button class="btn btn-secondary" @click="reset">작성 취소</button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>직원 검색</h2>
        <hr style="margin-top: 5px; margin-bottom: 5px" />
        <div class="checkbox-group">
          <label
            class="checkbox-container"
            v-for="option in filterOptions"
            :key="option.value"
          >
            <input
              type="checkbox"
              :value="option.value"
              :checked="selectedFilter === option.value"
              @change="handleFilterChange(option.value)"
            />
            <span class="custom-checkbox"></span>
            <span class="checkbox-label">{{ option?.label }}</span>
          </label>
        </div>
        <input
          v-model="searchQuery"
          @input="searchEmployees"
          placeholder="직원 이름 또는 번호를 검색해주세요."
        />
        <div class="user-list">
          <ul>
            <li
              v-for="employee in searchResults"
              :key="employee.user_no"
              @click="addReceiver(employee)"
              :class="{ selected: isSelected(employee) }"
            >
              {{ employee?.user_no }} - {{ employee?.user_name }}
              <span v-if="isSelected(employee)" class="checkmark">✓</span>
            </li>
          </ul>
        </div>
        <button @click="closeModal" class="btn btn-primary mt-3">완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import { mapGetters } from 'vuex';
export default {
  name: 'AdminPromotion',
  data() {
    return {
      message: '',
      receivers: [],
      showModal: false,
      searchQuery: '',
      searchResults: [],
      selectedFilter: null,
      filterOptions: [
        { label: '전체', value: 'all' },
        { label: '영업점', value: 'branch' },
        { label: '본부', value: 'headquarters' },
      ],
      employees: [],
      sampleMessages: [
        {
          title: '마왕 업데이트 안내',
          content: `저번 달 마왕 결과가 드디어 나왔습니다! 내가 마왕이 됐을수도..?🤩 서둘러 확인해보세요!`,
        },
        {
          title: 'M-Tip Best 안내',
          content: `M-Tip 게시판에서 이뤄지는 🔥🔥치열한 Best 경쟁! 이번 달의 Best M-Tip은 바로 당신의 것! 지금 바로 작성해보세요!`,
        },
        {
          title: 'AI 리포트 안내',
          content: `매일 하루 한번, AI 리포트로 나의 마일리지를 분석해보세요! MileEasy가 당신의 길잡이가 되어줄 것입니다.🤗`,
        },
      ],
    };
  },
  methods: {
    checkLoginInfo() {
      if (
        !this.getLoginInfo ||
        this.getIsChecked === false ||
        this.getLoginInfo.user_is_admin === false
      ) {
        window.location.href = '/noAccess';
      }
    },

    selectSampleMessage(sample) {
      this.message = sample.content;
    },
    async generateAIContent() {
      console.log('AI 내용 생성');
      this.AIAlret();
      try {
        const response = await api.post('bot/sms', null, {
          params: {
            prompt:
              `우리 회사 인사고과와 연결되는 마일리지 관리 사이트인 MileEasy를 홍보하고 방문을 독려하려고 홍보성 문자메시지를 보내려고해.` +
              '그 홍보하는 문자 메시지 문구를 만들어주면 되는데, 이 사이트는 전직원의 마일리지 점수를 분석하여 직원별 맞춤형 AI 리포트를 작성해서 앞으로 어떤식으로 마일리지를 향상하는게 유리하고 적절한지 방향성을 제공해줘.' +
              '마일리지가 전월에비해 크게 증가했거나, 마일리지부문에서 1등을하면 마왕(마일리지왕)이라는 배지를 획득하여 뿌듯함을 느낄수 있기도해. 이 사이트의 출석체크 또는 직원들과 마일리지 꿀팁을 공유하는 M-Tip게시판의 베스트 글로 선정되면 마왕 선정에 가점이 있어. 하지만 가장 중요한것은 인사고과에 반영된다는거야.  ' +
              `내가 예시로 직접 만든 문자문구를 몇개 줄게! 저번 달 마왕 결과가 드디어 나왔습니다! 내가 마왕이 됐을수도..? 서둘러 확인해보세요!, M-Tip 게시판에서 이뤄지는 치열한 Best 경쟁! 이번 달의 Best M-Tip은 바로 당신의 것! 지금 바로 작성해보세요! ,  매일 하루 한번, AI 리포트로 나의 마일리지를 분석해보세요! MileEasy가 당신의 길잡이가 되어줄 것입니다.🤗` +
              '꼭 이런 멘트가 들어가지않아도 마일리지에 관심이 돋거나 독려하는 문장으로도 충분해. 100자이내로 하나의 메시지만 생성 부탁할게. 바로 문자메시지를 발송할거니까  하나의 문자메시지내용 그대로를 줘.',
          },
        });
        console.log(response.data);
        this.message = response.data;
      } catch (error) {
        console.error('Error during API request:', error);
      }
    },
    reset() {
      this.message = '';
      this.receivers = [];
    },
    openModal() {
      this.showModal = true;
      this.searchResults = this.employees;
      this.selectedFilter = null; // 필터 초기화
      this.searchQuery = '';
    },
    closeModal() {
      this.showModal = false;
      this.searchQuery = '';
      this.searchResults = [];
    },
    searchEmployees() {
      this.filterEmployees(); // 필터 적용 후 검색 수행
    },
    addReceiver(employee) {
      const index = this.receivers.findIndex(
        (r) => r.user_no === employee.user_no
      );
      if (index === -1) {
        this.receivers.push(employee);
      } else {
        this.receivers.splice(index, 1);
      }
    },

    isSelected(employee) {
      return this.receivers.some((r) => r.user_no === employee.user_no);
    },
    handleFilterChange(value) {
      if (this.selectedFilter === value) {
        this.selectedFilter = null;
        this.receivers = []; // 선택 해제 시 receivers 초기화
      } else {
        this.selectedFilter = value;
        this.addEmployeesByFilter(value); // 필터 선택 시 직원 추가
      }
      this.filterEmployees(); // 검색 결과 업데이트
    },
    addEmployeesByFilter(filter) {
      if (filter === 'all') {
        this.receivers = [...this.employees];
      } else if (filter === 'branch') {
        this.receivers = this.employees.filter(
          (emp) => emp.job_no == 1 || emp.job_no == 2
        );
      } else if (filter === 'headquarters') {
        this.receivers = this.employees.filter((emp) => emp.job_no == 3);
      }
    },

    removeEmployeesByFilter(filter) {
      if (filter === 'all') {
        this.receivers = [];
      } else if (filter === 'branch') {
        this.receivers = this.receivers.filter(
          (emp) => emp.job_no !== 1 && emp.job_no !== 2
        );
      } else if (filter === 'headquarters') {
        this.receivers = this.receivers.filter((emp) => emp.job_no !== 3);
      }
    },
    filterEmployees() {
      let filteredEmployees = this.employees;

      // 필터 적용
      if (this.selectedFilter === 'branch') {
        filteredEmployees = filteredEmployees.filter(
          (emp) => emp.job_no == 1 || emp.job_no == 2
        );
      } else if (this.selectedFilter === 'headquarters') {
        filteredEmployees = filteredEmployees.filter((emp) => emp.job_no == 3);
      }

      // 검색어 적용
      if (this.searchQuery) {
        const lowercaseSearchTerm = this.searchQuery.toLowerCase();
        filteredEmployees = filteredEmployees.filter((user) => {
          return (
            user.user_name.toLowerCase().includes(lowercaseSearchTerm) ||
            user.user_no.toString().includes(this.searchQuery)
          );
        });
      }

      // searchResults 업데이트
      this.searchResults = filteredEmployees;
    },

    applySearch() {
      if (this.searchQuery) {
        const lowercaseSearchTerm = this.searchQuery.toLowerCase();
        this.searchResults = this.searchResults.filter((user) => {
          return (
            user.user_name.toLowerCase().includes(lowercaseSearchTerm) ||
            user.user_no.toString().includes(this.searchQuery)
          );
        });
      }
    },

    //모든 유저 갖고오기
    async getAllUsers() {
      try {
        const response = await api.get('/user/getAllUsers');
        this.employees = response.data;
        console.log('모든직원정보 :', response.data);
      } catch (error) {
        console.error('Error getAllUsers');
      }
    },
    succesAlert() {
      this.$swal({
        title: '성공',
        text: '메시지 발송이 완료되었습니다.',
        icon: 'success',
        scrollbarPadding: false,
      });
    },

    warningAlert(alret) {
      this.$swal({
        title: '경고',
        text: alret,
        icon: 'warning',
        scrollbarPadding: false,
      });
    },
    async sendSms() {

      if (this.message.trim().length === 0) {
        this.warningAlert('메시지를 입력해주세요.');
        return;
      }

      if (this.receivers.length === 0) {
        this.warningAlert('수신자를 입력해주세요.');
        return;
      }


      try {
        let receiversPhone = this.receivers.map((r) => r.user_tel);
        const response = await api.post('/user/sendSms', {
          to: receiversPhone,
          text: this.message,
          mile: 'site',
        });
        console.log(response);
        this.succesAlert();
        this.reset();
      } catch (error) {
        console.error('Error sending SMS:', error);
        this.errorAlert(error.message || '메시지 전송 중 오류가 발생했습니다.');
      }
    },
    AIAlret() {
      let timerInterval;
      let timeLeft = 10;

      this.$swal({
        title: 'AI 문구 생성',
        html: '<b>${timeLeft}</b>초 후에 완료됩니다....',
        timer: 10000,
        timerProgressBar: true,
        scrollbarPadding: false,

        didOpen: () => {
          const popup = this.$swal.getPopup();
          popup.style.height = '200px'; // 원하는 높이로 조정

          this.$swal.showLoading();
          const timer = this.$swal.getHtmlContainer().querySelector('b');
          timer.textContent = `${timeLeft}`; // 초기 시간 설정
          timerInterval = setInterval(() => {
            timeLeft -= 1;
            timer.textContent = `${timeLeft}`;
            if (timeLeft === 0) {
              clearInterval(timerInterval);
            }
          }, 1000); // 1초마다 업데이트
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === this.$swal.DismissReason.timer) {
          console.log('I was closed by the timer');
        }
      });
    },
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    receiverDisplay() {
      const count = this.receivers.length;
      if (count === 0) {
        return '';
      } else if (count <= 3) {
        return this.receivers.map((r) => r.user_name).join(', ');
      } else {
        const firstThree = this.receivers
          .slice(0, 3)
          .map((r) => r.user_name)
          .join(', ');
        return `${firstThree} 외 ${count - 3}명`;
      }
    },
  },

  mounted() {
    this.getAllUsers();
  },
  created() {
    this.checkLoginInfo();
  },
};
</script>

<style scoped>
.page-back {
  padding-left: 5%;
  padding-right: 5%;
  max-width: 1200px;
}
.text-emphasis {
  font-size: 13pt;
  font-family: 'KB_S5', sans-serif;
  font-weight: 600;
  color: #4b4a4a;
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.iphone {
  width: 90%;
  max-width: 400px;
  margin-right: 40px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.left-item {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-item {
  width: 55%;
  padding: 5% 0;
}

.sub-title {
  font-family: 'KB_C3', sans-serif;
  color: #4b4a4a;
  font-size: 15pt;
  font-weight: 600;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.phone-container {
  position: relative;
  width: 90%;
  max-width: 400px;
}

.phone-overlay {
  position: absolute;
  top: 12%;
  left: 7%;
  right: 7%;
  bottom: 12%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.close {
  font-size: 25px;
  position: absolute;
  top: 10px;
  right: 15px;
}

.receiver-area {
  padding: 10px;
  text-align: start;
  font-weight: bold;
  position: absolute;
  top: 10%;
  left: 15%;
  font-size: 10pt;
}

.message-area {
  position: absolute;
  position: absolute;
  bottom: 40%;
  right: 12%; /* 오른쪽 정렬을 위해 변경 */
  width: 80%; /* 너비 설정 */
  max-height: 70%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end; /* 메시지를 오른쪽으로 정렬 */
  padding-right: 10px; /* 오른쪽 여백 추가 */
}

.message-bubble {
  background-color: #e1ffc7;
  border-radius: 10px;
  padding: 8px 12px;
  margin-top: 10px; /* margin-bottom 대신 margin-top 사용 */
  max-width: 100%;
  word-wrap: break-word;
  transition: all 0.3s ease;
}
/* 스크롤바 스타일링 (선택사항) */
.message-area::-webkit-scrollbar {
  width: 6px;
}

.message-area::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.sample-button {
  flex: 1;
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #ced4da;
  padding: 25px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #5fc9ad; /* 초록색 계열 */
  color: white;
}

.btn-primary:hover {
  background-color: rgb(5, 190, 113);
}

.user-list {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: white;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  padding: 10px;
  cursor: pointer;
}
ul li:hover {
  background-color: #f0f0f0;
}

.btn-secondary {
  background-color: #ff6655; /* 빨간색 계열 */
  color: white;
}

.btn-secondary:hover {
  background-color: rgb(200, 91, 79);
}

.sample-button:hover {
  background-color: #e9ecef;
}

input,
textarea {
  text-align: start;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
}

.message-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.btn-yellow {
  white-space: nowrap;
  background-color: #ffc107;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-yellow:hover {
  background-color: #ffca2c;
}

.sample-messages {
  margin-top: 20px;
}

.btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
  background-color: transparent;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.bi-plus-lg {
  cursor: pointer;
  font-size: 17pt;
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
}

.user-list li.selected {
  background-color: #e6f3ff;
}

.checkmark {
  color: #4caf50;
  margin-left: 5px;
}

.checkbox-group {
  justify-content: start;
  text-align: start;
  margin-bottom: 15px;
  margin-top: 15px;
}

.checkbox-container {
  align-items: start;
  cursor: pointer;
  position: relative;
  top: -5px; /* 위치를 살짝 위로 올립니다 */
}

.checkbox-container input[type='checkbox'] {
  display: none; /* 기본 체크박스를 숨깁니다 */
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

.checkbox-container input[type='checkbox']:checked + .custom-checkbox {
  background-color: #f6a319; /* 체크된 상태일 때 배경색 변경 (노란색) */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.checkbox-container input[type='checkbox']:checked + .custom-checkbox::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  margin-left: 10px; /* 체크박스와 텍스트 사이 간격 */
  font-family: 'KB_S5', sans-serif;
  font-size: 16px;
}

/*스크롤바 */
/* Webkit 브라우저용 스크롤바 스타일 */
.user-list::-webkit-scrollbar {
  width: 8px;
}

.user-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.user-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.user-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 파이어폭스용 스크롤바 스타일 */
.user-list {
  scrollbar-width: thin;
  scrollbar-color: #d4d4d4 #f1f1f1;
}

/* IE와 엣지용 스크롤바 스타일 */
.user-list {
  -ms-overflow-style: none;
}
</style>
