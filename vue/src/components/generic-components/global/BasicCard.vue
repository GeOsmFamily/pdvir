<template>
    <v-card
        variant="outlined"
        class="CardShadow"
    >
        <div class="BasicCard">
            <v-icon :icon="icon" color="main-blue" />
            <slot></slot>
        </div>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    icon: string
}>();
</script>

<style lang="scss">
.BasicCard {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(var(--v-theme-main-blue));
    font-size: $font-size-h5;
    font-weight: 700;
}
</style>