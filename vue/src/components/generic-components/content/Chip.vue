<template>
    <div class="Chip">{{ text }}</div>
</template>

<script setup lang="ts">
defineProps({
    text: String
})
</script>

<style scoped lang="scss">
.Chip {
    background-color: rgb(var(--v-theme-light-yellow));
    color: rgb(var(--v-theme-main-blue));
    font-size: $font-size-sm;
    font-weight: 400;
    display: inline-block;
    padding: .375rem .75rem;
    border-radius: 1rem;
    text-align: center;
    white-space: nowrap;
}
</style>