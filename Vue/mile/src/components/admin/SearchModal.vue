<template>
  <div class="modals" v-if="isOpen">
    <div class="modals-content" style="width: 700px; height: auto">
      <span class="close" @click="$emit('close')">&times;</span>

      <span class="KB_S4" style="font-size: 19pt"
        >{{ mileName }} 마일리지 수정</span
      >
      <br /><br />

      <div style="text-align: left">
        <span style="text-align: left; margin-left: 13px; font-size: 13pt">
          마일리지 이름
        </span>
        <div style="text-align: left; margin-left: 5px">
          <input
            type="text"
            class="input-base input-gray new_mileageName"
            placeholder="변경 후 마일리지 이름을 입력하세요"
            style="width: 300px; height: 40px"
            v-model="mileNameInput"
          />
        </div>
      </div>
      <br />

      <div style="text-align: left">
        <span style="text-align: left; margin-left: 13px; font-size: 13pt">
          연간 최대한도
        </span>
        <div style="text-align: left; margin-left: 5px">
          <input
            type="text"
            class="input-base input-gray new_mileageName"
            placeholder="변경 후 최대한도를 입력하세요"
            style="width: 300px; height: 40px"
            v-model="mileMax"
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
              placeholder="이름 또는 사번 입력"
              v-model="newAdmin.searchTerm"
              @input="filterUserList(index, newAdmin.searchTerm)"
            />
            &nbsp;&nbsp;
            <i class="bi bi-dash-lg" @click="removeNewAdmin(index)"></i>
            <span v-if="!newAdmin.searchTerm && isSubmitted" style="color: red">
              이름이나 사번을 입력해주세요
            </span>
            <!-- 유저 검색 결과 리스트 -->
            <div
              v-if="
                filteredUserList[index] && filteredUserList[index].length > 0
              "
              class="user-list"
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
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      admins: [], // 기존 담당자 목록
      newAdmins: [], // 새로 추가된 담당자 목록
      mileNameInput: '', // 마일리지 이름 입력 필드
      isSubmitted: false, // 유효성 검사 후 제출 여부
      userList: [], // 유저 리스트
      filteredUserList: [], // 필터링된 유저 리스트
      mileMax: '',
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
        searchTerm: '', // 검색어
        user_name: '', // 유저 이름
        user_no: '', // 유저 번호
        dp_no: '', // 부서 번호
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
      const invalidAdmins = this.newAdmins.filter((admin) => !admin.user_no);
      if (invalidAdmins.length > 0) {
        return;
      }

      // 최종 담당자 목록 생성 (기존 담당자 + 새 담당자)
      const finalAdminList = [
        ...this.admins.map((admin) => admin.user_no),
        ...this.newAdmins.map((admin) => admin.user_no),
      ];

      // 최종 담당자 목록 콘솔에 출력
      console.log('최종 담당자 목록 (user_no):', finalAdminList);

      const listAdminString = finalAdminList.join(',');

      // 최종 담당자가 한 명도 없는 경우 경고 메시지 표시
      if (finalAdminList.length === 0 || finalAdminList === null) {
        await Swal.fire({
          icon: 'warning',
          title: '담당자 설정 필요',
          text: '최소 한 명 이상의 담당자를 설정해주세요.',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        });
        return; // 함수 실행 중단
      }

      try {
        // 쿼리 매개변수로 데이터 전송
        const response = await axios.post(
          'http://localhost:8090/admin/newAdminList',
          null,
          {
            params: {
              mile_no: this.mileNo,
              final_admin_list: listAdminString,
              mileNameInput: this.mileNameInput,
              mileMax: this.mileMax,
            },
          }
        );
        await Swal.fire({
          icon: 'success',
          title: '수정완료',
          text: '정상적으로 수정되었습니다.',
        });
        this.$emit('close');
        this.admins = response.data; // 기존 담당자 목록 업데이트
        this.isSubmitted = false; // 제출 후 초기화
      } catch (error) {
        console.error('Error fetching admin list:', error);
        this.admins = []; // 오류 처리
      }
    },
    filterUserList(index, searchTerm) {
      if (searchTerm) {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        // 이름 또는 사번으로 필터링
        this.filteredUserList[index] = this.userList.filter(
          (user) =>
            user.user_name.toLowerCase().includes(lowercaseSearchTerm) ||
            user.user_no.toLowerCase().includes(lowercaseSearchTerm)
        );
      } else {
        this.filteredUserList[index] = [];
      }
    },
    selectUser(index, user) {
      // 선택한 유저의 정보를 포맷된 문자열로 설정
      this.newAdmins[
        index
      ].searchTerm = `${user.user_name} (${user.user_no}) ${user.dp_no}`;
      this.newAdmins[index].user_name = user.user_name;
      this.newAdmins[index].user_no = user.user_no;
      this.newAdmins[index].dp_no = user.dp_no;
      this.$nextTick(() => {
        this.filteredUserList[index] = []; // 선택 후 필터링 리스트 초기화
      });
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
.user-list {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: white;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  padding: 5px;
  cursor: pointer;
}
ul li:hover {
  background-color: #f0f0f0;
}
</style>
