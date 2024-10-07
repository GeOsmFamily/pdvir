<template>
    <Card
        class="ProjectCard"
        v-if="project != null"
        :title="project.name"
        :subTitle="project?.location ?? ''"
        :to="getProjectsUrl(project)"
        :map="map"
        >
        <template #content>
            <div class="ProjectCard__content">
                <div class="ProjectCard__close"></div>
                <div class="ProjectCard__infoCtn">
                    <span>{{ project.actor.name }}</span>
                    <span v-if="!map" class="ProjectCard__updatedAt">{{ $t('labels.updatedAt') }} {{ getFormattedDate(project) }}</span>
                </div>
            </div>
            <ChipList v-if="!map" class="ProjectCard__thematicsCtn" :items="project.thematics" :align="'right'" />
        </template>
        <template #footer-left>
            <LikeButton />
        </template>
        <template #footer-right>
            <v-icon class="Card__actionIcon" icon="mdi mdi-arrow-right" color="light-blue"></v-icon>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { Project }  from '@/models/interfaces/Project';
import Card from '@/components/views-components/global/Card.vue';
import LikeButton from '@/components/views-components/global/LikeButton.vue';
import ChipList from '@/components/generic-components/ChipList.vue';
import { useDate } from '@/composables/useDate';
defineProps<{
  project: Project;
  map: boolean;
}>();

const getFormattedDate = (project: Project) => {
    const { localeDate } = useDate(new Date(project.updatedAt));
    return localeDate;
}

const getProjectsUrl = (project: Project) => {
    return `/projects/${project.id}`
}
</script>

<style lang="scss">
.ProjectCard {

    &[map="true"] {
        width: 15rem;
        padding-bottom: 1rem;
    }

    &--light {
        .ProjectCard__thematicsCtn,
        .ProjectCard__updatedAt {
            display: none;
        }
    }
    &[show="false"] {
        opacity: 0;
    }

    .ProjectCard__content {
        display: flex;
        flex-flow: row nowrap;
        margin: .5rem 0 1rem 0;
        .ProjectCard__infoCtn {
            display: flex;
            flex-flow: column nowrap;
            gap: .5rem;

            .ProjectCard__updatedAt {
                font-size: $font-size-xs;
            }
        }
        .ProjectCard__logoCtn {
            height: 90px;
            width: 140px;
    
            .ProjectCard__logo{
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        }

    }
}
</style>