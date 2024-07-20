<!--🚨마일리지 관리자 :  마일리지 멘트화면-->
<template>
  <div class="cards page-back mx-auto" :style="{height:computedHeight}">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">마일리지 멘트</h2>
    <div style="padding:0 5%;">
      <div class="p-4 mt-5">
        <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">마일리지 항목</h3>
        <div class="p-2">
          <div class="input-gray p-3" style="text-align:left;">
            <span class="lg2" style="width: 100%; text-align: left;">{{mile_name}}&nbsp;마일리지</span>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">추천 멘트</h3>
          <button @click="addComment">
            <span class="lg2 mr-5 brown" style="text-align:right;"><i class="bi bi-plus-lg"></i>&nbsp;추가하기</span>
          </button>
        </div>
        <div v-for="(mention, index) in mentions" :key="index" class="p-2 d-flex justify-content-between align-items-center">
          <div class="input-gray p-3" style="width: 95%; text-align:left;">
            <input v-model="mentions[index]" class="lg2" placeholder="추천 멘트를 입력하세요" style="text-align: left; width: 100%;"/>
          </div>
          <button @click="deleteComment(index)">
            <span class="lg brown"><i class="bi bi-dash-lg"></i></span>
          </button>
        </div>
      </div>
    </div>
    <div style="padding-top: 10%">
      <button @click="addCommentAction" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">등록</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'CommentMieageeAdminView',
  data(){
    return {
      mile_no: '',
      mile_name: '',
      mentions: ['', ''], // mentions 배열 추가
      baseHeight: 80,
      increment: 10,
      mileRecommand: {}
    }
  },
  computed :{
    ...mapGetters('mile', ['getMileInfo']),
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    computedHeight(){
      return `${this.baseHeight + this.mentions.length * this.increment}vh`;
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo']),
    addComment(){
      this.mentions.push('');
    },
    deleteComment(index){
      this.mentions.splice(index, 1); // 해당 인덱스의 항목을 배열에서 삭제 
    },
    ...mapActions('mileRecommand', ['addComment']),
    addCommentAction(){

    }
  },
  async created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      await this.fetchMileInfo(user_no);
      const mileInfo = this.getMileInfo;
      if(mileInfo){
        this.mile_name = mileInfo.mile_no;
      }else{
        console.error('마일리지 이름을 가져올 수 없습니다.');
      }
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }
  },
};
</script>

<style scoped>
.page-back {
  width: 70%;
  margin-top: 5%;
}
</style>
