<template lang="">
  <div class="Service">
    <div
      :class="index % 2 == 0 ? 'ServiceDescription' : 'ServiceDescription__Reverse'"
      v-for="(item, index) in contents"
      :is-pair="index % 2 == 0"
      :key="index"
    >
      <div class="Service__Img">
        <img src="@/assets/images/Logo.png" alt="Accueil" />
      </div>
      <div class="Service__Text px-5">
        <p class="Service__Title">{{ item.title }}</p>
        <span class="Service__Description">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceContent } from '@/models/interfaces/Service'

defineProps<{
  contents: ServiceContent[]
}>()
</script>

<style lang="scss">
.Service {
  .ServiceDescription {
    padding-bottom: 50px;
    display: flex;
    flex-direction: reverse;
  }

  .ServiceDescription__Reverse {
    padding: 50px 0px;
    display: flex;
    flex-direction: row-reverse;
  }

  &__Img {
    width: 40%;
    display: flex;
    justify-content: center;
  }

  &__Text {
    width: 60%;
    white-space: pre-line;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
