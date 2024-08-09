<template>
    <div class="cards page-back mx-auto">
        <h2 class="bold-x-lg mt-5 mb-4" style="font-family: KB_C3">
        목표설정
        <hr
            style="width: 13%; border: 0; height: 2px; background: black"
            class="mx-auto"
        />
        </h2>

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
        }
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
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
    watch: {},
  },
};
</script>

<style scoped>

</style>