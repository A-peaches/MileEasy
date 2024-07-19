<template>
  <div class="about">
    <h1>소비자지원 마일리지</h1>
    <h3>취득현황</h3>
    <h3>마일리지 소개</h3>
    <h3>마일리지 문서</h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'ConsumerSupportView',
  data() {
    return {
      mile_no: 7,
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
