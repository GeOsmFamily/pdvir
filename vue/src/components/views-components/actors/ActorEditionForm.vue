<template>
    <div class="Actors__form__dialog">
        <div class="Actors__form__title">
            <h3>{{ actorToEdit ? $t('actors.form.edittitle') : $t('actors.form.createtitle') }}</h3>
            <v-btn icon="mdi-close" variant="outlined" size="x-small" @click="appStore.showEditContentDialog=false"></v-btn>
        </div>
        <div class="Actors__form__container">
            <v-form @submit.prevent="submitForm">
                <v-text-field
                    v-model="form.name.value.value"
                    :error-messages="form.name.errorMessage.value"
                    label="User name"
                    @blur="form.name.handleChange"
                ></v-text-field>
                <v-text-field
                    v-model="form.acronym.value.value"
                    :error-messages="form.acronym.errorMessage.value"
                    label="User name"
                    @blur="form.acronym.handleChange"
                ></v-text-field>
                <v-text-field
                    v-model="form.email.value.value"
                    :error-messages="form.email.errorMessage.value"
                    @blur="form.email.handleChange"
                    label="Email"
                ></v-text-field>
                <v-btn 
                    text="Submit"
                    type="submit"
                ></v-btn>
            </v-form>
        </div>
        
    </div>
    
</template>
<script setup lang="ts">
import { type Actor } from '@/models/interfaces/Actor';
import { ActorsFormService } from '@/services/actors/ActorsForm';
import { useActorsStore } from '@/stores/actorsStore';
import { useApplicationStore } from '@/stores/applicationStore';
const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const actorToEdit: Actor | undefined = actorsStore.actors.find(actor => actor.id === actorsStore.actorEdition.id);

const {form, errors} = ActorsFormService.getActorsForm(actorToEdit);

const submitForm = () => {
    if (Object.keys(errors.value).length === 0) {
        console.log({...actorToEdit,...form})
        console.log("let's go")
    } else {
        console.log("let's not go")
    }
};
</script>