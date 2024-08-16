<template>
  <div class="mtip-container">
    <div class="row banner-profile-row">
      <div class="col-md-9 col-12">
        <Banner />
      </div>
      <div class="col-md-3 col-12">
        <Profile />
      </div>
    </div>
  </div>
  <div class="mtip-container">
    <Guide />
  </div>
  <div class="mtip-container">
    <div class="row">
      <div class="col-md-6 col-12">
        <MTip />
      </div>
      <div class="col-md-6 col-12">
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
  margin-left: 10%;
  margin-right: 10%;
  padding: 0 15px;
}

@media (max-width: 1200px) {
  .mtip-container {
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media (max-width: 768px) {
  .mtip-container {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
