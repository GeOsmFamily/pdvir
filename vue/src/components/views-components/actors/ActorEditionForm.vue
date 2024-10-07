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
                <!-- General infos -->
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.name.value.value"
                    :error-messages="form.name.errorMessage.value"
                    :label="$t('actors.form.name')"
                    @blur="form.name.handleChange"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.acronym.value.value"
                    :error-messages="form.acronym.errorMessage.value"
                    :label="$t('actors.form.acronym')"
                    @blur="form.acronym.handleChange"
                />
                <v-select
                    density="compact"
                    variant="outlined"
                    :label="$t('actors.form.category')"
                    v-model="(form.category.value.value as ActorsCategories)"
                    :items="categoryItems"
                    :error-messages="form.category.errorMessage.value"
                    @blur="form.category.handleChange"
                />
                <v-select
                    density="compact"
                    variant="outlined"
                    :label="$t('actors.form.expertise')"
                    multiple
                    v-model="(form.expertises.value.value as ActorsExpertises[])"
                    :items="expertisesItems"
                    :error-messages="form.expertises.errorMessage.value"
                    @blur="form.expertises.handleChange(form.expertises.value.value)"
                />
                <v-select
                    density="compact"
                    variant="outlined"
                    :label="$t('actors.form.thematic')"
                    multiple
                    v-model="(form.thematics.value.value as ActorsThematics[])"
                    :items="thematicsItems"
                    :error-messages="form.thematics.errorMessage.value"
                    @blur="form.thematics.handleChange(form.thematics.value.value)"
                />
                <v-textarea 
                    :label="$t('actors.form.description')"
                    variant="outlined"
                    v-model="form.description.value.value"
                    :error-messages="form.description.errorMessage.value"
                    @blur="form.description.handleChange"
                />

                <v-divider color="main-grey" class="border-opacity-100"></v-divider>

                <!-- Contact infos -->
                <FormSectionTitle :text="$t('actors.form.contact')"/>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.officeName.value.value"
                    :error-messages="form.officeName.errorMessage.value"
                    @blur="form.officeName.handleChange"
                    :label="$t('actors.form.officeName')"
                     class="mt-3"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.officeAddress.value.value"
                    :error-messages="form.officeAddress.errorMessage.value"
                    @blur="form.officeAddress.handleChange"
                    :label="$t('actors.form.officeAddress')"
                     class="mt-3"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.contactName.value.value"
                    :error-messages="form.contactName.errorMessage.value"
                    @blur="form.contactName.handleChange"
                    :label="$t('actors.form.contactName')"
                     class="mt-3"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.contactPosition.value.value"
                    :error-messages="form.contactPosition.errorMessage.value"
                    @blur="form.contactPosition.handleChange"
                    :label="$t('actors.form.contactPosition')"
                     class="mt-3"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.website.value.value"
                    :error-messages="form.website.errorMessage.value"
                    @blur="form.website.handleChange"
                    :label="$t('actors.form.website')"
                     class="mt-3"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.email.value.value"
                    :error-messages="form.email.errorMessage.value"
                    @blur="form.email.handleChange"
                    label="Email"
                />
                <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="form.phone.value.value"
                    :error-messages="form.phone.errorMessage.value"
                    @blur="form.phone.handleChange"
                    type="tel"
                    :label="$t('actors.form.phone')"
                />

                <InputImage @updateFiles="handleFilesUpdate" />

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
import { type Actor, type ActorSubmission } from '@/models/interfaces/Actor';
import { ActorsFormService } from '@/services/actors/ActorsForm';
import { useActorsStore } from '@/stores/actorsStore';
import { useApplicationStore } from '@/stores/applicationStore';
import FormSectionTitle from '@/components/generic-components/text-elements/FormSectionTitle.vue';
import InputImage from '@/components/generic-components/global/InputImage.vue';
import { ref, type Ref } from 'vue';
import type { ContentImageFromUserFile, ContentImageFromUrl } from '@/models/interfaces/ContentImage';
import { ActorsCategories } from '@/models/enums/contents/actors/ActorsCategories';
import { ActorsExpertises } from '@/models/enums/contents/actors/ActorsExpertises';
import { ActorsThematics } from '@/models/enums/contents/actors/ActorsThematics';
const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const actorToEdit: Actor | null = actorsStore.actorEdition.actor

const {form, handleSubmit, isSubmitting} = ActorsFormService.getActorsForm(actorToEdit);

const categoryItems = Object.values(ActorsCategories)
const expertisesItems = Object.values(ActorsExpertises)
const thematicsItems = Object.values(ActorsThematics)

const selectedFiles: Ref<(ContentImageFromUserFile | ContentImageFromUrl)[]> = ref([])
function handleFilesUpdate(files: (ContentImageFromUserFile | ContentImageFromUrl)[]) {
    console.log(files)
  selectedFiles.value = files;
}

const submitForm = handleSubmit((values) => {
    const actorSubmission: ActorSubmission = {
        ...values, imagesToUpload: [...selectedFiles.value]
    }
    console.log(actorSubmission)
})
</script>
