<template>
  <div class="AdminAtlas__ctn">
    <AdminTopBar
      page="LeftAtlases"
      :items="atlasStore.atlasList.filter((x) => x.atlasGroup === AtlasGroup.PREDEFINED_MAP)"
      :sortingListItems="[
        { sortingKey: 'description', text: 'Description' },
        { sortingKey: 'name', text: 'Nom' }
      ]"
      :createFunction="createAtlas"
      searchKey="name"
      @updateSortingKey="sortingAtlasSelectedMethod = $event"
      @update-search-query="searchQuery = $event"
    />
    <div class="AdminTable cursor-grab">
      <VueDraggable ref="el" v-model="filteredAtlases" @end="dragAtlases">
        <AtlasesListItem
          v-for="item in filteredAtlases"
          :key="item.id"
          :atlas="item"
          v-model:atlas-to-edit="atlasToEdit"
          v-model:form-type="formType"
        ></AtlasesListItem>
      </VueDraggable>
    </div>
  </div>
  <AtlasForm :atlas="atlasToEdit" :type="formType" v-if="isFormShown" />
</template>
<script setup lang="ts">
import AdminTopBar from '@/components/admin/AdminTopBar.vue'
import { VueDraggable } from 'vue-draggable-plus'
import AtlasesListItem from './AtlasesListItem.vue'
import AtlasForm from './AtlasForm.vue'
import { FormType } from '@/models/enums/app/FormType'
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import type { Atlas } from '@/models/interfaces/Atlas'
import { nestedObjectsToIri } from '@/services/api/ApiPlatformService'
import { useAtlasStore } from '@/stores/atlasStore'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { type Ref, ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  atlasesPanel: AtlasGroup
}>()
const qgisStore = useQgisMapStore()
const atlasStore = useAtlasStore()
const atlasGroup: Ref<AtlasGroup.THEMATIC_DATA | AtlasGroup.PREDEFINED_MAP> = ref(
  props.atlasesPanel
)
const formType: Ref<FormType> = ref(FormType.CREATE)
const atlasToEdit: Ref<Atlas | null> = ref(null)
const isFormShown = computed(() => atlasStore.isFormShown)
const atlasesList = ref<Atlas[]>([]) // Atlases list needs to be a Ref object to be used with Draggable lib

onMounted(async () => {
  await qgisStore.getAll()
  await atlasStore.getAll()
  updateAtlasesList()
})
function updateAtlasesList() {
  atlasesList.value = atlasStore.atlasList
    .filter((atlas) =>
      atlasGroup.value === AtlasGroup.PREDEFINED_MAP
        ? atlas.atlasGroup === AtlasGroup.PREDEFINED_MAP
        : atlas.atlasGroup === AtlasGroup.THEMATIC_DATA
    )
    .sort((a, b) => a.position - b.position)
}
watch(
  [atlasGroup, () => atlasStore.atlasList, () => atlasStore.atlasList.length],
  updateAtlasesList,
  { deep: true }
)

function dragAtlases() {
  atlasesList.value.forEach((item, index) => {
    item.position = index + 1
    item = nestedObjectsToIri(item)
    atlasStore.submitAtlas(item, FormType.EDIT, false)
  })
}

function createAtlas() {
  formType.value = FormType.CREATE
  atlasToEdit.value = null
  atlasStore.isFormShown = true
}
type atlasSortingMethod = 'description' | 'name'
const sortingAtlasSelectedMethod: Ref<atlasSortingMethod> = ref('description')
const searchQuery = ref('')

const sortedAtlases = computed(() => {
  if (sortingAtlasSelectedMethod.value === 'name') {
    return atlasStore.atlasList
      .filter((x) => x.atlasGroup === props.atlasesPanel)
      .sort((a, b) => a.name.localeCompare(b.name))
  }
  return atlasStore.atlasList.filter((x) => x.atlasGroup === props.atlasesPanel)
})

const filteredAtlases = ref([...sortedAtlases.value])
watch(
  () => searchQuery.value,
  () => {
    if (!searchQuery.value) {
      filteredAtlases.value = [...sortedAtlases.value]
    }

    filteredAtlases.value = sortedAtlases.value.filter((x) => {
      return x.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  }
)
</script>
