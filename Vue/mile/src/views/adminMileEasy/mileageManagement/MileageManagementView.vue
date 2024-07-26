<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 관리</h2>
    <div>
      <div
        class="input-base input-search d-flex justify-content-center mx-auto my-3"
        style="width: 500px; background: #ebebeb"
      >
        <!-- Add 'active' class to make this button appear selected -->
        <button class="tab-container lg2 fw-bold active">마일리지 수정</button>
        <button class="tab-container lg2 fw-bold">개발요청</button>
      </div>
    </div>
    <div style="padding: 0 5%">
      <div class="p-4 mt-5 mx-auto">
        <div
          class="cards-container mx-auto"
          :style="{ height: computedHeight }"
        >
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
                  <a
                    :href="'/mileageModifyAdminView?mile_no=' + card.mile_no"
                    class="brown"
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'KingMain',

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getArrayMileage']),

    loginInfo() {
      return this.getLoginInfo;
    },

    mileageLabel() {
      // Access Vuex getter directly
      return this.getArrayMileage;
    },
  },

  methods: {
    ...mapActions('mileage', ['getMileage']),

    async deleteMile(mile_no) {
      // SweetAlert2를 사용하여 삭제 확인 다이얼로그 표시
      const { value: confirmed } = await Swal.fire({
        title: '삭제 확인',
        text: '정말로 이 마일리지를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      });

      // 사용자가 삭제를 확인한 경우에만 삭제 요청을 보냄
      if (confirmed) {
        try {
          const response = await axios.post(
            'http://localhost:8090/admin/deleteMile',
            null,
            {
              params: { mile_no: mile_no }, // URL 쿼리 파라미터로 mile_no 전송
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // 이 경우 Content-Type 설정이 필요 없음
              },
            }
          );
          this.getMileage();
          Swal.fire('삭제 완료!', '마일리지가 삭제되었습니다.', 'success');
          console.log('삭제', response.data);
        } catch (error) {
          Swal.fire(
            '삭제 오류!',
            '마일리지 삭제 중 오류가 발생했습니다.',
            'error'
          );
          console.error('삭제 오류:', error);
        }
      } else {
        console.log('삭제 취소됨');
      }
    },
  },

  mounted() {
    this.getMileage(); // Fetch mileage data on component mount
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
  min-height: 800px; /* Adjusted to fit content and avoid too small height */
}

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
  gap: 16px; /* Space between the cards */
}

.card-item {
  box-sizing: border-box;
  flex: 1 1 calc(50% - 16px); /* Ensures two cards per row, with spacing */
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
