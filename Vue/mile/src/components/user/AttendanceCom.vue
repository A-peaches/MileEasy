<template>
  <div class="cards card-white attendance-component">
    <p class="lg2 KB_S4 text-center position-relative" style="margin-bottom: 0px">
      <i class="bi bi-calendar-check" style="color: #42b983"></i>&nbsp;&nbsp;
      출석체크
      <span class="expand-icon" @click.stop="openModal" style="cursor: pointer;">
        <i class="bi bi-chevron-double-right" style="color: gray"></i>
      </span>
    </p>
    <div class="calendar-container" style="margin-top:13px">
      <vue-cal
        v-if="dataLoaded"
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
      <div v-else class="loading-indicator">데이터 로딩 중...</div>
    </div>
    <teleport to="body">
    <Modal v-if="isModalOpen" @close="closeModal"  />
    </teleport>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Modal from '../user/AttendanceModal.vue';
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
    async loadAttendanceData() {
      try {
        await this.getAttendance(this.getLoginInfo.user_no);
        this.dataLoaded = true;
      } catch (error) {
        console.error("출석 데이터 로딩 실패:", error);
        // 에러 처리 로직 추가
      }
    }
  },
  mounted() {
    this.loadAttendanceData();
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

.expand-icon {
  position: absolute;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
}

.attendance-component {
  min-height: 395px;
  overflow: visible;
}

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading-indicator {
  text-align: center;
  padding: 20px;
}
</style>
