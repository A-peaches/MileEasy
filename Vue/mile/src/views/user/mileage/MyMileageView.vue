
<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">나의 마일리지</h2>
    <div class="d-flex">
      <div class="cards w-48">

      </div>
    </div>
  </div>
</template>

<script>
import {  mapGetters } from 'vuex';
export default {
  name: 'MyMileageView',
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
  },
  data(){
    return{

    }
  },
  methods: {

    

  },
  created(){

  }
};
</script>

<style scoped>
.page-back {
  width: 70%;
  height: 140vh;
  margin-top: 5%;
}
</style>


