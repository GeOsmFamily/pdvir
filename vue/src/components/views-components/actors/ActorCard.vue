<template>
    <InfoCard
        :title="actor.name"
        :subTitle="actor.acronym"
        isActorCard
        @click="actorStore.setSelectedActor(actor.id)"
    >
        <template #content >
            <span style="font-size: 14px;">{{ actor.category }}</span>
            <div class="ActorCard__logoCtn">
                <img class="ActorCard__logo" :src="actor.logo">
            </div>
        </template>
        <template #footer-left>
            <ShareButton :additionnal-path="actor.name"/>
            <LikeButton />
        </template>
        <template #footer-right="{ isHovering }">
            <v-icon icon="mdi mdi-arrow-right" color="light-blue" v-if="!isHovering"></v-icon>
            <v-icon icon="mdi mdi-arrow-right-circle" color="main-blue" size="x-large" v-else></v-icon>
        </template>
    </InfoCard>
</template>

<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import InfoCard from '@/components/generic-components/global/InfoCard.vue';
import LikeButton from '@/components/generic-components/global/LikeButton.vue';
import ShareButton from '@/components/generic-components/global//ShareButton.vue';
import { useActorsStore } from '@/stores/actorsStore';
defineProps<{
  actor: Actor
}>();
const actorStore = useActorsStore();
</script>

<style lang="scss">
.ActorCard {
    &__logoCtn {
        margin-top: 20px;
        height: 6em;
        width: 6em;

        .ActorCard__logo{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
}
</style>