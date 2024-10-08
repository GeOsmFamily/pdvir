
<template>
  <div class="ProjectMap">
    <ProjectFilterModal
      v-if="projectStore.projects != null"
      :show="projectStore.isFilterModalShown"
      @close="projectStore.isFilterModalShown = false" />
    <ProjectCard
      class="ProjectCard ProjectCard--light"
      :project="projectStore.activeProject"
      :map="true"
      :active="true"
      ref="active-project-card"
      />
    <Map
      class="ProjectMap__map"
      :geojson="geojson"
      ref="project-map"
      v-if="projectStore.projects != null" />
  </div>
</template>

<script setup lang="ts">
import Map from '@/components/generic-components/Map.vue';
import MapService from '@/services/map/MapService';
import { useProjectStore } from '@/stores/projectStore';
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import projectIcon from '@/assets/images/icons/map/project_icon.png'
import projectHoverIcon from '@/assets/images/icons/map/project_icon_hover.png'
import ProjectCard from '@/components/views-components/projects/ProjectCard.vue';
import { type ResolvedImageSpecification } from 'maplibre-gl';
import ProjectFilterModal from '@/components/views-components/projects/ProjectFilterModal.vue';
import ShowProjectFiltersModalControl from './map-controls/ShowProjectFiltersModalControl';

const projectStore = useProjectStore()
const projectMap = useTemplateRef('project-map');
const activeProjectCard = useTemplateRef('active-project-card');
const geojson = computed(() => MapService.getGeojson(projectStore.filteredProjects))
const map = computed(() => projectMap.value?.map)
const sources = {
  projects: 'projects'
}
const projectsSourceName = sources.projects,
      projectsLayerName = sources.projects,
      projectsImageName = sources.projects,
      projectsImageHoverName = projectsImageName + '_hover'

watch(() => projectStore.filteredProjects, () => {
  refreshProjectLayer()
})

watch(() => projectMap.value?.hoveredFeatureId, () => {
  if (projectMap.value == null) return
  projectStore.hoveredProjectId = projectMap.value?.hoveredFeatureId
})

watch(() => projectStore.hoveredProjectId, () => {
  if (projectMap.value == null) return
  updatePin()
})

watch(() => projectMap.value?.activeFeatureId, () => {
  if (projectMap.value == null) return
  projectStore.activeProjectId = projectMap.value?.activeFeatureId
  updatePin()
})

onMounted(() => {
  if (map.value == null) return
  map.value.addControl(new ShowProjectFiltersModalControl, 'top-right')
})

const updatePin = () => {
  if (projectMap.value) {
    projectMap.value.setLayoutProperty(sources.projects, 'icon-image', imageHoverFilter(projectsImageName, projectsImageHoverName))
  }
}

const refreshProjectLayer = async () => {
  if (projectMap.value) {
    projectMap.value.setData(sources.projects, geojson.value)
  }
}

const imageHoverFilter = (imageName: string, imageHoverName: string): maplibregl.DataDrivenPropertyValueSpecification<ResolvedImageSpecification> => {
  return [
    'match',
    ['get', 'id'],
    [...new Set([projectStore.hoveredProjectId ?? -1, projectStore.activeProjectId ?? -1])]
    , imageHoverName,
    imageName
  ]
}

const setProjectLayer = async () => {
  if (projectMap.value) {
    projectMap.value.addSource(projectsSourceName, geojson.value)
    await projectMap.value?.addImage(projectIcon, projectsImageName)
    await projectMap.value?.addImage(projectHoverIcon, projectsImageHoverName)
    const layout: maplibregl.LayerSpecification['layout'] = {
      'icon-image': imageHoverFilter(projectsImageName, projectsImageHoverName),
      'icon-size': 0.45
    }
    projectMap.value.addLayer(projectsLayerName, { layout })
    projectMap.value.listenToHoveredFeature(projectsLayerName)
    projectMap.value.addPopupOnClick(projectsLayerName, activeProjectCard.value)
  }
  return;
}

onMounted(() => {
  if (map.value != null) {
    map.value.on('load', async () => {
      if (projectMap.value) {
        await setProjectLayer()
      }
    })
  }
})
</script>

<style lang="scss">
.ProjectMap {
  width: 100%;
  height: 100%;
  position: relative;

  #map.ProjectMap__map {
    width: 100%;
    height: 100%;

    .maplibregl-ctrl-top-right {
      align-items: flex-end;
    }

    .maplibregl-ctrl-show-project-filters-ctn {
      order: -1;

      button.maplibregl-ctrl-show-project-filters {
        display: flex;
        flex-flow: row nowrap;
        border-radius: 2rem;
        align-items: center;
        padding: .5rem 1rem;
        width: fit-content;

        .maplibregl-ctrl-icon {
          margin-right: 0.5rem;
          color: rgb(var(--v-theme-main-blue));
          width: 1rem;
          background-image: url(@/assets/images/icons/map/mdi-filter.svg);
        }

        .maplibregl-ctrl-text {
          color: rgb(var(--v-theme-main-blue));
          text-wrap: none;
          white-space: nowrap;
          font-size: $font-size-sm;
          font-weight: 500;
        }
      }
    }
  }
}
</style>