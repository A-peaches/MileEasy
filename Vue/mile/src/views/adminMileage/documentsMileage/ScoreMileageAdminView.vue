<!--🚨마일리지 관리자 :  마일리지 문서-->
<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg my-5" style="font-family: KB_C3">{{ mileInfo ? mileInfo.mile_no : '' }} 마일리지 점수</h2>
    
    <!-- <div v-for="detail in arrayMiles" :key="detail.mile_introduce_no" style="padding:0 5%;">
      <div class="border-bottom p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">{{ detail.mile_title }}</h3>
          <div>
            <a :href="'/introduceMileageModifyAdminView?mile_introduce_no=' + detail.mile_introduce_no" style="text-decoration: none;" class="brown">수정</a>
            <span class="mx-2">|</span>   
            <button @click="deleteMileDetail(detail.mile_introduce_no)" class="brown">삭제</button>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center input-gray p-4">
          <span><pre class="lg2" style="text-align: left; font-family: KB_C3; font-size: 15pt">{{ detail.mile_content }}</pre></span>
          <button @click="download(detail.mile_route)"><p class="md" v-if="detail.mile_route" style="text-align: right;">상세보기 〉</p></button>
        </div>
      </div>
    </div> -->
    
    <div class="d-flex justify-content-evenly mx-auto" style="width: 80%;">
      <div class="my-5">
        <button @click="openModal" class="btn-green" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">등록하기</button>
      </div>
      <div class="my-5">
        <button @click="deleteDocu" class="btn-gray" :class="{choice:isDelete}" style="width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;">삭제하기</button>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <div v-if="isModalOpen" class="modals">
      <div
        class="modals-content"
        style="width: 40%; height: 45%; background-color: #f9f9f9"
      >
        <span class="close" @click="closeModal">&times;</span>
        <div>
          <p class="text-left fw-bold mb-3" style="font-size: 19pt">
            마일리지 점수 업로드
          </p>
          <div class="p-3" style="margin-top: 5vh;">
            <div class="d-flex input-gray mt-3 p-4">
              <input type="file" @change="handlerFileUpload" class="lg2" style="width: 90%; text-align: right;"/>
            </div>
          </div>
          <div class="d-flex justify-content-center" style="margin-top: 8vh;">
            <button
              class="btn-gray mt-3 KB_C2"
              @click="updateFavorites"
              style="
                font-size: 16pt;
                width: 20%;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              "
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'DocumentsMileageAdminView',
  data(){
    return{
      isDelete: false,
      isModalOpen: false,
    }
  },
  computed:{
    ...mapGetters('mile', ['getMileInfo']),
    ...mapGetters('login', ['getLoginInfo']),
    loginInfo(){
      return this.getLoginInfo;
    },
    mileInfo() {
      return this.getMileInfo;
    },
  },
  methods:{
    ...mapActions('mile', ['fetchMileInfo']),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    deleteDocu(){
      if(!this.isDelete) {
        this.isDelete = true;
      }else{
        this.isDelete = false;
      }
    },
    
  },
  created(){
    const user_no = this.loginInfo ? this.loginInfo.user_no : null;
    if(user_no){
      this.mileInfo = this.fetchMileInfo(user_no);
    }else{
      console.error('user_no이 유효하지 않습니다.');
    }

    // 등록된 마일리지 문서 가져오기 (첨부파일 포함)

  }
};
</script>

<style scope>
.page-back {
  width: 70%;
  /* height: 140vh; */
  height: 800px;
  margin-top: 5%;
}
.choice {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
  margin: 5px 5px 5px 5px;
}

</style>
