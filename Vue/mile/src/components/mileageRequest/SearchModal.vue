<template>
  <div class="modals" v-if="isOpen">
    <div class="modals-content" style="width: 700px; height: auto">
      <span class="close" @click="$emit('close')">&times;</span>

      <span class="KB_S4" style="font-size: 19pt">직원 검색</span>
      <br /><br />

      <div style="text-align: left">
        <span style="text-align: left; margin-left: 15px; font-size: 13pt">
          담당자 설정
        </span>
        <div style="text-align: left; margin-left: 5px">
          <!-- 여기에 검색 기능 추가 -->
          <input
            v-model="searchTerm"
            @input="searchUser"
            type="text"
            placeholder="이름이나 사번을 입력하세요"
            style="width: 100%; padding: 8px; margin-bottom: 10px"
          />
          <div class="user-list">
            <ul>
              <li
                v-for="user in filteredUserList"
                :key="user.user_no"
                @click="selectUser(user)"
              >
                {{ user.user_name }} ({{ user.user_no }}) {{ user.dp_no }} -
                {{ user.position_no }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    mileName: String,
    mileNo: Number,
    isOpen: Boolean,
  },
  data() {
    return {
      searchTerm: '',
      userList: [],
      filteredUserList: [],
    };
  },
  methods: {
    async searchUser() {
      try {
        const response = await axios.post(
          'http://localhost:8090/admin/searchUser',
          null,
          {
            params: {},
          }
        );
        this.userList = response.data;
        this.filterUserList();
      } catch (error) {
        console.error('유저 리스트를 가져오는 중 오류 발생:', error);
        this.userList = [];
        this.filteredUserList = [];
      }
    },
    filterUserList() {
      if (this.searchTerm) {
        const lowercaseSearchTerm = this.searchTerm.toLowerCase();
        this.filteredUserList = this.userList.filter(
          (user) =>
            user.user_name.toLowerCase().includes(lowercaseSearchTerm) ||
            user.user_no.toLowerCase().includes(lowercaseSearchTerm)
        );
      } else {
        this.filteredUserList = this.userList;
      }
    },
    selectUser(user) {
      this.$emit('user-selected', user);
      this.$emit('close');
    },
    newAdminList() {
      // 등록하기 버튼 클릭 시의 로직
      console.log('등록하기 버튼 클릭됨');
    },
  },
  watch: {
    searchTerm() {
      this.filterUserList();
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modals-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
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
