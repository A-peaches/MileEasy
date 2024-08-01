<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <div class="button-container">
      <button class="back-button" @click="goBack">
        <span class="arrow">❮</span> 이전
      </button>
    </div>
    <h2 class="bold-x-lg" style="font-family: KB_C3">{{ mileageAction }}</h2>
    <h6 class="mb-5">
      {{ formattedRequestDate }} {{ userName }}({{ userNo }})
    </h6>
    <div style="padding: 0 5%">
      <div>
        <div style="text-align: right" class="my-2">
          <span>승인완료</span>
          &nbsp;
          <span>승인거절</span>
        </div>
        <div class="p-2 form-container" style="background-color: #f6f6f6">
          <div class="form-group">
            <label class="mt-3">마일리지 이름</label>
            <input
              v-model="mileageName"
              type="text"
              class="input-base input-white"
            />
          </div>

          <div class="form-group">
            <label>마일리지 연간 최고 한도</label>
            <input
              v-model="mileageLimit"
              type="text"
              class="input-base input-white"
              readonly
            />
          </div>

          <div class="form-group">
            <label>담당자 설정</label>
            <input
              v-model="manager"
              type="text"
              class="input-base input-white"
              readonly
            />
          </div>

          <div class="form-group">
            <label>기타사항</label>
            <textarea
              v-model="additionalNotes"
              class="input-base input-white"
            ></textarea>
          </div>
          <div class="button-wrapper">
            <button class="btn-yellow">등록</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MileageRequestDetail',
  props: ['mileage_request_no'],
  data() {
    return {
      mileageName: '',
      mileageLimit: '',
      manager: '',
      additionalNotes: '',
    };
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('request', ['getRequestList']),

    loginInfo() {
      return this.getLoginInfo;
    },

    requestNo() {
      return this.$route.params.mileage_request_no;
    },

    currentRequest() {
      if (!this.getRequestList) return null;

      const requestNoStr = String(this.requestNo);
      return this.getRequestList.find(
        (request) => String(request.mileage_request_no) === requestNoStr
      );
    },

    formattedRequestDate() {
      if (this.currentRequest && this.currentRequest.mileage_request_date) {
        const date = new Date(this.currentRequest.mileage_request_date);
        return date.toISOString().split('T')[0]; // yyyy-mm-dd format
      }
      return '';
    },

    userName() {
      return this.currentRequest ? this.currentRequest.user_name : '';
    },

    userNo() {
      return this.currentRequest ? this.currentRequest.user_no : '';
    },

    mileageAction() {
      if (this.currentRequest) {
        switch (this.currentRequest.request) {
          case 1:
            return '마일리지 추가';
          case 2:
            return '마일리지 수정';
          case 3:
            return '마일리지 삭제';
        }
      }
      return '마일리지 정보';
    },
  },

  methods: {
    ...mapActions('request', ['requestList']),

    goBack() {
      this.$router.go(-1);
    },

    setFormData() {
      if (this.currentRequest) {
        this.mileageName = this.currentRequest.request_mile_name || '';
        this.mileageLimit = this.currentRequest.request_mil_max || '';
        this.manager = this.currentRequest.request_admin || '';
        this.additionalNotes = this.currentRequest.request_etc || '';
      }
    },
  },

  async mounted() {
    await this.requestList(); // Fetch the request list
    this.setFormData(); // Set form data after request list is fetched
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
  height: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 800px;
}

.form-group label {
  margin-bottom: 5px; /* Adjust spacing between label and input */
  text-align: left;
  font-family: 'KB_C2', sans-serif;
}

.input-base {
  width: 100%;
  text-align: left;
}

.input-white {
  background-color: white;
}

textarea.input-base {
  height: 200px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  top: -5px; /* Slightly adjust position */
}

.checkbox-container input[type='radio'] {
  display: none; /* Hide default radio button */
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
  background-color: #f6a319; /* Change background color when checked */
  border: none; /* Remove border when checked */
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
  margin-left: 10px; /* Space between checkbox and text */
  font-family: 'KB_S5', sans-serif;
  font-size: 20px;
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

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%; /* Use full width */
}
</style>
