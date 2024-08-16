<template>
    <div class="cards page-back mx-auto">
      <div class="help-container">
        <h2 class="bold-x-lg mt-5 mb-4" style="font-family: KB_C3">
        목표설정
        <i
        class="bi bi-question-circle help-icon"
        @click="toggleHelpPopover"
        style="font-size: 20pt"
        ref="helpIcon"
         ></i>
        <!-- <hr
            style="width: 18%; border: 0; height: 2px; background: black"
            class="mx-auto"
        /> -->
        </h2>
        <div v-if="showHelpPopover" class="help-popover" ref="helpPopover">
          <div style="font-size: 12pt">
            <span>
              그룹 목표 100% 달성 시 마왕 점수가 상승하고, 개인 목표로 성장을 계획하세요.
            </span>
            <!-- <span>그룹 목표 달성 시 마왕 점수가 상승하며, 개인 목표 설정으로 계획적인 성장이 가능합니다.</span> -->
             <!-- <span>그룹 목표 달성으로 마왕 점수를 올리고, 개인 목표 설정으로 계획적인 성취를 이루세요.</span> -->
          </div>
        </div>
      </div>
        <div
        class="input-base input-search d-flex justify-content-center mx-auto my-5"
        style="width: 600px; background: #ebebeb;"
        >
        <button
            class="tab-container lg2 fw-bold"
            :class="{ active: activeTab === 'together' }"
            @click="setActiveTab('together')"
        >
            참여형
        </button>
        <button
            class="tab-container lg2 fw-bold"
            :class="{ active: activeTab === 'personal' }"
            @click="setActiveTab('personal')"
        >
            개인형
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
// import api from '@/api/axios';
import TogetherTarget from '@/components/user/TogetherTarget.vue';
import PersonalTarget from '@/components/user/PersonalTarget.vue';
export default {
name: 'MyMileageTarget',
components: {
    TogetherTarget,
    PersonalTarget
},
    data(){
        return{
            activeTab: 'together', // 기본 활성 탭 설정
            showHelpPopover: false,
        }
    },
    methods: {
            setActiveTab(tab) {
        this.activeTab = tab;
        this.$router.push({ query: { tab: tab } }); // 라우터에 탭 정보 추가
        },
        toggleHelpPopover(event) {
        event.stopPropagation();
        console.log("toggleHelpPopover 클릭");
        this.showHelpPopover = !this.showHelpPopover;
        console.log("showHelpPopover:", this.showHelpPopover);
        if (this.showHelpPopover) {
          document.addEventListener("click", this.handleClickOutside);
        } else {
          document.removeEventListener("click", this.handleClickOutside);
        }
      },
      handleClickOutside(event) {
      console.log("handleClickOutside 실행");
      if (
        this.$refs.helpPopover &&
        !this.$refs.helpPopover.contains(event.target) &&
        !this.$refs.helpIcon.contains(event.target)
      ) {
        console.log("팝오버 닫기");
        this.showHelpPopover = false;
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    },
    created(){
        
    },
    computed: {
    currentComponent() {
      switch (this.activeTab) {
        case 'together':
          return 'TogetherTarget';
        case 'personal':
          return 'PersonalTarget';
        default:
          return 'TogetherTarget';
      }
    },
},
    watch: {
    '$route.query.tab': {
      immediate: true,
      handler(newTab) {
        if (newTab) {
          this.activeTab = newTab;
            }
        }
      }
    },
};
</script>

<style scoped>
.page-back {
  padding-left: 2% !important;
  padding-right: 2% !important;
}
.help-container {
  position: relative;
  display: inline-block;
}
.help-icon {
  cursor: pointer;
  /* position: relative;
  display: inline-block; */
  margin-left: 20px; /* 아이콘과 텍스트 사이 간격 */
  /* vertical-align: middle; */
}
.help-popover {
  position: absolute;
  left:  calc(50%);
  top: calc(100% - 15px); /* 아이콘 바로 아래에 위치 */
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  width: 600px; /* 너비를 600px로 설정 */
  background-color: white;
  border: 2px solid #e4e4e4;
}
</style>