<template>
  <div>
    <div v-for="detail in arrayMiles" :key="detail.mile_introduce_no" class="mile-card">
      <div class="mile-card-content">
        <h3 class="mile-title">{{ detail.mile_title }} 마일리지</h3>
        <div class="mile-content-container">
          <div class="mile-content">
            <pre class="mile-content-text">{{ detail.mile_content }}</pre>
          </div>
          <div class="mile-detail-button">
            <button v-if="detail.mile_route" @click="download(detail.mile_route)" class="detail-button text-brown">
              <p>상세보기 〉</p>
            </button>
          </div>
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

<style scoped>
.mile-card {
  padding: 0 5%;
  margin-bottom: 20px;
}

.mile-card-content {
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
}

.mile-title {
  text-align: left;
  font-family: KB_C2, sans-serif;
  font-size: 24px;
  margin-bottom: 15px;
}

.mile-content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.mile-content {
  flex: 1;
  min-width: 0;
  margin-right: 20px;
}

.mile-content-text {
  text-align: left;
  font-family: KB_C3, sans-serif;
  font-size: 15pt;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  line-height: 1.5;
}

.mile-detail-button {
  flex-shrink: 0;
  align-self: flex-start;
}

.detail-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.detail-button p {
  text-align: right;
  margin: 0;
  font-size: 14pt;
}

@media (max-width: 768px) {
  .mile-title {
    font-size: 20px;
  }

  .mile-content-text {
    font-size: 14pt;
  }

  .mile-content-container {
    flex-direction: column;
  }

  .mile-content {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .mile-detail-button {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .mile-card {
    padding: 0 3%;
  }

  .mile-card-content {
    padding: 15px;
  }

  .mile-title {
    font-size: 18px;
  }

  .mile-content-text {
    font-size: 12pt;
  }

  .mile-content-container {
    padding: 15px;
  }

  .detail-button p {
    font-size: 12pt;
  }
}
</style>