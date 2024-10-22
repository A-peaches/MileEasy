<template>
  <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
    마일리지 요청
  </h3>
  <div class="p-2">
    <div class="yn" style="text-align: left">
      마일리지 공통여부
      <span v-if="!isCommonMileageValid" class="error-text">
        필수 선택 항목입니다.
      </span>
    </div>

    <div class="form-check form-check-inline mt-1">
      <input
        class="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio1"
        value="0"
        v-model="commonMileage"
      />
      <label class="form-check-label" for="inlineRadio1">공통</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        id="inlineRadio2"
        value="1"
        v-model="commonMileage"
      />
      <label class="form-check-label" for="inlineRadio2">영업점</label>
    </div>

    <div class="mt-3" style="text-align: left">
      마일리지 이름
      <span v-if="!isMileageNameValid" class="error-text">
        필수 입력 항목입니다.
      </span>
    </div>
    <input
      v-model="mileageName"
      type="text"
      class="input-base input-white"
      style="text-align: left"
      placeholder="추가 마일리지 이름을 입력하세요."
    /><br />

    <div class="mt-3" style="text-align: left">
      마일리지 연간 최고 한도
      <span v-if="!isAnnualLimitValid" class="error-text">
        필수 입력 항목입니다.
      </span>
    </div>
    <input
      v-model="annualLimit"
      type="text"
      class="input-base input-white"
      style="text-align: left"
      placeholder="마일리지 연간 최고 한도를 입력하세요."
    />

    <div class="mt-3" style="text-align: left">
      담당자 설정

      <i class="bi bi-plus-lg" @click="addRow"></i>
      <span v-if="!isRowsValid" class="error-text">
        최소 한 명의 담당자를 설정해야 합니다.
      </span>
    </div>

    <table
      class="table table-bordered input-base"
      style="border-radius: 10px; background-color: white"
    >
      <tr>
        <td>번호</td>
        <td>사번</td>
        <td>이름</td>
        <td>부서</td>
        <td>직급</td>
        <td>삭제</td>
      </tr>
      <tr
        v-for="(row, index) in rows"
        :key="index"
        @click="openModal(row)"
        style="cursor: pointer"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.department }}</td>
        <td>{{ row.position }}</td>
        <td>
          <i
            v-if="rows.length > 1"
            class="bi bi-dash-lg remove-icon"
            @click.stop="removeRow(index)"
          ></i>
        </td>
      </tr>
    </table>

    <div class="mt-3" style="text-align: left">기타사항</div>
    <textarea
      v-model="additionalNotes"
      class="input-base input-white"
      style="text-align: left"
      placeholder="기타 요청사항을 입력하세요."
    ></textarea>

    <div class="mt-3" style="text-align: left; color: gray">
      * 마일리지 요청 페이지는 마일리지 추가 및 가중치 변경 등 마일리지에 관한
      내용을 요청하는 페이지입니다.
    </div>

    <!-- 모달 컴포넌트 -->
    <SearchModal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :mileName="selectedRow?.name"
      :mileNo="selectedRow?.id"
      @user-selected="updateRow"
      @close="closeModal"
    />
  </div>

  <div style="text-align: right">
    <button class="btn-yellow mt-5 KB_S4" @click="submitForm">요청하기</button>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import SearchModal from './SearchModal.vue';
import api from '@/api/axios';
import { useStore } from 'vuex';

