<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%">
    <div class="left-container" style="width: 24%; margin-right: 1%">
      <div class="cards" style="height: 400px">
        <img
          src="@/assets/img/test.png"
          class="profile-large my-3"
          alt="Profile Picture"
        />
        <h2 class="lg KB_S5 my-3">
          {{ loginInfo ? loginInfo.user_name : '' }}
        </h2>
        <p class="md" style="margin-bottom: 0px">
          {{
            loginInfo
              ? `${loginInfo.level_no} ${loginInfo.position_no} | ${loginInfo.job_no} 직무`
              : ''
          }}
        </p>
        <p class="md mb-2" style="margin-bottom: 0px">
          {{ loginInfo ? `${loginInfo.dp_no}` : '' }}
        </p>
        <button class="btn-yellow KB_C2 my-3">운영 관리자</button>
      </div>
      <br />

      <div div class="cards" style="height: 200px">
        <div style="padding: 5% 5%">
          <a href="/kingTopAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              TOP
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/kingSelectAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              채택하기
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
          <a href="/kingBadgeOptionAdminView" class="mileage-link">
            <p class="lg2 link-text" style="text-align: left">
              배지 디자인 변경
              <i
                class="bi bi-chevron-compact-right icon-right"
                style="margin-left: auto"
              ></i>
            </p>
          </a>
        </div>
      </div>
    </div>
    <div
      class="right-container"
      style="
        width: 70%;
        margin-left: 1%;
        position: sticky;
        top: 20px;
        height: 100vh;
      "
    >
      <div
        class="cards"
        style="
          background-color: #f9f9f9;
          width: 100%;
          margin-bottom: 49px;
          height: 450px;
        "
      >
        <div>
          <p class="text-left lg2 KB_C2">배지디자인 변경</p>
          <div class="cards favorite-card" style="height: 360px">
            <div
              style="
                margin-top: 20px;
                display: flex;
                text-align: center;
                justify-content: center;
                align-items: center;
              "
            >
              <div style="width: 30%">
                <img
                  :src="kingImage"
                  style="width: 170px; height: 180px"
                  @error="handleImageError"
                />
                <div
                  style="
                    margin-top: 20px;
                    text-align: center;
                    font-size: 17pt;
                    font-weight: bold;
                  "
                >
                  마왕 배지
                </div>
                <div
                  class="centered-button btn-yellow KB_C2 my-3"
                  style="
                    margin: 0 auto;
                    font-size: 18px;
                    width: 5vw;
                    height: 1.7vw;
                    margin-top: 7px;
                  "
                  @click.stop="openModalKing"
                >
                  변경
                </div>
              </div>

              <div style="width: 10%"></div>

              <div style="width: 30%">
                <img
                  :src="jumpImage"
                  style="width: 170px; height: 180px"
                  @error="handleImageError"
                />
                <div
                  style="
                    margin-top: 20px;
                    text-align: center;
                    font-size: 17pt;
                    font-weight: bold;
                  "
                >
                  Jump UP 배지
                </div>
                <div
                  class="centered-button btn-yellow KB_C2 my-3"
                  style="
                    margin: 0 auto;
                    font-size: 18px;
                    width: 5vw;
                    height: 1.7vw;
                    margin-top: 7px;
                  "
                  @click.stop="openModalJump"
                >
                  변경
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
        <Modal v-if="isModalOpen" @close="closeModalKing" />
        <Modal2 v-if="isModal2Open" @close="closeModalJump" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/views/adminMileEasy/king/KiingBadgeOpenModalAdamin.vue';
import Modal2 from '@/views/adminMileEasy/king/KiingBadgeOpenModalAdaminJump.vue';

export default {
  name: 'KingTopAdminView',

  components: { Modal, Modal2 },

  computed: {
    ...mapGetters('badge', ['getKingBadge']),
    ...mapGetters('badge', ['getJumpBadge']),
    ...mapGetters('login', ['getLoginInfo']),
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

  data() {
    return {
      filesToUpload: [], // 선택된 파일을 저장할 배열
      isModalOpen: false,
      isModal2Open: false,
      uploading: false,
    };
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
    handleImageError() {
      console.error('이미지 로드 실패');
    },
  },

  mounted() {
    // 컴포넌트가 마운트된 후에 Vuex action을 통해 데이터를 초기화합니다.
    this.badgeKingImage();
    this.badgeJumpImage();
  },
};
</script>

<style scoped>
.centered-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mileage-link {
  text-decoration: none;
  color: #4b4a4a;
}
.mileage-link:hover > p {
  color: #848282; /* 원하는 색상으로 변경 */
}
.link-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
}
.icon-right {
  margin-left: auto; /* 아이콘을 오른쪽 끝으로 밀기 위해 추가 */
}

.favorite-card {
  justify-content: center;
  align-items: center;
  position: relative;
}

.cards {
  overflow: hidden;
}
.mileage-link {
  text-decoration: none;
  color: #4b4a4a;
}
.mileage-link:hover > p {
  color: #848282;
}
.link-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
}
.icon-right {
  margin-left: auto;
}
.hiddencards {
  padding: 20px;
  margin: 5px;
}
</style>
