<template>
    <div v-if="actorToEdit">Edit actor: {{ actorToEdit.name }}</div>
    <div v-else>Create a new actor</div>
</template>
<script setup lang="ts">
import { Actor } from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
const actorsStore = useActorsStore();
const actorToEdit: Actor | null = actorsStore.actors.find(actor => actor.id === actorsStore.actorEdition.id);
</script>