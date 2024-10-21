<template>
    <SectionBanner :text="$t('actorPage.projects')"/>
    {{ actor.projects }}
    <SectionBanner :text="$t('actorPage.data')"/>
    <SectionBanner :text="$t('actorPage.resources')"/>
    <SectionBanner :text="$t('actorPage.services')"/>
    <SectionBanner :text="$t('actorPage.images')"/>
    <ImagesMosaic :images="[...actor.images, ...actor.externalImages]" />
    
</template>

<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
import ImagesMosaic from '@/components/content/ImagesMosaic.vue';
import type { Actor }  from '@/models/interfaces/Actor';
defineProps({
    actor: {
        type: Object as () => Actor,
        required: true
    }
})
</script>