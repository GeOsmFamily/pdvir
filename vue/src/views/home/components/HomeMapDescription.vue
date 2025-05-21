<template>
  <div class="HomeMapDescription">
    <div class="HomeMapDescription__block">
      <v-btn
        variant="outlined"
        class="show-mobile disabled mb-4 w-100 font-weight-medium"
        color="main-blue"
        >{{ $t('home.map.availableOnDesktop') }}</v-btn
      >
      <PageTitle :title="$t('home.map.title')" />
      <div class="HomeMapDescription__bullets">
        <div class="cards-grid">
          <CardBorderEffect
            v-for="(card, index) in observatoryContent"
            :key="index"
            :label="card.title"
            :description="card.description"
            :icon="card.icon"
          />
        </div>
      </div>
    </div>
    <div class="HomeMapDescription__mapImg">
      <img src="@/assets/images/home_map_comparator.png" alt="douala-map" />
      <img src="@/assets/images/batouri_screen.png" alt="batourie-map" class="batourie"/>
      <div class="HomeMapDescription__welcomeCtn">
        <h4>{{ $t('home.map.welcome') }}</h4>
        <p>{{ $t('home.map.welcomeDescription') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckPoint from '@/components/global/CheckPoint.vue'
import PageTitle from '@/components/text-elements/PageTitle.vue'
import CardBorderEffect from '@/components/card-gradiant/CardBorderEffect.vue'

const bullets = ['overview', 'simpleMaps', 'geodata', 'thematics', 'way']
const observatoryContent = [
   
    {
      title: "Construisez votre carte facilement",
      description: "Mesurez avec précision, dessinez des polygones, des lignes et des points directement sur la carte.",
      icon: "mdi-map-marker-plus-outline", // Ou mdi-pencil-ruler, mdi-map-outline
    },
    {
      title: "Accédez aux informations géographiques de base",
      description: "L’observatoire contient une diversité de données sur l'Habitat urbain et rural susceptibles d’intéresser des publics variés.",
      icon: "mdi-home-city-outline", // Ou mdi-chart-box-outline, mdi-database
    },
    {
      title: "Accédez à des données thématiques riches",
      description: "Obtenez des informations couvrant diverses thématiques comme l'urbanisme, l'environnement, les infrastructures par exemple.",
      icon: "mdi-shape-outline", // Ou mdi-layers-outline, mdi-book-multiple-outline
    },
    {
      title: "Calculez des itinéraires de manière optimale",
      description: "Planifiez vos déplacements de manière efficace grâce à notre fonctionnalité de calcul d'itinéraires !",
      icon: "mdi-map-marker-distance", // Ou mdi-navigation-variant-outline, mdi-map-marker-distance
    },
  ]
</script>

<style lang="scss">
.cards-grid {
  display: grid; /* grid */
  grid-template-columns: repeat(1, minmax(0, 1fr)); /* grid-cols-1 */
  gap: 2rem; /* gap-8 (assuming Tailwind's default of 1 unit = 0.25rem, so 8 * 0.25 = 2rem) */
}

@media (min-width: 640px) { /* sm: (small breakpoint) */
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* sm:grid-cols-2 */
  }
}

@media (min-width: 1280px) { /* xl: (extra large breakpoint) */
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* xl:grid-cols-4 */
  }
}
.HomeMapDescription {
  display: flex;
  flex-flow: row nowrap;
  gap: 2rem;
  padding: 0 1rem;
  .HomeMapDescription__block {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .HomeMapDescription__bullets {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 2rem 0 0 0;
    flex: 1 0 50%;
  }
  .batourie{
    position: absolute;
    right: -80px;
    bottom:50px;
    height:250px;
    object-fit:cover;
  }
  .HomeMapDescription__mapImg {
    padding-right: 200px;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;
    flex: 1 0 40%;
    img {
      max-width: 100%;
      width: 400px;
      height:250px;
      border-radius: 0.5rem;
      border: solid 3px #fff;
      filter: brightness(0.8);
      box-shadow: 0 0.125rem 0.5rem -0.125rem rgba(0, 0, 0, 0.4);
    }

    .HomeMapDescription__welcomeCtn {
      background: rgb(var(--v-theme-light-yellow)) url(@/assets/images/Frise.svg) no-repeat top center;
      background-attachment: local;
      background-size: 100% 1rem;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      gap: 0.25rem;
      border-radius: 0.5rem;
      border: solid 2px #fff;
      width: 18rem;
      padding: 2rem 1.5rem 1rem 1.5rem;
      position: absolute;
      transform: translateY(11rem);
      display: none;

      h4 {
        color: rgb(var(--v-theme-main-red));
        font-size: $font-size-h3;
      }

      p {
        text-align: center;
        font-size: $font-size-sm;
      }
    }
  }
}
@media (max-width: $bp-xl) {
  .HomeMapDescription {
    padding: 0;
  }
}
</style>
