<!--🚨사용자 m-tip 메인 화면-->
<template>
  <div class="mtip-container">
    <div class="row">
      <div class="col-md-8" style="width: 75%">
        <Banner />
      </div>
      <div class="col-md">
        <Profile />
      </div>
    </div>
  </div>
  <div class="mtip-container">
    <Guide />
  </div>

  <div class="mtip-container">
    <div class="row">
      <div class="col-md-5" style="width: 50%">
        <MTip />
      </div>
      <div class="col-md-5" style="width: 50%">
        <BestMTip />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/components/m-tip/ProfileCom.vue';
import Banner from '@/components/m-tip/BannerCom.vue';
import Guide from '@/components/m-tip/GuideCom.vue';
import MTip from '@/components/m-tip/M-TipCom';
import BestMTip from '@/components/m-tip/BestM-TipCom';

export default {
  name: 'M_TipMainView',
  components: {
    Profile,
    Banner,
    Guide,
    MTip,
    BestMTip,
  },
};
</script>

<style scoped>
.mtip-container {
  margin-left: 190px;
  margin-right: 190px;
}
</style>
