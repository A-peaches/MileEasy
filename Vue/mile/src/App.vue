<template>
  <div id="app">
    <main v-if="!$route.meta.hideHeader">
      <HeaderAdmin
        v-if="
          isLoggedIn &&
          loginInfo.user_is_admin &&
          !loginInfo.user_is_manager &&
          isChecked
        "
      />
      <HeaderManager
        v-else-if="
          isLoggedIn &&
          !loginInfo.user_is_admin &&
          loginInfo.user_is_manager &&
          isChecked
        "
      />
      <HeaderUser v-else-if="isLoggedIn && !isChecked" />
      <router-view />
    </main>
    <router-view v-else />
    <!-- hideHeader가 true일 때는 main과 Header를 숨기고 router-view만 렌더링 -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeaderAdmin from './views/common/HeaderAdminView.vue';
import HeaderUser from './views/common/HeaderUserView.vue';
import HeaderManager from './views/common/HeaderManagerView.vue';

export default {
  name: 'App',
  components: {
    HeaderAdmin,
    HeaderUser,
    HeaderManager,
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
    isLoggedIn() {
      return !!this.loginInfo; // loginInfo가 null이 아니면 로그인 상태로 판단합니다.
    },
  },
  watch: {
    $route: {
      handler() {
        // 라우트 변경 시 추가적인 작업을 수행할 수 있습니다.
        console.log('Route changed');
        // 예시로 로그인 상태와 관련된 정보 출력
        console.log('isLoggedIn:', this.isLoggedIn);
        console.log('loginInfo:', this.loginInfo);
        console.log('isChecked:', this.isChecked);
      },
      immediate: true, // 페이지 진입 시에도 즉시 실행되도록 설정
    },
  },
};
</script>

<style>
@import url('../src/assets/css/css.css');
</style>
