<template>
  <div key="profile" class="cards" style="height: 105%; padding-left:30px">
    <div class="profile-remark">
      {{ loginInfo ? loginInfo.user_name : "" }}님, 오늘도 좋은하루 되세요!
    </div>
    <div class="text-start brown mt-2">나의 M-Tip 작성 건수 : 0건</div>

    <!-- 버튼구간 -->
    <div class="text-start" style="margin-top : 100px">
      <a class="btn-mtip" href="#">
        <i class="bi bi-pencil mr-2"></i>
        <span class="btn-text">글작성</span> 
        <span class="right-arrow">></span>
      </a><br>
      <div class="mt-2"></div>
      <a class="btn-mtip" href="#">
        <i class="bi bi-file-earmark-text mr-2 "></i>
        <span class="btn-text">나의 M-Tip</span>
         <span class="right-arrow">></span>
      </a><br>
      <div class="mt-2"></div>
      <a class="btn-mtip " href="#">
        <i class="bi bi-heart mr-2 "></i>
        <span class="btn-text">내가 좋아요한 M-Tip</span>
         <span class="right-arrow">></span>
      </a>
      <br>
    </div>
  </div>


</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileCom",
  data() {
    return {
      remark: [""],
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    loginInfo() {
      const info = this.getLoginInfo;
      return info
        ? {
            ...info,
            position_no: info.position_no || "",
            level_no: info.level_no || "",
            job_no: info.job_no || "",
            dp_no: info.dp_no || "",
          }
        : null;
    },
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = require("@/assets/img/test.png");
    },
    goToMyMileageView() {
      window.location.href = "/myMileageView";
    },
  },
};
</script>

<style scoped>
.btn-mtip{
  font-size :13pt;
  color:black;
  text-align: left; /* 버튼 내부 텍스트 왼쪽 정렬 */
  margin-top : 6px;
  text-decoration: none;
}




.profile-remark {
  margin-top: 20px;
  text-align: start;
  font-size: 14pt;
  font-family: "KB_C3";
  font-weight: 600;
}

.right-arrow {
  align-items: flex-end;
  font-family: 'KB_S4';
}

.btn-text {
  display: inline-block;
  text-align: start;
  width: 75%; 
}
</style>