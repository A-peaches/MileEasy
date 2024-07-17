<template>
  <div>
    <!-- 사용자 헤더 -->
    <div
      v-if="loginInfo && !loginInfo.user_is_admin && !loginInfo.user_is_manager"
    >
      <ul class="nav justify-content-end">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            나의 마일리지
          </a>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="/myMileageView">나의 마일리지</a>
            </li>
            <li><a class="dropdown-item" href="/hrdView">HRD 마일리지</a></li>
            <li>
              <a class="dropdown-item" href="/monthlyBestView"
                >MonthlyBest 마일리지</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/monthlyBaseView"
                >MonthlyBase 마일리지</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/bestBranchView"
                >Best PG 마일리지</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/leagueTableView"
                >리그테이블 마일리지</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/hotTipView">HOT Tip 마일리지</a>
            </li>
            <li>
              <a class="dropdown-item" href="/consumerSupportView"
                >소비자 지원 마일리지</a
              >
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/documentsView"
            >문서모아</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/m_TipMainView">M-Tip</a>
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

    <!-- 마일리지 당담자 헤더 -->
    <div
      v-else-if="
        loginInfo && loginInfo.user_is_admin && !loginInfo.user_is_manager
      "
    >
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

    <!-- 운영관리자 헤더  -->
    <div
      v-else-if="
        loginInfo && !loginInfo.user_is_admin && loginInfo.user_is_manager
      "
    >
      <ul class="nav justify-content-end">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
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
              <a class="dropdown-item" href="/m_TipMainAdminView"
                >M-Tip 가이드</a
              >
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo() {
      return this.getLoginInfo;
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
