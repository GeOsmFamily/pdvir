<template>
  <div class="Header Header--mobile">
    <v-layout>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            color="main-blue"
            @click.stop="openMenu()"
          ></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
          <div class="d-flex align-center">
            <router-link
              :to="{ name: 'home' }"
              class="Header__bannerLink"
              @click="appStore.activeTab = 0"
            >
              <img src="@/assets/images/Logo.png" alt="logo" class="Header__appLogo" />
              <span class="ml-4  mobile-title text-main-blue">{{ $t('header.title') }}</span>
            </router-link>
          </div>
        </v-app-bar-title>
      </v-app-bar>
    </v-layout>
  </div>
<div id="side-menu-container" class="side-menu-container">
  <div class="side-menu-backdrop" @click="closeMenu()" id="side-menu-backdrop"></div>
  
  <div class="side-menu" id="side-menu">
    <div class="side-menu-header">
      <div>
        <img src="@/assets/images/Logo.png" alt="logo" class="Header__appLogo" /><br>
        <span class="side-menu-title">{{ $t('header.title') }}</span>
      </div>
      <svg 
        @click="closeMenu()" 
        class="close-button"
        xmlns="http://www.w3.org/2000/svg" 
        height="32px" 
        viewBox="0 -960 960 960" 
        width="32px" 
        fill="black"
      >
        <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
      </svg>
    </div>

    <ul class="navigation-list">
      <li 
        v-for="(tab, index) in NavigationTabsService.getContent()"
        @click="closeMenu()"
        :key="index"
        class="navigation-item"
      >
        <RouterLink :to="tab.route" class="Header__tabsText">
          <span
            :class="{ 'Header__tabsText--active': appStore.activeTab === tab.value }"
            @click="appStore.activeTab = tab.value"
          >{{ tab.name }}</span>
        </RouterLink>
      </li>
      
      <li class="navigation-item" @click="closeMenu()">
        <RouterLink :to="{ name: 'map' }" class="Header__tabsText">
          <v-icon color="main-blue">mdi-map-marker</v-icon>
          <span>{{ $t('header.map') }}</span>
        </RouterLink>
      </li>
      
      <li class="navigation-item">
        <LoginButton />
      </li>
    </ul>

    <div class="footer-section">
      © 2025 <span class="footer-brand">SOGEFI.</span> <br>
      All Rights Reserved.
      <ul class="social-links">
        <li class="social-link">
          <v-icon  size="44">mdi-facebook</v-icon>
        </li>
        <li class="social-link">
          <v-icon  size="44">mdi-linkedin</v-icon>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { NavigationTabsService } from '@/services/application/NavigationTabsService'
import LoginButton from './LoginButton.vue'
import { useApplicationStore } from '@/stores/applicationStore'
import { ref } from 'vue'
import { gsap, Power1 } from 'gsap'

const appStore = useApplicationStore()
const showMobileMenu = ref(false)
const whatsappLink = `https://wa.me/${'+237652266618'.replace(/\D/g, '')}`

const openMenu=()=>{
  const sideMenuContainer= document.getElementById('side-menu-container') as HTMLElement;
  sideMenuContainer.style.display='none';
  sideMenuContainer.style.display='flex';
  const body = document.querySelector('html') as HTMLElement;
  body.style.overflowY = 'hidden';
  const sideMenu=document.getElementById('side-menu');
  const sideMenubackdrop=document.getElementById('side-menu-backdrop');
  gsap.to(sideMenubackdrop,{
    opacity: "1",
    ease:Power1.easeOut,
    duration:0.5
  });
  gsap.to(sideMenu,{
    left:0,
    ease:Power1.easeOut,
    duration:0.5
  });
}
const closeMenu=()=>{
  const body = document.querySelector('html') as HTMLElement;
  const sideMenu=document.getElementById('side-menu');
  const sideMenubackdrop=document.getElementById('side-menu-backdrop');
  const sideMenuContainer= document.getElementById('side-menu-container') as HTMLElement;

      gsap.to(sideMenu,{
        left: "-400px",
        ease:Power1.easeOut,
        duration:0.5
      });
      gsap.to(sideMenubackdrop,{
        opacity: "0.2",
        ease:Power1.easeOut,
        duration:0.5
      });
      setTimeout(() => {
        sideMenuContainer.style.display='flex';
        sideMenuContainer.style.display='none';
          body.style.overflowY = 'scroll';
      }, 400);
  }
</script>

<style lang="scss">
.mobile-title{
  display: inline-block;
  font-weight: 500;
  margin-bottom: 10px;
}
.Header {
  &--mobile {
    height: $header-mobile-height;
    margin-top: $header-mobile-height;

    &::after {
      width: 100%;
      max-height: 30rem;
      height: 60vh;
    }

    .Header__appLogo {
      border: 1px solid rgb(var(--v-theme-main-grey));
      border-radius: 10%;
      padding: 5px;
      height: 40px;
      margin-bottom: -12px;
    }

    
  }
}

.side-menu-container {
  z-index: 2000;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: none;
  overflow: hidden;
}
.Header__tabsText {
      color: rgb(var(--v-theme-main-blue));
      font-weight: 500 !important;
      text-transform: none;
      text-decoration: none;

      &--active {
        font-weight: 600;
        color: rgb(var(--v-theme-main-blue)) !important ;
        text-decoration:underline ;
      }
    }
.side-menu-backdrop {
  height: 100vh;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.5);
}

.side-menu {
  height: 100vh;
  width: 20rem;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
}

.side-menu-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: top;
  font-size: 0.875rem;
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

  }
  img{
    height: 150px;
    width: 150px;
    border: 1px solid rgb(var(--v-theme-main-grey));
    border-radius: 10%;
  }
}

.side-menu-title {
  font-weight: 500;
}

.close-button {
  cursor: pointer;
  transition: fill 0.2s ease;
}

.close-button:hover {
  fill:rgb(var(--v-theme-main-blue));
}

.navigation-list {
  list-style: none;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-weight: bold;
  font-size: 16px;
  padding: 0;
}

.navigation-item {
  transition: color 0.2s ease;
}

.navigation-item:hover {
  color:rgb(var(--v-theme-main-blue));
  text-decoration: underline;
}

.footer-section {
  position: absolute;
  bottom: 2rem;
  font-weight: 500;
  color: #9ca3af;
  font-size: 0.875rem;
}

.footer-brand {
  color: black;
}

.social-links {
  margin-top: 1rem;
  list-style: none;
  display: flex;
  gap: 1.5rem;
  font-weight: bold;
  color: #6b7280;
  padding: 0;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  color: rgba(var(--v-theme-main-black),0.7);
  cursor: pointer;
  transition: color 0.2s ease;
}

.social-link:hover {
  color:rgb(var(--v-theme-main-blue));
}

/* Responsive pour les écrans plus grands que 640px (sm) */
@media (min-width: 640px) {
  .side-menu {
    width: 24rem;
  }
}

/* Masquer sur les écrans lg et plus grands */
@media (min-width: 1024px) {
  .side-menu-container {
    display: none !important;
  }
}

/* Pour afficher le menu quand il est actif */
.side-menu-container.active {
  display: block !important;
}
</style>
