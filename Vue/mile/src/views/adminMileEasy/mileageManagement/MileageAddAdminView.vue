<template>
  <div class="cards" style="background-color: #f9f9f9; height: 400px">
    <div>
      <p class="text-left lg2 KB_C2">마일리지 추가요청</p>
      <div class="cards favorite-card">
        <div style="margin-left: 15px">
          <div style="text-align: left">마일리지 이름</div>
          <div style="text-align: left">
            <input
              type="text"
              class="input-base input-gray"
              placeholder="추가 마일리지 이름을 입력하세요."
            />
          </div>
          <br />
          <div style="text-align: left">담당자 설정</div>
          <div style="text-align: left">
            <input
              type="text"
              class="input-base input-gray"
              style="width: 420px"
              readonly
            />
            <button class="btn-green" @click.stop="openModal">검색</button>
            <Modal v-if="isModalOpen" @close="closeModal" />
          </div>
        </div>

        <div style="text-align: right; margin-top: 25px">
          <button class="btn-yellow" style="width: 110px; font-weight: bold">
            추가 요청
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from '../mileageManagement/SearchModal.vue';

export default {
  name: 'MileageAddAdminView',
  components: { Modal },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.favorite-card {
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cards {
  overflow: hidden;
}
</style>
