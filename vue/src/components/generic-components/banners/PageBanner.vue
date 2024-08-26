<template>
    <div class="PageBanner">
        <div class="PageBanner_HalfCircle"></div>
        <div class="PageBanner__Title">{{ text }}</div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    text: String
})
</script>
<style scoped>
.PageBanner {
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    position: relative;
}
.PageBanner_HalfCircle {
  width: 35px;
  height: 70px;
  background-color: rgb(var(--v-theme-main-yellow));
  border-radius: 0 35px 35px 0;
  position: absolute;
  left: 0;
  top: 0;
}
.PageBanner__Title {
    margin-left: 70px;
    font-size: 36px;
    font-weight: 700;
    color: rgb(var(--v-theme-main-blue));
}
</style>