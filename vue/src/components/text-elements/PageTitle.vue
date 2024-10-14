<template>
    <span class="Page__title">{{ text }}</span>
</template>
<script setup lang="ts">
defineProps({
    text: String
})
</script>
<style scoped>
.Page__title{
    font-family: "Ojuju", sans-serif;
    color: rgb(var(--v-theme-main-blue));
    font-size: 60px;
    font-weight: 700;
    line-height: 60px;
}
</style>