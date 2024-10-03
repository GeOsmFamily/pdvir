<template>
    <div class="ThematicChip">{{ text }}</div>
</template>

<script setup lang="ts">
defineProps({
    text: String
})</script>

<style scoped lang="scss">
.ThematicChip {
    background-color: rgb(var(--v-theme-light-yellow));
    color: rgb(var(--v-theme-main-blue));
    font-size: 14px;
    font-weight: 400;
    display: inline-block;
    padding: 8px 16px;
    border-radius: 16px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid white;
}
</style>