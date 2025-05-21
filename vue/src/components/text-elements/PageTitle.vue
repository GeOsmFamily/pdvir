<template>
  <div class="half-circle"> 
    <span class="PageTitle" ref="titleRef"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  title: string
}>();

const titleRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (titleRef.value) {
    animateText(props.title);
  }
});

const animateText = (text: string) => {
  if (!titleRef.value) return;
  
  let counter = -1;
  let intervalCall: number;
  titleRef.value.innerHTML = "";

  const typeJs = () => {
    if (counter < text.length) {
      counter++;
      if (titleRef.value) {
        titleRef.value.innerHTML += text.charAt(counter);
      }
    } else {
      clearInterval(intervalCall);
      setTimeout(() => {
        titleRef.value?.classList.add('no-cursor');
      }, 900);
    }
  }

  intervalCall = setInterval(typeJs, 100);
}
</script>

<style lang="scss">
.PageTitle {
  white-space: pre-line;
  font-family: $font-secondary;
  color: rgb(var(--v-theme-main-blue));
  font-size: 60px;
  font-weight: 700;
  line-height: 60px;
  &::after{
    content: '|';
    font-size: 400;
    color:rgb(var(--v-theme-main-blue));
    animation-name: blinking; 
    animation-duration: 1s; 
    animation-iteration-count: infinite;
  }
  &.no-cursor::after {
    content: '';
  }
}

@media (max-width: $bp-md) {
  .PageTitle {
    font-size: 3rem;
    line-height: 3rem;
  }
}

@media (max-width: $bp-sm) {
  .PageTitle {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
}
</style>
