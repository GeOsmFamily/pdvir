<template>
  <div class="MosaicCtn">
    <div class="Mosaic">
      <div
        v-for="(image, index) in processedImages"
        :key="index"
        class="MosaicImg"
        :class="image.class"
        :style="`background-image: url('${image.url}')`"
        @click="viewImage(image.original)"
      />
    </div>
  </div>
  <v-dialog v-model="showImageViewer" width="auto">
    <img :src="imageViewerSrc" class="ImageViewer" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { MediaObject } from '@/models/interfaces/MediaObject';

const props = defineProps<{
  images: (string | MediaObject)[];
}>();

interface ProcessedImage {
  url: string;
  width: number;
  height: number;
  ratio: number;
  class: string;
  original: string | MediaObject;
  format: 'square' | 'horizontal' | 'vertical';
}

const imageData = ref<ProcessedImage[]>([]);

const processedImages = computed(() => {
  const maxRowWidth = 4;
  let result: ProcessedImage[] = [];
  
  // Sort images by format to optimize placement
  let sortedImages = [...imageData.value];
  const horizontalImages = sortedImages.filter(img => img.format === 'horizontal');
  const verticalImages = sortedImages.filter(img => img.format === 'vertical');
  const squareImages = sortedImages.filter(img => img.format === 'square');
  
  let currentRow: ProcessedImage[] = [];
  let currentRowWidth = 0;
  let nextRowWidth = 0;

  const addImageToRow = (image: ProcessedImage, imageClass: string, width: number) => {
    currentRow.push({ ...image, class: imageClass });
    currentRowWidth += width;
  };


  const finalizeRow = () => {
    result.push(...currentRow);
    currentRow = [];
    currentRowWidth = nextRowWidth;
    nextRowWidth = 0;
  };

  // While we have images, we create row by placing first vertical, horizontal or square image
  while (horizontalImages.length > 0 || verticalImages.length > 0 || squareImages.length > 0) {
    const remainingWidth = maxRowWidth - currentRowWidth;

    // Filling strategy based on remaining space
    if (remainingWidth === 4) {
      if (verticalImages.length >= 2) {
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
        nextRowWidth += 2;
        if (squareImages.length >= 2) {
          addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
          addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        } else if (horizontalImages.length >= 1) {
          addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
        }
      } else if (verticalImages.length === 1) {
        // One vertical image with mix of other formats
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
        nextRowWidth += 1;
        if (horizontalImages.length >= 1 && squareImages.length >= 1) {
          addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
          addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        } else if (squareImages.length >= 3) {
          for (let i = 0; i < 3; i++) {
            addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
          }
        }
      } else if (horizontalImages.length >= 2) {
        // Fallback to horizontal images if no vertical available
        addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
        addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
      } else if (horizontalImages.length === 1 && squareImages.length >= 2) {
        addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
      } else if (squareImages.length >= 4) {
        for (let i = 0; i < 4; i++) {
          addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        }
      } else {
        // Default case: use what we have
        while (currentRowWidth < maxRowWidth && (horizontalImages.length > 0 || verticalImages.length > 0 || squareImages.length > 0)) {
          if (verticalImages.length > 0) {
            addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
            nextRowWidth += 1;
          } else if (remainingWidth >= 2 && horizontalImages.length > 0) {
            addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
          } else if (squareImages.length > 0) {
            addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
          }
        }
      }
    } else if (remainingWidth === 3) {
      if (verticalImages.length >= 1 && squareImages.length >= 2) {
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
        nextRowWidth += 1;
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
      } else if (horizontalImages.length >= 1 && squareImages.length >= 1) {
        addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
      } else if (squareImages.length >= 3) {
        for (let i = 0; i < 3; i++) {
          addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        }
      }
    } else if (remainingWidth === 2) {
      if (horizontalImages.length > 0) {
        addImageToRow(horizontalImages.shift()!, 'MosaicImg--horizontal', 2);
      } else if (squareImages.length >= 2) {
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
      } else if (verticalImages.length >= 2) {
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
      }
    } else if (remainingWidth === 1) {
      if (verticalImages.length > 0) {
        addImageToRow(verticalImages.shift()!, 'MosaicImg--vertical', 1);
        nextRowWidth += 1;
      } else if (squareImages.length > 0) {
        addImageToRow(squareImages.shift()!, 'MosaicImg--square', 1);
      }
    }

    // Finalize row if it's full or if there are no more images
    if (currentRowWidth >= maxRowWidth || 
        (horizontalImages.length === 0 && verticalImages.length === 0 && squareImages.length === 0)) {
      finalizeRow();
    }
  }

  return result;
});

onMounted(() => {
  props.images.forEach((image) => {
    const imgUrl = (image as MediaObject).contentUrl ? (image as MediaObject).contentUrl : (image as string);
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      const { width, height } = img;
      const ratio = width / height;
      
      let format: 'square' | 'horizontal' | 'vertical';
      if (Math.abs(ratio - 1) <= 0.2) {
        format = 'square';
      } else if (ratio > 1) {
        format = 'horizontal';
      } else {
        format = 'vertical';
      }

      imageData.value.push({
        url: imgUrl,
        width,
        height,
        ratio,
        class: '',
        original: image,
        format
      });
    };
  });
});

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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    grid-auto-rows: 15rem;

    .MosaicImg {
      background-position: center;
      background-size: cover;
      border-radius: 0.5rem;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
      height: 100%;

      &.MosaicImg--square {
        grid-column: span 1;
        grid-row: span 1;
      }

      &.MosaicImg--horizontal {
        grid-column: span 2;
        grid-row: span 1;
      }

      &.MosaicImg--vertical {
        grid-column: span 1;
        grid-row: span 2;
      }
    }
  }
}

.ImageViewer {
  background-color: white;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
