<template>
  <div class="modals" v-if="isOpen">
    <div class="modals-content" style="width: 700px; height: auto">
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
              @input="filterUserList(index, newAdmin.user_name)"
            />
            &nbsp;&nbsp;
            <i class="bi bi-dash-lg" @click="removeNewAdmin(index)"></i>
            <span v-if="!newAdmin.user_name && isSubmitted" style="color: red"
              >이름이나 사번을 입력해주세요</span
            >
            <!-- 유저 검색 결과 리스트 -->
            <div
              v-if="
                filteredUserList[index] && filteredUserList[index].length > 0
              "
            >
              <ul>
                <li
                  v-for="user in filteredUserList[index]"
                  :key="user.user_no"
                  @click="selectUser(index, user)"
                  style="cursor: pointer"
                >
                  {{ user.user_name }} ({{ user.user_no }}) {{ user.dp_no }}
                </li>
              </ul>
            </div>
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
      isSubmitted: false, // 유효성 검사 후 제출 여부
      userList: [], // 유저 리스트
      filteredUserList: [], // 필터링된 유저 리스트
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
    async searchUser() {
      try {
        const response = await axios.post(
          'http://localhost:8090/admin/searchUser',
          null,
          {
            params: {},
          }
        );
        console.log('유저 리스트:', response.data);
        this.userList = response.data; // 유저 리스트 업데이트
      } catch (error) {
        console.error('Error fetching user list:', error);
        this.userList = []; // 오류 처리
      }
    },
    addAdminField() {
      // 새로운 담당자 입력 필드 추가
      this.newAdmins.push({
        user_name: '',
      });
      this.filteredUserList.push([]); // 새 필드 추가 시 필터링 리스트 초기화
    },
    removeAdmin(index) {
      // 기존 담당자 제거
      this.admins.splice(index, 1);
    },
    removeNewAdmin(index) {
      // 새 담당자 입력 필드 제거
      this.newAdmins.splice(index, 1);
      this.filteredUserList.splice(index, 1); // 필터링된 유저 리스트에서 제거
    },
    async newAdminList() {
      this.isSubmitted = true;

      // 새 담당자 유효성 검사
      const invalidAdmins = this.newAdmins.filter((admin) => !admin.user_name);
      if (invalidAdmins.length > 0) {
        return;
      }

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
        this.isSubmitted = false; // 제출 후 초기화
      } catch (error) {
        console.error('Error fetching admin list:', error);
        this.admins = []; // 오류 처리
      }
    },
    filterUserList(index, searchTerm) {
      if (searchTerm) {
        this.filteredUserList[index] = this.userList.filter((user) =>
          user.user_name.includes(searchTerm)
        );
      } else {
        this.filteredUserList[index] = [];
      }
    },
    selectUser(index, user) {
      this.newAdmins[index].user_name = user.user_name;
      this.filteredUserList[index] = []; // 선택 후 필터링 리스트 초기화
    },
  },
  mounted() {
    this.getMileageAdminList();
    this.searchUser();
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
ul {
  list-style: none;
  padding: 0;
}
ul li {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 2px 0;
}
ul li:hover {
  background-color: #e9e9e9;
}
</style>
