AdminActorPanel<template>
    <div class="AdminActorPanel">
        <AdminTopBar 
            page="Actors"
            :items="actorsStore.actors"
            :sortingListItems="[{sortingKey: 'isValidated', text: 'Acteurs à valider'}, {sortingKey: 'name', text: 'Nom'}]"
            :createFunction="createActor"
        />
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
                        <v-btn icon="mdi-dots-vertical">
                            <v-icon icon="mdi-dots-vertical"></v-icon>
                            <v-menu activator="parent" location="left">
                                <v-list class="AdminActorPanel__additionnalMenu">
                                    <v-list-item :to="`/actors/${actor.name}`">{{ $t('actors.admin.goToPage')}}</v-list-item>
                                    <v-list-item @click="actorsStore.deleteActor(actor.id)">{{ $t('actors.admin.delete')}}</v-list-item>
                                </v-list>
                            </v-menu>
                        </v-btn>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SectionTitle from '@/components/text-elements/SectionTitle.vue';
import type { Actor } from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed, ref } from 'vue';
import AdminTopBar from '../AdminTopBar.vue';
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

    // &__topBar {
    //     display: flex;
    //     justify-content: space-between;
    //     width: 100%;
    //     flex-direction: row;
    //     height: 48px;
    //     align-items: center;

    //     &--left {
    //         display: flex;
    //         align-items: center;
    //         flex-grow: 1;
    //         margin-right: 30px;
    //     }
    // }
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
    &__additionnalMenu {
        font-weight: 700;
        color: rgb(var(--v-theme-main-blue));
    }
}

</style>