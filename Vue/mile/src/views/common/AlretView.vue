<template>
    <div>
      <!-- 이 컴포넌트는 실제로 아무것도 렌더링하지 않습니다 -->
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  
  export default {
    name: 'SweetAlertView',
    mounted() {
      this.showAlert()
    },
    methods: {
      showAlert() {
        Swal.fire({
          title: '접근 불가',
          text: '로그인이 필요하거나 권한이 없는 페이지입니다.',
          icon: 'error',
          confirmButtonText: '이전페이지로',
          scrollbarPadding: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // 확인 버튼을 클릭한 경우 로그인 페이지로 이동
            this.$router.go(-1)
          }
        })
      }
    }
}
  </script>

