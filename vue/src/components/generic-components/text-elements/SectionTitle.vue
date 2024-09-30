<template>
    <span class="Section__title">{{ text }}</span>
</template>
<script setup lang="ts">
defineProps({
    text: String
})
</script>
<style scoped>
.Section__title{
    color: rgb(var(--v-theme-main-blue));
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
}
</style>