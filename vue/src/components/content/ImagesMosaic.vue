<template>
    <div class="mosaic">
            <img 
                 v-for="image in images"
                :key="(image as MediaObject).contentUrl ? (image as MediaObject).contentUrl : image"
                :src="(image as MediaObject).contentUrl ? (image as MediaObject).contentUrl : image"
                class="card card-tall card-wide"
            >
    </div>
</template>

<script setup lang="ts">
import type { MediaObject } from '@/models/interfaces/MediaObject';
import { onMounted } from 'vue';

defineProps<{
    images: (string | MediaObject)[]
}>()

onMounted(() => {
    const images = document.querySelectorAll<HTMLImageElement>('.mosaic img');

    images.forEach((img) => {
        img.onload = () => {
            if (img.naturalWidth > img.naturalHeight) {
                img.classList.add('large');
            } else if (img.naturalHeight > img.naturalWidth) {
                img.classList.add('tall');
            }
        };
    });
})
</script>

<style lang="scss">
.mosaic {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 240px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  img.large {
    grid-column: span 2;
    grid-row: span 1;
  }

  img.tall {
    grid-row: span 2;
    grid-column: span 1;
  }
}
</style>