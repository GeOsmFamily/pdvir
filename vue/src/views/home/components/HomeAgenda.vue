<template>
  <p class="justify-center text-description">
    Dans cette rubrique, vous verrez d'une part comment utiliser l'observatoire, mais surtout vous découvrirez son interface, ses fonctionnalités ainsi que sa prise en main au travers de quelques tutoriels qui seront progressivement explicités ici. La première vidéo a pour objectif de donner aux nouveaux utilisateurs, les bases pour bien démarrer.
  </p>
  <div class="features-grid">
    <div 
      class="feature-card" data-aos="fade-up" data-aos-duration="500" :data-aos-delay="(1+index)*100"
      v-for="(feature, index) in observatoryFeatures" :key="index">
      <div class="feature-header">
        <v-icon class="feature-icon" :icon="feature.icon"></v-icon>
        <strong class="feature-title">{{ feature.title }}</strong>
      </div>
      <p class="feature-description">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourceStore } from '@/stores/resourceStore'
import ResourceCard from '@/views/resources/components/ResourceCard.vue'
import { onBeforeMount } from 'vue'

const observatoryFeatures = [
  {
    title: "Jeu de donnée",
    description: "Créer vos propres jeux de données avec la possibilité de les sauvegarder dans votre espace personnel.",
    icon: "mdi-database-plus" // Icon for adding/creating data
  },
  {
    title: "Importer",
    description: "Importer plusieurs types de formats (shp,json..) géographiques dans l'Observatoire ou dans votre instance.",
    icon: "mdi-file-import" // Icon for importing files
  },
  {
    title: "Flux WMS",
    description: "Un accès à certaines données de références est possible à travers un flux wms.",
    icon: "mdi-map-marker-path" // Icon for mapping/location with path
  },
  {
    title: "API REST",
    description: "L’API REST de l'Observatoire vous offre la possibilité de consulter des données actualisées et consommables à travers le web.",
    icon: "mdi-api" // Icon for API
  },
  {
    title: "Imprimer",
    description: "Imprimer tous types de données avec la possibilité de personnaliser la mise en page de la carte resultante.",
    icon: "mdi-printer" // Icon for printing
  },
  {
    title: "Calcul d'itinéraire",
    description: "Un moteur de recherche d’itinéraire haute performance installé dans le serveur de l'Observatoire basé sur le réseau d’OpenStreetMap, sa puissance réside sur l’utilisation des itinéraires pré-calculés.",
    icon: "mdi-directions" // Icon for directions/route
  },
  {
    title: "Rechercher",
    description: "Un moteur de recherche permettant de chercher les informations disponibles dans le catalogue de données.",
    icon: "mdi-magnify" // Icon for search
  },
  {
    title: "Partager",
    description: "Partager une zone, position, localisation, croquis dans les réseaux sociaux avec la possibilité de réutiliser ce service dans votre propre instance.",
    icon: "mdi-share-variant" // Icon for sharing
  },
  {
    title: "Exporter",
    description: "Exporter l’ensemble des données vecteurs sous des formats de votre choix (.shp .Tab dxf, geojson, etc…).",
    icon: "mdi-file-export" // Icon for exporting files
  },
  /* {
    title: "Dessin",
    description: "Dessiner des objets géographiques avec la possibilité de les éditer, commenter, partager et sauvegarder.",
    icon: "mdi-pencil-ruler" // Icon for drawing/ruler
  }, */
  /* {
    title: "Fiches géodésiques",
    description: "Consulter l’ensemble des bornes du Réseau Géodésique National du Cameroun.",
    icon: "mdi-map-marker-distance" // Icon for geographic markers/distance
  }, */
  {
    title: "Comparateur",
    description: "Comparer deux cartes de votre choix.",
    icon: "mdi-compare" // Icon for comparing
  }
];


const resourceStore = useResourceStore()
onBeforeMount(async () => await resourceStore.getNearestEvents())
</script>

<style lang="scss" scoped>
.text-description {
  margin-bottom: 2rem;
  text-align: justify;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .feature-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .feature-icon {
    color: rgb(var(--v-theme-main-blue));
    font-size: 1.5rem;
  }

  .feature-title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .feature-description {
    color: #666;
    line-height: 1.5;
  }
}
</style>

