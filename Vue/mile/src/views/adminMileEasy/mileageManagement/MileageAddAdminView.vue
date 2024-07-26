<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">마일리지 관리</p>
      <div class="cards favorite-card"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MileageAddAdminView',

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
.flex {
  display: flex;
  flex-direction: row; /* 수평으로 나열 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: space-between; /* 양쪽 끝 정렬 */
  height: 100%;
  margin-bottom: 0px;
}
.favorite-card {
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cards {
  overflow: hidden;
}
</style>
