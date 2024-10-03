<template>
    <Card
        class="ProjectCard"
        title=""
        subTitle=""
        to=""
        >
        <template #content>
            <span style="font-size: 14px;">Acteur institutionnel</span>
            <div class="ProjectCard__logoCtn">
                <img class="ProjectCard__logo" src="">
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
import type { Project }  from '@/models/interfaces/Project';
import Card from '@/components/generic-components/global/InfoCard.vue';
import LikeButton from '@/components/generic-components/global/LikeButton.vue';
defineProps<{
  project: Project;
}>();
const getActorUrl = (name: string) => {
    return `/actors/${name}`
}
</script>

<style lang="scss">
.ProjectCard {
    &__logoCtn {
        margin-top: 20px;
        height: 140px;
        width: 140px;

        .ProjectCard__logo{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
}
</style>