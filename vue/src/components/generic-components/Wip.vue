<template>
    <div class="WIP" :style="`height: ${height}px`">
        <h3 class="text-main-yellow">Work In Progress</h3>
    </div>
</template>
<script setup lang="ts">
defineProps({
    height:  {
        type: Number,
        default: 50
  },
})
</script>
<style scoped>
.WIP {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fdf5da;
    opacity: 0.8;
    background-image: radial-gradient(circle at center center, #444cf7, #fdf5da), repeating-radial-gradient(circle at center center, #444cf7, #444cf7, 10px, transparent 20px, transparent 10px);
    background-blend-mode: multiply;
    border: 1px solid black;
}
</style>