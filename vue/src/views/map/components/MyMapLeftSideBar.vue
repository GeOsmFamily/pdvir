<template>
  <div class="MyMapLeftSideBar">
    <h3 class="zone-title">Selectionner une zone</h3>
    <SelectDropdown
      v-model="selectedRegion"
      :items="regions"
      :label="'Regions'"
      :placeholder="'Rechercher une région'"
    />
    <SelectDropdown
      v-model="selectedDepartment"
      :items="departments"
      :label="'Départements'"
      :placeholder="'Rechercher un département'"
      :disabled="!selectedRegion"
    />
    <SelectDropdown
      v-model="selectedCommune"
      :items="communes"
      :label="'Communes'"
      :placeholder="'Rechercher une commune'"
      :disabled="!selectedDepartment"
    />
    <MyMapAtlasesList
      :title="$t('atlas.predefinedMap')"
      :type="AtlasGroup.PREDEFINED_MAP"
      :atlases="
        atlasStore.atlasList
          .filter((atlas) => atlas.atlasGroup === AtlasGroup.PREDEFINED_MAP)
          .sort((a, b) => a.position - b.position)
      "
      v-if="atlasStore.atlasList.length > 0"
    />
  </div>
</template>

<script setup lang="ts">
import MyMapWelcomeBlock from '@/views/map/components/MyMapWelcomeBlock.vue'
import SelectDropdown from '@/components/select/SelectDropdown.vue'
import MyMapAtlasesList from '@/views/map/components/Atlases/MyMapAtlasesList.vue'
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import { useAtlasStore } from '@/stores/atlasStore'
import { ref, watch, computed } from 'vue'
import regionsSource from '@/assets/geojsons/bounderies/region.json'
import departementSource from '@/assets/geojsons/bounderies/departement.json'
import communesSource from '@/assets/geojsons/bounderies/arrondissement.json'

const atlasStore = useAtlasStore()

const selectedRegion = defineModel<string | null>('selectedRegion', { default: null });
const selectedDepartment = defineModel<string | null>('selectedDepartment', { default: null });
const selectedCommune = defineModel<string | null>('selectedCommune', { default: null });




// Tableaux filtrés pour les SelectDropdown

const regions = ref<{ name: string; value: string }[]>([]);
const departments = ref<{ name: string; value: string }[]>([]);
const communes = ref<{ name: string; value: string }[]>([]);
const mappedCommunes = ref<{ name: string; value: string }[]>([]);
const mappedDepartments = ref<{ name: string; value: string }[]>([]);
// Fonction pour mettre à jour la liste des départements
const updateDepartmentList = () => {
  if(mappedDepartments.value.length===0){
    mappedDepartments.value=(departementSource as any).features.map((departement: any)=>({
      name: departement.properties.name,
      value: departement.properties['ref:COG']
    }));
  }
  const filteredDepartements=mappedDepartments.value;
  departments.value = filteredDepartements
    .filter(dept => (selectedRegion.value===null || dept.value.includes(selectedRegion.value as string)))
    .map(dept => ({
      name: dept.name,
      value: dept.value.toString()
    }));
};

const updateRegionsList = () =>{
  regions.value= regionsSource.features.map(region=>({
    name: region.properties.name,
    value: region.properties['ref:COG']
  }))
}

// Fonction pour mettre à jour la liste des communes
const updateCommuneList = () => {
  if(mappedCommunes.value.length===0){
    mappedCommunes.value=(communesSource as any).features.map((commune: any)=>({
      name: commune.properties.name,
      value: commune.properties['ref:COG']
    }));
  }
  let filteredCommunes=mappedCommunes.value;

  if(selectedRegion.value){
    filteredCommunes = filteredCommunes.filter(commune => commune.value.includes(selectedRegion.value as string));
  }

  // Si un département est sélectionné, filtrer aussi par département
  if (selectedDepartment.value) {
    filteredCommunes = filteredCommunes.filter(commune => commune.value.includes(selectedDepartment.value as string));
  }

  communes.value = filteredCommunes;
};

// Watchers pour les sélections en cascade
watch(selectedRegion, (newRegion, oldRegion) => {
  // Mettre à jour la liste des départements
  updateDepartmentList();
  
  // Si on retire la région, réinitialiser les sélections enfants
  /* if (!newRegion) {
    selectedDepartment.value = null;
    selectedCommune.value = null;
    return;
  } */
  
  // Si on change de région, vérifier si le département sélectionné existe encore
  if (selectedDepartment.value && newRegion !== oldRegion) {
    const departmentExists = departments.value.some(dept => dept.value === selectedDepartment.value);
    if (!departmentExists) {
      selectedDepartment.value = null;
    }
  }
  
  // Mettre à jour la liste des communes
  updateCommuneList();
}, { immediate: true });

watch(selectedDepartment, (newDepartment, oldDepartment) => {
  // Mettre à jour la liste des communes
  updateCommuneList();
  
  // Si on retire le département, réinitialiser la commune
  if (!newDepartment) {
    selectedCommune.value = null;
    return;
  }
  
  // Si on change de département, vérifier si la commune sélectionnée existe encore
  if (selectedCommune.value && newDepartment !== oldDepartment) {
    const communeExists = communes.value.some(commune => commune.value === selectedCommune.value);
    if (!communeExists) {
      selectedCommune.value = null;
    }
  }
}, { immediate: true });

// Initialisation des listes au montage du composant
updateDepartmentList();
updateCommuneList();
updateRegionsList()
</script>

<style lang="scss">
.MyMapLeftSideBar {
  display: flex;
  flex-flow: column nowrap;
  width: 21rem;
  flex: 1 0 auto;
  background: #fff;
  padding: 1rem;
}

.zone-title{
  font-size: 18px;
  font-weight: 500;
}
</style>