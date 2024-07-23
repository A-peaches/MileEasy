<template>
  <div class="modals">
    <div class="modals-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <p class="lg2 KB_S4 mb-3" style="margin-bottom: 0px">
        <i class="bi bi-calendar-check" style="color: #42b983"></i>&nbsp;&nbsp;
        <span class="KB_S4" style="font-size: 19pt">출석체크</span>
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
          class="btn-green my-3"
          @click="handleAddAttendance"
          style="width: 25%; height: 45px; font-size: 14pt"
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

    async handleAddAttendance() {

      // 오늘 날짜를 문자열 형식으로 생성
      const today = new Date().toISOString().split('T')[0];
      // getArrayAttendance 배열에서 오늘 날짜가 포함되어 있는지 확인
      const hasTodayAttendance = this.getArrayAttendance.some(event => 
      event.start.split(' ')[0] === today);

      if (hasTodayAttendance) {
        this.showAlert();
        return; //함수종료
      }
      try {
        await this.addAttendance(this.getLoginInfo.user_no);
        console.log("출석 체크 성공");
      } catch (error) {
        console.error("출석 체크 실패:", error);
      }

    },
    showAlert() {
      this.$swal({
        title: "경고",
        text: "출석체크는 하루에 한번만 가능합니다.",
        icon: "warning",
      });
    },
  },
  async created() {
    await this.getAttendance(this.getLoginInfo.user_no);
    this.dataLoaded = true;
  },
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
  background-color: white;
  background-repeat: no-repeat;
  color: white;
  background-position: 5px 9px; /* 이미지를 오른쪽으로 5px 이동 */
}
</style>
