<template>
  <div>
    <!-- 사용자 헤더 -->
    <div v-if="loginInfo === true">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/main"
            >메인-허접</a
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
      </ul>
    </div>

    <!-- 운영관리자 헤더 -->
    <div v-else>
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
            <li><a class="dropdown-item" href="/myMileageView">TOP</a></li>
            <li><a class="dropdown-item" href="/hrdView">채택하기</a></li>
            <li>
              <a class="dropdown-item" href="/monthlyBestView"
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
              <a class="dropdown-item" href="/myMileageView">마일리지 추가</a>
            </li>
            <li><a class="dropdown-item" href="/hrdView">마일리지 수정</a></li>
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
              <a class="dropdown-item" href="/myMileageView">M-Tip 가이드</a>
            </li>
            <li><a class="dropdown-item" href="/hrdView">M-Tip 관리</a></li>
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
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderView',
  computed: {
    loginInfo() {
      return this.$store.state.loginInfo;
    },
  },
};
</script>

<style scoped>
/* 필요 시 추가적인 스타일링 */
</style>
