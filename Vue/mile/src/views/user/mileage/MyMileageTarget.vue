<template>
    <div class="cards page-back mx-auto">
        <h2 class="bold-x-lg mt-5 mb-4" style="font-family: KB_C3">
        목표설정
        <hr
            style="width: 13%; border: 0; height: 2px; background: black"
            class="mx-auto"
        />
        </h2>
        
        <!-- 카테고리 목록 -->
        <div @click.stop="toggleCategory" class="QnA" ref="categoryButton">
            <div class="category-button list-wrapper" style="width: 10vw">
                {{ selectedCategory ? selectedCategory : '카테고리' }}
            </div>
            <div class="dropdown-menu" v-if="showCategory" ref="dropdownMenu">
                <div class="menu-items">
                <a class="dropdown-item" @click="filterByCategory(null)">전체</a>
                <a
                    class="dropdown-item"
                    v-for="mileage in mileages"
                    :key="mileage.mile_no"
                    @click="filterByCategory(mileage.mile_name)"
                >
                    {{ mileage.mile_name }} 마일리지
                </a>
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
import api from '@/api/axios';
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
            selectedCategory: '', // 선택된 카테고리
            showCategory: false, // 카테고리: 전체
            activeTab: 'together', // 기본 활성 탭 설정
        }
    },
    methods: {
        async fetchMileages() {
            // 마일리지 카테고리 가져오기
            try {
                const response = await api.get(
                'http://localhost:8090/notice/mileage'
                );
                this.mileages = response.data;
            } catch (error) {
                console.error(
                'Error fetching mileages:',
                error.response ? error.response.data : error.message
                );
            }
        },
        toggleCategory() {
            this.showCategory = !this.showCategory;
        },
        closeDropdown() {
            this.showCategory = false;
        },
        handleClickOutside(event) {
            if (
                this.$refs.dropdownMenu &&
                !this.$refs.dropdownMenu.contains(event.target) &&
                this.$refs.categoryButton &&
                !this.$refs.categoryButton.contains(event.target)
            ) {
                this.closeDropdown();
            }
        },
        filterByCategory(category) {
            this.selectedCategory = category !== null ? category : '';
            this.currentPage = 1;
            // this.loadTarget(); // 카테고리별 목표 설정 가져오기 
        },
        setActiveTab(tab) {
            this.activeTab = tab;
        },
    },
    created(){
        this.fetchMileages();
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
.page-back {
  width: 70%;
  height: 200vh;
  margin-top: 5%;
}

/* 드롭다운 메뉴 스타일 */
.QnA {
  position: relative;
  display: inline-block;
}

.category-button {
  background-color: #f9f9f9;
  border-radius: 25px;
  padding: 12px 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  font-size: 17pt;
  font-family: 'KB_S5', sans-serif;
  opacity: 0.8; /* 투명도 설정, 1은 불투명, 0은 완전 투명 */
}

.category-button:hover {
  cursor: pointer;
  /* background-color: #E1E3E4 !important; */
  transition: background-color 0.3s ease;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-wrapper {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-wrapper:hover {
  cursor: pointer;
  background-color: #e1e3e4 !important;
  transition: background-color 0.3s ease;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 240%;
  left: 50%;
  z-index: 1;
  border-color: #eeeeee;
  background-color: rgba(255, 255, 255, 0.69);
  border-radius: 15px;
  cursor: pointer;
  width: 230px; /* 드롭다운 메뉴의 너비를 픽셀 단위로 고정 */
  transform: translate(
    -50%,
    -17%
  ); /* 수평 위치 중앙 정렬, 수직 위치 위로 이동 */
}

.QnA:hover .dropdown-menu,
.QnA .dropdown-menu {
  display: block;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-items a {
  display: block;
  padding: 10px 20px; /* 상하 패딩과 좌우 패딩을 픽셀 단위로 설정 */
  text-decoration: none;
  color: #4b4a4a;
  font-family: 'KB_S5', sans-serif;
  font-size: 13pt; /* 텍스트 크기를 픽셀 단위로 설정 */
}

.menu-items a:hover {
  background-color: #f5f5f5;
  border: none; /* 테두리 제거 */
  border-radius: 25px;
  width: auto; /* 너비를 자동으로 설정 */
}
</style>