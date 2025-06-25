<template>
  <v-row>
    <v-col v-for="(image, index) in galleryImages" :key="index" class="d-flex child-flex" cols="3">
      <v-img
        :lazy-src="image"
        :src="image"
        aspect-ratio="1"
        class="bg-grey-lighten-2 hover"
        cover
        :data-aos="index % 2 == 0 ? 'fade-right' : 'fade-left'"
        data-aos-duration="1000"
        data-aos-delay="200"
        @click="viewImage(image)"
      >
        <template v-slot:placeholder>
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  <v-dialog v-model="showImageViewer">
    <img :src="imageViewerSrc" class="image-viewer" />
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'
import { galleryImages } from '@/models/interfaces/ThirdPlace'

const imageViewerSrc = ref<string>('')
const showImageViewer = ref<boolean>(false)

onMounted(async () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  })
})

function viewImage(image: string) {
  if (typeof image === 'string') {
    imageViewerSrc.value = image
  } else {
    imageViewerSrc.value = ''
  }
  showImageViewer.value = true
}
</script>

<style lang="scss">
.hover {
  cursor: pointer;
}
.image-viewer {
  background-color: white;
  max-height: 90vh;
}
</style>
