<template>
  <div class="flex" style="margin-left: 10%; margin-right: 10%;">
    <div class="cards" style="width: 24% ;height : 400px">
      <img
        src="@\assets\test.png"
        class="profile-large my-3"
        alt="Profile Picture"
      />
      <h2 class="lg KB_S5 my-3">{{loginInfo.user_name}}</h2>
      <p class="md" style="margin-bottom: 0px">{{loginInfo.level_no}} {{loginInfo.position_no}} | {{loginInfo.job_no}}직무</p>
      <p class="md" style="margin-bottom: 10px">{{ loginInfo.dp_no }}</p>
      <button class="btn-yellow KB_C2">나의 마일리지</button>
    </div>
    <favorite  style="width: 70%; margin-left:3%"/>
  </div>
</template>
asw nns dx
<script>
import favorite from '@/components/main/FavoriteCom.vue'
import { mapGetters } from 'vuex';

export default {
  name: "UserMainView",
  components: { favorite },
  methods :{
  
  },
  computed :{
    ...mapGetters('login', ['getLoginInfo']),
    
    loginInfo() {
      return this.getLoginInfo;
    }
  }
};
</script>
