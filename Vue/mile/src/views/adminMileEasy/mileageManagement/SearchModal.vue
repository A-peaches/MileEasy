<template>
  <div class="modals">
    <div class="modals-content" style="width: 500px">
      <span class="close" @click="$emit('close')">&times;</span>

      <span class="KB_S4" style="font-size: 19pt">직원검색</span>
      <br /><br />
      <input
        type="text"
        class="input-base input-gray"
        value=""
        placeholder="사번 또는 이름을 입력하세요"
        style="width: 300px"
      /><i class="bi bi-search" style="font-size: 17pt; margin-left: 10px"></i>
      <div style="margin-top: 30px; margin-left: 50px">
        <div style="text-align: left">김근미(1653521) 신현동지점</div>
        <div style="text-align: left">김근미(1653520) 신현동지점</div>
        <div style="text-align: left">김근미(1653521) 신현동지점</div>
        <div style="text-align: left">김근미(1653520) 신현동지점</div>
        <div style="text-align: left">김근미(1653521) 신현동지점</div>
        <div style="text-align: left">김근미(1653520) 신현동지점</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
  },
  methods: {},
};
</script>

<style scoped></style>
