import { StoresList } from '@/models/enums/StoresList'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { Project } from '@/models/interfaces/Project'
import { ProjectService } from '@/services/projects/ProjectService'
import maplibregl from 'maplibre-gl';
import { SortKey } from '@/models/enums/SortKey'

export const useProjectStore = defineStore(StoresList.PROJECTS, () => {
  const projects: Ref<Project[]> = ref([])
  const projectsSearchValue: Ref<string> = ref('')
  const hoveredProjectId: Ref<Project['id'] | null> = ref(null)
  const activeProjectId: Ref<Project['id'] | null> = ref(null)
  const map: Ref<maplibregl.Map | null> = ref(null)
  const sortingProjectsSelectedMethod = ref(SortKey.PROJECTS_AZ)

  async function getAll(): Promise<void> {
    if (projects.value.length === 0) {
      projects.value = await ProjectService.getAll()
    }
  }

  const hoveredProject = computed(() => {
    if (hoveredProjectId.value) {
      return projects.value.find((project) => project.id === hoveredProjectId.value)
    }
    return null
  })

  const activeProject = computed(() => {
    if (activeProjectId.value) {
      return projects.value.find((project) => project.id === activeProjectId.value)
    }
    return null
  })

  const filteredProjects = computed(() => {
    return projects.value.filter((project) => {
      return project.name.toLowerCase().includes(projectsSearchValue.value.toLowerCase())
    })
  })

  const orderedProjects = computed(() => {
    const sortedProjects = [...filteredProjects.value]; 
    switch (sortingProjectsSelectedMethod.value) {
      case SortKey.PROJECTS_AZ:
        return sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
      case SortKey.PROJECTS_ZA:
        return sortedProjects.sort((a, b) => b.name.localeCompare(a.name));
      case SortKey.UPDATED_AT_AZ:
        return sortedProjects.sort((a, b) => (new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()));
      case SortKey.ACTORS_AZ:
        return sortedProjects.sort((a, b) => a.actor.name.localeCompare(b.actor.name));
      case SortKey.ACTORS_ZA:
        return sortedProjects.sort((a, b) => b.actor.name.localeCompare(a.actor.name));
      default:
        return sortedProjects
    }
  })

  return { projects, getAll, projectsSearchValue, sortingProjectsSelectedMethod, hoveredProjectId, hoveredProject, activeProjectId, activeProject, filteredProjects, orderedProjects, map }
})
