<template>
  <div>
      {{mile_no}} : 이것은 마일리지 넘버 ! 요기는 마일 스테이터스!
  </div>
</template>

<script>
import {  mapGetters } from "vuex";

export default {
  name: "AttendanceCom",
  props: ['mile_no'],
  data() {
    return {

    };
  },
  methods: {


  },
  mounted() {
  // mile_no를 사용할 수 있습니다.
  console.log('Mile No:', this.mile_no);
},
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),


  },
  watch: {
  }
};
</script>