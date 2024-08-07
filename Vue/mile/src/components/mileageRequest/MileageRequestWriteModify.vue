<template>
  <!-- Existing template code -->
  <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
    마일리지 수정
  </h3>
  <div
    class="p-2"
    style="
      text-align: left;
      background-color: #f6f6f6;
      padding: 10px 140px 60px 140px !important;
    "
  >
    <div class="mt-5" style="text-align: left">마일리지 이름</div>
    <input
      v-model="mileageName"
      type="text"
      class="input-base input-white"
      style="width: 800px; text-align: left"
      :placeholder="getMileageNamePlaceholder"
    /><br />

    <div class="mt-3" style="text-align: left">마일리지 연간 최고 한도</div>
    <input
      v-model="mileMax"
      type="text"
      class="input-base input-white"
      style="width: 800px; text-align: left"
      :placeholder="getMileMaxPlaceholder"
    />

    <div class="mt-3" style="text-align: left">
      담당자 설정
      <i class="bi bi-plus-lg" @click="addRow"></i>
      <span v-if="!isRowsValid" class="error-text"
        >최소 한 명의 담당자를 설정해야 합니다.</span
      >
    </div>

    <table
      class="table table-bordered input-base"
      style="width: 800px; border-radius: 10px; background-color: white"
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
      style="width: 800px; height: 200px; text-align: left"
      placeholder="기타 요청사항을 입력하세요."
    />

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
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import SearchModal from './SearchModal.vue';
import api from '@/api/axios';

export default {
  name: 'MileageRequestWriteAdd',
  components: { SearchModal },
  setup() {
    const store = useStore();
    const loginInfo = computed(() => store.getters['login/getLoginInfo']);
    const mileageLabel = computed(
      () => store.getters['mileage/getArrayMileage']
    );

    const request = ref(2);
    const mileageName = ref('');
    const mileMax = ref('');
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

    const isMileageNameValid = computed(() => mileageName.value.trim() !== '');
    const isMileMaxValid = computed(() => mileMax.value.trim() !== '');
    const isCommonMileageValid = computed(() => commonMileage.value !== '');
    const isRowsValid = computed(() => validateRows());

    const getMileageNamePlaceholder = computed(() => {
      const mileNo = loginInfo.value.mile_no;
      const mileage = mileageLabel.value.find(
        (item) => item.mile_no.toString() === mileNo.toString()
      );
      return mileage
        ? `현재 마일리지 이름: ${mileage.mile_name}`
        : '추가 마일리지 이름을 입력하세요.';
    });

    const getMileMaxPlaceholder = computed(() => {
      const mileNo = loginInfo.value.mile_no;
      const mileage = mileageLabel.value.find(
        (item) => item.mile_no.toString() === mileNo.toString()
      );
      console.log('mileNo:', mileNo);
      console.log('mileageLabel:', mileageLabel.value);
      console.log('mileage:', mileage);
      return mileage
        ? `현재 연간 최고 한도: ${mileage.mile_max || '0'}`
        : '마일리지 연간 최고 한도를 입력하세요.';
    });

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

      // Perform validation checks
      if (!isRowsValid.value) {
        Swal.fire({
          icon: 'error',
          title: '입력 오류',
          text: '최소 한 명의 담당자를 설정해 주세요.',
          scrollbarPadding: false,
        });
        hasError = true;
      }

      // If there are errors, prevent form submission
      if (hasError) {
        return;
      }

      // If all validations pass, proceed with the form submission
      const formData = {
        request_is_branch: commonMileage.value === '1',
        request_mile_name: mileageName.value,
        request_mil_max: parseInt(mileMax.value, 10), // Updated to use mileMax
        request_admin: JSON.stringify(
          rows.value.map((row) => row.id) // Extract only user_no
        ),
        request_etc: additionalNotes.value,
        request_no: request.value, // Accessing request value using request.value
        user_no: loginInfo.value.user_no, // Adding user_no from loginInfo
        mile_no: loginInfo.value.mile_no,
      };

      try {
        // Send form data to the server
        const response = await api.post('/user/requestAdd', formData);
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

    // Fetch initial admin list when component is mounted
    onMounted(() => {
      getMileageAdminList();
    });

    const getMileageAdminList = async () => {
      try {
        const response = await api.post('/admin/getMileageAdminList', null, {
          params: {
            mile_no: loginInfo.value.mile_no,
          },
        });
        console.log('담당자 리스트:', response.data);
        if (response.data.length > 0) {
          rows.value = response.data.map((admin) => ({
            id: admin.user_no,
            name: admin.user_name,
            department: admin.dp_no || '부서 정보 없음',
            position: admin.position_no || '직급 정보 없음',
          }));
        }
      } catch (error) {
        console.error('Error fetching admin list:', error);
      }
    };

    return {
      mileageName,
      mileMax,
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
      isMileMaxValid,
      isCommonMileageValid,
      isRowsValid,
      validateRows,
      loginInfo,
      mileageLabel,
      getMileageNamePlaceholder,
      getMileMaxPlaceholder,
      getMileageAdminList, // Add getMileageAdminList to return object
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
}
.input-white {
  background-color: white;
}
.table {
  width: 100%;
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
</style>
