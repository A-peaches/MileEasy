<template>
  <div style="padding: 0 5%">
    <div class="p-4 mt-5 mx-auto">
      <div class="cards-container mx-auto" :style="{ height: computedHeight }">
        여기는 개발요청 오바
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'KingMain',

  computed: {
    ...mapGetters('login', ['getLoginInfo']),
    ...mapGetters('mileage', ['getArrayMileage']),

    loginInfo() {
      return this.getLoginInfo;
    },

    mileageLabel() {
      // Access Vuex getter directly
      return this.getArrayMileage;
    },
  },

  methods: {
    ...mapActions('mileage', ['getMileage']),
  },

  mounted() {
    this.getMileage(); // Fetch mileage data on component mount
  },
};
</script>

<style scoped>

.tab-container:hover {
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #d3d3d3;
}

.tab-container.active {
  background-color: #d3d3d3;
}

.lg2 {
  font-size: 16px;
}

.fw-bold {
  font-weight: bold;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Space between the cards */
}

.card-item {
  box-sizing: border-box;
  flex: 1 1 calc(50% - 16px); /* Ensures two cards per row, with spacing */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-delete {
  font-size: 14px;
  cursor: pointer;
}

a {
  text-decoration: none;
}

.cards {
  padding: 30px;
}
</style>
