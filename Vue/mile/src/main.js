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
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

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

app.config.errorHandler = (err, vm, info) => {
  console.error('Caught by Vue error handler:', err, info)
  
  // 에러 정보를 상태 관리 시스템(예: Vuex)에 저장
  store.commit('setError', {
    message: err.message,
    stack: err.stack,
    info: info
  })
  
  // 에러 페이지로 리다이렉트
  router.push({
    name: 'ErrorPageView',
    params: { errorCode: '500' },  // 일반적인 내부 서버 오류 코드
    query: { message: err.message }
  })
}

app.use(vuetify);

// BootstrapVue 설정
app.use(BootstrapVue3);
app.use(IconsPlugin);

// VueSweetalert2 설정
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
app.use(VueSweetalert2, options);

// Moment 및 Lodash를 Vue 인스턴스에 추가
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$lodash = _;

// Responsive 및 Device Detector 설정
app.use(VueScreen);
app.use(VueDeviceDetector);

app.use(router);
app.use(store);
app.mount('#app');
