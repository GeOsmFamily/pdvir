<template>
  <div class="container ThirdPlace">
    <div
      :class="index % 2 == 0 ? 'ThirdPlaceDescription' : 'ThirdPlaceDescription__Reverse'"
      v-for="(item, index) in thirdPlaceRooms"
      :is-pair="index % 2 == 0"
      :key="index"
      :data-aos="index % 2 == 0 ? 'fade-right' : 'fade-left'"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <div class="ThirdPlace__Img">
        <img :src="item.image.src" :alt="item.title" height="100%" />
      </div>
      <div class="ThirdPlace__Text px-5">
        <p class="ThirdPlace__Title">{{ item.title }}</p>
        <span class="ThirdPlace__Description">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'
import { thirdPlaceRooms } from '@/models/interfaces/ThirdPlace'

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
.ThirdPlace {
  .ThirdPlaceDescription {
    padding: 50px 0px;
    display: flex;
    flex-direction: reverse;
    height: 400px;
  }

  .ThirdPlaceDescription__Reverse {
    padding: 50px 0px;
    display: flex;
    flex-direction: row-reverse;
    height: 400px;
  }

  &__Img {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  &__Text {
    width: 50%;
    white-space: pre-line;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__Title {
    font-weight: bold;
    font-family: $font-secondary;
    color: rgb(var(--v-theme-main-blue));
    font-size: 25px;
    line-height: 60px;
  }

  &__Description {
    text-align: justify;
  }
}
</style>
