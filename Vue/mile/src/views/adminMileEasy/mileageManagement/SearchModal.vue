<template>
  <div class="modals">
    <div class="modals-content" style="width: 500px; height: 400px">
      <span class="close" @click="$emit('close')">&times;</span>

      <span class="KB_S4" style="font-size: 19pt">직원검색</span>
      <br /><br />
      <input
        type="text"
        class="input-base input-gray"
        value=""
        placeholder="사번 또는 이름을 입력하세요"
        style="width: 300px"
      />
      <button class="btn-green">검색</button>
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

<style scoped>
.btn-green {
  box-shadow: 3px 5px 7px rgba(92, 92, 92, 0.3) !important;
}
</style>
