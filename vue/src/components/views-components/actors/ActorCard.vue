<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card
                v-bind="props"
                variant="outlined"
                class="ActorCard"
                :to="getActorUrl(actor.name)"
            >
                <span class="ActorCard__Acronym">{{ actor.acronym }}</span>
                <span class="ActorCard__Name">{{ actor.name }}</span>
                <span style="font-size: 14px;">Acteur institutionnel</span>
                <div class="ActorCard__Logo__Container">
                    <img class="ActorCard__Logo" :src="actor.logo">
                </div>
                <div class="ActorCard__Footer mt-6">
                    <div>
                        <v-icon icon="mdi mdi-share-variant"></v-icon>
                        <v-icon icon="mdi mdi-heart-outline" class="ml-3"></v-icon>
                    </div>
                    <div>
                        <v-icon icon="mdi mdi-arrow-right" color="light-blue" v-if="!isHovering"></v-icon>
                        <v-icon icon="mdi mdi-arrow-right-circle" color="main-blue" size="x-large" v-else></v-icon>
                    </div>
                </div>
            </v-card>
        </template>
    </v-hover>
    
</template>
<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
defineProps<{
  actor: Actor;
}>();
const getActorUrl = (name: string) => {
    return `/actors/${name}`
}
</script>
<style scoped>
.ActorCard{
    width: 100%;
    height: 330px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 0px rgb(var(--v-theme-main-blue));
    border: 0.5px solid rgb(var(--v-theme-main-blue));
}
.ActorCard:hover{
    box-shadow: 0px 4px 0px rgb(var(--v-theme-main-blue));
    border: 2px solid rgb(var(--v-theme-main-blue));
}
.ActorCard__Acronym {
    font-size: 14px;
    font-weight: 700;
    color: rgb(var(--v-theme-light-blue));
}
.ActorCard__Name{
    font-size: 18px;
    font-weight: 700;
    color: rgb(var(--v-theme-main-blue));
}
.ActorCard__Logo__Container{
    margin-top: 20px;
    height: 140px;
    width: 140px;
}
.ActorCard__Logo{
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
.ActorCard__Footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>