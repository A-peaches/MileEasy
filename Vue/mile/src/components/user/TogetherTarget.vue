<template>
  <div>
    <div class="row">
      <div v-for="(target, index) in adminTargets" :key="target.target_no" class="col-md-4 mb-3">
        <div class="p-3">
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 390px; height:300px; transition: transform 0.3s ease; border-radius: 1px; " class="mx-auto rounded-4 target-box">
          <!-- <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 410px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box"> -->
            <!-- 여기 하드코딩 한 부분 데이터 불러오기!! -->
             <!-- 목표 설정된 마일리지의 경우 -->
            <!-- <div v-if="index%2==0"> -->
              <div class="py-3" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: -10px;">
                <div style="display: flex; align-items: center;">
                   <span :class="getStatusClass(target)" class="status-label" style="margin-left: 20px;">{{ getStatusText(target) }}</span>
                   <div style="text-align: left; margin-left: 15px; margin-top: 10px; font-weight: bold; font-family: KB_C2; font-size: 15pt;" class="mb-2">
                     {{ target.mile_name }} 마일리지 
                   </div>
               </div>
                 <div style="display: flex; align-items: center;">
                  <i class="bi bi-person-vcard" style="margin-right: 15px; font-size:25px; color:#8c8c8c;"></i>
                  <span style="margin-right: 25px;">{{ target.participantCount }}</span>
                 </div>
             </div>
             <div class="py-3" style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 20px;">
              <span class="lg2" style="font-family: 'KB_C1'; font-size: 20px; margin-bottom: -25px;">그룹 달성률</span><br>
              <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%; margin-right: 10px;">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width: Math.min(target.achievementRate, 100) + '%', backgroundColor: '#FB773C'}"></div>
                </div>
                <span style="font-weight: bold; white-space: nowrap; font-family: 'KB_C2'; font-size: 25px; margin-right: 10px;">{{ Math.min(target.achievementRate, 100) }}%</span>
              </div>
              <span class="md" style="margin-top: 5px; font-size: 13px; font-family: 'KB_C2';">{{ target.start_date }} - {{ target.end_date }}</span>
            </div>
            <span class="lg2" style="font-family: 'KB_C1'; font-size: 17px; "> 🎯 나의 마일리지 / 목표 마일리지 </span>
              <div class="py-3">
                <span class="bold-x-lg" style="font-family: 'KB_C1';">{{ target.totalMileScoreByMileNo }} / {{target.target_mileage }}</span>
              </div>
            </div>
          <!-- </div> -->
            <!-- 목표 미설정된 마일리지의 경우 -->
            <!-- <div v-else style="background-color: #aeaeb2; height: 100%;" class="rounded-4">
              <div style="padding-top: 30%;">
                <span class="bold-x-lg">🎯</span><br><br>
                <span class="md" style="font-family: 'KB_C2'; color: #fff;">설정된 목표가 없습니다</span>
                <button class="btn-green mt-3" @click="goTogether">참여하기</button>
              </div>
            </div> -->
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import api from '@/api/axios';
export default {
  name: "TogetherTarget",
  data() {
    return {
      mileages: [],
      // backgroundColors: ["#FDF5F5", "#FBF4EE", "#FCFBF1", "#F4FBF2", "#F3FBFE", "#F5F5FF", "#FFF2FD", "#F4F4F4"],
      backgroundColors: ["#EEEEEE"],
    };
  },
  methods: {
    ...mapActions('target', ['fetchAdminTargets']),

    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo;
    },
  

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
      getStatusClass(target) {
    const currentDate = new Date();
    const startDate = new Date(target.start_date);
    const endDate = new Date(target.end_date);

    if (currentDate < startDate) {
      return 'upcoming';
    } else if (currentDate > endDate) {
      return 'completed';
    } else {
      return 'ongoing';
    }
  },
  getStatusText(target) {
    const currentDate = new Date();
    const startDate = new Date(target.start_date);
    const endDate = new Date(target.end_date);

    if (currentDate < startDate) {
      return '예정';
    } else if (currentDate > endDate) {
      return '종료';
    } else {
      return '진행중';
    }
  }
  },
  created() {
    console.log('isLoggedIn:', this.isLoggedIn);
    console.log('isChecked:', this.isChecked);

    this.fetchMileages();
    this.fetchAdminTargets(this.loginInfo.user_no);
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapState('login', ['loginInfo']),
    ...mapGetters('target', ['getAdminTargets']),
    adminTargets() {
      return this.getAdminTargets;
    }
    
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem; /* 하단 여백 추가 */
}
.target-box {
  transition: transform 0.3s ease;
  transform: translateX(-5px); /* 초기 상태에서 왼쪽으로 10px 이동 */
}
.target-box:hover {
  transform: translateX(-15px) scale(1.05); /* 호버 시 이동 상태 유지하며 확대 */
}
.status-label {
  display: inline-block;
  padding: 0.2em 0.6em;
  font-size: 12pt;
  font-family: KB_C2;
  /* font-weight: bold; */
  border-radius: 12px;
  margin-left: 10px; /* 마일리지 이름과 상태 라벨 사이의 간격 조정 */
}

.status-label.ongoing {
  background-color: #5cb85c; /* 초록색 - 진행중 */
  color: white;
}

.status-label.completed {
  background-color: #d9534f; /* 빨간색 - 종료 */
  color: white;
}

.status-label.upcoming {
  background-color: #f0ad4e; /* 주황색 - 예정 */
  color: white;
}


</style>