<template>
  <div>
    <div v-for="(list, index) in contactsMileEasy" :key="list.user_no" class="contact-container">
      <div class="border-bottom p-2">
        <div class="d-flex align-items-center justify-content-between">
          <span class="p-3 contact-title" >{{ roleList[index % roleList.length] }}</span>
          <div class="d-flex justify-content-end align-items-center">
            <span class="p-3 mr-3 contact-name" >{{ list.user_name }}</span>
            <span class="highlight" @click="connecting(list.user_phone)" style="text-align: left; font-family: KB_C3; font-size: 15pt;">
              <i class="bi bi-telephone"></i>
              {{ list.user_phone }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MileEasyContact",
  data() {
    return {
      phone_num: '',
      roleList: ['관리총괄', '규정/지침', '문의사항', 'Desk 운영']
    };
  },
  methods: {
    ...mapActions('contact', ['arrayContactMileEasy']),
    connecting(phone_num) {
      document.body.classList.add('swal-open');
      this.connectAlret(phone_num);
      document.body.classList.remove('swal-open');
    },
    connectAlret(phone_num) {
    let timerInterval;
    let timeLeft = 3; // 3초부터 시작
    
    this.$swal({
      title: `+82 02-2073-${phone_num}`,
      html: `<b>${timeLeft}</b>초 후에 연결됩니다....`,
      timer: 3000,
      timerProgressBar: true,
      scrollbarPadding: false,
      
      didOpen: () => {
        const popup = this.$swal.getPopup();
        popup.style.height = '200px'; // 원하는 높이로 조정

        this.$swal.showLoading();
        const timer = this.$swal.getHtmlContainer().querySelector("b");
        timer.textContent = `${timeLeft}`; // 초기 시간 설정
        timerInterval = setInterval(() => {
          timeLeft -= 1;
          timer.textContent = `${timeLeft}`;
          if (timeLeft === 0) {
            clearInterval(timerInterval);
          }
        }, 1000); // 1초마다 업데이트
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === this.$swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
   },
  },
  created() {
    this.arrayContactMileEasy();
  },
  computed: {
    ...mapGetters("contact", ["getContacts"]),
    contactsMileEasy(){
      return this.getContacts;
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .contact-title{
    font-size: 12pt !important;
    padding: 0 !important;
  }
  .contact-container {
    padding:0 2% !important;
  }
  .contact-name{
    font-size: 10pt !important;
    padding: 0 !important;
  }
  .highlight {
    border-radius: 30px; /* 둥근 모서리 */
    padding: 4px 8px; /* 내부 여백을 추가하여 크기 조절 */
    display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
    text-align: left; 
    font-size: 10pt !important;
  }
}

.contact-container {
  padding:0 5%;
}

.contact-title{
  text-align: left; 
  font-family: KB_C2; 
  font-size: 18pt;
}

.highlight {
  background-color: #CFD4E7;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8px; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
  text-align: left; 
  font-family: KB_C3; 
  font-size: 15pt;
}

.highlight:hover {
  cursor: pointer;
}

.contact-name{
  text-align: left; 
  font-family: KB_C3; 
  font-size: 15pt;
}
</style>