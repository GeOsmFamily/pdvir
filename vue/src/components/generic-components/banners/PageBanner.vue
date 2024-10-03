<template>
    <div class="PageBanner__Subtitle">{{ subtitle }}</div>
    <div class="PageBanner">
        <div class="PageBanner__HalfCircle"></div>
        <div class="PageBanner__Title">{{ text }}</div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    text: String,
    subtitle: String
})
</script>
<style scoped lang="scss">
.PageBanner {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    min-height: 70px;
    position: relative;

    &__HalfCircle {
        width: 35px;
        height: 70px;
        background-color: rgb(var(--v-theme-main-yellow));
        border-radius: 0 35px 35px 0;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    &__Title {
        margin-left: 50px;
        font-size: 36px;
        font-weight: 700;
        color: rgb(var(--v-theme-main-blue));
        line-height: 45px;
    }

    &__Subtitle {
        margin-left: 50px;
        width: 100%;
        font-size: 24px;
        font-weight: 700;
        color: rgb(var(--v-theme-light-blue));
        text-transform: uppercase;
    }
}

</style>