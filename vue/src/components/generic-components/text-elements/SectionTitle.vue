<template>
    <span class="Section__Title">{{ text }}</span>
</template>
<script setup lang="ts">
defineProps({
    text: String
})
</script>
<style scoped>
.Section__Title{
    color: rgb(var(--v-theme-main-blue));
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
}
</style>