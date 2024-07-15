// src/store/index.js
import { createStore } from 'vuex';
import user from './user';
import login from './login';

export default createStore({
  modules: {
    user,
    login
  }
});
