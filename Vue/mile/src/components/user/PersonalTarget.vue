<template>
  <div>
    <div class="row">
      <div v-for="(mileage, index) in mileages" :key="mileage.mile_no" class="col-md-4 mb-3">
        <div class="p-2">
          <div style="text-align: center; font-family: KB_C2; font-size: 16pt;" class="mb-2">{{ mileage }} 마일리지</div>
          <div :style="{backgroundColor : backgroundColors[index % backgroundColors.length]}" style="width: 250px; height:300px; transition: transform 0.3s ease;" class="mx-auto rounded-4 target-box"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center" style="margin-top: 12vh;">
    <button
      class="btn-green mt-2 KB_C2"
      @click="addTarget"
      style="
        width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;
      "
    >
      추가하기
    </button>
  </div>

  <!-- 모달 -->
  <div v-if="isModalOpen" class="modals" >
    <div
      class="modals-content" ref="modal"
      style="width: 40%; height: 45%; background-color: #f9f9f9"
    >
      <span class="close" @click="closeModal">&times;</span>
      <div>
        <p class="text-left fw-bold mb-3" style="font-size: 19pt">
          개인별 목표 설정하기
        </p>
        <div class="p-3" style="margin-top: 4vh;">
          <div class="d-flex input-gray p-2">
            <span class="lg2" style="width:25%; text-align: left; font-family: 'KB_S4';">목표 마일리지</span>
            <select style="width: 75%; text-align: center; font-family: 'KB_C2';">
              <option v-for="label in labels" :key="label" :value="label">{{ label.mile_name }}</option>
            </select>
          </div>
          <div class="d-flex input-gray p-2">
            <span class="lg2" style="width:25%; text-align: left; font-family: 'KB_S4';">목표 기간</span>
            <!-- 날짜 선택 -->
            <div class="d-flex align-items-center" style="width: 75%;">
              <Datepicker v-model="selectedDate" :format="formatDate" style="width:100%"></Datepicker>
            </div>
          </div>
          <div class="d-flex input-gray p-2">
            <span class="lg2" style="width:40%; text-align: left; font-family: 'KB_S4';">목표 마일리지 점수</span>
            <input type="text" class="lg2" style="width: 60%; text-align: center;"/>
          </div>
        </div>
        <div class="d-flex justify-content-center" style="margin-top: 5vh;">
          <button
            class="btn-gray mt-2 KB_C2"
            @click="addAction"
            style="
              width:8vw; height: 3vw; font-size:1.2vw; font-family: KB_C2;
            "
          >
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import api from '@/api/axios';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "PersonalTarget",
  component: {
    Datepicker,
  },
  data() {
    return {
      backgroundColors: ["#F4FBF2", "#F3FBFE", "#F5F5FF", "#FFF2FD", "#F4F4F4", "#FDF5F5", "#FBF4EE", "#FCFBF1"],
      mileages: ["HRD", "HRD", "리그테이블"], // 개인별 목표 db에서 가져오기 
      isModalOpen: true,
      labels:[],
      selectedDate: null,
    };
  },
  methods: {
    async fetchMileages() {
          // 마일리지 카테고리 가져오기
          try {
              const response = await api.get(
              'http://localhost:8090/notice/mileage'
              );
              this.labels = response.data;
          } catch (error) {
              console.error(
              'Error fetching mileages:',
              error.response ? error.response.data : error.message
              );
          }
      },
      formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
  },
  created() {
    this.fetchMileages();
  },
  computed: {
    
  },
};
</script>

<style scoped>
.highlight {
  background-color: #CFD4E7;
  border-radius: 30px; /* 둥근 모서리 */
  padding: 4px 8px; /* 내부 여백을 추가하여 크기 조절 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 크기 조절 */
}
.highlight:hover {
  cursor: pointer;
}
</style>