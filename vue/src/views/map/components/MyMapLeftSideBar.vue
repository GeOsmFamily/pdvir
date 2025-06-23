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

const atlasStore = useAtlasStore()
const selectedRegion = defineModel<string | null>('selectedRegion');
const selectedDepartment = defineModel<string | null>('selectedDepartment');
const selectedCommune = defineModel<string | null>('selectedCommune');
// Données sources
const regions = [
  { name: 'Adamaoua', value: '1' },
  { name: 'Centre', value: '2' },
  { name: 'Est', value: '3' },
  { name: 'Extrême-Nord', value: '9' },
  { name: 'Littoral', value: '4' },
  { name: 'Nord', value: '5' },
  { name: 'Nord-Ouest', value: '6' },
  { name: 'Ouest', value: '7' },
  { name: 'Sud', value: '8' },
  { name: 'Sud-Ouest', value: '10' }
];

const departementsSource = [
  // Adamaoua (idRegion: 1)
  { name: 'Vina', value: 101, idRegion: 1 },
  { name: 'Djerem', value: 102, idRegion: 1 },

  // Centre (idRegion: 2)
  { name: 'Mfoundi', value: 201, idRegion: 2 }, // Yaoundé
  { name: 'Lekié', value: 202, idRegion: 2 },

  // Est (idRegion: 3)
  { name: 'Lom-et-Djérem', value: 301, idRegion: 3 },
  { name: 'Kadey', value: 302, idRegion: 3 },

  // Extrême-Nord (idRegion: 9)
  { name: 'Diamaré', value: 901, idRegion: 9 }, // Maroua
  { name: 'Mayo-Kani', value: 902, idRegion: 9 },

  // Littoral (idRegion: 4)
  { name: 'Wouri', value: 401, idRegion: 4 }, // Douala
  { name: 'Sanaga-Maritime', value: 402, idRegion: 4 },

  // Nord (idRegion: 5)
  { name: 'Benoué', value: 501, idRegion: 5 }, // Garoua
  { name: 'Mayo-Louti', value: 502, idRegion: 5 },

  // Nord-Ouest (idRegion: 6)
  { name: 'Mezam', value: 601, idRegion: 6 }, // Bamenda
  { name: 'Momo', value: 602, idRegion: 6 },

  // Ouest (idRegion: 7)
  { name: 'Mifi', value: 701, idRegion: 7 }, // Bafoussam
  { name: 'Noun', value: 702, idRegion: 7 },

  // Sud (idRegion: 8)
  { name: 'Mvila', value: 801, idRegion: 8 }, // Ebolowa
  { name: 'Océan', value: 802, idRegion: 8 },

  // Sud-Ouest (idRegion: 10)
  { name: 'Fako', value: 1001, idRegion: 10 }, // Buea / Limbe
  { name: 'Manyu', value: 1002, idRegion: 10 }
];

