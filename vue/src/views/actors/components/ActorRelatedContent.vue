<template>
    <SectionBanner :text="$t('actorPage.projects')" class="mt-12"/>
    {{ actor.projects }}
    <SectionBanner :text="$t('actorPage.data')" class="mt-12"/>
    <SectionBanner :text="$t('actorPage.resources')" class="mt-12"/>
    <SectionBanner :text="$t('actorPage.services')" class="mt-12"/>
    <SectionBanner :text="$t('actorPage.images')" class="mt-12"/>
</template>

<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
import type { Actor }  from '@/models/interfaces/Actor';
defineProps({
    actor: {
        type: Object as () => Actor,
        required: true
    }
})
</script>