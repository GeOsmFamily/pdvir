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
    <AdminTable
      :items="filteredItems"
      :table-keys="['name', 'description', 'updatedAt', 'qgisProject.layers']"
      :column-widths="['15%', '30%', '15%', '25%', '15%']"
      :with-logo="true"
      :logo-field="'logo.contentUrl'"
    >
      <template #editContentCell="{ item }">
        <v-btn
          density="comfortable"
          icon="mdi-map-outline"
          @click="showQgisProjectOnMap(item as QgisMap)"
          class="mr-2"
        ></v-btn>
        <v-btn density="comfortable" icon="mdi-dots-vertical">
          <v-icon icon="mdi-dots-vertical"></v-icon>
          <v-menu activator="parent" location="left">
            <v-list class="AdminPanel__additionnalMenu">
              <v-list-item @click="editQgisMap(item as QgisMap)">{{
                $t('forms.edit')
              }}</v-list-item>
              <v-list-item @click="qgisStore.deleteQgisMap(item as QgisMap)">{{
                $t('actors.admin.delete')
              }}</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </AdminTable>
    <QgisMapForm :type="formType" :qgis-map="qgisMapToEdit" v-if="qgisStore.isQgisMapFormShown" />
    <QgisMapVisualiser
      :qgis-map="qgisMapToVisualise as QgisMap"
      v-if="qgisStore.isQgisMapVisualiserShown"
    />
  </div>
</template>
<script setup lang="ts">
import AdminTopBar from '@/components/admin/AdminTopBar.vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import QgisMapForm from '@/views/admin/components/admin-maps/QgisMapForm.vue'
import type { QgisMap } from '@/models/interfaces/QgisMap'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { computed, onMounted, ref, type Ref } from 'vue'
import { FormType } from '@/models/enums/app/FormType'
import QgisMapVisualiser from './QgisMapVisualiser.vue'

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

function editQgisMap(qgisMap: QgisMap) {
  formType.value = FormType.EDIT
  qgisMapToEdit.value = qgisMap
  qgisStore.isQgisMapFormShown = true
}

function showQgisProjectOnMap(qgisMap: QgisMap) {
  qgisMapToVisualise.value = qgisMap
  qgisStore.isQgisMapVisualiserShown = true
}
</script>
