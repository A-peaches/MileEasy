<template>
  <div class="modals" v-if="isOpen">
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
            v-model="mileNameInput"
          />
        </div>
      </div>
      <br />

      <div style="text-align: left">
        <span style="text-align: left; margin-left: 15px; font-size: 13pt">
          담당자 설정
        </span>
        <i class="bi bi-plus-lg" @click="addAdminField"></i>
        <div style="text-align: left; margin-left: 5px">
          <!-- 기존 담당자 목록 -->
          <div
            v-for="(admin, index) in admins"
            :key="'admin-' + admin.user_no"
            style="margin-bottom: 5px; text-align: left"
          >
            <input
              type="text"
              style="width: 300px; height: 40px"
              readonly
              class="input-base input-gray"
              :value="`${admin.user_name} (${admin.user_no}) ${admin.dp_no}`"
            />
            &nbsp;&nbsp;
            <i class="bi bi-dash-lg" @click="removeAdmin(index)"></i>
          </div>

          <!-- 새 담당자 입력 필드 -->
          <div
            v-for="(newAdmin, index) in newAdmins"
            :key="'new-' + index"
            style="margin-bottom: 5px; text-align: left"
          >
            <input
              type="text"
              style="width: 300px; height: 40px"
              class="input-base input-gray"
              placeholder="새 담당자 입력"
              v-model="newAdmin.user_name"
            />
            &nbsp;&nbsp;
            <i class="bi bi-dash-lg" @click="removeNewAdmin(index)"></i>
          </div>
        </div>
      </div>
      <br />

      <div style="text-align: right">
        <button class="btn-yellow" @click.stop="newAdminList">변경하기</button>
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
      admins: [], // 기존 담당자 목록
      newAdmins: [], // 새로 추가된 담당자 목록
      mileNameInput: this.mileName, // 마일리지 이름 입력 필드
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
    async getMileageAdminList() {
      try {
        const response = await axios.post(
          'http://localhost:8090/admin/getMileageAdminList',
          null,
          {
            params: {
              mile_no: this.mileNo,
            },
          }
        );
        console.log('담당자 리스트:', response.data);
        this.admins = response.data; // 기존 담당자 목록 업데이트
      } catch (error) {
        console.error('Error fetching admin list:', error);
        this.admins = []; // 오류 처리
      }
    },
    addAdminField() {
      // 새로운 담당자 입력 필드 추가
      this.newAdmins.push({
        user_name: '',
      });
    },
    removeAdmin(index) {
      // 기존 담당자 제거
      this.admins.splice(index, 1);
    },
    removeNewAdmin(index) {
      // 새 담당자 입력 필드 제거
      this.newAdmins.splice(index, 1);
    },
    async newAdminList() {
      console.log(this.newAdmins);
      console.log(this.admins);
      this.$emit('close'); // 변경하기 버튼 클릭 시 모달 닫기
      try {
        const response = await axios.post(
          'http://localhost:8090/admin/newAdminList',
          null,
          {
            params: {
              mile_no: this.mileNo,
              new_admins: this.newAdmins,
            },
          }
        );
        console.log('완료여부:', response.data);
        this.admins = response.data; // 기존 담당자 목록 업데이트
      } catch (error) {
        console.error('Error fetching admin list:', error);
        this.admins = []; // 오류 처리
      }
    },
  },
  mounted() {
    this.getMileageAdminList();
  },
  watch: {
    mileName(newVal) {
      this.mileNameInput = newVal;
    },
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
