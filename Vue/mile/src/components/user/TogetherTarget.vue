<template>
  <div>
          <!-- 로딩 중일 때 -->
    <div v-if="isLoading" style="font-size: 20px; text-align: center; margin-top: 20px;">
      <i class="bi bi-arrow-clockwise"></i> 로딩 중...
    </div>
    <div
      class="d-flex justify-content-start align-items-center mb-5"
      style="margin-left: 5%"
    >
      <!-- 총 건수 -->
      <div style="display: flex; align-items: center">
        <span class="count"> 총 {{ totalTargetsCount }}건 </span>
      </div>

      <div class="radio-container p-3 lg2">
        <input
          class="radio-input"
          type="radio"
          name="targetList"
          id="finished"
          value="finished"
          v-model="sortBy"
        />
        <label class="radio-label" for="finished">
          <span class="custom-radio"></span>
          종료
        </label>
      </div>

      <div class="radio-container p-3 lg2">
        <input
          class="radio-input"
          type="radio"
          name="targetList"
          id="notFinished"
          value="not-finished"
          v-model="sortBy"
        />
        <label class="radio-label" for="notFinished">
          <span class="custom-radio"></span>
          참여
        </label>
      </div>

      <div class="radio-container p-3 lg2">
        <input
          class="radio-input"
          type="radio"
          name="targetList"
          id="notjoin"
          value="notjoin"
          v-model="sortBy"
        />
        <label class="radio-label" for="notjoin">
          <span class="custom-radio"></span>
          미참여
        </label>
      </div>
    </div>

    <div v-if="!isLoading" class="row">
      <div
        v-for="(target, index) in displayedTargets"
        :key="target.target_no"
        class="col-md-4 mb-3 fade-up-item"
      >
        <div class="p-3">
          <div
            :style="{
              backgroundColor:
                backgroundColors[index % backgroundColors.length],
            }"
            class="mx-auto rounded-4 target-box"
          >
            <!-- <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 410px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box"> -->
            <!-- 여기 하드코딩 한 부분 데이터 불러오기!! -->
            <!-- 목표 설정된 마일리지의 경우 -->
            <!-- <div v-if="index%2==0"> -->
            <div
              class="py-3"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: -10px;
              "
            >
              <div style="display: flex; align-items: center; flex: 1">
                <span
                  :class="getStatusClass(target)"
                  class="status-label"
                  style="margin-left: 20px"
                  >{{ getStatusText(target) }}</span
                >
                <div
                  style="
                    text-align: left;
                    margin-left: 10px;
                    margin-top: 10px;
                    font-weight: bold;
                    font-family: KB_C2;
                    font-size: 13pt;
                  "
                  class="mb-2"
                >
                  {{ target.mile_name }} 마일리지
                </div>
              </div>

              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  width: 100px;
                  position: relative;
                  overflow: hidden;
                "
              >
                <div
                  v-if="isUserParticipating(target.target_no)"
                  class="participation-info"
                >
                  <div
                    @click="handleClick(target.target_no)"
                    class="participant-count"
                  >
                    <i
                      class="bi bi-person-vcard"
                      style="
                        margin-right: 12px;
                        margin-bottom: 2px;
                        font-size: 25px;
                        color: #8c8c8c;
                      "
                    ></i>
                    <span style="margin-right: 25px">{{target.participantCount}}</span>
                  </div>
                  <!-- 드롭다운 메뉴 -->
                  <div
                    v-if="isDropdownVisible(target.target_no)"
                    class="dropdown-menu"
                    @click.stop
                  >
                    <p
                      v-for="participant in target.participants"
                      :key="participant.user_no"
                      style="margin: 0; padding: 5px 0"
                    >
                      {{ participant.user_name }}
                    </p>
                  </div>
                </div>
                <!-- 사용자가 참여하지 않았을 경우 -->
  <button
    v-else-if="getStatusText(target) === '진행중'"
    @click="joinTarget(target.target_no)"
    class="join-button"
  >
    참여하기 >
  </button>
  <button
    v-else-if="getStatusText(target) === '예정'"
    class="join-button"
    disabled
  >
    참가하기
  </button>
  <button
    v-else-if="getStatusText(target) === '종료'"
    class="join-button"
    disabled
  >
    미참여
  </button>
  </div>
            </div>
            <div
              class="py-3"
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 20px;
              "
            >
              <span
                class="lg2"
                style="
                  font-family: 'KB_C1';
                  font-size: 20px;
                  margin-bottom: -25px;
                "
                >그룹 달성률</span
              ><br />
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 100%;
                "
              >
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Animated striped example"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style="width: 80%; margin-right: 10px"
                >
                  <div
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{
                      width: getAchievementRate(target),
                      backgroundColor: '#FB773C',
                    }"
                  ></div>
                </div>
                <span
                  style="
                    font-weight: bold;
                    white-space: nowrap;
                    font-family: 'KB_C2';
                    font-size: 25px;
                    margin-right: 10px;
                  "
                >
                  {{ getAchievementRate(target) }}</span
                >
              </div>
              <span
                class="md"
                style="margin-top: 5px; font-size: 13px; font-family: 'KB_C2'"
                >{{ target.start_date }} - {{ target.end_date }}</span
              >
            </div>
            <span class="lg2" style="font-family: 'KB_C1'; font-size: 17px">
              🎯 나의 마일리지 / 목표 마일리지
            </span>
            <div class="py-3">
              <span class="bold-x-lg" style="font-family: 'KB_C1'">
                <span class="highlight-score"> {{ getScore(target) }}</span>
                / {{ target.target_mileage }}</span
              >
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
import { mapActions, mapGetters, mapState } from 'vuex';
import api from '@/api/axios';
export default {
  name: 'TogetherTarget',
  data() {
    return {
      mileages: [],
      // backgroundColors: ["#FDF5F5", "#FBF4EE", "#FCFBF1", "#F4FBF2", "#F3FBFE", "#F5F5FF", "#FFF2FD", "#F4F4F4"],
      backgroundColors: ['#F5F5F5'],
      sortBy: 'notjoin',
      isUserParticipated: {}, // 참여 여부를 저장하는 객체 추가
      userParticipatedTargets: JSON.parse(
      localStorage.getItem('userParticipatedTargets') || '[]'
      ),
      isLoading: true,
      dropDownVisible: {},
    };
  },
  methods: {
    ...mapActions('target', [
      'fetchAdminTargets',
      'joinTarget',
      'checkParticipation',
    ]),

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
        const response = await api.get('/notice/mileage');
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
    // 서버에서 이미 achievementRate를 받아온 경우 그대로 사용
    getAchievementRate(target) {
      // 미참여 상태일 때는 0%로 처리
      if (!this.isUserParticipating(target.target_no)) {
        return '0%'; // 미참여 시 0%로 설정
      }

      // 서버에서 받은 achievementRate 사용
      return `${Math.min(target.achievementRate, 100)}%`; // 100%를 초과하지 않게 처리
    },
    // 미참여 상태일 때는 0점으로 설정
    getScore(target) {
      if (!this.isUserParticipating(target.target_no)) {
        return 0; // 미참여 시 0점으로 설정
      }

      // 서버에서 받은 totalMileScore 사용
      return target.totalMileScoreByTargetNo || 0;
    },

    calculateProgress(target) {
      // target 객체가 정의되지 않았거나 totalMileScoreByMileNo 속성이 없는 경우 기본값을 반환
      if (
        !target ||
        target.achievementRate === undefined ||
        target.target_mileage === undefined
      ) {
        return '0%'; // 적절한 기본값 반환
      }

      
    // target 객체가 정의되지 않았거나 totalMileScoreByMileNo 속성이 없는 경우 기본값을 반환
    if (!target || target.achievementRate === undefined || target.target_mileage === undefined) {
      return '0%'; // 적절한 기본값 반환
    }

    // 정상적인 진행률 계산
    const progress = (target.totalMileScoreByMileNo / target.target_mileage) * 100;
    return isNaN(progress) ? '0%' : `${progress.toFixed(2)}%`;
  },

    getStatusText(target) {
      // target 객체가 정의되었는지 확인하고, start_date와 end_date가 있는지 확인
      if (!target || !target.start_date || !target.end_date) {
        return '알 수 없음'; // 적절한 기본값 또는 에러 메시지
      }
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
        // 먼저 mile_no로 정렬
        if (a.mile_no !== b.mile_no) {
          return a.mile_no - b.mile_no;
        }

        const statusA = this.getStatusText(a);
        const statusB = this.getStatusText(b);
        const isParticipatingA = this.isUserParticipating(a.target_no);
        const isParticipatingB = this.isUserParticipating(b.target_no);

        // 참여 중인 항목을 먼저 정렬
        if (isParticipatingA && !isParticipatingB) return -1;
        if (!isParticipatingA && isParticipatingB) return 1;

        // 참여 상태가 같다면 상태에 따라 정렬
        if (statusA === '진행중' && statusB !== '진행중') return -1;
        if (statusA !== '진행중' && statusB === '진행중') return 1;
        if (statusA === '예정' && statusB !== '예정') return -1;
        if (statusA !== '예정' && statusB === '예정') return 1;
        if (statusA === '종료' && statusB !== '종료') return 1; // 종료 상태를 마지막으로
        if (statusA !== '종료' && statusB === '종료') return -1;

        return 0;
      });
    },
    filteredTargets(filter) {
      return this.adminTargets.filter((target) => {
        const status = this.getStatusText(target);
        const isParticipating = this.isUserParticipating(target.target_no);

        if (filter === 'finished') {
          return status === '종료';
        } else if (filter === 'not-finished') {
          return isParticipating && status !== '종료';
        } else if (filter === 'notjoin') {
          return (!isParticipating && status === '진행중') || status === '예정';
        } else {
          return true;
        }
      });
    },
    sortedAdminTargets(targets) {
      return targets.sort((a, b) => a.mile_no - b.mile_no);
    },
    async checkParticipation(targetNo) {
      try {
        const response = await this.$store.dispatch(
          'target/checkParticipation',
          {
            targetNo,
            userNo: this.loginInfo.user_no,
          }
        );

        if (typeof response === 'boolean') {
          // 타겟 번호별 참여 여부를 직접 할당
          this.isUserParticipated[targetNo] = response;

          return response;
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Failed to check user participation:', error);
        return false;
      }
    },

    async loadUserParticipatedTargets() {
      try {
        const targetNos = this.adminTargets.map((target) => target.target_no);
        console.log('5. Target numbers:', targetNos);

        // 참여 여부 확인을 병렬로 처리
        const participationPromises = targetNos.map((targetNo) =>
          this.checkParticipation(targetNo).then((isParticipating) => {
            if (isParticipating) {
              this.userParticipatedTargets.push(targetNo);
            }
          })
        );

        // 모든 요청이 완료될 때까지 대기
        await Promise.all(participationPromises);

        console.log(
          '7. Updated userParticipatedTargets:',
          this.userParticipatedTargets
        );
      } catch (error) {
        console.error('Failed to load user participated targets:', error);
      } finally {
        this.isLoading = false; // 로딩 상태 해제
      }
    },

    async joinTarget(targetNo) {
      try {
        const response = await this.$store.dispatch('target/joinTarget', {
          targetNo,
          userNo: this.loginInfo.user_no,
        });
        if (response.success) {
          this.userParticipatedTargets.push(targetNo);
          localStorage.setItem(
            'userParticipatedTargets',
            JSON.stringify(this.userParticipatedTargets)
          );
          const target = this.adminTargets.find(
            (t) => t.target_no === targetNo
          );
          if (target) {
            target.participantCount = (target.participantCount || 0) + 1;
          }
        }
      } catch (error) {
        console.error('Failed to join target:', error);
      }
    },

    initializeUserParticipation() {
      this.adminTargets.forEach((target) => {
        this.isUserParticipated[target.target_no] =
          this.userParticipatedTargets.includes(target.target_no);
      });
    },

    handleClick(targetNo) {
      console.log('Clicked:', targetNo);
      this.toggleDropdown(targetNo);
    },

    toggleDropdown(targetNo) {
      console.log('Clicked:', targetNo);
      this.dropDownVisible[targetNo] = !this.dropDownVisible[targetNo];
    },

    isDropdownVisible(targetNo) {
      return !!this.dropDownVisible[targetNo];
    },

    closeAllDropdowns(event) {
      if (!event.target.closest('.participation-info')) {
        this.dropDownVisible = {};
      }
    },

    isUserParticipating(targetNo) {
      return this.userParticipatedTargets.includes(targetNo);
    },

    isParticipating(target) {
      return target.participants && target.participants.length > 0;
    },
    applyFadeUpEffect() {
      const items = document.querySelectorAll('.fade-up-item');
      items.forEach((item, index) => {
        const delay = 50 * index;
        setTimeout(() => {
          item.classList.add('fade-up-active');
        }, delay);
      });
    },
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
  mounted() {
    document.addEventListener('click', this.closeAllDropdowns);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeAllDropdowns);
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapState('login', ['loginInfo']),
    ...mapGetters('target', ['getAdminTargets']),
    adminTargets() {
      return this.getAdminTargets;
    },
    // 사용자가 참여하지 않은 경우 기본값 반환
    displayedTargets() {
      const filtered = this.filteredTargets(this.sortBy);
      return this.sortTargets(filtered);
    },
    totalTargetsCount() {
      return this.adminTargets.length;
    },
  },
  watch: {
    getLoginInfo: {
      immediate: true,
      handler(newLoginInfo) {
        if (newLoginInfo && newLoginInfo.user_no) {
          console.log(
            'Calling getAdminTargets with user_no:',
            newLoginInfo.user_no
          ); // 로그 추가
          this.fetchAdminTargets(newLoginInfo.user_no).then(() => {
            this.isLoading = false;
            this.$nextTick(() => {
              this.applyFadeUpEffect();
            });
          });
        } else {
          this.dataLoaded = false;
        }
      },
    },
    sortBy() {
      // sortBy가 변경될 때 애니메이션 적용
      this.$nextTick(() => {
        this.applyFadeUpEffect();
      });
    },

    displayedTargets: {
      handler(newTargets) {
        newTargets.forEach((target) => {
          if (this.isLoggedIn()) {
          if (Math.min(target.achievementRate, 100) === 100 && this.getStatusText(target) !== '종료') {
            this.$store.dispatch('/target/increaseMawangScore', {
              targetNo: target.target_no,
              userNo: this.loginInfo.user_no,
            });
          }
        }
      });
    },
  deep: true,
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
  width: 370px;
  height: 320px;
  transition: transform 0.3s ease;
  border-radius: 1px;
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
  background-color: #fc8a58; /* 체크된 상태일 때 배경색 */
  border: none; /* 체크된 상태일 때 테두리 제거 */
}

.radio-input:checked + .radio-label .custom-radio::after {
  content: '✓';
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
  background-color: #ffe2b5;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/*--------------------------------*/
.participation-info {
  position: relative;
  display: inline-block;
}

.participant-count {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 9999;
  min-width: 200px;
  padding: 10px;
  background-color: #ffffff; /* 배경색을 흰색으로 설정 */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  display: block; /* 기본적으로 보여지는 상태로 설정 */
}

.dropdown-menu p {
  margin: 0;
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
}

.dropdown-menu p:last-child {
  border-bottom: none;
}

/**/
.fade-up-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* 애니메이션 효과 */
}

.fade-up-active {
  opacity: 1;
  transform: translateY(0);
}

.count {
  font-family: 'KB_C2';
  font-size: 18px;
  margin-left: -40px;
  margin-right: 25px;
  margin-bottom: 2px;
  color: #333;
}
@media (max-width: 768px) {
  .count {
    font-family: 'KB_C2';
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
    margin-left: 5px;
    margin-right: 0px;
  }
  .radio-container {
    margin-bottom: 10px; /* Add some spacing between each radio container */
    display: flex;
    justify-content: space-between; /* Evenly space label and input */
    align-items: center;
  }

  .radio-label {
    font-size: 16px; /* Slightly smaller font size for mobile */
    padding-left: 3px; /* Adjust label padding for better spacing */
  }

  .custom-radio {
    margin-left: 10px;
    width: 16px;
    height: 16px;
    margin-right: 0px;
  }
  .p-3 {
    padding: 0rem !important;
  }

  .py-3 {
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
    margin-top: 5px;
  }
  .target-box {
    width: 100%;
    height: 220px;
  }
}

@media (max-width: 800px) {
  .count {
    font-family: 'KB_C2';
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
    margin-left: 5px;
    margin-right: 0px;
  }
  .radio-container {
    margin-bottom: 10px; /* Add some spacing between each radio container */
    display: flex;
    justify-content: space-between; /* Evenly space label and input */
    align-items: center;
  }

  .radio-label {
    font-size: 16px; /* Slightly smaller font size for mobile */
    padding-left: 3px; /* Adjust label padding for better spacing */
  }

  .custom-radio {
    margin-left: 10px;
    width: 16px;
    height: 16px;
    margin-right: 0px;
  }
  .p-3 {
    padding: 0rem !important;
  }

  .py-3 {
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
    margin-top: 5px;
  }

  .target-box {
    height: 220px;
  }
}
</style>