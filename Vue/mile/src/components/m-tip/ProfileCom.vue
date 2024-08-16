<template>
  <div key="profile" class="cards profile-card">
    <div class="profile-content">
      <div class="profile-remark">
        {{ loginInfo ? loginInfo.user_name : "" }}님, 오늘도 좋은하루 되세요!
      </div>
      <div class="text-start brown mt-2 md">나의 M-Tip 작성 건수 : {{ userTotalNotices }} 건</div>

      <div class="button-container">
        <a class="btn-mtip" href="/m_TipWriteView">
          <i class="bi bi-pencil mr-2"></i>
          <span class="btn-text">글작성</span> 
          <span class="right-arrow">></span>
        </a>
        <a class="btn-mtip" href="/myM_TipView">
          <i class="bi bi-file-earmark-text mr-2 "></i>
          <span class="btn-text">나의 M-Tip</span>
           <span class="right-arrow">></span>
        </a>
        <a class="btn-mtip " href="/MyM_TipBestView">
          <i class="bi bi-heart mr-2 "></i>
          <span class="btn-text">내가 좋아요한 M-Tip</span>
           <span class="right-arrow">></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ProfileCom",
  data() {
    return {
      remark: [""],
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters('mtipBoard', ['notices', 'userTotalNotices']),
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
    ...mapActions('mtipBoard', ['fetchNotices', 'fetchUserTotalNotices']),

    setDefaultImage(event) {
      event.target.src = require("@/assets/img/test.png");
    },
    goToMyMileageView() {
      window.location.href = "/myMileageView";
    },
  },
  async mounted() {
    await this.fetchNotices();
    if (this.loginInfo) {
      await this.fetchUserTotalNotices(this.loginInfo.user_no);
    }
  },
};
</script>

<style scoped>

.profile-card {
  height: 100%;
  min-height: 320px;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.profile-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile-remark {
  margin-top: 15px;
  text-align: start;
  font-size: 14pt;
  font-family: "KB_C2";
  font-weight: 600;
}

.button-container {
  margin-top: auto;
  margin-bottom: 15px;
}

.btn-mtip {
  display: block;
  font-size: 13pt;
  color: black;
  text-align: left;
  margin-top: 10px;
  text-decoration: none;
}

.btn-text {
  display: inline-block;
  text-align: start;
  width: 75%; 
}


.right-arrow {
  float: right;
  font-family: 'KB_C2';
}

@media (max-width: 768px) {
  .profile-card {
    margin-top:20px;
    padding: 20px;
  }
  
  .profile-remark {
    font-size: 12pt;
  }
  
  .btn-mtip {
    font-size: 11pt;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 15px;
  }
  
  .profile-remark {
    font-size: 10pt;
  }
  
  .btn-mtip {
    font-size: 10pt;
  }
  
  .btn-text {
    width: 70%;
  }
}.right-arrow {
  float: right;
  font-family: 'KB_C2';
}

@media (max-width: 768px) {
  .profile-card {
    min-height: auto;
    padding: 20px;
  }
  
  .profile-remark {
    font-size: 12pt;
  }
  
  .btn-mtip {
    font-size: 11pt;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 15px;
  }
  
  .profile-remark {
    font-size: 10pt;
  }
  
  .btn-mtip {
    font-size: 10pt;
  }
  
  .btn-text {
    width: 70%;
  }
}

</style>