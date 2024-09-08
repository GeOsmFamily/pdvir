<template>
    <div class="Admin__actorsPanel">
        <div class="Admin__actorsPanel__title">
            <div class="Admin__actorsPanel__title__left">
                <SectionTitle :text="`${actorsCount.toString()} ${actorsCount > 1 ? $t('actors.actors') : $t('actors.actor')}`" />
                <v-icon icon="mdi mdi-magnify" class="ml-2" color="main-blue"></v-icon>
                <v-text-field 
                    density="compact"
                    hide-details
                    variant="solo"
                    label="Search"
                    class="ml-2"
                >
                </v-text-field>
            </div>
            <div class="Admin__actorsPanel__title__right">
                <v-btn color="white">
                    Trier par
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>Choice 1</v-list-item>
                            <v-list-item>Choice 2</v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-btn @click="createActor()" color="main-red">{{ $t("actors.form.createTitle")}}</v-btn>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SectionTitle from '@/components/generic-components/text-elements/SectionTitle.vue';
import { useActorsStore } from '@/stores/actorsStore';
import { computed } from 'vue';
const actorsStore = useActorsStore()
const actorsCount = computed(() => actorsStore.actors.length)

const createActor = () => {
    actorsStore.activateActorEdition(null)
}
</script>
<style lang="scss" scoped>
.Admin__actorsPanel {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-direction: row;
        height: 48px;
        align-items: center;

        &__left {
            display: flex;
            align-items: center;
            flex-grow: 1;
            margin-right: 30px;
        }
    }
}

</style>