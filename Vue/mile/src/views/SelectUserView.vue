<template>
    <div>
      <h3 class="center fw-bold">Select User Info</h3>
      <div class="w-50 mx-auto my-5">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="user_id" 
            placeholder="사번 입력"
          />
          <button class="btn btn-success" @click="selectUser">검색</button>
        </div>
        <table class="table table-striped table-hover my-5" v-if="objectUser">
          <thead>
            <tr>
              <th>사번</th>
              <th>이름</th>
              <th>입사년도</th>
              <th>생일</th>
              <th>이메일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ objectUser.user_no }}</td>
              <td>{{ objectUser.user_name }}</td>
              <td>{{ objectUser.user_year }}년</td>
              <td>{{ objectUser.user_birth }}</td>
              <td>{{ objectUser.user_email }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <p>검색 결과가 없습니다.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "SelectUserView",
    data() {
      return {
        user_id: ''
      }
    },
    methods: {
      ...mapActions('user', ['getUserById']), // store 하위 user.js에서 getUserById 메서드를 호출한다. 
      selectUser() { // '검색'버튼 클릭했을 때 실행되는 메서드 
        this.getUserById(this.user_id); // user_id를 매개변수로 받고, getUserById 메서드를 호출한다. 
        console.log(this.objectUser); // user.js의 objectUser라는 데이터가 담겨있는 변수를 콘솔에 출력한다. 
      }
    },
    computed: { // '감시자'역할
      ...mapGetters("user", ["getObjectUser"]), // store 하위 user.js에서 getObjectUser 메서드를 호출한다. 
      objectUser() { // objectUser 변수의 데이터 값이 변경되면 감시자 작동
        return this.getObjectUser; // objectUser의 getter 메서드로 데이터 값을 가져온다. 
      }
    }
  };
  </script>
  