<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <p class="text-left lg2 KB_C2">페이지 방문자 수</p>
    <div class="flex">
      <div class="cards favorite-card">
        <div>
          <p class="text-right brown md KB_C2">최근 일주일 간 방문자 수</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageCount',
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
}
.addImg {
  width: 18%;
}
</style>
