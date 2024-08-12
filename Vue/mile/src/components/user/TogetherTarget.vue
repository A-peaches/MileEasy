<template>
  <div>
    <div class="d-flex justify-content-start align-items-center mb-5" style="margin-left: 5%;">
    <div class="radio-container p-3 lg2 mr-3">
      <!-- 총 건수 -->
      <div style="display: flex; align-items: center;">
        <span style="font-family: 'KB_C2'; font-size: 18px; margin-left: -40px; margin-right: 25px; margin-bottom: 2px; color: #333;">
          총 {{ totalTargetsCount }}건
        </span>
      </div>
      <input class="radio-input" type="radio" name="targetList" id="finished" value="finished" v-model="sortBy" />
      <label class="radio-label" for="finished">
        <span class="custom-radio"></span>
        종료
      </label>
    </div>
  <div class="radio-container p-3 lg2">
      <input class="radio-input" type="radio" name="targetList" id="notFinished" value="not-finished" v-model="sortBy" />
      <label class="radio-label" for="notFinished">
        <span class="custom-radio"></span>
        진행중
      </label>
    </div>
  </div>
    <div v-if="!isLoading" class="row">
      <div v-for="(target, index) in displayedTargets" :key="target.target_no" class="col-md-4 mb-3">
        <div class="p-3">
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 370px; height:320px; transition: transform 0.3s ease; border-radius: 1px; " class="mx-auto rounded-4 target-box">
          <!-- <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 410px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box"> -->
            <!-- 여기 하드코딩 한 부분 데이터 불러오기!! -->
             <!-- 목표 설정된 마일리지의 경우 -->
            <!-- <div v-if="index%2==0"> -->
              <div class="py-3" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: -10px;">
                <div style="display: flex; align-items: center; flex: 1;">
                   <span :class="getStatusClass(target)" class="status-label" style="margin-left: 20px;">{{ getStatusText(target) }}</span>
                   <div style="text-align: left; margin-left: 10px; margin-top: 10px; font-weight: bold; font-family: KB_C2; font-size: 13pt;" class="mb-2">
                     {{ target.mile_name }} 마일리지 
                   </div>
               </div>
                
      
               <!-- <div style="display: flex; align-items: center; justify-content: flex-end; width: 100px;">
                <template v-if="isUserParticipating(target.target_no)">
                  <i class="bi bi-person-vcard" style="margin-right: 12px; margin-bottom: 2px; font-size:25px; color:#8c8c8c;"></i>
                  <span style="margin-right: 25px;">{{ target.participantCount }}</span>
                </template>
                <template v-else-if="getStatusText(target) === '진행중'">
                  <button @click="joinTarget(target.target_no)" class="btn join-button" >참여하기 ></button>
                </template>
                 </div> -->

                 <!-- <div style="display: flex; align-items: center; justify-content: flex-end; width: 100px; position: relative; overflow: hidden;">
                    <div :class="['participation-info', { 'show': isUserParticipating(target.target_no) }]">
                      <i class="bi bi-person-vcard" style="margin-right: 12px; margin-bottom: 2px; font-size:25px; color:#8c8c8c;"></i>
                      <span style="margin-right: 25px;">{{ target.participantCount }}</span>
                    </div>
                    <button 
                      @click="joinTarget(target.target_no)" 
                      :class="['btn join-button', { 'hide': isUserParticipating(target.target_no) }]"
                      :disabled="getStatusText(target) !== '진행중'"
                    >
                      참여하기 >
                    </button>
                  </div>  -->
          
                  <!-- <div style="display: flex; align-items: center; justify-content: flex-end; width: 100px; position: relative; overflow: hidden;">
                  <div v-if="isUserParticipating(target.target_no)" class="participation-info show">
                    <i class="bi bi-person-vcard" style="margin-right: 12px; margin-bottom: 2px; font-size:25px; color:#8c8c8c;"></i>
                    <span style="margin-right: 25px;">{{ target.participantCount }}</span>
                  </div>
                  <button 
                    v-else
                    @click="joinTarget(target.target_no)" 
                    class="btn join-button"
                    :disabled="getStatusText(target) !== '진행중'"
                  >
                    참여하기 >
                  </button>
                </div> -->

                <div style="display: flex; align-items: center; justify-content: flex-end; width: 100px; position: relative; overflow: hidden;">
                  <div v-if="isUserParticipating(target.target_no)" class="participation-info">
                    <i class="bi bi-person-vcard" style="margin-right: 12px; margin-bottom: 2px; font-size:25px; color:#8c8c8c;"></i>
                    <span style="margin-right: 25px;">{{ target.participantCount }}</span>
                  </div>
                  <button 
                    v-else
                    @click="joinTarget(target.target_no)" 
                    class="join-button"
                    :disabled="getStatusText(target) !== '진행중'"
                  >
                    참여하기 >
                  </button>
                </div>
             </div>
             <div class="py-3" style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 20px;">
              <span class="lg2" style="font-family: 'KB_C1'; font-size: 20px; margin-bottom: -25px;">그룹 달성률</span><br>
              <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%; margin-right: 10px;">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width: Math.min(target.achievementRate, 100) + '%', backgroundColor: '#FB773C '}"></div>
                </div>
                <span style="font-weight: bold; white-space: nowrap; font-family: 'KB_C2'; font-size: 25px; margin-right: 10px;">{{ Math.min(target.achievementRate, 100) }}%</span>
              </div>
              <span class="md" style="margin-top: 5px; font-size: 13px; font-family: 'KB_C2';">{{ target.start_date }} - {{ target.end_date }}</span>
            </div>
            <span class="lg2" style="font-family: 'KB_C1'; font-size: 17px; "> 🎯 나의 마일리지 / 목표 마일리지 </span>
              <div class="py-3">
                <span class="bold-x-lg" style="font-family: 'KB_C1';">
                  <span class="highlight-score">{{ target.totalMileScoreByMileNo }}</span>  / {{target.target_mileage }}</span>
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
    <div v-else>
      로딩 중...
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
      backgroundColors: ["#F5F5F5"],
      sortBy: 'not-finished',
      isUserParticipated: {}, // 참여 여부를 저장하는 객체 추가
      userParticipatedTargets: JSON.parse(localStorage.getItem('userParticipatedTargets') || '[]'),
       isLoading: true,
    };
  },
  methods: {
    ...mapActions('target', ['fetchAdminTargets','joinTarget','checkParticipation']),

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
    },
    sortTargets(targets) {
      return targets.sort((a, b) => {
        const statusA = this.getStatusText(a);
        const statusB = this.getStatusText(b);
        if (statusA === '진행중' && statusB !== '진행중') return -1;
        if (statusA !== '진행중' && statusB === '진행중') return 1;
        if (statusA === '예정' && statusB !== '예정') return -1;
        if (statusA !== '예정' && statusB === '예정') return 1;
        return 0;
      });
    },
  filteredTargets(filter) {
      const currentDate = new Date();
      return this.adminTargets.filter(target => {
        const endDate = new Date(target.end_date);
        if (filter === 'finished') {
          return currentDate > endDate;
        } else {
          return currentDate <= endDate;
        }
      });
    },
    sortedAdminTargets(targets) {
    return targets.sort((a, b) => a.mile_no - b.mile_no);
  },
  async checkParticipation(targetNo) {
    try {
        const response = await this.$store.dispatch('target/checkParticipation', {
            targetNo,
            userNo: this.loginInfo.user_no,
        });
        console.log(`8. Checking participation for target ${targetNo}:`, response.data.isParticipating);

        // 타겟 번호별 참여 여부를 저장
        this.$set(this.isUserParticipated, targetNo, response.data.isParticipating);

        return response.data.isParticipating;
    } catch (error) {
        console.error('Failed to check user participation:', error);
        return false;
    }
  },

  async loadUserParticipatedTargets() {
      try {
        const targetNos = this.adminTargets.map(target => target.target_no);
        console.log('5. Target numbers:', targetNos);

        for (const targetNo of targetNos) {
          const isParticipating = await this.checkParticipation(targetNo);
          if (isParticipating) {
            this.userParticipatedTargets.push(targetNo);
          }
        }

        console.log('7. Updated userParticipatedTargets:', this.userParticipatedTargets);
      } catch (error) {
        console.error('Failed to load user participated targets:', error);
      } finally {
        this.isLoading = false; // 로딩 상태 해제
      }
  },

  // isUserParticipating(targetNo) {
  //     // isUserParticipated 객체에서 해당 타겟 번호의 참여 여부를 가져옴
  //     const result = this.isUserParticipated[targetNo];
  //     console.log(`8. Checking participation for target ${targetNo}:`, result);
  //     return result;
  // },

  // async joinTarget(targetNo) {
  //   try {
  //     const response = await this.$store.dispatch('target/joinTarget', {
  //       targetNo,
  //       userNo: this.loginInfo.user_no,
  //     });
  //     console.log('Join target response:', response); 

  //     if (response && response.success) {
  //       // 참여 성공 시 상태 업데이트
  //       this.userParticipatedTargets.push(targetNo);
  //       this.$set(this.isUserParticipated, targetNo, true);

  //       const target = this.adminTargets.find(t => t.target_no === targetNo);
  //       if (target) {
  //         target.participantCount = (target.participantCount || 0) + 1;
  //       }
  //     } else {
  //       console.error('Failed to join target: Response does not indicate success', response);
  //     }
  //   } catch (error) {
  //     console.error('Failed to join target:', error);
  //   }
  // },
  
  async joinTarget(targetNo) {
    try {
      const response = await this.$store.dispatch('target/joinTarget', {
        targetNo,
        userNo: this.loginInfo.user_no,
      });
      if (response.success) {
        this.userParticipatedTargets.push(targetNo);
        localStorage.setItem('userParticipatedTargets', JSON.stringify(this.userParticipatedTargets));
        const target = this.adminTargets.find(t => t.target_no === targetNo);
        if (target) {
          target.participantCount = (target.participantCount || 0) + 1;
        }
      }
    } catch (error) {
      console.error('Failed to join target:', error);
    }
  },

  isUserParticipating(targetNo) {
    return this.userParticipatedTargets.includes(targetNo);
  },

  initializeUserParticipation() {
    this.adminTargets.forEach(target => {
      this.isUserParticipated[target.target_no] = this.userParticipatedTargets.includes(target.target_no);
    });
  },

