<template>
  <!-- 운영관리자 헤더  -->
  <div>
    <ul class="nav justify-content-end">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          마왕관리
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/kingTopAdminView">TOP</a></li>
          <li>
            <a class="dropdown-item" href="/kingSelectAdminView">채택하기</a>
          </li>
          <li>
            <a class="dropdown-item" href="/kingBadgeOptionAdminView"
              >배지 디자인 변경</a
            >
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-expanded="false"
        >
          마일리지 관리
        </a>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="/mileageAddAdminView"
              >마일리지 추가</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="/mileageModifyAdminView"
              >마일리지 수정</a
            >
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-expanded="false"
        >
          M-Tip
        </a>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="/m_TipMainAdminView">M-Tip 가이드</a>
          </li>
          <li>
            <a class="dropdown-item" href="/m_TipListView">M-Tip 관리</a>
          </li>
        </ul>
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
          <li><a class="dropdown-item" href="/qnaListView">Q&A 답변</a></li>
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
