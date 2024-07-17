<template>
  <!-- 마일리지 당담자 헤더 -->
  <div>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          href="/introduceMileageAdminView"
          >마일리지 소개</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          href="/commentMieageeAdminView"
          >마일리지 멘트</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link active"
          aria-current="page"
          href="/documentsMileageAdminView"
          >마일리지 문서</a
        >
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-expanded="false"
        >
          Desk
        </a>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="/noticeListView">공지사항</a>
          </li>
          <li><a class="dropdown-item" href="/qnaListView">Q&A</a></li>
          <li>
            <a class="dropdown-item" href="/mileEasyContactView"
              >업무별 연락처</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="/mileageContactView"
              >마일리지 연락처</a
            >
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" @click="Logout"
          >로그아웃</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    loginInfo() {
      return this.getLoginInfo;
    },
    isChecked() {
      return this.getIsChecked;
    },
  },
  methods: {
    ...mapActions('login', ['logout']),
    Logout() {
      this.logout();
      window.location.href = '/login';
    },
  },
};
</script>

<style scoped>
/* 필요 시 추가적인 스타일링 */
</style>
