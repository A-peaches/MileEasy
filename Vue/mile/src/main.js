// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// import '@mdi/font/css/materialdesignicons.css';
import { BootstrapVue3, IconsPlugin } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import moment from 'moment';
import _ from 'lodash';
import VueScreen from 'vue-screen';
import VueDeviceDetector from 'vue3-device-detector';

// Axios 설정
const app = createApp(App);
app.config.globalProperties.$axios = axios;

// Vuetify 설정
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
app.use(vuetify);

// BootstrapVue 설정
app.use(BootstrapVue3);
app.use(IconsPlugin);

// Moment 및 Lodash를 Vue 인스턴스에 추가
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$lodash = _;

// Responsive 및 Device Detector 설정
app.use(VueScreen);
app.use(VueDeviceDetector);

app.use(router);
app.use(store);
app.mount('#app');
