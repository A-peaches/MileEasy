<template>
    <div class="cards" style="background-color: #f9f9f9; height: 400px">
        <p class="text-left lg2 KB_C2">즐겨찾기 마일리지</p>
        <div class="flex">
            <div v-for="index in 2" :key="index" class="cards favorite-card">
                <img src="@/assets/img/add.png" class="addImg" >
            </div>

        </div>
        <div class="flex">
            <div v-for="index in 2" :key="index" class="cards favorite-card">
                <img src="@/assets/img/add.png" class="addImg" >
            </div>
        </div>
     </div>   
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FavoriteCom',
  methods: { 
    },
  computed: {
    ...mapGetters('mileage', ['getArrayMileage']),

    mileageInfo() {
       return this.getArrayMileage;
    }
  },
  created() {
    this.$store.dispatch('mileage/getMileage'); 
  },
};
</script>
<style>
.favorite-card {
    width: 100%;
    display: flex;
    height : 150px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
}

.addImg {
    width:18%;
}

.addImg:hover {
    width:20%;
    cursor : pointer;
}
</style>