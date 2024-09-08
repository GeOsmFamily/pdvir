<template>
    <div class="Admin__actorsPanel">
        <div class="Admin__actorsPanel__title">
            <div class="Admin__actorsPanel__title__left">
                <SectionTitle :text="`${actorsCount.toString()} ${actorsCount > 1 ? $t('actors.actors') : $t('actors.actor')}`" />
                <v-icon icon="mdi mdi-magnify" class="ml-5" color="main-blue"></v-icon>
                <v-text-field 
                    density="compact"
                    hide-details
                    variant="solo"
                    label="Search"
                >
                </v-text-field>
            </div>
            <div class="Admin__actorsPanel__title__right">
                <v-btn color="white" class="mr-3">
                    <span>{{$t('actors.admin.sort')}}</span><v-icon icon="mdi mdi-arrow-down-drop-circle-outline" class="ml-2"></v-icon>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item @click="sortingActorsSelectedMethod = 'isValidated'">Acteurs à valider</v-list-item>
                            <v-list-item @click="sortingActorsSelectedMethod = 'name'">Nom</v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-btn @click="createActor()" color="main-red">{{ $t("actors.form.createTitle")}}</v-btn>
            </div>
        </div>
        <div class="Admin__actorsPanel__content">
            <div 
                class="Admin__actorsPanel__content__item"
                :class="{ 'Admin__actorsPanel__content__item--overlay': !actor.isValidated }"
                v-for="actor in sortedActors" :key="actor.id"
            >
                <div class="Admin__actorsPanel__content__item__acronym">{{ actor.acronym }}</div>
                <div class="Admin__actorsPanel__content__item__name">{{ actor.name }}</div>
                <div class="Admin__actorsPanel__content__item__type">Type d'acteur</div>
                <div class="Admin__actorsPanel__content__item__actions">
                    <template v-if="!actor.isValidated"><v-btn icon="mdi-arrow-right-thick"></v-btn></template>
                    <template v-else>
                        <v-btn icon="mdi-pencil-outline"></v-btn>
                        <v-btn icon="mdi-dots-vertical"></v-btn>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SectionTitle from '@/components/generic-components/text-elements/SectionTitle.vue';
import type { Actor } from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed, ref } from 'vue';
const actorsStore = useActorsStore()
const actorsCount = computed(() => actorsStore.actors.length)
const sortingActorsSelectedMethod = ref("isValidated")

const createActor = () => {
    actorsStore.activateActorEdition(null)
}
const sortedActors = computed(() => {
    if (sortingActorsSelectedMethod.value === "isValidated") {
        return actorsStore.actors.sort((a: Actor, b: Actor) => {
            if (a.isValidated !== b.isValidated) {
                return Number(a.isValidated) - Number(b.isValidated);
            }
            return a.name.localeCompare(b.name);
        })
    }
    if (sortingActorsSelectedMethod.value === "name") {
        return actorsStore.actors.sort((a: Actor, b: Actor) => {
            return a.name.localeCompare(b.name);
        })
    }
    return actorsStore.actors
})
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
    &__content {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 30px;
        &__item {
            display: flex;
            flex-direction: row;
            height: 52px;
            align-items: center;
            padding-left: 10px;
            border-bottom: 1px solid rgb(var(--v-theme-main-grey));
            &--overlay {
                background-color: rgb(var(--v-theme-light-yellow));
            }
            &__acronym {
                width: 15%;
            }
            &__name {
                width: 40%;
            }
            &__type {
                width: 25%;
            }
            &__actions {
                width: 20%;
                display: flex;
                justify-content: flex-end;
                padding-right: 10px;
            }
        }
    }
}

</style>