<template>
  <div class="modals">
    <div class="modals-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <p class="lg2 KB_S4 mb-3 modal-header" style="margin-bottom: 0px">
        <i class="bi bi-calendar-check" style="color: #42b983"></i>&nbsp;&nbsp;
        <span class="KB_S4 modal-title" style="font-size: 19pt">출석체크</span>
      </p>
      <div class="calendar-container">
        <vue-cal
          class="vuecal--custom-theme vuecal--rounded-theme vuecal--date-picker"
          hide-view-selector
          :time="false"
          active-view="month"
          xsmall
          style="height: 500px; width: 100%"
          events-count-on-year-view
          :events="attendanceEvents"
          :time-from="10 * 60"
          :disable-views="['day']"
        >
          <template #arrow-prev>
            <i class="bi bi-chevron-left"></i>
          </template>
          <template #arrow-next>
            <i class="bi bi-chevron-right"></i>
          </template>
        </vue-cal>
      </div>
      <div class="text-center">
        <button
          class="btn-green my-3 modal-btn"
          @click="handleAddAttendance"
           
        >
          출석체크
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { VueCal },
  data() {
    return {
      dataLoaded: false,
    };
  },
  computed: {
    ...mapGetters("attendance", ["getArrayAttendance"]),
    ...mapGetters("login", ["getLoginInfo"]),
    attendanceEvents() {
      return this.getArrayAttendance;
    },
  },
  methods: {
    ...mapActions("attendance", ["getAttendance"]),
    ...mapActions("attendance", ["addAttendance"]),
    preventScroll() {
    document.body.style.overflow = 'hidden';
  },
  allowScroll() {
    document.body.style.overflow = '';
  },
    async handleAddAttendance() {
    const today = new Date().toLocaleDateString();
    const hasTodayAttendance = this.getArrayAttendance.some(
      (event) => new Date(event.start).toLocaleDateString() === today
    );

    if (hasTodayAttendance) {
      this.warningAlert();
      return;
    }

    try {
      await this.addAttendance(this.getLoginInfo.user_no);
      await this.getAttendance(this.getLoginInfo.user_no);
      this.succesAlert();
    } catch (error) {
      console.error("출석 체크 실패:", error);
      this.errorAlert();
    }
  },
  errorAlert() {
    this.$swal({
      title: "오류",
      text: "출석 체크 중 문제가 발생했습니다. 다시 시도해 주세요.",
      icon: "error",
      scrollbarPadding: false
    });
  },
    warningAlert() {
      this.$swal({
        title: "경고",
        text: "출석체크는 하루에 한번만 가능합니다.",
        icon: "warning",
        scrollbarPadding: false,
        
      });
    },
    succesAlert() {
      this.$swal({
        title: "성공",
        text: "출석체크가 완료되었습니다.",
        icon: "success",
        scrollbarPadding: false
      });
    },
  },
  async created() {
    await this.getAttendance(this.getLoginInfo.user_no);
    this.dataLoaded = true;
  },
  mounted() {
  this.preventScroll();
},
beforeUnmount() {
  this.allowScroll();
}
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

/* Dash indicator */
::v-deep .vuecal__cell-events-count {
  background-image: url("../../assets/imoji/bb/비비얼굴사랑.png");
  top: -15px;
  height: 50px;
  width: 50px;
  background-size: 38px 33px;
  background-color: #F9F9F9;
  background-repeat: no-repeat;
  color: #F9F9F9;
  background-position: 5px 9px; /* 이미지를 오른쪽으로 5px 이동 */
}

body.alret-open {
  overflow: hidden;
}

.modal-btn {
  width: 30%; 
  height: 45px; 
  font-size: 12pt;
}

@media (max-width: 768px) {
  .modals .modals-content {
    width: 90%;
    height: auto;
    max-height: 90vh;
    margin: auto;
    overflow-y: auto;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    background-color: white;
  }

  .modals {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-y: auto;
  }

  .modal-header {
    font-size: 16pt;
    text-align: center;
  }

  .modal-title {
    font-size: 16pt;
  }

  .modal-btn {
    width: 150px;
    height: 45px;
    font-size: 14pt;
  }

  .calendar-container {
    height: auto;
    width: 100%;
  }

  .close {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  ::v-deep .vuecal__cell-events-count {
    top: -4px;
    height: 30px;
    width: 30px;
    background-size: 25px 23px; /* 이미지 크기 축소 */
    background-position: 2px 5px; /* 위치 조정 */
  }
}

</style>