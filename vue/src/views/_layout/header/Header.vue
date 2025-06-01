<template>
  <HeaderMobile v-if="appStore.mobile" />
  <HeaderDesktop v-else />
</template>

<script setup lang="ts">
import HeaderMobile from './HeaderMobile.vue'
import HeaderDesktop from './HeaderDesktop.vue'
import { useApplicationStore } from '@/stores/applicationStore'
import { computed, onUnmounted,onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap, Power1 } from 'gsap'
 
const appStore = useApplicationStore()
const route = useRoute()
const currentRoute = computed(() => route.path)
const showHeader = ref(true);

const onScroll = () => {
  let mainContainer = document.querySelector('.App') as HTMLElement;
  const nav = document.querySelector('.nav')
  if (nav === null) {
    return
  }
  
  if (window.scrollY > 127) {
    nav.classList.add('top-nav')
    const tab = document.querySelector('.top-nav') as HTMLElement
    mainContainer.style.paddingTop = '144px'
    if (showHeader.value) {
      if (tab !== null) {
        tab.style.top = '-100px'
        showHeader.value = false
      }
    }

    gsap.to(tab, {
      top: 0,
      ease: Power1.easeOut,
      duration: 0.3
    })
  } else if (window.scrollY === 0) {
    showHeader.value = true
    nav.classList.remove('top-nav')
    mainContainer.style.paddingTop = '0px'
  }
}

watch(currentRoute, () => {
  let mainContainer = document.querySelector('.App') as HTMLElement
  if (mainContainer) {
    mainContainer.style.paddingTop = '0px'
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

</script>
<style lang="scss">
.Header {
  &::after {
    content: '';
    right: 0;
    z-index: -1;
    background-size: contain;
    top: 0;
    background-image: url('/img/Frame.jpg');
    background-position: top right;
    position: absolute;
  }
}

.scroll-top{
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    position: fixed;
    z-index: 10;
    bottom: 20px;
    right: 12px;
    &:after{
      background: radial-gradient(ellipse at center, rgba(0, 0, 0, .25) 0, transparent 80%);
      content: "";
      height: 10px;
      position: absolute;
      top: 105%;
      width: 90%;
      z-index: -1;
    }
  }
  .nav{
    width: 100vw;
  }
  
  .top-nav {
    position: fixed;
    left: 0;
    z-index: 5;
    right: -10px;
    border-bottom-width:0;
    box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, .2);
    top: -127px;
}
</style>
