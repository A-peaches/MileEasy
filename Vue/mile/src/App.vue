<template>
  <div id="app">
    <main v-if="!$route.meta.hideHeader">
      <Header v-if="!$route.meta.hideHeader" />
      <router-view />
    </main>
    <router-view v-else /> <!-- hideHeader가 true일 때는 main과 Header를 숨기고 router-view만 렌더링 -->
  </div>
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
