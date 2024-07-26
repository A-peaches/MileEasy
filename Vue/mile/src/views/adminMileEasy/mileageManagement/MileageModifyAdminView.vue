<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 관리</h2>
    <div>
      <div
        class="input-base input-search d-flex justify-content-center mx-auto my-3"
        style="width: 500px; background: #ebebeb"
      >
        <!-- Add 'active' class to make this button appear selected -->
        <button class="tab-container lg2 fw-bold active">마일리지 수정</button>
        <button class="tab-container lg2 fw-bold">개발요청</button>
      </div>
    </div>
    <p>현재 마일리지 번호: {{ mile_no }}</p>
    <div style="padding: 0 5%">
      <div class="p-4 mt-5 mx-auto"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MileageModifyAdminView',
  props: ['mile_no'],
  methods: {},
  computed: {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo() {
      return this.getLoginInfo;
    },
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
