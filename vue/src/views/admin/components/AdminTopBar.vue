<template>
<div class="AdminTopBar">
    <div class="AdminTopBar--left">
        <SectionTitle :text="`${itemsCount.toString()} ${title}`" />
        <v-icon icon="mdi mdi-magnify" class="ml-5" color="main-blue"></v-icon>
        <v-text-field 
            density="compact"
            hide-details
            variant="solo"
            label="Search"
        >
        </v-text-field>
    </div>
    <div class="AdminTopBar--right">
        <v-btn color="white" class="mr-3">
            <span>{{ $t('placeholders.sortBy') }}</span><v-icon icon="mdi mdi-arrow-down-drop-circle-outline" class="ml-2"></v-icon>
            <v-menu activator="parent">
                <v-list>
                    <v-list-item 
                        v-for="item in sortingListItems" 
                        @click="sortingKey = item.sortingKey"
                    >
                        {{ item.text }}
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
        <v-btn @click="createFunction()" color="main-red">{{ $t("actors.form.createTitle")}}</v-btn>
    </div>
</div>
</template>

<script setup lang="ts">
import { i18n } from '@/assets/plugins/i18n';
import type { Actor } from '@/models/interfaces/Actor';
import type { User } from '@sentry/vue';
import { computed, ref } from 'vue';

type AdminPages = 'Actors' | 'Projects' | 'Members'
const props = defineProps<{
    page: AdminPages,
    items: Actor[] | User[],
    sortingListItems: {sortingKey: string, text: string}[],
    createFunction: () => void
}>()
const itemsCount = props.items.length
const sortingKey = ref("isValidated")
const title = computed(() => {
        if (props.page === 'Members') {
            return `${props.items.length.toString()} ${props.items.length > 1 ? i18n.t('admin.members') : i18n.t('admin.member')}`
        }
        if (props.page === 'Actors') {
            return `${props.items.length.toString()} ${props.items.length > 1 ? i18n.t('actors.actors') : i18n.t('actors.actor')}`
        }
        return `${props.items.length.toString()} ${props.items.length > 1 ? i18n.t('actors.actors') : i18n.t('actors.actor')}`
    }
)

</script>

<style lang="scss">
.AdminTopBar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: row;
    height: 48px;
    align-items: center;

    &--left {
        display: flex;
        align-items: center;
        flex-grow: 1;
        margin-right: 30px;
    }
}
</style>