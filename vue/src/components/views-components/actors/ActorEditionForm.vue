<template>
    <div class="Actors__form__dialog">
        <div class="Actors__form__title">
            <h3>{{ actorToEdit ? $t('actors.form.editTitle') : $t('actors.form.createTitle') }}</h3>
            <v-btn icon="mdi-close" size="small" @click="appStore.showEditContentDialog=false"></v-btn>
        </div>
        <div class="Actors__form__toValidate mt-3" v-if="actorToEdit && !actorToEdit.isValidated">
            <img src="@/assets/images/actorToValidate.svg" alt="">
            <span class="ml-2">Nouvelle soumission de Prénom NOM reçue le 31 janvier 2025 à 11h30.</span>
        </div>
        <div class="Actors__form__container mt-4">
            <v-form @submit.prevent="submitForm">             
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.acronym.value.value"
                    :error-messages="form.acronym.errorMessage.value"
                    :label="$t('actors.form.acronym')"
                    @blur="form.acronym.handleChange"
                ></v-text-field>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.name.value.value"
                    :error-messages="form.name.errorMessage.value"
                    :label="$t('actors.form.name')"
                    @blur="form.name.handleChange"
                ></v-text-field>

                <v-divider color="main-grey" class="border-opacity-100"></v-divider>

                <FormSectionTitle :text="$t('actors.form.contact')"/>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.website.value.value"
                    :error-messages="form.website.errorMessage.value"
                    @blur="form.website.handleChange"
                    :label="$t('actors.form.website')"
                     class="mt-3"
                ></v-text-field>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.email.value.value"
                    :error-messages="form.email.errorMessage.value"
                    @blur="form.email.handleChange"
                    label="Email"
                ></v-text-field>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.phone.value.value"
                    :error-messages="form.phone.errorMessage.value"
                    @blur="form.phone.handleChange"
                    type="tel"
                    :label="$t('actors.form.phone')"
                ></v-text-field>

            <div
                class="Actors__form__dropzone"
                :class="{ 'Actors__form__dropzone--dragging': isDragging }"
                @drop.prevent="handleDrop"
                @dragenter.prevent="handleDragEnter"
                @dragover.prevent="handleDragOver"
                @dragleave.prevent="handleDragLeave"
                @click="triggerFileInput"
            >
                <img src="@/assets/images/importFilesIcon.svg" alt="">
                <p class="ml-2">
                    {{$t('actors.form.drag')}}
                    <span class="Actors__form__dropzone__uploadLink">{{$t('actors.form.import')}}</span></p>
                <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    class="d-none"
                    @change="handleFileChange"
                />
            </div>

            <div v-if="selectedFiles.length" class="d-flex flex-wrap mt-3">
                <div v-for="(file, index) in selectedFiles":key="index" class="position-relative">
                    <div @click="removeFile(index)" class="Actors__form__dropzone__imageCloser">X</div>
                    <img
                        :src="file.preview"
                        :alt="file.name"
                        class="Actors__form__dropzone__imageLoaded ma-2"
                    />
                </div>
            </div>
                


                <div class="d-flex justify-space-between">
                    <v-btn color="white">Supprimer</v-btn>
                    <v-btn 
                        type="submit"
                        color="main-red"
                        :loading="isSubmitting"
                    >Valider</v-btn>
                </div>
            </v-form>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { type Actor } from '@/models/interfaces/Actor';
import { ActorsFormService } from '@/services/actors/ActorsForm';
import { useActorsStore } from '@/stores/actorsStore';
import { useApplicationStore } from '@/stores/applicationStore';
import FormSectionTitle from '@/components/generic-components/text-elements/FormSectionTitle.vue';
import { ref } from 'vue';
const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const actorToEdit: Actor | undefined = actorsStore.actors.find(actor => actor.id === actorsStore.actorEdition.id);
const {form, errors, handleSubmit, isSubmitting} = ActorsFormService.getActorsForm(actorToEdit);

const selectedFiles: any = ref([])
const fileInput = ref(null)

const triggerFileInput = () => {
  (fileInput.value as any).click()
}
const handleDrop = (event: any) => {
  const files = event.dataTransfer.files
  handleFileChange({ target: { files } })
}

const handleFileChange = (event: any) => {
  const files = event.target.files
  Array.from(files).forEach(file => {
    const preview = URL.createObjectURL(file as File)
    selectedFiles.value.push({ name: (file as File).name, preview, file })
  })
}
const removeFile = (index: number) => {
    selectedFiles.value.splice(index, 1)
}

const isDragging = ref(false)
const handleDragEnter = () => {
  isDragging.value = true
}
const handleDragOver = (event: Event) => {
  event.preventDefault()
}
const handleDragLeave = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
        isDragging.value = false
    }
}

const submitForm = handleSubmit((values) => {
    console.log(values)
})
</script>