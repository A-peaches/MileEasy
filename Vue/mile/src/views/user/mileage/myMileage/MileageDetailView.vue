<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <div class="d-flex">
    <div class="back-container">
          <button class="back-button" @click="goBack">
            <span class="arrow">❮</span> 이전
          </button>
        </div>
    </div>
    <h2
      class="bold-x-lg mb-5 ml-5 help-icon"
      ref="helpIcon"
      style="font-family: KB_C3"
    >
      {{ mile_name }} 마일리지
    </h2>
    <div
      class="input-base input-search d-flex justify-content-center mx-auto my-3"
      style="width: 600px; background: #ebebeb"
    >
      <button
        class="tab-container lg3 fw-bold"
        :class="{ active: activeTab === 'status' }"
        @click="setActiveTab('status')"
      >
        취득현황
      </button>
      <button
        class="tab-container lg3 fw-bold"
        :class="{ active: activeTab === 'intro' }"
        @click="setActiveTab('intro')"
      >
        마일리지 소개
      </button>
      <button
        class="tab-container lg3 fw-bold"
        :class="{ active: activeTab === 'documents' }"
        @click="setActiveTab('documents')"
      >
        마일리지 문서
      </button>
    </div>
    <component
      :is="currentComponent"
      :mile_no="mile_no"
      @data-loaded="handleDataLoaded"
      class="my-5"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import MileDocument from '@/components/user/myMile/MileDocument.vue';
import MileIntro from '@/components/user/myMile/MileIntro.vue';
import MileStatusCom from '@/components/user/myMile/MileStatusCom.vue';
export default {
  name: 'MileageDetailView',
  components: {
    MileDocument,
    MileIntro,
    MileStatusCom,
  },
  props: ['mile_no'],
  data() {
    return {
      activeTab: 'status', // 기본 활성 탭 설정
      mile_name: null,
    };
  },
  methods: {
    ...mapActions('hitMile', ['hit_mile']),
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo && this.getIsChecked == true)) {
          window.location.href="/noAccess"
        } 
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    goBack() {
      this.$router.go(-1);
    },

    handleDataLoaded(data) {
      this.mile_name = data;
    },
  },
  mounted() {
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo','getIsChecked']),
    currentComponent() {
      switch (this.activeTab) {
        case 'status':
          return 'MileStatusCom';
        case 'intro':
          return 'MileIntro';
        case 'documents':
          return 'MileDocument';
        default:
          return 'MileStatusCom';
      }
    },
    watch: {},
  },
  created() {
    this.checkLoginInfo();
    this.hit_mile(this.mile_no);
  },
};
</script>

<style scoped>
@media (max-width: 370px) {
  .tab-container {
    height : 45px !important;
  }

 
   .input-search {
    height : 50px !important;
  }
  .input-base {
    height : 50px !important;
  }
}

</style>
