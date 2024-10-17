<template>
    <SectionBanner :text="$t('actorPage.projects')" class="mt-12"/>
    {{ actor.projects }}
    <SectionBanner :text="$t('actorPage.data')" class="mt-12"/>
    <SectionBanner :text="$t('actorPage.resources')" class="mt-12"/>
    <SectionBanner :text="$t('actorPage.services')" class="mt-12"/>
    <SectionBanner :text="$t('actorPage.images')" class="mt-12"/>
    <div class="mosaic">
        <img 
            v-for="image in actor.images"
            :key="image.contentUrl"
            :src="`${image.contentUrl}`"
            class="card card-tall card-wide"
        >
        <img 
            v-for="image in actor.externalImages"
            :key="image"
            :src="image"
            class="card card-tall card-wide"
        >
    </div>
    
</template>

<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
import type { Actor }  from '@/models/interfaces/Actor';
import { onMounted } from 'vue';
defineProps({
    actor: {
        type: Object as () => Actor,
        required: true
    }
})
const host = window.location.hostname
onMounted(() => {
    const images = document.querySelectorAll<HTMLImageElement>('.mosaic img');

    images.forEach((img) => {
        // Ajoute un écouteur pour l'événement "load" de l'image
        img.onload = () => {
            // Vérifie si l'image est plus large que haute
            if (img.naturalWidth > img.naturalHeight) {
                img.classList.add('large'); // Ajoute la classe 'large' si l'image est large
            } else if (img.naturalHeight > img.naturalWidth) {
                img.classList.add('tall'); // Ajoute la classe 'tall' si l'image est haute
            }
        };
    });
})
</script>

<style>
.mosaic {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 240px;
}

.mosaic img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
.mosaic img.large {
    grid-column: span 2;
    grid-row: span 1;
}

.mosaic img.tall {
    grid-row: span 2;
    grid-column: span 1;
}

.mosaic img.large-tall {
    grid-column: span 2;
    grid-row: span 2;
}
</style>