<template>
    <div class="cards card-white" v-if="dataLoaded">
      <p class="lg2 KB_S4 attandance">
        <i class="bi bi-calendar-check" style="color: #ff93e1"></i>&nbsp;&nbsp;{{ month }} 출석체크
      </p>
      <div ref="calendarContainer" class="calendar-container">
        <DatePicker
          v-model="selectedDate"
          :inline="true"
          :highlighted="highlightedDates"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, nextTick, onMounted } from "vue";
  import DatePicker from "@vuepic/vue-datepicker";
  import "@vuepic/vue-datepicker/dist/main.css";
  
  export default {
    name: "AttendanceCom",
    components: {
      DatePicker,
    },
    setup() {
      const selectedDate = ref(null);
      const dataLoaded = ref(false);
      const highlightedDates = ref([
        { date: new Date("2024-06-10"), class: "highlight" },
        { date: new Date("2024-06-26"), class: "today" },
      ]);
      const calendarContainer = ref(null);
      const month = ref('');
  
      onMounted(() => {
        dataLoaded.value = true;
        // DOM 업데이트 후 버튼 숨기기 및 스타일 적용
        nextTick(() => {
          // 버튼 숨기기
          const actionButtons = document.querySelectorAll(
            ".dp__btn, .dp__action_buttons"
          );
          actionButtons.forEach((button) => {
            button.style.display = "none";
          });
  
          // 달력의 가로 크기 조정
          const calendarElement = calendarContainer.value.querySelector('.dp__calendar');
          if (calendarElement) {
            calendarElement.style.width = "300px";
            calendarElement.style.height = "250px";
          }
  
          // 현재 월 표시를 위한 커스터마이징
          const currentDate = new Date();
          month.value = currentDate.toLocaleString("default", {
            month: "long",
          });
  
        
        });
      });
  
      return {
        selectedDate,
        dataLoaded,
        highlightedDates,
        calendarContainer,
        month, // 반환하여 템플릿에서 사용할 수 있도록 함
      };
    },
  };
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
  