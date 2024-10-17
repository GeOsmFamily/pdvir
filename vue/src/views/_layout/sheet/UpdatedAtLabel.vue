<template>
    <span class="UpdatedAtLabel">{{ $t('labels.updatedAt') }} {{ formattedDate }}</span>
</template>

<script setup lang="ts">
import { useDate } from '@/composables/useDate';
import { computed } from 'vue';

const props = defineProps<{
    date: string | Date,
}>()

const formattedDate = computed(() => {
    const { localeDate } = useDate(new Date(props.date), { year: 'numeric', month: 'long', day: 'numeric' });
    return localeDate;
})
</script>

<style lang="scss">
.UpdatedAtLabel {
    color: rgb(var(--v-theme-main-blue));
    font-size: $font-size-xs;
}
</style>