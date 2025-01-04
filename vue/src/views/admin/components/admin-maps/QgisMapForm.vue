<template>
  <Modal
    :title="$t('qgisMap.form.title.' + type)"
    :show="qgisMapStore.isQgisMapFormShown"
    @close="qgisMapStore.isQgisMapFormShown = false"
  >
    <template #content>
      <v-form @submit.prevent="submitForm" id="qgis-map-form" class="Form Form--qgis-map">
        <div class="Form__fieldCtn">
          <label class="Form__label required">{{ $t('qgisMap.form.fields.name.label') }}</label>
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="form.name.value.value"
            :error-messages="form.name.errorMessage.value"
            :placeholder="$t('qgisMap.form.fields.name.label')"
            @blur="form.name.handleChange"
          />
        </div>
        <div class="Form__fieldCtn">
          <label class="Form__label required">{{
            $t('qgisMap.form.fields.description.label')
          }}</label>
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="form.description.value.value"
            :error-messages="form.description.errorMessage.value"
            :placeholder="$t('qgisMap.form.fields.description.label')"
            @blur="form.description.handleChange"
          />
        </div>
        <div class="Form__fieldCtn" v-if="props.type === FormType.CREATE">
          <label class="Form__label">{{ $t('qgisMap.form.fields.file.label') }}</label>
          <FileInput
            v-model="form.qgisProject.value.value"
            :error-messages="form.qgisProject.errorMessage.value"
            @update:model-value="form.qgisProject.handleChange(form.qgisProject.value.value)"
          />
        </div>
        <div class="Form__fieldCtn">
          <label class="Form__label">{{
            $t('qgisMap.form.fields.needsToBeVisualiseAsPlainImageInsteadOfWMS.label')
          }}</label>
          <v-switch
            v-model="form.needsToBeVisualiseAsPlainImageInsteadOfWMS.value.value"
            :error-messages="form.needsToBeVisualiseAsPlainImageInsteadOfWMS.errorMessage.value"
            :label="switchLabel"
            color="main-blue"
          ></v-switch>
        </div>
      </v-form>
    </template>
    <template #footer-left>
      <span class="text-action" @click="qgisMapStore.isQgisMapFormShown = false">{{
        $t('forms.cancel')
      }}</span>
    </template>
    <template #footer-right>
      <v-btn type="submit" form="qgis-map-form" color="main-red" :loading="isSubmitting">{{
        $t('forms.' + type)
      }}</v-btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { QgisMapFormService } from '@/services/qgisMap/QgisMapFormService'
import Modal from '@/components/global/Modal.vue'
import { FormType } from '@/models/enums/app/FormType'
import { nestedObjectsToIri } from '@/services/api/ApiPlatformService'
import { onInvalidSubmit } from '@/services/forms/FormService'
import FileInput from '@/components/forms/FileInput.vue'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import type { QgisMap } from '@/models/interfaces/QgisMap'
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'

const props = defineProps<{
  type: FormType
  qgisMap: QgisMap | null
}>()

const qgisMapStore = useQgisMapStore()

const { form, handleSubmit, isSubmitting } = QgisMapFormService.getForm(props.qgisMap)

const switchLabel = computed(() => {
  if (form.needsToBeVisualiseAsPlainImageInsteadOfWMS.value.value) {
    return i18n.t('qgisMap.form.fields.needsToBeVisualiseAsPlainImageInsteadOfWMS.yes')
  }
  return i18n.t('qgisMap.form.fields.needsToBeVisualiseAsPlainImageInsteadOfWMS.no')
})

const submitForm = handleSubmit(
  async (values) => {
    const qgisMapSubmission: QgisMap = nestedObjectsToIri(values)
    if ([FormType.EDIT, FormType.VALIDATE].includes(props.type) && props.qgisMap) {
      qgisMapSubmission.id = props.qgisMap.id
    }
    console.log(qgisMapSubmission)
    await qgisMapStore.submitQgisMap(qgisMapSubmission, props.type)
    qgisMapStore.isQgisMapFormShown = false
  },
  () => onInvalidSubmit
)
</script>
