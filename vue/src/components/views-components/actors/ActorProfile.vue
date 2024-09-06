<template>
    <!-- Edit right to setup -->
    <v-btn @click="editActor()" color="main-red">Edit</v-btn>
    <!-- Edit right to setup -->
    <div v-for="(value) in Object.entries(actor)">
        <strong>{{ value[0] }}:</strong>
        <span>{{ value[1] }}</span>
    </div>
</template>
<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const actorsStore = useActorsStore();

const id = computed(() => route.params.name);
const actor: Actor = actorsStore.actors.find(actor => actor.name === id.value);

function editActor() {
    actorsStore.activateActorEdition(actor.id)
}
</script>
<style scoped>
</style>