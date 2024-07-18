<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">마일리지 방문자 수</p>
    <div class="flex">
      <div class="cards favorite-card"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MileagePageConunt',
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {},
  watch: {},
  created() {},
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  display: flex;
  height: 300px;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}
.addImg {
  width: 18%;
}
</style>
