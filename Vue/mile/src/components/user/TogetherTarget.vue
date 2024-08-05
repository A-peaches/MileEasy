<template>
  <div>
    <div class="row">
      <div v-for="(mileage, index) in mileages" :key="mileage.mile_no" class="col-md-4 mb-3">
        <div class="p-2">
          <div style="text-align: center; font-family: KB_C2; font-size: 16pt;" class="mb-2">{{ mileage.mile_name }} 마일리지</div>
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 250px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import api from '@/api/axios';
export default {
  name: "TogetherTarget",
  data() {
    return {
      mileages: [],
      backgroundColors: ["#FDF5F5", "#FBF4EE", "#FCFBF1", "#F4FBF2", "#F3FBFE", "#F5F5FF", "#FFF2FD", "#F4F4F4"],

    };
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
  },
  created() {
    this.fetchMileages();
  },
  computed: {
    
  },
};
</script>

<style scoped>
.highlight {
  background-color: #CFD4E7;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8px; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
}
.highlight:hover {
  cursor: pointer;
}
.mb-3 {
  margin-bottom: 1rem; /* 하단 여백 추가 */
}
.target-box:hover {
  transform: scale(1.05); /* 호버 시 크기를 1.05배로 확대 */
}
</style>