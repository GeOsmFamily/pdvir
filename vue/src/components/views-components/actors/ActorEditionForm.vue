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
            <v-form @submit.prevent="plop">             
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
                <div class="d-flex justify-space-between">
                    <v-btn 
                        text="Supprimer"
                        color="white"
                    ></v-btn>
                    <v-btn 
                        text="Valider"
                        type="submit"
                        color="main-red"
                        :loading="isSubmitting"
                    ></v-btn>
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
const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const actorToEdit: Actor | undefined = actorsStore.actors.find(actor => actor.id === actorsStore.actorEdition.id);

const {form, errors, handleSubmit, isSubmitting} = ActorsFormService.getActorsForm(actorToEdit);

const plop = handleSubmit((values) => {
    console.log(values)
})
// const plop = () => {
//     console.log(submitForm)
//     if (Object.keys(errors.value).length === 0) {
//         console.log({...actorToEdit,...form})
//         console.log("let's go")
//     } else {
//         console.log("let's not go")
//     }
// };
</script>