<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AllUserView</title>
    </head>
    <body>
      <h3 class="center fw-bold">All User Info</h3>
      <button type="button" class="btn btn-success" @click="showData">
        데이터 콘솔로보기
      </button>
      <div class="w-50 mx-auto">
        <table class="table table-striped table-hover my-5" border="1">
          <thead>
            <tr>
              <td>사번</td>
              <td>이름</td>
              <td>입사년도</td>
              <td>생일</td>
              <td>이메일</td>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(user, i) in getArrayUsers">
              <!--가져와진 getArrayUsers를 한톨한톨 쓴다~-->
              <td>{{ user.user_no }}</td>
              <td>{{ user.user_name }}</td>
              <td>{{ user.user_year }}년</td>
              <td>{{ user.user_birth }}</td>
              <td>{{ user.user_email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllUserView', //뷰페이지 네임
  methods: {
    showData() {
      //getArrayUsers 가져온거 데이터 찍기
      console.log(this.getArrayUsers);
    },
  },
  computed: {
    // 감시자, 문법임(감시자여도 새로고침 해야됨. 문법적으로 있는 코드임)

    ...mapGetters('user', ['getArrayUsers']),
    //arrayUsers가 this.$store.dispatch('user/getAllUser');로 인해 변경됨!!
    //-> 변경됨을 감지하여 가져옴(store에 user에 있는 getArrayUsers 실행)
    // -> getArrayUsers에 정의된거 무조건 끌어와짐 getArrayUsers가 변수명이자 가져온것 그 자체임!! ↑↑↑↑↑↑↑ v-for
  },
  created() {
    //페이지 로드시 실행
    this.$store.dispatch('user/getAllUser'); //store -> user/getAllUser 실행

    // 실행하고 나면 arrayUsers에 값이 생겨짐!! 이 생겨진 것을 감시자(computed)가 감지!!
  },
};
</script>
