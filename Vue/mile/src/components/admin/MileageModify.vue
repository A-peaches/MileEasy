<template>
  <div style="padding: 0 5%">
    <div class="p-4 mt-5 mx-auto">
      <div class="cards-container mx-auto" :style="{ height: computedHeight }">
        <div
          v-for="(card, index) in mileageLabel"
          :key="index"
          class="card-item"
        >
          <div
            class="cards"
            :class="card.pyramidClass"
            style="background-color: #f9f9f9; height: 80px; width: 500px"
          >
            <div class="card-header">
              <h3 class="text-start KB_S5" style="font-size: 16pt">
                {{ card.mile_name }}
              </h3>
              <span class="edit-delete brown">
                <a @click.stop="openModal(card.mile_name, card.mile_no)"
                  >수정</a
                >
                &nbsp;&nbsp;
                <a @click="deleteMile(card.mile_no)">삭제</a>
              </span>
            </div>
            <div
              class="flex justify-content-between align-items-center"
              style="padding-bottom: 10px"
            >
              <div style="width: 48%; font-size: 30pt"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-3"></div>
    </div>
    <SearchModal
      v-if="isModalOpen"
      :mileName="selectedMileName"
      :mileNo="selectedMileNo"
      :isOpen="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '@/api/axios';
import Swal from 'sweetalert2';
import SearchModal from '../admin/SearchModal.vue';

export default {
  name: 'MileageModify',
  components: { SearchModal },
  data() {
    return {
      isModalOpen: false,
      selectedMileName: null,
      selectedMileNo: null,
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getArrayMileage']),

    loginInfo() {
      return this.getLoginInfo;
    },

    mileageLabel() {
      return this.getArrayMileage;
    },
  },

  methods: {
    ...mapActions('mileage', ['getMileage']),

    openModal(mileName, mileNo) {
      this.selectedMileName = mileName;
      this.selectedMileNo = mileNo;
      this.isModalOpen = true;
      this.getMileage();
    },

    closeModal() {
      this.isModalOpen = false;
      this.getMileage();
    },

    async deleteMile(mile_no) {
      const { value: confirmed } = await Swal.fire({
        title: '삭제 확인',
        text: '정말로 이 마일리지를 삭제하시겠습니까?',
        icon: 'warning',
        scrollbarPadding: false,
      });

      if (confirmed) {
        try {
          const response = await api.post(
            '/admin/deleteMile',
            null,
            {
              params: { mile_no: mile_no },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          this.getMileage();
          Swal.fire('삭제 완료!', '마일리지가 삭제되었습니다.', 'success');
        } catch (error) {
          Swal.fire(
            '삭제 오류!',
            '마일리지 삭제 중 오류가 발생했습니다.',
            'error',
            
          );
          console.error('삭제 오류:', error);
        }
      } else {
        console.log('삭제 취소됨');
      }
    },
  },

  mounted() {
    this.getMileage();
  },
};
</script>

<style scoped>

.tab-container:hover {
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #d3d3d3;
}

.tab-container.active {
  background-color: #d3d3d3;
}

.lg2 {
  font-size: 16px;
}

.fw-bold {
  font-weight: bold;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card-item {
  box-sizing: border-box;
  flex: 1 1 calc(50% - 16px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-delete {
  font-size: 14px;
  cursor: pointer;
}

a {
  text-decoration: none;
}

.cards {
  padding: 30px;
}
</style>
