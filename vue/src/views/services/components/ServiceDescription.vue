<template lang="">
  <div class="Service">
    <div
      class="ServiceDescription"
      v-for="(item, index) in contents"
      :key="index"
      :data-aos="item.left ? 'fade-right' : 'fade-left'"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <div class="Service__Text">
        <p class="Service__Title">{{ item.title }}</p>
        <span class="Service__Description">{{ item.description }}</span>
      </div>
      <div class="Service__Img">
        <img :src="item.image.src" :alt="item.title" :width="item.image.size + '%'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { ServiceContent } from '@/models/interfaces/Service'
// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

defineProps<{
  contents: ServiceContent[]
}>()
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
.Service {
  .ServiceDescription {
    padding-bottom: 50px;
    // display: flex;
    // flex-direction: reverse;
  }

  // .ServiceDescription__Reverse {
  // padding: 50px 0px;
  // display: flex;
  // flex-direction: row-reverse;
  // }

  // &__Img {
  // display: flex;
  // justify-content: center;
  // }

  &__Text {
    white-space: pre-line;
    margin-bottom: 10px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
  }

  &__Title {
    font-weight: bold;
    font-family: $font-secondary;
    color: rgb(var(--v-theme-main-blue));
    font-size: 30px;
    line-height: 60px;
  }

  &__Description {
    text-align: justify;
  }
}
</style>
