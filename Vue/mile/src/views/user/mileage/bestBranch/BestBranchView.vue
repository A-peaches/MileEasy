<template>
  <div class="about">
    <h1>베스트 지점 마일리지</h1>
    <h3>취득현황</h3>
    <h3>마일리지 소개</h3>
    <h3>마일리지 문서</h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'BestBranchView',
  data() {
    return {
      mile_no: 6,
    };
  },
  created() {
    this.hit_mile(this.mile_no);
  },
  methods: {
    ...mapActions('hitMile', ['hit_mile']),
  },
};
</script>
