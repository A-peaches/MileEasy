<!--🚨사용자 m-tip 메인 화면-->
<template>
  <div>
    <div class="d-felx mx-auto">
        <Banner/>
        <Profile/>
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
