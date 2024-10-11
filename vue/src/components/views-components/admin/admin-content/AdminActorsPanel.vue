AdminActorPanel<template>
    <div class="AdminActorPanel">
        <div class="AdminActorPanel__topBar">
            <div class="AdminActorPanel__topBar--left">
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
            <div class="AdminActorPanel__topBar--right">
                <v-btn color="white" class="mr-3">
                    <span>{{$t('filters.sortBy')}}</span><v-icon icon="mdi mdi-arrow-down-drop-circle-outline" class="ml-2"></v-icon>
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
        <div class="AdminActorPanel__content">
            <div 
                class="AdminActorPanel__contentItem"
                :class="{ 'AdminActorPanel__contentItem--overlay': !actor.isValidated }"
                v-for="actor in sortedActors" :key="actor.id"
            >
                <div class="AdminActorPanel__contentItem--col1">{{ actor.acronym }}</div>
                <div class="AdminActorPanel__contentItem--col2">{{ actor.name }}</div>
                <div class="AdminActorPanel__contentItem--col3">Type d'acteur</div>
                <div class="AdminActorPanel__contentItem--col4">
                    <template v-if="!actor.isValidated">
                        <v-btn size="small" icon="mdi-arrow-right" class="text-main-blue" @click="editActor(actor)"></v-btn>
                    </template>
                    <template v-else>
                        <v-btn icon="mdi-pencil-outline" @click="editActor(actor)"></v-btn>
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
    actorsStore.setActorEditionMode(null)
}

const editActor = async (actor: Actor) => {
    await actorsStore.setSelectedActor(actor.id, false)
    actorsStore.setActorEditionMode(actorsStore.selectedActor)
}
const sortedActors = computed(() => {
    if (sortingActorsSelectedMethod.value === "isValidated") {
        return actorsStore.actors.slice().sort((a: Actor, b: Actor) => {
            if (a.isValidated !== b.isValidated) {
                return Number(a.isValidated) - Number(b.isValidated);
            }
            return a.name.localeCompare(b.name);
        })
    }
    if (sortingActorsSelectedMethod.value === "name") {
        return actorsStore.actors.slice().sort((a: Actor, b: Actor) => {
            return a.name.localeCompare(b.name);
        })
    }
    return actorsStore.actors
})
</script>
<style lang="scss" scoped>
.AdminActorPanel {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__topBar {
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
    &__content {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 30px;
    }
    &__contentItem {
        display: flex;
        flex-direction: row;
        height: 52px;
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
}

</style>