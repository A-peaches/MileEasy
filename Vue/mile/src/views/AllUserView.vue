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
        <button type="button" class="btn btn-success" @click="showData">데이터 콘솔로보기</button>
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
  name: 'AllUserView',
  methods :{
    showData() {
      console.log(this.getArrayUsers);
    }

  },
  computed: {
    ...mapGetters('user',['getArrayUsers'])
  },
  created() {
    this.$store.dispatch('user/getAllUser');
  }
}
</script>
