<template>
    <div class="SectionBanner">
        <div class="SectionBanner__HalfCircle"></div>
        <div class="SectionBanner__Title">{{ text }}</div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    text: String
})
</script>
<style scoped lang="scss">
.SectionBanner {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    min-height: 42px;
    position: relative;

    &__HalfCircle {
        width: 21px;
        height: 42px;
        background-color: rgb(var(--v-theme-main-yellow));
        border-radius: 0 21px 21px 0;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    &__Title {
        margin-left: 50px;
        font-size: 30px;
        font-weight: 700;
        color: rgb(var(--v-theme-main-blue));
        line-height: 45px;
    }
}

</style>