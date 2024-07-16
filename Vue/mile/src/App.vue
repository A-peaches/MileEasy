<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/allUser">AllUser</router-link> |
    <router-link to="/selectUser">selectUser</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <Header />
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import Header from './views/HeaderView.vue';

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
