<template>
    <div v-for="key in objectKeys">
        <strong>{{ key }}:</strong>
        <span>{{ actor[key as keyof Actor] || 'N/A' }}</span>
    </div>
</template>
<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const actorsStore = useActorsStore();

const id = computed(() => route.params.name);
const actor: Ref<Actor> = ref(actorsStore.actors.find(actor => actor.name === id.value)) as Ref<Actor>;
//Use only keys with correct format
const objectKeys = computed(() => Object.keys(actor.value));
</script>
<style scoped>
</style>