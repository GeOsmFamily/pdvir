<template>
  <div class="AdminPanel">
    <AdminTopBar
      page="QgisMaps"
      :items="qgisStore.qgisMaps"
      :sortingListItems="[
        { sortingKey: 'description', text: 'Description' },
        { sortingKey: 'name', text: 'Nom' }
      ]"
      :createFunction="createQgisMap"
      searchKey="name"
      @updateSortingKey="sortingQgisMapsSelectedMethod = $event"
      @update-search-query="searchQuery = $event"
    />
    <QgisMapsList
      :maps="filteredItems"
      v-model:form-type="formType"
      v-model:qgis-map-to-edit="qgisMapToEdit"
      v-model:qgis-map-to-visualise="qgisMapToVisualise"
    />

    <QgisMapForm :type="formType" :qgis-map="qgisMapToEdit" v-if="qgisStore.isQgisMapFormShown" />
    <QgisMapVisualiser
      :qgis-map="qgisMapToVisualise as QgisMap"
      v-if="qgisStore.isQgisMapVisualiserShown"
    />
  </div>
</template>

<script lang="ts" setup>
import AdminTopBar from '@/components/admin/AdminTopBar.vue'
import QgisMapForm from '@/views/admin/components/admin-maps/QgisMapForm.vue'
import type { QgisMap } from '@/models/interfaces/QgisMap'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { computed, onMounted, ref, type Ref } from 'vue'
import { FormType } from '@/models/enums/app/FormType'
import QgisMapVisualiser from './QgisMapVisualiser.vue'
import QgisMapsList from './QgisMapsList.vue'

const qgisStore = useQgisMapStore()
onMounted(async () => {
  await qgisStore.getAll()
})

type mapsSortingMethod = 'description' | 'name'
const sortingQgisMapsSelectedMethod: Ref<mapsSortingMethod> = ref('description')
const searchQuery = ref('')

const sortedMaps = computed(() => {
  try {
    if (
      sortingQgisMapsSelectedMethod.value === 'description' ||
      sortingQgisMapsSelectedMethod.value === 'name'
    ) {
      return qgisStore.qgisMaps.slice().sort((a: QgisMap, b: QgisMap) => {
        if (a[sortingQgisMapsSelectedMethod.value] && b[sortingQgisMapsSelectedMethod.value]) {
          return a[sortingQgisMapsSelectedMethod.value].localeCompare(
            b[sortingQgisMapsSelectedMethod.value]
          )
        }
        return 1
      })
    }
  } catch (e) {
    console.log(e)
    return qgisStore.qgisMaps
  }
  return qgisStore.qgisMaps
})

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return sortedMaps.value
  }
  return sortedMaps.value.filter((item: QgisMap) => {
    return (
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const formType: Ref<FormType> = ref(FormType.CREATE)
const qgisMapToEdit: Ref<QgisMap | null> = ref(null)
const qgisMapToVisualise: Ref<QgisMap | null> = ref(null)
function createQgisMap() {
  formType.value = FormType.CREATE
  qgisMapToEdit.value = null
  qgisStore.isQgisMapFormShown = true
}
</script>
