<template>
  <div class="cards card-white" v-if="dataLoaded">
    <p class="lg2 KB_S4" style="margin-bottom: 0px">
      <i class="bi bi-calendar-check" style="color: #42b983"></i>&nbsp;&nbsp;
      출석체크
    </p>
    <div
      class="calendar-container"
      style="cursor: pointer; margin-top:0px"
      @click.stop="openModal"
    >
      <!-- 여기에 달력 -->
      <vue-cal
        class="vuecal--custom-theme vuecal--rounded-theme vuecal--date-picker"
        hide-view-selector
        :time="false"
        active-view="month"
        xsmall
        style="height: 300px"
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

    <!-- 모달 컴포넌트 -->
    <Modal v-if="isModalOpen" @close="closeModal"  />
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Modal from '../user/AttendanceModal.vue'; // 모달 컴포넌트 임포트
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { VueCal, Modal },
  name: "AttendanceCom",
  data() {
    return {
      dataLoaded: false,
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters("attendance", ["getArrayAttendance"]),
    ...mapGetters("login", ["getLoginInfo"]),
    attendanceEvents() {
      return this.getArrayAttendance;
    }
  },
  methods: {
    ...mapActions("attendance", ["getAttendance"]),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  async created() {
    await this.getAttendance(this.getLoginInfo.user_no);
    this.dataLoaded = true;
  },
};
</script>

<style>
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모 컨테이너의 높이를 채워서 가운데 정렬 */
}

/* 사용자 정의 색상 테마 예제 */
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #42b983;
}
.vuecal__title-bar {
  background-color: #e4f5ef;
}
.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(240, 240, 255, 0.4);
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(235, 255, 245, 0.4);
}
.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
}

/* .vuecal__cell-events-count {
background-image: url('../../assets/imoji/kolly/콜리얼굴최고.png');
 top : -5px;
 height: 25px;
 width: 27px;
 background-size: 27px 25px;
 background-color: white;
 background-repeat: no-repeat;
 color :#23A07D;
} */

.vuecal__cell-events-count {
background-image: url('../../assets/imoji/bb/비비얼굴사랑.png');
 top : -8px;
 height: 35px;
 width: 30px;
 background-size: 25px 22px;
 background-color: white;
 background-repeat: no-repeat;
 color :white;
 background-position: 5px 10px;
}


</style>
