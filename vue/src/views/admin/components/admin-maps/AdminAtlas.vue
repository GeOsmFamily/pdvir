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
    <div v-if="atlasGroup === 'PredefinedMap'">
      {{ atlasesPredefined }}
    </div>
    <div v-if="atlasGroup === 'ThematicData'">
      {{ atlasesThematic }}
    </div>
  </div>
  <AtlasForm :atlas="atlasToEdit" :type="formType" :isShown="isFormShown" />
</template>
<script setup lang="ts">
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { computed, onMounted, ref, type Ref } from 'vue'
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

onMounted(async () => {
  await qgisStore.getAll()
  await atlasStore.getAll()
})

const atlasesThematic = computed(() =>
  atlasStore.atlasList.filter((atlas) => atlas.atlasGroup === AtlasGroup.THEMATIC_DATA)
)

const atlasesPredefined = computed(() =>
  atlasStore.atlasList.filter((atlas) => atlas.atlasGroup === AtlasGroup.PREDEFINED_MAP)
)
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
