<template>
  <div class="container">
    <Swiper
      :modules="[EffectFade, Autoplay, Navigation]"
      :effect="'fade'"
      :navigation="false"
      :autoplay="{
        delay: 3500,
        disableOnInteraction: false
      }"
      class="carousel"
    >
      <SwiperSlide v-for="(image, index) in carouselBanner" :key="index">
        <img
          :src="image"
          :alt="`Slide ${index + 1}`"
          width="100%"
          height="100%"
          style="object-fit: fill"
        />
      </SwiperSlide>
    </Swiper>
    <PageTitle :title="$t('thirdPlace.title')" :whiteTitle="false" />
    <ThirdPlaceRoomDescription />
    <SectionBanner :text="$t('gallery.title')" />
    <ContentDivider class="mb-3" />
    <ThirdPlaceGallery />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Autoplay, Navigation } from 'swiper/modules'
import ContentDivider from '@/components/content/ContentDivider.vue'
import ThirdPlaceGallery from '@/views/third-place/components/ThirdPlaceGallery.vue'
import ThirdPlaceRoomDescription from '@/views/third-place/components/ThirdPlaceRoomDescription.vue'
import SectionBanner from '@/components/banners/SectionBanner.vue'
import PageTitle from '@/components/text-elements/PageTitle.vue'
import { carouselBanner } from '@/models/interfaces/ThirdPlace'

onMounted(async () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  })
})
</script>

<style lang="scss">
.carousel {
  height: 500px;
}
</style>
