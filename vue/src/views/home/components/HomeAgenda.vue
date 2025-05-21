<template>
  <p>
    Dans cette rubrique, vous verrez d'une part comment utiliser l'observatoire, mais surtout vous découvrirez son interface, ses fonctionnalités ainsi que sa prise en main au travers de quelques tutoriels qui seront progressivement explicités ici.La première vidéo a pour objectif de donner aux nouveaux utilisateurs, les bases pour bien démarrer.
  </p>
  <div class="HomeAgenda">
    <ResourceCard v-for="item in resourceStore.nearestEvents" :resource="item" :key="item.id" />
  </div>
</template>

<script setup lang="ts">
import { useResourceStore } from '@/stores/resourceStore'
import ResourceCard from '@/views/resources/components/ResourceCard.vue'
import { onBeforeMount } from 'vue'

const resourceStore = useResourceStore()
onBeforeMount(async () => await resourceStore.getNearestEvents())
</script>

<style lang="scss">
.HomeAgenda {
  display: flex;
  flex-flow: row nowrap;
  max-width: 100%;
  gap: 2rem;
  & > * {
    flex: 1 0 20rem;
  }

  .ResourceCard {
    max-height: 5rem;
  }
}
@media (max-width: $bp-lg) {
  .HomeAgenda {
    flex-flow: column nowrap;
  }
}
</style>
