<!--🚨사용자 m-tip 메인 화면-->
<template>
  
  <div class="mtip-container" >
    <div class="row">
      <div class="col-md-8" style="width:75%">
        <Banner/>
      </div>
      <div class="col-md">
        <Profile/>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/components/m-tip/ProfileCom.vue'
import Banner from '@/components/m-tip/BannerCom.vue'

export default {
  name: 'M_TipMainView',
  components : {
    Profile, Banner
  }
};
</script>

<style scoped>
.mtip-container {
  margin-left:190px;
   margin-right:190px;
}
</style>