<template>
  <div class="modals">
    <div class="modals-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <p class="lg2 KB_S4 mb-3" style="margin-bottom: 0px">
        Jump UP 배지 디자인 변경
      </p>
      <br />
      <input type="file" @change="onFileChange" />
      <button @click="uploadFile">파일 업로드</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      isModal2Open: false,
      file: null,
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

    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) {
        // 파일이 선택되지 않았을 경우 처리
        Swal.fire({
          title: '파일 오류', // 타이틀
          text: '파일을 먼저 선택해주세요.', // 텍스트
          icon: 'warning', // 아이콘 종류 (warning, error, info 등)
          scrollbarPadding: false, // 스크롤바가 사라질 때 패딩을 추가하지 않음
        });

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

        Swal.fire({
          title: '성공',
          text: '파일 업로드가 완료되었습니다.',
          icon: 'success',
          scrollbarPadding: false, // 스크롤바가 사라질 때 패딩을 추가하지 않음
        });

        this.$emit('close'); // 모달 닫기 이벤트 발생
      } catch (error) {
        Swal.fire({
          title: '실패', // 팝업의 제목
          text: '파일 업로드가 실패하였습니다.', // 팝업의 내용
          icon: 'error', // 팝업의 아이콘 유형 (success, error, warning, info, question)
          scrollbarPadding: false, // 스크롤바가 사라질 때 패딩을 추가하지 않음
        });
      }
    },
  },
  created() {
    this.checkLoginInfo();
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
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
