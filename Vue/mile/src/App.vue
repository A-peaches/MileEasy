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
        class="fixed-header"
      />
      <HeaderManager
        v-else-if="
          isLoggedIn &&
          !loginInfo.user_is_admin &&
          loginInfo.user_is_manager &&
          isChecked
        "
        class="fixed-header"
      />
      <HeaderUser v-else-if="isLoggedIn && !isChecked" class="fixed-header" />

      <router-view />

      <button @click.stop="openModal" class="chat-button">
        <img src="./assets/img/chat.gif" alt="Chat" class="chat-icon" />
      </button>
      <ChatModal v-if="isModalOpen" :isOpen="isModalOpen" @close="closeModal" />

      <button @click="scrollToTop" class="top-button">
        <i class="bi bi-chevron-up"></i>
      </button>
      <Footer :key="$route.fullPath" v-if="!$route.meta.hideFooter"/>
      <!-- TOP 버튼 -->
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
import Footer from './views/common/FooterView.vue';
import ChatModal from './ChatModal.vue';

export default {
  name: 'App',

  data() {
    return {
      isModalOpen: false,
    };
  },
  components: {
    HeaderAdmin,
    HeaderUser,
    HeaderManager,
    Footer,
    ChatModal,
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
      immediate: true, // 페이지 진입 시에도 즉시 실행되도록 설정
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style>
@import url('./assets/css/css.css');

/* 버튼 스타일 */
.chat-button {
  position: fixed;
  bottom: 90px;
  right: 20px;
  background-color: transparent;
  width: 50px; /* 버튼의 가로 길이와 세로 길이를 같게 설정 */
  height: 50px;
  font-family: 'KB_C3', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;
}

.chat-icon {
  width: 50px; /* 이미지 크기 조정 */
  height: 50px;
  object-fit: cover; /* 이미지를 버튼 크기에 맞게 조정 */
}
</style>
