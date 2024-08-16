<template>
  <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
    마일리지 삭제
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
      readonly
    /><br />

    <div class="mt-3" style="text-align: left">기타사항</div>
    <textarea
      v-model="additionalNotes"
      class="input-base input-white"
      style="width: 800px; height: 200px; text-align: left"
      placeholder="기타 요청사항을 입력하세요."
    ></textarea>
  </div>
  <div style="text-align: right">
    <button class="btn-yellow mt-5 KB_S4" @click="submitForm">요청하기</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import api from '@/api/axios';

export default {
  name: 'MileageRequestWriteDelete',
  setup() {
    const store = useStore();
    const loginInfo = computed(() => store.getters['login/getLoginInfo']);
    const mileageLabel = computed(
      () => store.getters['mileage/getArrayMileage']
    );

    const request = ref(3);
    const mileageName = ref('');
    const additionalNotes = ref('');

    const getMileageNamePlaceholder = computed(() => {
      const mileNo = loginInfo.value.mile_no;
      const mileage = mileageLabel.value.find(
        (item) => item.mile_no.toString() === mileNo.toString()
      );
      return mileage
        ? `${mileage.mile_name}`
        : '추가 마일리지 이름을 입력하세요.';
    });

    const submitForm = async () => {
      const formData = {
        request_mile_name: mileageName.value,
        request_mil_max: '0',
        request_admin: ' ',
        request_etc: additionalNotes.value,
        request_no: request.value.toString(),
        user_no: loginInfo.value.user_no,
        mile_no: (loginInfo.value.mile_no || 0).toString(),
      };

      try {
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

    onMounted(() => {
      mileageName.value = getMileageNamePlaceholder.value;
    });

    return {
      mileageName,
      additionalNotes,
      getMileageNamePlaceholder,
      submitForm,
    };
  },
};
</script>

<style scoped>
.input-base {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-white {
  background-color: #fff;
}

.btn-yellow {
  background-color: #ffc107;
  border: none;
  padding: 10px 20px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.btn-yellow:hover {
  background-color: #e0a800;
}

.error-text {
  color: red;
  font-size: 12px;
}

.remove-icon {
  cursor: pointer;
  color: red;
}
</style>
