<template>
  <div>
    <div class="row">
      <div v-for="(mileage, index) in mileages" :key="mileage.mile_no" class="col-md-4 mb-3">
        <div class="p-3">
          <div style="text-align: center; font-family: KB_C2; font-size: 16pt;" class="mb-2">{{ mileage.mile_name }} 마일리지</div>
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 250px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box">
            <!-- 여기 하드코딩 한 부분 데이터 불러오기!! -->
             <!-- 목표 설정된 마일리지의 경우 -->
            <div v-if="index%2==0">
              <div class="py-4">
                <span class="lg2" style="font-family: 'KB_C1';">목표기간</span><br>
                <span class="md">2024.08.06 - 2024.08.17</span>
              </div>
              <div class="py-3">
                <span class="lg2" style="font-family: 'KB_C1';">진행률</span><br>
                <div class="progress mx-auto" role="progressbar" aria-label="Animated striped example" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
                  <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" style="width: 60%"></div>
                </div>
              </div>
              <div class="py-3">
                <span class="bold-x-lg" style="font-family: 'KB_C1';">12 / 20</span>
              </div>
            </div>
            <!-- 목표 미설정된 마일리지의 경우 -->
            <div v-else style="background-color: #aeaeb2; height: 100%;" class="rounded-4">
              <div style="padding-top: 30%;">
                <span class="bold-x-lg">🎯</span><br><br>
                <span class="md" style="font-family: 'KB_C2'; color: #fff;">설정된 목표가 없습니다</span>
                <button class="btn-green mt-3" @click="goTogether">참여하기</button>
              </div>
            </div>
          </div>
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
.mb-3 {
  margin-bottom: 1rem; /* 하단 여백 추가 */
}
.target-box:hover {
  transform: scale(1.05); /* 호버 시 크기를 1.05배로 확대 */
}
</style>