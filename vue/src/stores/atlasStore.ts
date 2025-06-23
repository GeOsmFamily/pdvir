import { StoresList } from '@/models/enums/app/StoresList'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { FormType } from '@/models/enums/app/FormType'
import { i18n } from '@/plugins/i18n'
import { addNotification } from '@/services/notifications/NotificationService'
import { NotificationType } from '@/models/enums/app/NotificationType'
import type { Atlas } from '@/models/interfaces/Atlas'
import { AtlasService } from '@/services/atlas/AtlasService'
import { useMyMapStore } from './myMapStore'
import { AtlasMapService } from '@/services/map/AtlasMapService'

const MINDHU_PROJECT_KEY = 'Réalisations MINDHU'

export const useAtlasStore = defineStore(StoresList.ATLAS, () => {
  const atlasList: Ref<Atlas[]> = ref([])
  const atlasListSplitted: Ref<Atlas[]> = ref([])
  const mindhuProjects: Ref<Atlas | null> = ref(null)
  const isFormShown: Ref<boolean> = ref(false)

  const splitMindhuAtlas = () => {
    const atlases: Atlas[] = []
    for (let i = 0; i < atlasList.value.length; i++) {
      if (atlasList.value[i].name === MINDHU_PROJECT_KEY) {
        console.log('Réalisations MINDHU find', i)
        mindhuProjects.value = atlasList.value[i]
      } else {
        atlases.push(atlasList.value[i])
      }
    }
    atlasListSplitted.value = atlases
  }

  async function getAll(): Promise<void> {
    if (atlasList.value.length === 0) {
      atlasList.value = await AtlasService.getAll()
      splitMindhuAtlas()
    }
  }

  const submitAtlas = async (atlas: Atlas, type: FormType, withNotification = true) => {
    const submittedAtlas =
      type === FormType.CREATE ? await AtlasService.post(atlas) : await AtlasService.patch(atlas)
    if (type === FormType.CREATE) {
      atlasList.value.push(submittedAtlas)
      // Add new atlas to the map
      const myMapStore = useMyMapStore()
      const atlasLayer = await AtlasMapService.setAtlasLayers(submittedAtlas)
      myMapStore.atlasMaps.push(...atlasLayer)
    } else if (type === FormType.EDIT || type === FormType.VALIDATE) {
      atlasList.value.forEach((atlas, key) => {
        if (atlas.id === submittedAtlas.id) {
          atlasList.value[key] = submittedAtlas
        }
      })
    }
    if (withNotification) {
      addNotification(i18n.t(`notifications.atlas.${type}`), NotificationType.SUCCESS)
    }
    return submittedAtlas
  }

  const deleteAtlas = async (atlas: Atlas) => {
    await AtlasService.delete(atlas)
    atlasList.value.forEach((p, key) => {
      if (p.id === atlas.id) {
        atlasList.value.splice(key, 1)
        addNotification(i18n.t('notifications.atlas.delete'), NotificationType.SUCCESS)
      }
    })
  }

  return {
    atlasList,
    isFormShown,
    mindhuProjects,
    atlasListSplitted,
    getAll,
    submitAtlas,
    deleteAtlas
  }
})
