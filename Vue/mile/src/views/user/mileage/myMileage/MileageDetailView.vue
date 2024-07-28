<template>
  <div class="cards page-back mx-auto" style="color: #4b4a4a">
    <h2
      class="bold-x-lg my-5 ml-5 help-icon"
      ref="helpIcon"
      style="font-family: KB_C3"
    >
      {{ mile_no }} 마일리지
    </h2>
    <div class="input-base input-search d-flex justify-content-center mx-auto my-3" style="width: 600px; background: #ebebeb">
      <button class="tab-container lg2 fw-bold" :class="{ active: activeTab === 'status' }" @click="setActiveTab('status')">취득현황</button>
      <button class="tab-container lg2 fw-bold" :class="{ active: activeTab === 'intro' }" @click="setActiveTab('intro')">마일리지 소개</button>
      <button class="tab-container lg2 fw-bold" :class="{ active: activeTab === 'documents' }" @click="setActiveTab('documents')">마일리지 문서</button>
    </div>
    <component :is="currentComponent" :mile_no="mile_no" class="my-5"></component>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import MileDocument from "@/components/user/myMile/MileDocument.vue";
import MileIntro from "@/components/user/myMile/MileIntro.vue";
import MileStatusCom from "@/components/user/myMile/MileStatusCom.vue";
export default {
  name: "MileageDetailView",
  components: {
    MileDocument,
    MileIntro,
    MileStatusCom,
  },
  props: ["mile_no"],
  data() {
    return {
      activeTab: "status", // 기본 활성 탭 설정
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  mounted() {
    // mile_no를 사용할 수 있습니다.
    console.log("Mile No:", this.mile_no);
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    currentComponent() {
      switch (this.activeTab) {
        case "status":
          return "MileStatusCom";
        case "intro":
          return "MileIntro";
        case "documents":
          return "MileDocument";
        default:
          return "MileStatusCom";
      }
    },
    watch: {},
  },
};
</script>
  
<style scoped>
.page-back {
  width: 70%;
  height: 100%;
  margin-top: 5%;
}
</style>
  