<template>
  <div class="cards card-white">
    <p class="lg2 KB_S4" style=" margin-bottom: 10px; margin-right: 10px;">
        <i class="bi bi-calendar-check" style="color:#FF93E1"></i>&nbsp;&nbsp;출석체크
    </p>
    <div id="app">
    <vue-cal :events="events" style="width:100%"></vue-cal>
  </div>
    </div>
</template>
  
  <script>
  import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
  name: "AttendanceCom",
  data() {
    return {
        events: [
        {
          start: '2024-07-20 00:00',
          end: '2024-07-21 12:00',
          title: 'Event 1'
        }
    ]
    };
  },
  components: {
    VueCal
  },
  computed: {},
  methos: {},
};
</script>
  
  