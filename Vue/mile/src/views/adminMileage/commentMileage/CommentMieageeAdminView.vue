<!--🚨마일리지 관리자 :  마일리지 멘트화면-->
<template>
  <div class="cards page-back mx-auto" >
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
        <div v-for="(recommand, index) in mileRecommands" :key="index" class="p-2 d-flex justify-content-between align-items-center">
          <div class="input-gray p-3" style="width: 95%; text-align:left;">
            <input v-model="recommand.mile_mention" class="lg2" placeholder="추천 멘트를 입력하세요" style="text-align: left; width: 100%;"/>
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
      baseHeight: 80,
      increment: 10,
      mileRecommands: []
    }
  },
  computed :{
    ...mapGetters('mile', ['getMileInfo']),
    ...mapGetters('login', ['getLoginInfo', 'getIsChecked']),
    ...mapGetters('mileRecommand', ['getMileRecommandInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
    computedHeight(){
      return `${this.baseHeight + this.mileRecommands.length * this.increment}vh`;
    },
    mileRecommandInfo(){
      return this.getMileRecommandInfo;
    },
    isChecked() {
      return this.getIsChecked;
    }
  },
  methods: {
    ...mapActions('mile', ['fetchMileInfo']),
    ...mapActions('mileRecommand', ['getMileRecommand','updateRecommands', 'addRecommands', 'deleteRecommands']),
    addComment(){
      const newRecommand = {
        mile_mention: '', 
        mile_no: this.mileRecommands.length > 0 ? this.mileRecommands[0].mile_no : null, 
        mile_link: this.mileRecommands.length > 0 ? this.mileRecommands[0].mile_link : null, 
        mile_recommand_no: null
      };
      this.mileRecommands.push(newRecommand);
    },
    async deleteComment(index){
      const confirmDeletion = await this.showAlertConfirm("추천멘트를 삭제하시겠습니까?", "warning");
      if(confirmDeletion){
        const recommand = this.mileRecommands[index];
        if(recommand.mile_recommand_no){
          // DB에 있는 멘트를 삭제할 경우 
          const response = await this.deleteRecommands(recommand);
          if(response && response.data.success){
            this.mileRecommands.splice(index, 1); // 해당 인덱스의 항목을 배열에서 삭제 
            console.log('삭제 완료');
          }else{
            console.log('삭제 실패');
          }
        }else{
          // DB에 없는 멘트를 삭제할 경우
          this.mileRecommands.splice(index, 1); // 해당 인덱스의 항목을 배열에서 삭제 
        }
      }else{
        console.log('삭제 취소');
      }
    },
    async addCommentAction(){
      if(this.mileRecommands!=null){
        for(const recommand of this.mileRecommands){
          if(recommand.mile_recommand_no){
            // recommand가 이미 존재하면 업데이트 
            await this.updateRecommands(recommand);
          }else{
            // recommand가 존재하지 않으면 새로 추가 
            await this.addRecommands(recommand);
          }
        }
        this.showAlert('추천 멘트가 등록되었습니다', 'success', '#');
      }else{
        this.showAlert('추천 멘트 등록이 실패했습니다', 'error', '#')
      }
    },
    showAlert(t, i, r) {
      this.$swal({
        title: t,
        icon: i,
        scrollbarPadding: false
      }).then((result) => {
        if(result.isConfirmed){
          if(r == '#'){
            location.reload(); // 현재 페이지 새로고침
          }else{
            this.$router.push(r);
          }
        }
      })
    },
    showAlertConfirm(t, i) {
      return this.$swal({
        title: t,
        icon: i,
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        scrollbarPadding: false
      }).then((result) => {
        return result.isConfirmed;
      });
    },
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo.user_is_manager == 1 && this.getIsChecked == false)) {
          window.location.href="/noAccess"
        } 
    },
  },
  async created(){
    // 마일리지 담당자 로그인 여부 확인
    this.checkLoginInfo();
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
    const mile_no = this.loginInfo ? this.loginInfo.mile_no : null;
    this.mile_no = mile_no;
    if(mile_no){
      await this.getMileRecommand(mile_no);
      const mileRecommandInfo = this.getMileRecommandInfo;
      if(mileRecommandInfo){
        this.mileRecommands = mileRecommandInfo;
      }else {
        console.error('추천멘트를 가져올 수 없습니다.');
      }
    }
  },
};
</script>

<style scoped>

</style>
