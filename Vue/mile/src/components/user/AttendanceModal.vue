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
            style="height: 500px; width: 100%;"
            events-count-on-year-view
            :events="attendanceEvents"
            :time-from="10 * 60"
            :disable-views="['day']"
            :show-events-on-month-view="true"
            :events-on-month-view="true"
            cells-content="events-count"
          >
            <template #cell-content="{ events, dayNumber }">
              <div v-if="events.length" class="custom-event">
                <img src="../../assets/imoji/kolly/콜리얼굴사랑.png" alt="Event Image" class="event-image" />
              </div>
              <div v-else>{{ dayNumber }}</div>
            </template>
            <template #arrow-prev>
              <i class="bi bi-chevron-left"></i>
            </template>
            <template #arrow-next>
              <i class="bi bi-chevron-right"></i>
            </template>
          </vue-cal>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VueCal from "vue-cal";
  import "vue-cal/dist/vuecal.css";
  import { mapActions, mapGetters } from 'vuex';
  
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
      }
    },
    methods: {
      ...mapActions("attendance", ["getAttendance"]),
    },
    async created() {
      await this.getAttendance(this.getLoginInfo.user_no);
      this.dataLoaded = true;
    },
  };
  </script>
  
  <style scoped>
  .modals {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
  }
  
  .modals-content {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #888;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    position: relative;
  }
  
  .calendar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  
  .custom-event {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .event-image {
    width: 60px;
    height: 60px;
  }
  
  .vuecal__cell {
    position: relative;
  }
  
  .vuecal__cell-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }


  </style>
  