const communesSources = [
  // --- Région: Adamaoua (idRegion: 1) ---
  // Département: Vina (idDepartement: 101)
  { name: 'Ngaoundéré', value: 10101, idRegion: 1, idDepartement: 101 },
  // Département: Djerem (idDepartement: 102)
  { name: 'Tibati', value: 10201, idRegion: 1, idDepartement: 102 },

  // --- Région: Centre (idRegion: 2) ---
  // Département: Mfoundi (idDepartement: 201)
  { name: 'Yaoundé I', value: 20101, idRegion: 2, idDepartement: 201 },
  // Département: Lekié (idDepartement: 202)
  { name: 'Obala', value: 20201, idRegion: 2, idDepartement: 202 },

  // --- Région: Est (idRegion: 3) ---
  // Département: Lom-et-Djérem (idDepartement: 301)
  { name: 'Bertoua', value: 30101, idRegion: 3, idDepartement: 301 },
  // Département: Kadey (idDepartement: 302)
  { name: 'Batouri', value: 30201, idRegion: 3, idDepartement: 302 },

  // --- Région: Extrême-Nord (idRegion: 9) ---
  // Département: Diamaré (idDepartement: 901)
  { name: 'Maroua I', value: 90101, idRegion: 9, idDepartement: 901 },
  // Département: Mayo-Kani (idDepartement: 902)
  { name: 'Moutourwa', value: 90201, idRegion: 9, idDepartement: 902 },

  // --- Région: Littoral (idRegion: 4) ---
  // Département: Wouri (idDepartement: 401)
  { name: 'Douala I', value: 40101, idRegion: 4, idDepartement: 401 },
  // Département: Sanaga-Maritime (idDepartement: 402)
  { name: 'Edéa', value: 40201, idRegion: 4, idDepartement: 402 },

  // --- Région: Nord (idRegion: 5) ---
  // Département: Benoué (idDepartement: 501)
  { name: 'Garoua I', value: 50101, idRegion: 5, idDepartement: 501 },
  // Département: Mayo-Louti (idDepartement: 502)
  { name: 'Guider', value: 50201, idRegion: 5, idDepartement: 502 },

  // --- Région: Nord-Ouest (idRegion: 6) ---
  // Département: Mezam (idDepartement: 601)
  { name: 'Bamenda I', value: 60101, idRegion: 6, idDepartement: 601 },
  // Département: Momo (idDepartement: 602)
  { name: 'Mbengwi', value: 60201, idRegion: 6, idDepartement: 602 },

  // --- Région: Ouest (idRegion: 7) ---
  // Département: Mifi (idDepartement: 701)
  { name: 'Bafoussam I', value: 70101, idRegion: 7, idDepartement: 701 },
  // Département: Noun (idDepartement: 702)
  { name: 'Foumban', value: 70201, idRegion: 7, idDepartement: 702 },

  // --- Région: Sud (idRegion: 8) ---
  // Département: Mvila (idDepartement: 801)
  { name: 'Ebolowa I', value: 80101, idRegion: 8, idDepartement: 801 },
  // Département: Océan (idDepartement: 802)
  { name: 'Kribi', value: 80201, idRegion: 8, idDepartement: 802 },

  // --- Région: Sud-Ouest (idRegion: 10) ---
  // Département: Fako (idDepartement: 1001)
  { name: 'Buea', value: 100101, idRegion: 10, idDepartement: 1001 },
  // Département: Manyu (idDepartement: 1002)
  { name: 'Mamfe', value: 100201, idRegion: 10, idDepartement: 1002 }
];

// Tableaux filtrés pour les SelectDropdown
const departments = ref<{ name: string; value: string }[]>([]);
const communes = ref<{ name: string; value: string }[]>([]);

// Fonction pour mettre à jour la liste des départements
const updateDepartmentList = () => {
  const regionId = selectedRegion.value?parseInt(selectedRegion.value):null;
  departments.value = departementsSource
    .filter(dept => (regionId===null || dept.idRegion === regionId))
    .map(dept => ({
      name: dept.name,
      value: dept.value.toString()
    }));
};

// Fonction pour mettre à jour la liste des communes
const updateCommuneList = () => {
  if (!selectedRegion.value) {
    communes.value = [];
    return;
  }

  let filteredCommunes=communesSources;
  if(selectedRegion.value){
    const regionId =parseInt(selectedRegion.value);
    filteredCommunes = communesSources.filter(commune => commune.idRegion === regionId);
  }

  // Si un département est sélectionné, filtrer aussi par département
  if (selectedDepartment.value) {
    const departmentId = parseInt(selectedDepartment.value);
    filteredCommunes = filteredCommunes.filter(commune => commune.idDepartement === departmentId);
  }

  communes.value = filteredCommunes.map(commune => ({
    name: commune.name,
    value: commune.value.toString()
  }));
};

// Watchers pour les sélections en cascade
watch(selectedRegion, (newRegion, oldRegion) => {
  // Mettre à jour la liste des départements
  updateDepartmentList();
  
  // Si on retire la région, réinitialiser les sélections enfants
  if (!newRegion) {
    selectedDepartment.value = null;
    selectedCommune.value = null;
    return;
  }
  
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