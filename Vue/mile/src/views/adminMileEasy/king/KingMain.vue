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
            "
          >
            <img
              :src="kingImage"
              style="width: 170px; height: 180px; margin: 0 auto"
              @error="handleImageError"
            />
            <div
              class="centered-button btn-yellow KB_C2 my-3"
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
            "
          >
            <img
              :src="jumpImage"
              style="width: 170px; height: 180px; margin: 0 auto"
              @error="handleImageError"
            />
            <div
              class="centered-button btn-yellow KB_C2 my-3"
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
          </h3>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/views/adminMileEasy/king/KiingBadgeOpenModalAdamin.vue';
import Modal2 from '@/views/adminMileEasy/king/KiingBadgeOpenModalAdaminJump.vue';
export default {
  name: 'KingMain',
  components: { Modal, Modal2 },
  data() {
    return {
      isModalOpen: false,
      isModal2Open: false,
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
</style>
