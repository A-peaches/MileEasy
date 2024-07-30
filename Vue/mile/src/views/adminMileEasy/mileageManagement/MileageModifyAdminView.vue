<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 수정</h2>
    <div>
      <div style="padding: 0 5%">
        <div class="p-4 mt-5 mx-auto">
          <div>
            <!--마일리지 이름, 마일리지 이름 폼-->
            <div style="text-align: left">마일리지 이름</div>
            <div style="text-align: left">
              <input type="text" class="input-base input-gray" readonly />
            </div>
          </div>
          <div><!--관리자--></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MileageModifyAdminView',
  data() {
    return {
      mile_no: null, // 쿼리 파라미터를 가져옴
    };
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
    },
  },

  created() {
    this.mile_no = this.$route.params.mile_no; // URL 파라미터를 mile_no 데이터 속성에 저장
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
  background-color: rgb(255, 255, 255);
}

.lg2 {
  font-size: 16px;
}

.fw-bold {
  font-weight: bold;
}
</style>
