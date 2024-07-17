<template>
    <div class="cards" style="background-color: #f9f9f9; height: 400px">
        <p class="text-left lg2 KB_C2">즐겨찾기 마일리지</p>
        <div class="flex">
            <div class="cards favorite-card">
                <img src="@/assets/img/add.png" class="addImg" >
            </div>
            <div class="cards favorite-card">
                <img src="@/assets/img/add.png" class="addImg">
            </div>
        </div>
        <div class="flex">
            <div class="cards favorite-card">
                <img src="@/assets/img/add.png" class="addImg">
            </div>
            <div class="cards favorite-card">
                <img src="@/assets/img/add.png" class="addImg">
            </div>
        </div>
     </div>   
</template>

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
</style>