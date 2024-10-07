<template>
    <Card
        class="ActorCard"
        :title="actor.name"
        :subTitle="actor.acronym"
        :to="getActorUrl(actor.name)"
        >
        <template #content>
            <span style="font-size: 14px;">Acteur institutionnel</span>
            <div class="ActorCard__logoCtn">
                <img class="ActorCard__logo" :src="actor.logo">
            </div>
        </template>
        <template #footer-left>
            <LikeButton />
        </template>
        <template #footer-right="{ isHovering }">
            <v-icon icon="mdi mdi-arrow-right" color="light-blue" v-if="!isHovering"></v-icon>
            <v-icon icon="mdi mdi-arrow-right-circle" color="main-blue" size="x-large" v-else></v-icon>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import Card from '@/components/views-components/global/Card.vue';
import LikeButton from '@/components/views-components/global/LikeButton.vue';
defineProps<{
  actor: Actor;
}>();

const getActorUrl = (name: string) => {
    return `/actors/${name}`
}
</script>

<style lang="scss">
.ActorCard {
    height: 330px;
    &__logoCtn {
        margin-top: 20px;
        height: 140px;
        width: 140px;

        .ActorCard__logo{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
}
</style>