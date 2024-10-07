<template>
    <div class="ChipList" :align="align">
        <Chip v-for="item in items" :key="item.id">{{ item.name }}</Chip>
    </div>
</template>
<script setup lang="ts">
import Chip from '@/components/generic-components/Chip.vue';
interface Item {
    id: any,
    name: string
}

defineProps<{
    items: Item[],
    align: string,
}>()
</script>
<style lang="scss">
.ChipList {
    display: flex;
    flex-flow: row wrap;
    gap: .5rem;

    &[align="left"] {
        justify-content: flex-start;
    }

    &[align="right"] {
        justify-content: flex-end;
    }
}
</style>