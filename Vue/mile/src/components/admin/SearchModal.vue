<template>
  <div class="modals">
    <div class="modals-content" style="width: 500px; height: auto">
      <span class="close" @click="$emit('close')">&times;</span>

      <span class="KB_S4" style="font-size: 19pt">{{ mileName }} 수정</span>
      <br /><br />

      <div style="text-align: left">
        <span style="text-align: left; margin-left: 13px; font-size: 13pt">
          마일리지 이름
        </span>
        <div style="text-align: left; margin-left: 5px">
          <input
            type="text"
            class="input-base input-gray"
            placeholder="변경 후 마일리지 이름을 입력하세요"
            style="width: 300px; height: 40px"
          />
        </div>
      </div>
      <br />

      <div style="text-align: left">
        <span style="text-align: left; margin-left: 15px; font-size: 13pt">
          담당자 설정
        </span>
        <i class="bi bi-plus-lg"></i>
        <div style="text-align: left; margin-left: 5px">
          <div
            v-for="(admin, index) in admins"
            :key="index"
            style="margin-bottom: 5px; text-align: left"
          >
            <input
              type="text"
              style="width: 300px; height: 40px"
              readonly
              class="input-base input-gray"
              :value="`${admin.user_name} (${admin.user_no}) ${admin.dp_no}`"
              Correctly
              bind
              admin
              user
              names
            />
            &nbsp;&nbsp;
            <i class="bi bi-dash-lg"></i>
          </div>
        </div>
      </div>
      <br />

      <div style="text-align: right">
        <button class="btn-yellow">변경하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      admins: [], // Array to hold admin names for multiple input fields
    };
  },
  props: {
    mileName: String,
    mileNo: Number,
    isOpen: Boolean,
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
  },
  methods: {
    async getileageAdminList() {
      try {
        const response = await axios.post(
          'http://localhost:8090/admin/getileageAdminList',
          null,
          {
            params: {
              mile_no: this.mileNo,
            },
          }
        );
        console.log('담당자 리스트:', response.data);
        this.admins = response.data; // Update with the fetched array of admin names
      } catch (error) {
        console.error('Error fetching admin list:', error);
        this.admins = []; // Handle error case
      }
    },
  },
  mounted() {
    this.getileageAdminList();
  },
};
</script>

<style scoped>
.btn-green {
  box-shadow: 3px 5px 7px rgba(172, 172, 172, 0.3) !important;
}
.modals {
  background-color: rgba(102, 102, 102, 0.1);
}
</style>
