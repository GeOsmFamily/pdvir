<template>
    <Modal
        :title="type === FormType.CREATE ? $t('projects.form.title.create') : $t('projects.form.title.edit')"
        :show="isShown">
        <template #content>
            <v-form @submit.prevent="submitForm" id="project-form" class="Form Form--project">
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.name.label') }}</label>
                    <v-text-field density="compact" variant="outlined" v-model="form.name.value.value"
                    :error-messages="form.name.errorMessage.value"
                    @blur="form.name.handleChange" />
                </div>
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.description.label') }}</label>
                    <v-textarea variant="outlined"
                        v-model="form.description.value.value" :error-messages="form.description.errorMessage.value"
                        @blur="form.description.handleChange"/>
                </div>
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.website.label') }}</label>
                    <v-text-field density="compact" variant="outlined" v-model="form.website.value.value"
                        :error-messages="form.website.errorMessage.value"
                        @blur="form.website.handleChange" />
                </div>
                <FormSectionTitle :text="$t('projects.form.section.thematics')" />
                <v-select density="compact" variant="outlined" multiple
                    v-model="(form.thematics.value.value as Thematic[])" :items="thematics"
                    item-title="name" item-value="@id" :error-messages="form.thematics.errorMessage.value"
                    @blur="form.thematics.handleChange(form.thematics.value.value)" return-object />
                
                <FormSectionTitle :text="$t('projects.form.section.localization')" />
                <FormSectionTitle :text="$t('projects.form.section.projectOwner')" />
                <FormSectionTitle :text="$t('projects.form.section.focalPoint')" />
                
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.focalPointName.label') }}</label>
                    <v-text-field density="compact" variant="outlined" v-model="form.focalPointName.value.value"
                        :error-messages="form.focalPointName.errorMessage.value" @blur="form.focalPointName.handleChange"/>
                </div>
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.focalPointPosition.label') }}</label>
                    <v-text-field density="compact" variant="outlined" v-model="form.focalPointPosition.value.value"
                        :error-messages="form.focalPointPosition.errorMessage.value"
                        @blur="form.focalPointPosition.handleChange" />
                </div>
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.focalPointEmail.label') }}</label>
                    <v-text-field density="compact" variant="outlined" v-model="form.focalPointEmail.value.value"
                        :error-messages="form.focalPointEmail.errorMessage.value"
                        @blur="form.focalPointEmail.handleChange"/>
                </div>
                <div class="Form__fieldCtn">
                    <label class="Form__label">{{ $t('projects.form.fields.focalPointTel.label') }}</label>
                    <v-text-field density="compact" variant="outlined" v-model="form.focalPointTel.value.value"
                        :error-messages="form.focalPointTel.errorMessage.value" @blur="form.focalPointTel.handleChange" type="tel" />
                </div>
                <!--<FormSectionTitle :text="$t('projects.form.images')" />
                <ImagesLoader @updateFiles="handleImagesUpdate" :existingImages="existingImages"/>-->
            </v-form>
        </template>
        <template #footer-left>
            <span class="text-action" @click="$emit('close')">{{ $t('forms.cancel') }}</span>
        </template>
        <template #footer-right>
            <v-btn type="submit" form="project-form" color="main-red" :loading="isSubmitting">{{ type === FormType.CREATE ? $t('forms.create') : $t('forms.modify') }}</v-btn>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { type Project } from '@/models/interfaces/Project';
import { ProjectFormService } from '@/services/projects/ProjectFormService';
import { useProjectStore } from '@/stores/projectStore';
import { useApplicationStore } from '@/stores/applicationStore';
import FormSectionTitle from '@/components/text-elements/FormSectionTitle.vue';
import { computed, onMounted, ref, type Ref } from 'vue';
import type { ContentImageFromUserFile } from '@/models/interfaces/ContentImage';
import Modal from '@/components/global/Modal.vue';
import type { MediaObject } from '@/models/interfaces/MediaObject';
import ImagesLoader from '@/components/forms/ImagesLoader.vue';
import { useThematicStore } from '@/stores/thematicStore';
import { FormType } from '@/models/enums/app/FormType';
import type { Thematic } from '@/models/interfaces/Thematic';
const appStore = useApplicationStore();
const projectsStore = useProjectStore();
const thematicsStore = useThematicStore()

const props = defineProps<{
  type: FormType,
  project: Project,
  isShown: boolean,
}>()

const thematics = computed(() => thematicsStore.thematics)

const { form, handleSubmit, isSubmitting } = ProjectFormService.getForm(props.project);
const emit = defineEmits(['submitted'])

onMounted(async () => {
    await thematicsStore.getAll()
})

const submitForm = handleSubmit(
    async (values) => {
        const projectSubmission: Partial<Project> = values
        if (props.type === FormType.EDIT) {
            projectSubmission.id = props.project.id
        }
        console.log('projectSubmission', projectSubmission.thematics);
        if (projectSubmission.thematics) {
            projectSubmission.thematics = projectSubmission.thematics.map((thematic: Thematic) => thematic['@id'])
        }
        const submittedProject = await projectsStore.submitProject(projectSubmission, props.type)
        emit('submitted', submittedProject)
    },
    errors => {
        console.error('Form validation failed:', errors);
    }
);
</script>
