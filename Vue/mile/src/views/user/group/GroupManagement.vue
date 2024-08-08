<template>
<div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">그룹 마일리지 관리</h2>

        <!-- 날짜 선택 -->
        <div class="d-flex justify-content-end align-items-center" style="margin-top: 10vh; padding-left: 3%; padding-right: 3%;">
      <Datepicker  v-model="selectedDate" :format="formatDate" style="width:25%"></Datepicker>
    </div>
</div>
</template>


  
<script>
import Datepicker from '@vuepic/vue-datepicker';
import {  mapGetters } from 'vuex';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'GroupManagement',
  data() {
    return {
    selectedDate: null,
    }
  },
  components: {
    Datepicker
  },
  methods : {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  computed : {
    ...mapGetters('login', ['getLoginInfo']),

    loginInfo(){
      return this.getLoginInfo;
    },
  }
};
</script>

<style scoped>
.page-back {
  width: 70%;
  height: 100%;
  margin-top: 5%;
  padding-bottom :5%;
}
</style>