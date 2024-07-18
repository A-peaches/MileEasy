<template>
  <div class="cards" style="background-color: #f9f9f9; height: 430px">
    <div class="chartTitle">
      <p class="text-left lg2 KB_C2">페이지 방문자 수</p>
    </div>

    <div class="notice">
      <p class="text-right md KB_C2 brown">최근 일주일간 방문자 수</p>
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

<style scope></style>
