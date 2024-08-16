<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">업무별 연락처</h2>
    <div
      class="input-base input-search d-flex justify-content-center mx-auto my-3"
    >
      <button
        class="tab-container lg2 fw-bold"
        :class="{ active: activeTab === 'mileage' }"
        @click="setActiveTab('mileage')"
      >
        마일리지 담당자
      </button>
      <button
        class="tab-container lg2 fw-bold"
        :class="{ active: activeTab === 'mileEasy' }"
        @click="setActiveTab('mileEasy')"
      >
        운영 관리자
      </button>
    </div>
    <component
      :is="currentComponent"
      @data-loaded="handleDataLoaded"
      class="my-5"
    ></component>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';
import MileageContact from '@/components/contact/MileageContact.vue';
import MileEasyContact from '@/components/contact/MileEasyContact.vue';

export default {
  name: 'MileEasyContactView',
  components: {
    MileageContact,
    MileEasyContact,
  },
  data() {
    return {
      activeTab: 'mileage', // 기본 활성 탭 설정
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  computed: {
    currentComponent() {
      switch (this.activeTab) {
        case 'mileage':
          return 'MileageContact';
        case 'mileEasy':
          return 'MileEasyContact';
        default:
          return 'MileageContact';
      }
    },
    watch: {},
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .input-search {
    width: 380px !important; 
    background: #ebebeb;
  }
}

.input-search {
  width: 600px; 
  background: #ebebeb;
}
</style>
