<template>
  <div
    class="AdminTable__row"
    :style="{ gridTemplateColumns: ['5%', '15%', '15%', '30%', '20%', '15%'].join(' ') }"
  >
    <div class="AdminTable__item">
      {{ atlas.position }}
    </div>
    <div class="AdminTable__item d-flex align-center">
      <img :src="atlas.logo.contentUrl" v-if="atlas.logo" class="AdminTable__item__logo" />
      {{ atlas.name }}
    </div>
    <div class="AdminTable__item">{{ new Date(atlas.updatedAt).toLocaleDateString() }}</div>
    <div class="AdminTable__item">
      {{ atlas.atlasGroup }}
    </div>
    <div class="AdminTable__item">
      <v-icon icon="mdi-map-outline"></v-icon>
      {{ atlas.maps.map((map) => map.name).join(', ') }}
    </div>
    <div class="AdminTable__item--last d-flex">
      <v-btn
        density="comfortable"
        icon="mdi-pencil-outline"
        class="mr-2"
        @click="
          ((formType = FormType.EDIT), (atlasToEdit = atlas), (atlasStore.isFormShown = true))
        "
      ></v-btn>
      <v-btn density="comfortable" icon="mdi-dots-vertical">
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-menu activator="parent" location="left">
          <v-list class="AdminPanel__additionnalMenu">
            <v-list-item @click="atlasStore.deleteAtlas(atlas)">{{
              $t('actors.admin.delete')
            }}</v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormType } from '@/models/enums/app/FormType'
import type { Atlas } from '@/models/interfaces/Atlas'
import { useAtlasStore } from '@/stores/atlasStore'
import type { ModelRef } from 'vue'
const atlasStore = useAtlasStore()
const formType: ModelRef<FormType | undefined> = defineModel('formType')
const atlasToEdit: ModelRef<Atlas | undefined> = defineModel('atlasToEdit')

defineProps<{ atlas: Atlas }>()
</script>
