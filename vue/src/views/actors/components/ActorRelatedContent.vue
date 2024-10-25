<template>
    <SectionBanner :text="$t('actorPage.projects')"/>
        <div v-for="project in actor.projects" :key="project.slug">
            {{ project }}
            <!--<ProjectCard  v-if="project" :project="tocheck(project)"/>-->
        </div>
    <SectionBanner :text="$t('actorPage.data')"/>
    <SectionBanner :text="$t('actorPage.resources')"/>
    <SectionBanner :text="$t('actorPage.services')"/>
    
</template>

<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
import ProjectCard from '@/views/projects/components/ProjectCard.vue';
import type { Actor }  from '@/models/interfaces/Actor';
defineProps({
    actor: {
        type: Object as () => Actor,
        required: true
    }
})

function tocheck(truc: any) {
    console.log(truc);
    return truc;
}
</script>