<template>
  <Header v-if="!$route.meta.hideHeader" /> <!--특정 라우터에서 Header를 숨기는 메타 필드 추가-->
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import Header from './views/test/HeaderView.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions('login', ['checkLogin']),
  },
};
</script>

<style>
@import url('./assets/css/css.css');
</style>
