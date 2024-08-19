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
          <span
            v-if="currentRequest.request_status === 0"
            @click="recive()"
            style="cursor: pointer"
          >
            접수완료
          </span>
          <span
            v-if="currentRequest.request_status === 1"
            @click="accept()"
            style="cursor: pointer"
          >
            승인완료 </span
          >&nbsp;
          <span
            v-if="currentRequest.request_status === 1"
            @click="reject()"
            style="cursor: pointer"
          >
            승인거절
          </span>
        </div>
        <div class="p-2 form-container" style="background-color: #f6f6f6">
          <div class="form-group" v-if="this.currentRequest.request === 2">
            <label class="mt-3">기존 마일리지 정보</label>
            <table class="styled-table">
              <thead>
                <tr>
                  <th>마일리지 이름</th>
                  <th>연간 최고 한도</th>
                  <th>담당자</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ currentMileage.mile_name }}</td>
                  <td>{{ currentMileage.mile_max }}</td>
                  <td>
                    <div v-if="admins?.length">
                      <span v-for="admin in admins" :key="admin.user_no">
                        {{ admin.user_name }} ({{ admin.user_no }})<br />
                      </span>
                    </div>
                    <div v-else>담당자 정보가 없습니다.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <div
            v-if="this.currentRequest.register >= 1"
            style="text-align: right; color: red"
          >
            현재 건을 등록한 이력이 있습니다
          </div>
          <div class="button-wrapper">
            <button
              v-if="currentRequest.request_status === 1"
              class="btn-yellow"
              @click="ok()"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api/axios';
import Swal from 'sweetalert2';
export default {
  name: 'MileageRequestDetail',
  props: ['mileage_request_no'],
  data() {
    return {
      mileageName: '',
      mileageLimit: '',
      manager: '',
      additionalNotes: '',
      admins: [], // Ensure this is initialized as an empty array
      mileageLabels: [],
      currentMileage: '',
    };
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
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

    async setFormData() {
      if (this.currentRequest) {
        this.mileageName = this.currentRequest.request_mile_name || '';
        this.mileageLimit = this.currentRequest.request_mil_max || '';
        this.manager = this.currentRequest.request_admin || '';
        this.additionalNotes = this.currentRequest.request_etc || '';
        if (this.currentRequest.request === 2) {
          try {
            const response = await api.post(
              '/admin/getMileageAdminList',
              null,
              {
                params: {
                  mile_no: this.currentRequest.mile_no,
                },
              }
            );
            console.log('당담자', response.data);
            this.admins = response.data || [];
          } catch (error) {
            console.error('Error fetching admin list:', error);
            this.admins = []; // Handle error and set to empty array
          }

          try {
            const response = await api.get('/mileage/getMileage');
            this.mileageLabels = response.data;
            if (this.currentRequest) {
              this.currentMileage = this.mileageLabels.find(
                (mileage) => mileage.mile_no === this.currentRequest.mile_no
              );
            }

            console.log('마일마일', response.data);
          } catch (error) {
            console.error('Error fetching mileage labels:', error);
            this.mileageLabels = []; // 에러 발생 시 빈 배열 반환
          }
        }
      }
    },

    ok() {
      if (this.currentRequest) {
        switch (this.currentRequest.request) {
          case 1:
            this.AddData();
            break;
          case 2:
            this.ModifyData();
            break;
          case 3:
            this.DeleteData();
            break;
        }
      }
    },
    async AddData() {
      if (this.currentRequest.request_is_branch) {
        this.request_is_branch = 1;
      } else {
        this.request_is_branch = 0;
      }
      const formData = new FormData();
      formData.append('mileageName', this.mileageName);
      formData.append('mileageLimit', this.mileageLimit);
      formData.append('manager', this.manager);
      formData.append('request_is_branch', this.request_is_branch);
      formData.append('num', this.requestNo);
      try {
        const response = await api.post('/admin/addMileage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '요청이 성공적으로 완료되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageManagementView'; // 성공 시 페이지 이동
          }
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        // 서버 응답의 세부 정보를 출력
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 완료하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    },
    async label() {
      try {
        const response = await api.get('/mileage/getMileage');
        this.mileageLabels = response.data;
      } catch (error) {
        console.error('Error fetching mileage labels:', error);
        this.mileageLabels = []; // 에러 발생 시 빈 배열 반환
      }
    },

    async ModifyData() {
      this.label(); // 마일리지 레이블을 먼저 가져옴
      if (
        this.mileageLabels.includes(this.mileageName) &&
        !this.mileageName === ' '
      ) {
        Swal.fire({
          icon: 'error',
          title: '오류',
          text: '이미 존재하는 마일리지 입니다.',
          scrollbarPadding: false,
        });
        return;
      }
      try {
        // 쿼리 매개변수로 데이터 전송
        const response = await api.post('/admin/newAdminList', null, {
          params: {
            mile_no: this.currentRequest.mile_no,
            final_admin_list: this.manager,
            mileNameInput: this.mileageName,
            mileMax: this.mileageLimit,
            num: this.requestNo,
          },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '요청이 성공적으로 완료되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageManagementView'; // 성공 시 페이지 이동
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 완료하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    },
    async DeleteData() {
      try {
        // 쿼리 매개변수로 데이터 전송
        const response = await api.post('/admin/DeleteData', null, {
          params: {
            mile_no: this.currentRequest.mile_no,
            num: this.requestNo,
          },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '마일리지 삭제가 처리되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageManagementView'; // 성공 시 페이지 이동
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 완료하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    },

    async accept() {
      try {
        // 쿼리 매개변수로 데이터 전송
        const response = await api.post('/admin/accept', null, {
          params: {
            num: this.requestNo,
          },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '승인완료 처리되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageManagementView'; // 성공 시 페이지 이동
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 완료하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    },

    async reject() {
      try {
        // 쿼리 매개변수로 데이터 전송
        const response = await api.post('/admin/reject', null, {
          params: {
            num: this.requestNo,
          },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '승인거절 처리되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageManagementView'; // 성공 시 페이지 이동
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 완료하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    },
    async recive() {
      try {
        // 쿼리 매개변수로 데이터 전송
        const response = await api.post('/admin/recive', null, {
          params: {
            num: this.requestNo,
          },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '접수완료 처리되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageManagementView';
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 완료하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    },
    checkLoginInfo() {
      if (
        !this.getLoginInfo ||
        this.getIsChecked === false ||
        this.getLoginInfo.user_is_admin === false
      ) {
        window.location.href = '/noAccess';
      }
    },
  },

  async mounted() {
    await this.requestList();
    this.setFormData();
  },
  created() {
    this.checkLoginInfo();
  },
};
</script>

<style scoped>
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
.styled-table {
  width: 100%;
  border-collapse: collapse; /* Merge borders between cells */
}

.styled-table thead th,
.styled-table tbody td {
  border: 1px solid #cdcdcd; /* Border color and width */
}

.styled-table thead th {
  background-color: #ffffff;
  padding: 10px;
  text-align: center;
  font-family: 'KB_C2', sans-serif;
}

.styled-table tbody td {
  padding: 10px;
  background-color: #ffffff;
  font-family: 'KB_C2', sans-serif;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f6f6f6; /* Optional: alternate row color for better readability */
}

.styled-table tbody tr:hover {
  background-color: #e0e0e0; /* Optional: hover effect */
}
</style>
