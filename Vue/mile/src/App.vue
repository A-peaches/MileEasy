<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/allUser">AllUser</router-link> |
    <router-link to="/selectUser">selectUser</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions('login', ['checkLogin'])
  }
};
</script>


<style>
@import url('./assets/css/css.css');
</style>