//   async checkParticipation(targetNo) {
//     try {
//         const response = await this.$store.dispatch('target/checkParticipation', {
//             targetNo,
//             userNo: this.loginInfo.user_no,
//         });
//         console.log(`8. Checking participation for target ${targetNo}:`, response.data.isParticipating);
//         return response.data.isParticipating;
//     } catch (error) {
//         console.error('Failed to check user participation:', error);
//         return false;
//     }
// },

// async loadUserParticipatedTargets() {
//       try {
//         const targetNos = this.adminTargets.map(target => target.target_no);
//         console.log('5. Target numbers:', targetNos);

//         for (const targetNo of targetNos) {
//           const response = await this.checkParticipation({
//             targetNo,
//             userNo: this.loginInfo.user_no,
//           });
//           console.log(`6. Participation check for target ${targetNo}:`, response.data);

//           if (response.data.isParticipating) {
//             this.userParticipatedTargets.push(targetNo);
//           }
//           this.$set(this.localParticipantCounts, targetNo, response.data.participantCount);
//         }
//         console.log('7. Updated userParticipatedTargets:', this.userParticipatedTargets);
//       } catch (error) {
//         console.error('Failed to load user participated targets:', error);
//       }
//     },
  
//     async joinTarget(targetNo) {
//   try {
//     const response = await this.$store.dispatch('target/joinTarget', {
//       targetNo,
//       userNo: this.loginInfo.user_no,
//     });
//     console.log('Join target response:', response); // 응답 데이터 출력