export default {
  name: 'MileageRequestWriteAdd',
  components: { SearchModal },
  setup() {
    const store = useStore();
    const request = ref(1);
    const mileageName = ref('');
    const annualLimit = ref('');
    const commonMileage = ref('');
    const additionalNotes = ref('');
    const rows = ref([
      {
        id: '',
        name: '',
        department: '',
        position: '',
      },
    ]);
    const isModalOpen = ref(false);
    const selectedRow = ref(null);
    const selectedRowIndex = ref(null);

    const loginInfo = computed(() => store.getters['login/getLoginInfo']);

    const isMileageNameValid = computed(() => mileageName.value.trim() !== '');
    const isAnnualLimitValid = computed(() => annualLimit.value.trim() !== '');
    const isCommonMileageValid = computed(() => commonMileage.value !== '');
    const isRowsValid = computed(() => validateRows());

    const addRow = () => {
      rows.value.push({ id: '', name: '', department: '', position: '' });
    };

    const removeRow = (index) => {
      if (rows.value.length > 1) {
        rows.value.splice(index, 1);
      }
    };

    const openModal = (row) => {
      selectedRow.value = row;
      selectedRowIndex.value = rows.value.indexOf(row);
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedRow.value = null;
      selectedRowIndex.value = null;
    };

    const updateRow = (user) => {
      if (selectedRowIndex.value !== null) {
        rows.value[selectedRowIndex.value] = {
          id: user.user_no || '',
          name: user.user_name || '',
          department: user.dp_no || '부서 정보 없음',
          position: user.position_no || '직급 정보 없음',
        };
      } else {
        console.error('선택된 행이 없습니다.');
      }
    };

    const validateRows = () => {
      return rows.value.some(
        (row) => row.id.trim() !== '' && row.name.trim() !== ''
      );
    };

    const submitForm = async () => {
      let hasError = false;

      if (!isCommonMileageValid.value) {
        Swal.fire({
          icon: 'error',
          title: '입력 오류',
          text: '마일리지 공통여부는 필수 선택 항목입니다.',
          scrollbarPadding: false,
        });
        hasError = true;
      }
      if (!isMileageNameValid.value) {
        Swal.fire({
          icon: 'error',
          title: '입력 오류',
          text: '마일리지 이름은 필수 입력 항목입니다.',
          scrollbarPadding: false,
        });
        hasError = true;
      }
      if (!isAnnualLimitValid.value) {
        Swal.fire({
          icon: 'error',
          title: '입력 오류',
          text: '마일리지 연간 최고 한도는 필수 입력 항목입니다.',
          scrollbarPadding: false,
        });
        hasError = true;
      }
      if (!isRowsValid.value) {
        Swal.fire({
          icon: 'error',
          title: '입력 오류',
          text: '최소 한 명의 담당자를 설정해 주세요.',
          scrollbarPadding: false,
        });
        hasError = true;
      }

      if (hasError) {
        return;
      }

      const formData = {
        request_is_branch: commonMileage.value === '1' ? '1' : '0',
        request_mile_name: mileageName.value,
        request_mil_max: annualLimit.value,
        request_admin: JSON.stringify(rows.value.map((row) => row.id)),
        request_etc: additionalNotes.value,
        request_no: request.value.toString(), // 문자열로 변환
        mile_no: (loginInfo.value.mile_no || 0).toString(), // 문자열로 변환
        user_no: loginInfo.value.user_no,
      };

      try {
        const response = await api.post('/user/requestAdd', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        Swal.fire({
          icon: 'success',
          title: '성공',
          text: '요청이 성공적으로 제출되었습니다.',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/mileageRequesList'; // 성공 시 페이지 이동
          }
        });
        console.log(response.data);
        // 성공 시 페이지 이동
      } catch (error) {
        console.error('Error submitting form:', error);
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '요청을 제출하는 동안 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
          scrollbarPadding: false,
        });
      }
    };

    return {
      request,
      mileageName,
      annualLimit,
      commonMileage,
      additionalNotes,
      rows,
      isModalOpen,
      selectedRow,
      selectedRowIndex,
      addRow,
      removeRow,
      openModal,
      closeModal,
      updateRow,
      submitForm,
      isMileageNameValid,
      isAnnualLimitValid,
      isCommonMileageValid,
      isRowsValid,
      validateRows,
      loginInfo, // Return loginInfo to use in template if needed
    };
  },
};
</script>

<style scoped>
.btn-yellow {
  cursor: pointer;
}

.remove-icon {
  color: red;
  cursor: pointer;
  background-color: transparent;
}
.input-base {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 800px;
}
.input-white {
  background-color: white;
}
.table {
  width: 800px;
  border-collapse: collapse;
}
.table-bordered td {
  border: 1px solid #ddd;
}
.error-text {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}
.required-label {
  color: red;
  font-size: 12px;
}
.form-check-input:checked {
  background-color: #ffc107;
  border-color: #ffc107;
}
.p-2 {
  text-align: left;
  background-color: #f6f6f6;
  padding: 10px 140px 60px 140px !important;
  width: auto;
}
.yn {
  margin-top: 2em;
}
textarea {
  width: 800px;
  height: 200px;
}

@media (max-width: 768px) {
  .p-2 {
    padding: 30px 15px 5px 15px !important;
    margin-left: 0px;
  }
  .p-4 {
    padding: 0rem !important;
  }
  .p-3 {
    display: none;
  }
  .yn {
    margin-top: 0px;
  }
  .input-base {
    width: 100%;
    height: 40px;
  }
  .table {
    width: 100%;
  }
  textarea {
    width: 100%;
  }
  .back-button {
    font-size: 12px;
    padding: 3px 6px;
  }

  .back-button .arrow {
    width: 35px;
    height: 25px;
    font-size: 12px;
    margin-right: 4px;
  }

  .back-container {
    padding: 0.5rem;
  }
}
</style>
