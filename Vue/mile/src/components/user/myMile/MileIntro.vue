<template>
  <div>
    <div v-for="detail in arrayMiles" :key="detail.mile_introduce_no" style="padding:0 5%;">
      <div class="border-bottom p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="lg p-3" style="text-align: left; font-family: KB_C2">{{ detail.mile_title }}</h3>
        </div>
        <div class="d-flex justify-content-between align-items-center input-gray p-4">
          <span><pre class="lg2" style="text-align: left; font-family: KB_C3; font-size: 15pt">{{ detail.mile_content }}</pre></span>
          <button @click="download(detail.mile_route)"><p class="md" v-if="detail.mile_route" style="text-align: right;">상세보기 〉</p></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MileDocument",
  props: ['mile_no'],
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions('mile', ['getMileDetail', 'downloadFile']),
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
    download(mile_route){
      this.downloadFile({ mile_route });
    },
  },
  async created() {
    if(this.mile_no){
      this.arrayMiles = await this.getMileDetail(this.mile_no);
      console.log('이건 가져온 마일리지 소개글', this.arrayMiles);
      if(this.arrayMiles.length==0){
        this.showAlert('등록된 마일리지 소개 글이 없습니다', 'warning', '/myMileageView');
      }
    }else{
      console.error('mile_no이 유효하지 않습니다.');
    }
  },
  mounted() {
  // mile_no를 사용할 수 있습니다.
  console.log('Mile No:', this.mile_no);
},
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
    ...mapGetters('mile', ['getArrayMiles']),
    arrayMiles(){
      return this.getArrayMiles;
    }

  },
  watch: {
  }
};
</script>