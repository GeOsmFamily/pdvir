<template>
  <v-dialog
    v-model="appStore.showEditContentDialog"
    width="auto"
    persistent
  >
    <ActorEditionForm v-if="actorsStore.actorEdition.active"/>
  </v-dialog>
</template>
<script lang="ts" setup>
import { useApplicationStore } from '@/stores/applicationStore';
import { useActorsStore } from '@/stores/actorsStore';
import ActorEditionForm from '@/views/actors/components/ActorEditionForm.vue';

const appStore = useApplicationStore();
const actorsStore = useActorsStore();
</script>