//     // 응답 데이터에서 success 여부를 확인하기 전에 응답이 제대로 있는지 확인
//     if (response && response.success) {
//       // 참여 성공 시 상태 업데이트
//       this.userParticipatedTargets.push(targetNo);
//       const target = this.adminTargets.find(t => t.target_no === targetNo);
//       if (target) {
//         target.participantCount = (target.participantCount || 0) + 1;
//       }
//       this.$forceUpdate();
//     } else {
//       console.error('Failed to join target: Response does not indicate success', response);
//     }
//   } catch (error) {
//     console.error('Failed to join target:', error);
//   }
// },

    // isUserParticipating(targetNo) {
    //   const result = this.userParticipatedTargets.includes(targetNo);
    //   console.log(`8. Checking participation for target ${targetNo}:`, result);
    //   return result;
    // },


    // getParticipantCount(targetNo) {
    //   return this.localParticipantCounts[targetNo] || 0;
    // },
  },
 async created() {
  console.log('1. Component created');
  this.isLoading = true;
  try {
    await this.fetchMileages();
    await this.fetchAdminTargets(this.loginInfo.user_no);
    await this.loadUserParticipatedTargets();
  } catch (error) {
    console.error('Error initializing component:', error);
  } finally {
    this.isLoading = false;
  }
},

  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapState('login', ['loginInfo']),
    ...mapGetters('target', ['getAdminTargets']),
    adminTargets() {
    return this.getAdminTargets;
    },
    displayedTargets() {
    const filtered = this.filteredTargets(this.sortBy);
    const sorted = this.sortedAdminTargets(filtered);
    return this.sortBy === 'not-finished' ? this.sortTargets(sorted) : sorted;
  },
  totalTargetsCount() {
    return this.adminTargets.length;
  },
  
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem; /* 하단 여백 추가 */
}
.target-box {
  transition: transform 0.3s ease;
}

.target-box:hover {
  transform: scale(1.05); /* 마우스를 올렸을 때 5% 확대 */
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

.radio-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.radio-input {
  display: none; /* 기본 라디오 버튼을 숨깁니다 */
}

.custom-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 10px;
  display: inline-block;
  position: relative;
}

.radio-input:checked + .radio-label .custom-radio {
  background-color: #FC8A58; /* 체크된 상태일 때 배경색 */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.radio-input:checked + .radio-label .custom-radio::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px; /* 체크된 상태일 때 체크 표시 스타일 */
}

.radio-label {
  display: flex; /* label을 flex로 설정하여 전체가 클릭 가능하도록 */
  align-items: center;
  font-family: 'KB_C2';
  font-size: 20px;
  color: #333; /* 라벨 텍스트 색상 */
}

.join-button {
  font-family: KB_C2;
  font-size: 11pt;
  color: #8c8c8c;
  background: none;
  border: none;
  padding: 5px 18px;
  cursor: pointer;
  white-space: nowrap;
}

.join-button:hover {
  text-decoration: underline;
}

.highlight-score {
  background-color: #FFE2B5;
  padding: 2px 4px;
  border-radius: 20px;
}





.participation-info {
  display: flex;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.join-button {
  font-family: KB_C2;
  font-size: 11pt;
  color: #8c8c8c;
  background: none;
  border: none;
  padding: 5px 18px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.join-button:hover {
  text-decoration: underline;
}

.join-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 트랜지션을 위한 추가 클래스 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>