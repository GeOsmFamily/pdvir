<template>
    <div class="CheckPoint" :highlighted="highlighted">
        <v-icon class="CheckPoint__icon" icon="mdi:mdi-check-circle" color="main-green" />
        <span class="CheckPoint__label" >{{ label }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  highlighted?: boolean
}>()
</script>

<style lang="scss">
.CheckPoint {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 1.75rem;
    .CheckPoint__label {
        white-space: pre-line
    }
    &[highlighted="true"] {
        gap: 1.25rem;
        .CheckPoint__icon {
            position: relative;
            background-color: rgb(var(--v-theme-light-yellow));
            padding: 1.25rem;
            border-radius: 50%;
        }
    }
}
</style>