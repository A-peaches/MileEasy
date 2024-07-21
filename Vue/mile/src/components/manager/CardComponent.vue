<template>
    <div class="cards" style="background-color: #f9f9f9; height: 400px">
        <p class="text-left lg2 KB_C2">{{ title }}</p>
        <div class="flex">
            <div class="cards favorite-card">
                
            </div>
        </div>
     </div>   
</template>

<script>
export default {
    name: 'CardComponent',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
.favorite-card {
    width: 100%;
    display: flex;
    height : 300px;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
}

.addImg {
    width:18%;
}
</style>