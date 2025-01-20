<template>
  <div class="AdminAtlas__ctn">
    <div class="AdminAtlas__header">
      <v-btn-toggle v-model="atlasGroup" color="main-blue" group>
        <v-btn value="PredefinedMap">{{ $t('atlas.predefinedMap') }}</v-btn>
        <v-btn value="ThematicData">{{ $t('atlas.thematicData') }}</v-btn>
      </v-btn-toggle>
      <v-btn
        color="main-red"
        @click="
          ((formType = FormType.CREATE), (atlasToEdit = null), (atlasStore.isFormShown = true))
        "
        >{{ $t('forms.create') }}</v-btn
      >
    </div>
    <!-- Copy of AdminTable.vue as VueDraggable is not compatible with this component -->
    <div class="AdminTable cursor-grab">
      <VueDraggable ref="el" v-model="atlasesList" @end="dragAtlases">
        <div
          class="AdminTable__row"
          v-for="item in atlasesList"
          :key="item.id"
          :style="{ gridTemplateColumns: ['5%', '15%', '15%', '30%', '20%', '15%'].join(' ') }"
        >
          <div class="AdminTable__item">
            {{ item.position }}
          </div>
          <div class="AdminTable__item d-flex align-center">
            <img :src="item.logo.contentUrl" v-if="item.logo" class="AdminTable__item__logo" />
            {{ item.name }}
          </div>
          <div class="AdminTable__item">{{ new Date(item.updatedAt).toLocaleDateString() }}</div>
          <div class="AdminTable__item">
            {{ item.atlasGroup }}
          </div>
          <div class="AdminTable__item">
            <v-icon icon="mdi-map-outline"></v-icon>
            {{ item.maps.map((map) => map.name).join(', ') }}
          </div>
          <div class="AdminTable__item--last d-flex">
            <v-btn
              density="comfortable"
              icon="mdi-pencil-outline"
              class="mr-2"
              @click="
                ((formType = FormType.EDIT), (atlasToEdit = item), (atlasStore.isFormShown = true))
              "
            ></v-btn>
            <v-btn density="comfortable" icon="mdi-dots-vertical">
              <v-icon icon="mdi-dots-vertical"></v-icon>
              <v-menu activator="parent" location="left">
                <v-list class="AdminPanel__additionnalMenu">
                  <v-list-item @click="atlasStore.deleteAtlas(item)">{{
                    $t('actors.admin.delete')
                  }}</v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </div>
        </div>
      </VueDraggable>
    </div>
  </div>
  <AtlasForm :atlas="atlasToEdit" :type="formType" v-if="isFormShown" />
</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
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
const isFormShown = computed(() => atlasStore.isFormShown)
const atlasesList = ref<Atlas[]>([]) // Atlases list needs to be a Ref object to be used with Draggable lib

onMounted(async () => {
  await qgisStore.getAll()
  await atlasStore.getAll()
  updateAtlasesList()
})

function updateAtlasesList() {
  console.log(atlasStore.atlasList)
  atlasesList.value = atlasStore.atlasList
    .filter((atlas) =>
      atlasGroup.value === 'PredefinedMap'
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
