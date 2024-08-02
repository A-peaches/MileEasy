<template>
  <div class="modals">
    <div class="modals-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <p class="lg2 KB_S4 mb-3" style="margin-bottom: 0px">
        Jump UP 배지 디자인 변경
      </p>

      <input type="file" @change="onFileChange" />
      <button @click="uploadFile">파일 업로드</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      isModal2Open: false,
      file: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) {
        // 파일이 선택되지 않았을 경우 처리
        Swal.fire('파일 오류', '파일을 먼저 선택해주세요.', 'warning');
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('name', 'jump.jpg');
      try {
        await api.post('/admin/badgeUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire('성공', '파일 업로드가 완료되었습니다.', 'success');
        this.$emit('close'); // 모달 닫기 이벤트 발생
      } catch (error) {
        Swal.fire('실패', '파일 업로드가 실패하였습니다.', 'error');
      }
    },
  },
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
}
.modals-content {
  height: 200px;
}
</style>
