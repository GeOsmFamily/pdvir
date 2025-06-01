<template>
  <div class="Header Header--desktop nav">
    <div class="Header__nav">
      <div class="Header__navContent container container--transition">
        <div class="Header__navBlock Header__navBlock--left">
          <router-link :to="{ name: 'home' }" class="Header__bannerLink">
            <img src="@/assets/images/Logo.png" alt="Accueil" class="Header__appLogo" />
          </router-link>
        </div>
        <nav class="Header__navBlock Header__navBlock--right">
              <div class="Header__tabs">
                <v-btn
                v-for="(tab, index) in NavigationTabsService.getContent()"
                :key="index"
                :to="tab.route"
                :disabled="tab.disabled"
                flat
                :class="['Header__tab', { 'tab-active': tab.value === appStore.activeTab }]"
                @click="appStore.activeTab = tab.value"
                >
                <span class="Header__tabsText">{{ tab.name }}</span>
              </v-btn>
              </div>
              <v-btn base-color="transparent" class="text-main-blue mr-3 gap-5" :to="{ name: 'map' }" flat>
                <v-icon>mdi-map-marker</v-icon>
                {{ $t('header.map') }}
              </v-btn>
          <LoginButton />
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NavigationTabsService } from '@/services/application/NavigationTabsService'
import { useApplicationStore } from '@/stores/applicationStore'
import LoginButton from './LoginButton.vue'

const appStore = useApplicationStore()
const whatsappLink = `https://wa.me/${'+237652266618'.replace(/\D/g, '')}`
</script>

<style lang="scss">
.Header__tab{
  margin-right:4px;
}
.Header__tabsText{
  text-transform: uppercase;
}
.tab-active{
  color: rgb(var(--v-theme-main-blue));
}
.Header--desktop{
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  height: 100px;
  overflow: hidden;
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
    background-color: white;
    top: -127px;
}
.Header {
  &--desktop {
    $dim-logo: 10rem;

    &::after {
      width: 50vw;
      min-height: 50rem;
      height: 80vh;
    }

    .Header__banner {
      background: rgb(var(--v-theme-main-blue));

      .Header__bannerContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 1rem;
        color: rgb(var(--v-theme-main-blue));
        height: var(--dim-banner-h);

        .Header__bannerLink {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          text-decoration: none;
          color: rgb(var(--v-theme-main-white));
          gap: 0.375rem;
          font-size: $font-size-xs;
          cursor: pointer;

          span {
            margin-top: 0.125rem;
          }
        }
      }
    }

    .Header__nav {
      height: $dim-logo;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .Header__navContent {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-flow: row nowrap;

        .Header__navBlock {
          &--left {
            .Header__appLogo {

              z-index: 10;
              position: relative;
              height: 100px;
              margin-top: 30px;
              transform: translateY(calc(-1 * var(--dim-banner-h)));
            }
          }

          &--right {
            flex: 1 0 auto;
            display: flex;
            text-transform: uppercase;
            flex-flow: row nowrap;
            justify-content: flex-end;
            align-items: center;
            padding: 20px 0 10px 0;
          }
        }
      }
    }
  }
}
</style>
