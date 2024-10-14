<template>
    <v-card
        variant="outlined"
        class="BasicCard Card"
    >
        <v-icon :icon="icon" color="main-blue" />
        <slot></slot>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    icon: string
}>();
</script>

<style lang="scss">
.BasicCard.Card {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(var(--v-theme-main-blue));
    font-size: $font-size-h5;
    font-weight: 700;
    position: relative;

    a {
        text-decoration: none;
        color: rgb(var(--v-theme-main-blue));

        &::after {
            content: "";
            inset: 0;
            position: absolute;
        }
    }
}
</style>