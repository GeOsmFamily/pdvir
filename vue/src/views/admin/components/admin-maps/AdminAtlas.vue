<template>
  <div class="AdminAtlas__ctn">
    <div class="AdminAtlas__header">
      <v-btn-toggle v-model="atlasGroup" color="main-blue" group>
        <v-btn value="PredefinedMap">{{ $t('atlas.predefinedMap') }}</v-btn>
        <v-btn value="ThematicData">{{ $t('atlas.thematicData') }}</v-btn>
      </v-btn-toggle>
      <v-btn
        color="main-red"
        @click="((formType = FormType.CREATE), (atlasStore.isFormShown = true))"
        >{{ $t('forms.create') }}</v-btn
      >
    </div>
    <VueDraggable ref="el" v-model="atlasesList" @end="dragAtlases">
      <div v-for="item in atlasesList" :key="item.id">
        {{ item }}
      </div>
    </VueDraggable>
  </div>
  <AtlasForm :atlas="atlasToEdit" :type="formType" :isShown="isFormShown" />
</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { onMounted, ref, watch, type Ref } from 'vue'
import AtlasForm from './AtlasForm.vue'
import { FormType } from '@/models/enums/app/FormType'
import type { Atlas } from '@/models/interfaces/Atlas'
import { useAtlasStore } from '@/stores/atlasStore'
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'

const qgisStore = useQgisMapStore()
const atlasStore = useAtlasStore()
const atlasGroup: Ref<'ThematicData' | 'PredefinedMap'> = ref('PredefinedMap')
const formType: Ref<FormType> = ref(FormType.CREATE)
const atlasToEdit: Ref<Atlas | null> = ref(null)
const isFormShown = atlasStore.isFormShown
const atlasesList = ref<Atlas[]>([])

onMounted(async () => {
  await qgisStore.getAll()
  await atlasStore.getAll()
  updateAtlasesList()
})

function updateAtlasesList() {
  atlasesList.value = atlasStore.atlasList
    .filter((atlas) =>
      atlasGroup.value === 'PredefinedMap'
        ? atlas.atlasGroup === AtlasGroup.PREDEFINED_MAP
        : atlas.atlasGroup === AtlasGroup.THEMATIC_DATA
    )
    .sort((a, b) => a.position - b.position)
}

watch(atlasGroup, updateAtlasesList)

function dragAtlases() {
  atlasesList.value.forEach((item, index) => {
    item.position = index + 1
    atlasStore.submitAtlas(item, FormType.EDIT, false)
  })
}
</script>

<style lang="scss">
.AdminAtlas__ctn {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
}
.AdminAtlas__header {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
