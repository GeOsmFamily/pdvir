<template>
    <v-dialog
      v-model="appStore.showEditContentDialog"
      width="auto"
    >
        <ActorEditionForm v-if="actorsStore.actorEdition.active"/>
    </v-dialog>
</template>
<script lang="ts" setup>
import { useApplicationStore } from '@/stores/applicationStore';
import { useActorsStore } from '@/stores/actorsStore';
import ActorEditionForm from '../actors/ActorEditionForm.vue';

const appStore = useApplicationStore();
const actorsStore = useActorsStore();
</script>