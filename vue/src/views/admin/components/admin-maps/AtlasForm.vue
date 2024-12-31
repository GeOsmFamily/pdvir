<template>
  <Modal
    :title="$t('qgisMap.form.title.' + type)"
    :show="isShown"
    @close="atlasStore.isFormShown = false"
  >
    <template #content>
      <v-form @submit.prevent="submitForm" id="atlas-form" class="Form Form--qgis-map">
        <div class="Form__fieldCtn">
          <label class="Form__label required">{{ $t('atlas.form.fields.name.label') }}</label>
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="form.name.value.value"
            :error-messages="form.name.errorMessage.value"
            :placeholder="$t('atlas.form.fields.name.label')"
            @blur="form.name.handleChange"
          />
        </div>
        <div class="Form__fieldCtn">
          <label class="Form__label required">{{ $t('atlas.form.fields.atlasGroup.label') }}</label>
          <v-select
            density="compact"
            variant="outlined"
            v-model="form.atlasGroup.value.value as AtlasGroup"
            :items="atlasGroups"
            :error-messages="form.atlasGroup.errorMessage.value"
            @blur="form.atlasGroup.handleChange"
          />
        </div>
        <div class="Form__fieldCtn">
          <label class="Form__label required">{{ $t('atlas.form.fields.maps.label') }}</label>
          <v-select
            multiple
            density="compact"
            variant="outlined"
            v-model="form.maps.value.value as QgisMap[]"
            :items="qgisMaps"
            item-title="name"
            item-value="@id"
            :error-messages="form.maps.errorMessage.value"
            @blur="form.maps.handleChange(form.maps.value.value)"
            return-object
          />
        </div>
      </v-form>
    </template>
    <template #footer-left>
      <span class="text-action" @click="$emit('close')">{{ $t('forms.cancel') }}</span>
    </template>
    <template #footer-right>
      <v-btn type="submit" form="atlas-form" color="main-red" :loading="isSubmitting">{{
        $t('forms.' + type)
      }}</v-btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/global/Modal.vue'
import { FormType } from '@/models/enums/app/FormType'
import { onInvalidSubmit } from '@/services/forms/FormService'
import { AtlasFormService } from '@/services/atlas/AtlasFormService'
import type { Atlas } from '@/models/interfaces/Atlas'
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import type { QgisMap } from '@/models/interfaces/QgisMap'
import { computed, onMounted } from 'vue'
import { nestedObjectsToIri } from '@/services/api/ApiPlatformService'
import { useAtlasStore } from '@/stores/atlasStore'

const props = defineProps<{
  atlas: Atlas | null
  type: FormType
}>()

const atlasStore = useAtlasStore()
const isShown = computed(() => atlasStore.isFormShown)
const atlasGroups = Object.values(AtlasGroup)
const qgisStore = useQgisMapStore()
const qgisMaps = computed(() => {
  return qgisStore.qgisMaps
})

onMounted(() => {
  console.log(props.atlas)
})

const { form, handleSubmit, isSubmitting } = AtlasFormService.getForm(props.atlas)

const submitForm = handleSubmit(
  async (values) => {
    const atlasSubmission: Atlas = nestedObjectsToIri(values)
    if (FormType.CREATE === props.type) {
      atlasSubmission.position = atlasStore.atlasList.length + 1
    }
    if ([FormType.EDIT, FormType.VALIDATE].includes(props.type) && props.atlas) {
      atlasSubmission.id = props.atlas.id
    }
    await atlasStore.submitAtlas(atlasSubmission, props.type)
    atlasStore.isFormShown = false
  },
  () => onInvalidSubmit
)
</script>
