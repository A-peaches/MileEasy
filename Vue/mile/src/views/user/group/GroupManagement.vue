<template>
  <div class="cards page-back mx-auto">
    <h2 class="bold-x-lg mt-5" style="font-family: KB_C3; margin-bottom:80px; position: relative;">
      {{getLoginInfo?.group_name}} 마일리지 관리
      <i
        class="bi bi-question-circle help-icon"
        @click="toggleHelpPopover"
        style="font-size: 22pt"
        ref="helpIcon"
      ></i>
      <div v-if="showHelpPopover" class="help-popover" ref="helpPopover" :style="popoverStyle">
        <div class="popover-content">
          <h5 class="popover-title">{{ getLoginInfo?.group_name }} 현재 가중치</h5>
          <table class="popover-table">
            <thead>
              <tr>
                <th>마일리지명</th>
                <th>가중치</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="weight in groupWeight" :key="weight.group_name">
                <td>{{ weight?.mile_name }}</td>
                <td>{{ weight?.weight }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </h2>
    
    <div class="date-download-container">
      <Datepicker v-model="selectedDate" :format="formatDate" class="custom-datepicker"></Datepicker>
      <i class="bi bi-download download-icon" @click="downloadExcel"></i>
    </div>

    <div class="table-responsive">
      <div class="text-start text-gray mx-auto mt-3 custom-caption" style="width:90%">
        * 본 데이터는 지역영업그룹별 가중치가 적용된 점수입니다. <br>
        * 마일리지는 기준일자의 마일리지 점수로 책정됩니다. 마일리지별 업데이트 날짜가 상이할 수 있습니다.
      </div>
      <table class="table table-hover custom-table mx-auto" style="width:90%">
        <thead>
          <tr>
            <th>마일리지 순위</th>
            <th>직원번호</th>
            <th>직원명</th>
            <th>마일리지 합계</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in paginatedGroupList" :key="group.user_no" :class="{ 'top-three': group?.user_rank <= 3 }">
            <td><span class="rank-badge">{{ group?.user_rank }}위</span></td>
            <td>{{ group?.user_no }}</td>
            <td>
              <span v-if="group.user_rank <= 3">👑</span>
              {{ group?.user_name }}
            </td>
            <td><strong>{{ group?.total_sum }}점</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="arrow-button">&lt;</button>
        <button
          v-for="pageNumber in displayedPages"
          :key="pageNumber"
          @click="changePage(pageNumber)"
          :class="{ active: currentPage === pageNumber }"
        >
          {{ pageNumber }}
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="arrow-button">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { mapGetters } from 'vuex';
import '@vuepic/vue-datepicker/dist/main.css';
import api from '@/api/axios';
import * as XLSX from 'xlsx';

export default {
  name: 'GroupManagement',
  components: {
    Datepicker
  },
  data() {
    return {
      selectedDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      groupList: [],
      currentPage: 1,
      itemsPerPage: 15,
      showHelpPopover: false,
      groupWeight: [],
      popoverStyle: {},
    }
  },
  created() {
    this.checkLoginInfo();
  },

  computed: {
    ...mapGetters('login', ['getLoginInfo','getIsChecked']),
    loginInfo() {
      return this.getLoginInfo;
    },
    paginatedGroupList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.groupList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.groupList.length / this.itemsPerPage);
    },
    displayedPages() {
      const range = 2;
      let start = Math.max(1, this.currentPage - range);
      let end = Math.min(this.totalPages, this.currentPage + range);

      if (end - start + 1 < range * 2 + 1) {
        if (start === 1) {
          end = Math.min(start + range * 2, this.totalPages);
        } else {
          start = Math.max(end - range * 2, 1);
        }
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  methods: {
    checkLoginInfo() {
      if (!this.getLoginInfo || (this.getLoginInfo && this.getIsChecked == true) ||
    this.getLoginInfo.is_hr == false) {
          window.location.href="/noAccess"
        } 
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async fetchData() {
      try {
        const response = await api.get('/group/getUsersRank', {
          params: {
            date: this.formatDate(this.selectedDate),
            group_no: this.getLoginInfo.group_no
          }
        });
        this.groupList = response.data;
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    downloadExcel() {
      const sortedData = this.groupList.map(item => ({
        '마일리지 순위': item.user_rank,
        '직원번호': item.user_no,
        '직원명': item.user_name,
        '마일리지 합계': item.total_sum,
        'HotTip': item.HotTip,
        'BEST Branch': item['BEST Branch'],
        'BEST PG': item['BEST PG'],
        'Monthly Base': item['Monthly Base'],
        'Monthly Best': item['Monthly Best'],
        '리그 테이블': item['리그 테이블'],
        'HRD': item.HRD,
        '소비자 지원': item['소비자 지원']
      }));

      const ws = XLSX.utils.json_to_sheet(sortedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "그룹 마일리지 현황");
      XLSX.writeFile(wb, `${this.getLoginInfo.group_name}_마일리지_현황_${this.formatDate(this.selectedDate)}.xlsx`);
    },
    toggleHelpPopover(event) {
      event.stopPropagation();
      this.showHelpPopover = !this.showHelpPopover;
      if (this.showHelpPopover) {
        this.$nextTick(() => {
          this.positionPopover();
          document.addEventListener("click", this.handleClickOutside);
        });
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      if (
        this.$refs.helpPopover &&
        !this.$refs.helpPopover.contains(event.target) &&
        !this.$refs.helpIcon.contains(event.target)
      ) {
        this.showHelpPopover = false;
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    async getWeight() {
      try {
        const response = await api.get('/group/getWeight', {
          params: {
            group_no: this.getLoginInfo.group_no
          }
        });
        this.groupWeight = response.data;
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    },
    positionPopover() {
      const helpIcon = this.$refs.helpIcon;
      const popover = this.$refs.helpPopover;
      if (helpIcon && popover) {
        const rect = helpIcon.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          this.popoverStyle = {
            position: 'absolute',
            top: `${rect.height + 10}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '300px',
          };
        } else {
          this.popoverStyle = {
            position: 'absolute',
            top: `${rect.height + 10}px`,
            right: '25%',
            width: '300px',
          };
        }
      }
    },
  },
  watch: {
    selectedDate: {
      handler() {
        this.fetchData();
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchData();
    this.getWeight();
    window.addEventListener('resize', this.positionPopover);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.positionPopover);
  },
};
</script>



<style scoped>
.table-responsive {
  overflow-x: auto;
}

table caption {
  caption-side: top;
}

.date-download-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5% 20px;
  gap: 15px;
  flex-wrap: nowrap;
}

.custom-datepicker {
  width: 240px;
  min-width: 200px;
  flex-shrink: 1;
}

.download-icon {
  cursor: pointer;
  font-size: 24px;
  flex-shrink: 0;
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  min-width: 600px;
}

.custom-table thead th {
  background-color: #43c2a0;
  color: white;
  padding: 15px;
  font-size: 19px;
  font-weight: bold;
  text-align: center;
  border: none;
}

.custom-table tbody tr {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.custom-table tbody tr:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.custom-table tbody td {
  padding: 15px;
  text-align: center;
  border: none;
  font-size: 20px;
}

.rank-badge {
  background-color: #43c2a0;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  object-fit: contain;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  gap: 5px;
}

.pagination button {
  background-color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 18px;
  font-family: 'KB_s4', sans-serif;
}

.pagination button:disabled {
  background-color: #d5e9e3;
  cursor: not-allowed;
  color: white;
}

.pagination button.active {
  background-color: #43c2a0;
  color: white;
}

.pagination button.arrow-button {
  font-size: 18px;
}

.bi-download {
  cursor: pointer;
  font-size: 19pt;
  margin-left: 1%;
}

.help-icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.help-popover {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  background-color: white;
  border: 1px solid #e4e4e4;
}

.popover-content {
  font-size: 14px;
}

.popover-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #43c2a0;
  text-align: center;
}

.popover-table {
  width: 100%;
  border-collapse: collapse;
}

.popover-table th,
.popover-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e4e4e4;
}

.popover-table th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #333;
}

.popover-table tr:last-child td {
  border-bottom: none;
}

.popover-table tr:hover {
  background-color: #f5f5f5;
}

.custom-table tbody tr.top-three {
  background-color: #fff9c4;
  font-weight: bold;
}

.custom-table tbody tr.top-three:hover {
  background-color: #fff59d;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
  .bold-x-lg {
    margin-bottom: 30px;
  }

  .custom-table thead th,
  .custom-table tbody td {
    font-size: 16px;
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .custom-table {
    min-width: unset;
  }

  .custom-table thead {
    display: none;
  }
  
  .custom-table, .custom-table tbody, .custom-table tr, .custom-table td {
    display: block;
    width: 100%;
  }
  
  .custom-table tr {
    margin-bottom: 15px;
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  .custom-table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
    border: none;
  }
  
  .custom-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  .pagination button {
    padding: 8px 15px;
    font-size: 16px;
  }

  .help-popover {
    right: auto;
    top: auto;
    width: 90%;
    max-width: 300px;
  }

  .date-download-container {
    white-space: nowrap;
    justify-content: flex-start;
  }

  .custom-datepicker {
    width: calc(100% - 40px);
    min-width: unset;
  }

  .download-icon {
    margin-left: auto;
  }
}

@media (max-width: 480px) {
  .date-download-container {
    align-items: stretch;
  }

  .custom-datepicker {
    white-space: nowrap;
    font-size: 14px;
    width: 100%;
    margin-bottom: 10px;
  }

  .download-icon {
    align-self: flex-end;
    margin-bottom: 8px;
  }

  .custom-caption {
    font-size: 13px;
    margin-bottom: 20px;
  }

  .custom-table td {
    font-size: 14px;
  }

  .pagination button {
    padding: 5px 10px;
    font-size: 14px;
  }

  .help-popover {
    right: 5%;
    width: 90%;
    top: 23%;
  }

  .help-icon {
    font-size: 24px !important;
  }

  .pagination-container {
    padding-bottom: 20px;
  }

  .bold-x-lg {
    font-size: 24px;
  }
}

@media (max-width: 370px) {
  .help-popover {
    right: 5%;
    width: 90%;
    top: 25% !important;
  }
}
</style>