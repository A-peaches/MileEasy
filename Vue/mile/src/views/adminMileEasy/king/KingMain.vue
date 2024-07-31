<template>
  <div class="cards page-back mx-auto" :style="{ height: computedHeight }">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마왕 관리</h2>
    <div style="padding: 0 5%">
      <div class="p-4 mt-5">
        <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
          배지 디자인 변경
        </h3>
        <div
          class="p-2"
          style="
            display: flex;
            justify-content: center;
            background-color: #f6f6f6;
          "
        >
          <div
            style="
              width: 30%;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
            "
          >
            <img
              :src="kingImage"
              style="width: 170px; height: 180px; margin: 0 auto"
              @error="handleImageError"
            />
            <div
              class="centered-button btn-yellow KB_S4 my-3"
              @click.stop="openModalKing"
            >
              변경
            </div>
          </div>

          <div style="width: 10%"></div>

          <div
            style="
              width: 30%;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top:10px;
            "
          >
            <img
              :src="jumpImage"
              style="width: 170px; height: 180px; margin: 0 auto"
              @error="handleImageError"
            />
            <div
              class="centered-button btn-yellow KB_S4 my-3"
              @click.stop="openModalJump"
            >
              변경
            </div>
          </div>
          <Modal v-if="isModalOpen" @close="closeModalKing" />
          <Modal2 v-if="isModal2Open" @close="closeModalJump" />
        </div>
      </div>

      <div class="p-4">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">
            TOP 상위 리스트
            <span style="font-size: 10pt">
              (최근 업데이트 : {{ baseDate }})
            </span>
          </h3>
        </div>
        <div
          class="p-2"
          style="
            justify-content: space-between;
            align-items: flex-start; /* 위로 정렬 */
            background-color: #f6f6f6;
          "
        >
          <div style="display: flex">
            <div class="king" style="width: 48%">
              <div
                class="KB_C1 title"
                style="font-size: 20pt; margin-top: 30px"
              >
                마왕 TOP 5
              </div>
              <br />
              <div class="text-center mx-auto" style="width: 80%">
                <div class="KB_S1 text-center">
                  <template v-for="(item, index) in kingTop3" :key="index">
                    <div
                      :class="{ top1: index === 0 }"
                      style="
                        display: flex;
                        justify-content: space-between; /* 수평으로 간격을 벌림 */
                        align-items: center; /* 수직 가운데 정렬 */
                        text-align: center;
                        margin-bottom: 20px;
                        padding: 10px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                      "
                    >
                      <div style="flex: 1; text-align: left">
                        {{ item.ranking }}등
                      </div>
                      <div style="flex: 2; text-align: center">
                        {{ item.user_name }}
                      </div>
                      <div style="flex: 1; text-align: right">
                        {{ item.total_score }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="jump" style="width: 48%">
              <div
                class="KB_C1 title"
                style="font-size: 20pt; margin-top: 30px"
              >
                Jump UP TOP 5
              </div>
              <br />
              <div class="text-center mx-auto" style="width: 80%">
                <div class="KB_S1 text-center">
                  <template v-for="(item, index) in jumpTop3" :key="index">
                    <div
                      :class="{ top1: index === 0 }"
                      style="
                        display: flex;
                        justify-content: space-between; /* 수평으로 간격을 벌림 */
                        align-items: center; /* 수직 가운데 정렬 */
                        text-align: center;
                        margin-bottom: 20px;
                        padding: 10px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                      "
                    >
                      <div style="flex: 1; text-align: left">
                        {{ item.ranking }}등
                      </div>
                      <div style="flex: 2; text-align: center">
                        {{ item.user_name }}
                      </div>
                      <div style="flex: 1; text-align: right">
                        {{ item.score_increase }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <button
              class="btn-yellow KB_S4"
              onclick="location.href='/KingPickView'"
            >
              채택하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/views/adminMileEasy/king/KiingBadgeOpenModalAdamin.vue';
import Modal2 from '@/views/adminMileEasy/king/KiingBadgeOpenModalAdaminJump.vue';
import axios from 'axios';

export default {
  name: 'KingMain',
  components: { Modal, Modal2 },
  data() {
    return {
      filesToUpload: [], // 선택된 파일을 저장할 배열
      isModalOpen: false,
      isModal2Open: false,
      uploading: false,
      kingTop3: [],
      jumpTop3: [],
      baseDate: '',
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('badge', ['getKingBadge']),
    ...mapGetters('badge', ['getJumpBadge']),

    kingImage() {
      return this.getKingBadge;
    },
    jumpImage() {
      return this.getJumpBadge;
    },

    loginInfo() {
      return this.getLoginInfo;
    },
  },
  methods: {
    openModalKing() {
      this.isModalOpen = true;
    },
    closeModalKing() {
      this.isModalOpen = false;
    },

    openModalJump() {
      this.isModal2Open = true;
    },
    closeModalJump() {
      this.isModal2Open = false;
    },
    ...mapActions('badge', ['badgeKingImage']),
    ...mapActions('badge', ['badgeJumpImage']),
    ...mapActions('badge', ['watchBadgeChanges']),
    handleImageError() {
      console.error('이미지 로드 실패');
    },

    async kingData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/kingData'
        );
        console.log('마왕 top3:', response.data);
        this.kingTop3 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error('마왕 top3:', error);
        this.kingTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
    async jumpData() {
      try {
        const response = await axios.get(
          'http://localhost:8090/mileage/jumpData'
        );
        console.log('점프업 top3:', response.data);
        this.baseDate = response.data.length ? response.data[0].base_date : ''; // 첫 번째 데이터의 기준일자 설정
        this.jumpTop3 = response.data.slice(0, 5); // 받아온 데이터에서 TOP 3만 가져오기
      } catch (error) {
        console.error('점프업 top3:', error);
        this.jumpTop3 = []; // 오류 발생 시 빈 배열로 초기화
      }
    },
    ...mapActions('badge', ['badgeKingImage']),
    ...mapActions('badge', ['badgeJumpImage']),
    ...mapActions('badge', ['watchBadgeChanges']),
  },
  mounted() {
    // 컴포넌트가 마운트된 후에 Vuex action을 통해 데이터를 초기화합니다.
    this.badgeKingImage();
    this.badgeJumpImage();
    this.watchBadgeChanges(); // 감시자 시작
    this.kingData(); // 컴포넌트가 마운트되면 데이터 요청
    this.jumpData();
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
}
.btn-yellow {
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top1 {
  font-weight: bold;
  font-size: 16pt;
  background-color: #66c52f;
  border-radius: 16px;
}
</style>
