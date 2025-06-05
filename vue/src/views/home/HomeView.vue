<template>
  <div class="HomeView">
    <div class="HomeView__ctn HomeView__ctn--main">
      
      <div class="HomeView__mainContent">
      
        <div class="HomeView__mainContentInfo"  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <PageTitle :title="$t('home.main.title')" />
          <p>{{ $t('home.main.desc') }}</p>
        </div>
        
        <div class="HomeView__btnAction" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <v-btn class="HomeView__mainAction" color="main-blue" :to="{ name: 'map' }">{{
            $t('home.main.action')
          }}</v-btn>
          <v-btn class="HomeView__mainAction" color="main-blue" :to="{ name: 'data' }">{{
            $t('home.main.data')
          }}</v-btn>
        </div>
        <!-- <HomeKpis class="HomeView__mainContentKpis" /> -->
      </div>
      
      <div class="HomeView__mainImagesCtn">
        <img src="@/assets/images/home_iconography.png" alt="" />
      </div>
       <div class="swiper-container">
        <div class="backdrop"></div>
        <Swiper
          :modules="[EffectFade, Autoplay, Navigation]"
          :effect="'fade'"
          :navigation="false"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: false
          }"
          class="mySwiper"
        >
          <SwiperSlide v-for="(image, index) in imagesBackgroundUrl" :key="index">
            <img :src="image" :alt="`Slide ${index + 1}`" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div
      class="HomeView__ctn HomeView__ctn--highlights"
      v-if="homeStore.orderedMainHighlights.length"
    >
      <SectionBanner :text="$t('home.highlights.title')" />
      <HomeHighlights />
    </div>
    <div class="HomeView__ctn HomeView__ctn--map container-fluid">
      <div class="container">
        <HomeMapDescription />
      </div>
    </div>
    <div class="HomeView__ctn HomeView__ctn--agenda">
        <PageTitle :title="$t('home.agenda.title')" />
      <HomeAgenda />
    </div>
    <div class="HomeView__ctn HomeView__ctn--why-subscribe">
      
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from '@/components/text-elements/PageTitle.vue'
import SectionBanner from '@/components/banners/SectionBanner.vue'
import HomeKpis from '@/views/home/components/HomeKpis.vue'
import HomeHighlights from '@/views/home/components/HomeHighlights.vue'
import HomeMapDescription from '@/views/home/components/HomeMapDescription.vue'
import HomeBecomeMember from '@/views/home/components/HomeBecomeMember.vue'
import { useHomeStore } from '@/stores/homeStore'
import { onMounted } from 'vue'
import HomeAgenda from '@/views/home/components/HomeAgenda.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Autoplay, Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const homeStore = useHomeStore();
const imagesBackgroundUrl =[
  'src/assets/images/home/monument.jpg',
  'src/assets/images/home/djoudjou.jpg',
  'src/assets/images/home/paysage de douala.jpg',
  'src/assets/images/home/rue.jpg',
  'src/assets/images/home/toit.jpg'
];

onMounted(async () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  });
  
  await Promise.all([homeStore.getMainHighlights(), homeStore.getGlobalKpis()]);
});

</script>
<style lang="scss">
.HomeView {
  
  .HomeView__ctn {
    display: flex;
    flex-flow: column nowrap;
    margin: 4rem 0 4rem 0;
    gap: 0.5rem;
    &--main {
      flex-flow: row nowrap;
      gap: 3rem;
      padding: 64px;
      color: white;
      margin: 0;
      position: relative;
      .HomeView__mainContent {
        display: flex;
        flex-flow: column nowrap;
        gap: 3rem;
        flex: 1 0 50%;
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: opacity 1s ease-in-out;
        .HomeView__mainContentInfo {
          display: flex;
          flex-flow: column nowrap;
          gap: 1rem;
          align-items: flex-start;
        }
      }
      .HomeView__mainImagesCtn {
        transform: translateY(-3rem);
        flex: 1 0 45%;

        img {
          width: 100%;
        }
      }
    }
    &--agenda{
      padding: 4rem 64px;
    }
    &--map {
      border:1px solid rgba(229, 229, 229, 0.5);
      padding: 4rem 64px;
      overflow: hidden;
      position: relative;

      &::after {
        content: '';
        right: -200px;
        z-index: 1;
        pointer-events: none;
        background-size: contain;
        top: -85px;
        background-image: url('@/assets/images/roads_iconography.svg');
        background-position: top right;
        position: absolute;
        width: 70vw;
        min-height: 50rem;
        height: 100vh;
      }

      > * {
        z-index: 2;
      }
    }
    .HomeView__btnAction{
      display: flex;
      justify-content: left;
      gap:32px;
      margin-top: 54px;
      flex-wrap: wrap;
    }
  }
}

.swiper-container {
  opacity: 0.75;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  .backdrop{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index:10;

  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: white;
    
    &:after {
      font-size: 24px;
    }
  }
}

@media (max-width: $bp-xl) {
  .HomeView {
    .HomeKpis,
    .HomeMapDescription__mapImg,
    .HomeBecomeMember {
      display: none;
    }

    .HomeView__ctn {
      .PageTitle {
        font-size: $font-size-h1;
        line-height: $font-size-h1;
      }
      &--main {
        flex-flow: column-reverse nowrap;
        gap: 1rem;

        .HomeView__mainContent {
          .HomeView__mainAction {
            width: 40%;
          }
        }

        .HomeView__mainImagesCtn {
          width: 50%;
          align-self: center;
          transform: translateY(0);
        }
      }

      &--map {
        $dim-padding-map: 1rem;
        padding-right: $dim-padding-map;
        padding-left: $dim-padding-map;
        margin: 0 !important;

        &::after {
          width: 100%;
          background-size: 40rem;
        }
      }
    }
  }
}
</style>
