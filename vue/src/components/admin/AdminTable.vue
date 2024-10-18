<template>
    <div class="AdminTable">
        <div 
            class="AdminTableItem"
            :class="{ 'AdminTableItem--overlay': !item.isValidated }"
            v-for="item in items" :key="item.id"
        >
            <div class="AdminTableItem--col1">{{ reduceText(item[tableKeys[0] as keyof typeof item], 5) }}</div>
            <div class="AdminTableItem--col2">{{ reduceText(item[tableKeys[1] as keyof typeof item], 25) }}</div>
            <div class="AdminTableItem--col3">{{ reduceText(item[tableKeys[2] as keyof typeof item], 20) }}</div>
            <div class="AdminTableItem--col4">
                <slot name="content" :item="item"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Actor } from '@/models/interfaces/Actor';
import { reduceText } from '@/services/utils/UtilsService';
import type { User } from '@sentry/vue';

const props = defineProps<{
  items: Actor[] | User[];
  tableKeys: (keyof Actor | keyof User)[];
}>()
</script>

<style lang="scss">
.AdminTable {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
}
.AdminTableItem {
    display: flex;
    flex-direction: row;
    height: 3.5rem;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid rgb(var(--v-theme-main-grey));
    &--overlay {
        background-color: rgb(var(--v-theme-light-yellow));
    }
    &--col1 {
        width: 15%;
    }
    &--col2 {
        width: 40%;
    }
    &--col3 {
        width: 25%;
    }
    &--col4 {
        width: 20%;
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
    }
}
</style>