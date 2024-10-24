<template>
  <div class="MosaicCtn">
    <ul class="Mosaic">
      <li
        v-for="(image, index) in images"
        :key="index"
        :class="imageClasses[index]"
        :style="`background-image: url('${(image as MediaObject).contentUrl ? (image as MediaObject).contentUrl : (image as string)}')`"
        @click="viewImage(image)"
        />
    </ul>
  </div>
  <v-dialog
      v-model="showImageViewer"
      width="auto"
    >
      <img
        :src="imageViewerSrc"
        class="ImageViewer" />
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { MediaObject } from '@/models/interfaces/MediaObject';

const props = defineProps<{
  images: (string | MediaObject)[];
}>();

onMounted(() => {
  props.images.forEach((image, index) => {
    classifyImage(image, index);
  });
});

const imageClasses = ref<string[]>(Array(props.images.length).fill('MosaicImg--square'));

const classifyImage = (image: string | MediaObject, index: number) => {
  const imgUrl = (image as MediaObject).contentUrl ? (image as MediaObject).contentUrl : (image as string);
  const img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    const { width, height } = img;
    const ratio = width / height;
    if (Math.abs(ratio - 1) <= 0.3) {
      imageClasses.value[index] = 'MosaicImg--square';
    } else if (ratio > 1) {
      imageClasses.value[index] = 'MosaicImg--horizontal'
    } else {
      imageClasses.value[index] = 'MosaicImg--vertical';
    }
  };
};

const imageViewerSrc = ref<string>('');
const showImageViewer = ref<boolean>(false);
function viewImage(image: string | MediaObject) {
  if (typeof image === 'string') {
    imageViewerSrc.value = image;
  } else {
    imageViewerSrc.value = (image as MediaObject).contentUrl;
  }
  showImageViewer.value = true;
}
</script>

<style lang="scss">
.MosaicCtn {
  padding: 1rem;

  .Mosaic {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li {
      background-position: center;
      background-size: cover;
      border-radius: 0.5rem;
      overflow: hidden;
      cursor: pointer;

      &.MosaicImg--square {
        width: 18rem;
        height: 18rem;
      }

      &.MosaicImg--horizontal {
        width: 36rem;
        height: 18rem;
      }

      &.MosaicImg--vertical {
        width: 18rem;
        height: 36rem;
      }
    }
  }
}
.ImageViewer{
  background-color: white;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
