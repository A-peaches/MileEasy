<template>
    <div key="profile" class="cards" style="height: 105%; padding-left:30px;
    margin-top:20px;">
      이곳은 바로 M-Tip 가이드를 불러오세요!!<br>
      이곳은 바로 M-Tip 가이드를 불러오세요!!<br>
      이곳은 바로 M-Tip 가이드를 불러오세요!!<br>
      이곳은 바로 M-Tip 가이드를 불러오세요!!<br>
      이곳은 바로 M-Tip 가이드를 불러오세요!!<br>
    </div>
  
  
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "GuideCom",
    data() {
     
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

    },
  };
  </script>
  
  <style scoped>

  </style>