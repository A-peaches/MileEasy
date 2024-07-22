<template>
    <div class="cards card-white" v-if="dataLoaded">
      <p class="lg2 KB_S4 attandance">
        <i class="bi bi-calendar-check" style="color: #ff93e1"></i>&nbsp;&nbsp;출석체크
      </p>

        
    </div>
  </template>
  
  <script>


  export default {
    name: "AttendanceCom",
    components: {
    },
  }
  </script>
  
  <style scoped>
  .header {
    font-size: 1.2em;
    margin-bottom: 16px;
  }
  
  .highlight {
    background-color: #ff93e1 !important;
    color: white !important;
  }
  
  .today {
    border: 2px solid #ff93e1 !important;
  }
  
  /* 현재 월 표시 */
  .current-month {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
  }
  
  /* 헤더의 요일 표시 조정 */
  .dp__calendar_header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .dp__calendar_nav {
    width: 100%;
    text-align: center;
    margin-top: 5px;
  }
  </style>
  