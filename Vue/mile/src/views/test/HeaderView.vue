<template>
  <div>
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
          >나의 마일리지</a
        >
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
            <a class="dropdown-item" href="/bestBranchView">Best PG 마일리지</a>
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
          >Desk</a
        >
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">공지사항</a></li>
          <li><a class="dropdown-item" href="#">Q&A</a></li>
          <li><a class="dropdown-item" href="#">업무별 연락처</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeaderView', //뷰페이지 네임
  methods: {
    showData() {
      console.log(this.getArrayUsers);
    },
  },
  computed: {},
  created() {},
};
</script>

<style scoped>
/* 필요 시 추가적인 스타일링 */
</style>
