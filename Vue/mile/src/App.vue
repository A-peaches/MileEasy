<template>
  <Header />
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
