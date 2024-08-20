<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 관리</h2>
    <div>
      <div
        class="input-base input-search d-flex justify-content-center mx-auto my-3"
        style="width: 500px; background: #ebebeb"
      >
        <button
          class="tab-container lg2 fw-bold"
          :class="{ active: isModifyActive }"
          @click="showModify"
        >
          접수내역
        </button>
        <button
          class="tab-container lg2 fw-bold"
          :class="{ active: !isModifyActive }"
          @click="showCoding"
        >
          과거내역
        </button>
      </div>
      <!-- 동적 컴포넌트 전환 -->
      <requestList v-if="isModifyActive" />
      <pastList v-if="!isModifyActive" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '@/api/axios';
import Swal from 'sweetalert2';
import requestList from '@/components/mileageRequest/MileageRequestListAdmin.vue';
import pastList from '@/components/mileageRequest/MileageRequestPastListAdmin.vue';

export default {
  name: 'KingMain',
  components: { requestList, pastList },
  data() {
    return {
      isModifyActive: true, // 초기에는 '마일리지 수정'이 활성화됨
    };
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getArrayMileage']),
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters(''),
    loginInfo() {
      return this.getLoginInfo;
    },
    mileageLabel() {
      return this.getArrayMileage;
    },
  },
  methods: {
    ...mapActions('mileage', ['getMileage']),
    async deleteMile(mile_no) {
      const { value: confirmed } = await Swal.fire({
        title: '삭제 확인',
        text: '정말로 이 마일리지를 삭제하시겠습니까?',
        icon: 'warning',

        scrollbarPadding: false,
      });

      if (confirmed) {
        try {
          const response = await api.post('/admin/deleteMile', null, {
            params: { mile_no: mile_no },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
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
    showModify() {
      this.isModifyActive = true; // '마일리지 수정' 활성화
    },
    showCoding() {
      this.isModifyActive = false; // '개발요청' 활성화
    },
    checkLoginInfo() {
      if (
        !this.getLoginInfo ||
        this.getIsChecked === false ||
        this.getLoginInfo.user_is_admin === false
      ) {
        window.location.href = '/noAccess';
      }
    },
  },
  mounted() {
    this.getMileage(); // Fetch mileage data on component mount
  },
  created() {
    this.checkLoginInfo();
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
