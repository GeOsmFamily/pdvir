<template>
    <Modal title="Filtres">
        <template #content>
            <div class="Modal__block">
                <label class="Modal__label">{{ $t('projects.popup.filters.projectOwner.label') }}</label>
                <v-autocomplete
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    :placeholder="$t('placeholders.all')"
                    v-model="projectStore.filters.contractingActors"
                    :items="contractingActors"
                    item-title="name"
                    item-value="id"
                    multiple
                ></v-autocomplete>
            </div>
            <div class="Modal__block">
                <label class="Modal__label">{{ $t('projects.popup.filters.financial.label') }}</label>
                <v-autocomplete
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    :placeholder="$t('placeholders.all')"
                    v-model="projectStore.filters.financialActors"
                    :items="financialActors"
                    item-title="name"
                    item-value="id"
                    multiple
                ></v-autocomplete>
            </div>
            <!-- <div class="Modal__block">
                <label class="Modal__label">{{ $t('projects.popup.filters.beneficiaries.label') }}</label>
            </div> -->
            <div class="Modal__block">
                <label class="Modal__label">{{ $t('projects.popup.filters.interventionZones.label') }}</label>
                <v-chip-group v-model="projectStore.filters.interventionZones" column multiple class="Modal__chipGroup">
                    <v-chip v-for="(scope, key) in AdministrativeScope" :key="key" :value="scope" variant="outlined">{{ $t(`projects.scope.${scope}`) }}</v-chip>
                </v-chip-group>
            </div>
            <div class="Modal__block">
                <label class="Modal__label">{{ $t('projects.popup.filters.thematics.label') }}</label>
                <v-chip-group v-model="projectStore.filters.thematics" column multiple class="Modal__chipGroup">
                    <v-chip v-for="thematic in thematics" :key="thematic.id" :value="thematic.id" variant="outlined">{{ thematic.name }}</v-chip>
                </v-chip-group>
            </div>
            <div class="Modal__block">
                <label class="Modal__label">{{ $t('projects.popup.filters.status.label') }}</label>
                <v-chip-group v-model="projectStore.filters.statuses" column multiple class="Modal__chipGroup">
                    <v-chip v-for="(status, key) in Status" :key="key" :value="status" variant="outlined">{{ $t(`projects.status.${status}`) }}</v-chip>
                </v-chip-group>
            </div>
        </template>
        <template #footer-left>
            <span class="text-action" @click="resetFilters">{{ $t('labels.reset') }}</span>
        </template>
        <template #footer-right>
            <v-btn color="main-red" @click="$emit('close')">{{ $t('projects.popup.showTheProjects', { count: projectStore.filteredProjects.length }) }}</v-btn>
        </template>
    </Modal>    
</template>
<script setup lang="ts">
import Modal from '@/components/generic-components/Modal.vue';
import { AdministrativeScope } from '@/models/enums/AdministrativeScope';
import { Status } from '@/models/enums/Status';
import { uniqueArray } from '@/services/utils/UtilsService';
import { useProjectStore } from '@/stores/projectStore';
import { useThematicStore } from '@/stores/thematicStore';
import { computed, onBeforeMount } from 'vue';

const thematicsStore = useThematicStore()
onBeforeMount(async () => await thematicsStore.getAll())

const projectStore = useProjectStore()
const contractingActors = computed(() => uniqueArray(projectStore.projects.map((project) => project.contractingActors).flat()))
const financialActors = computed(() => uniqueArray(projectStore.projects.map((project) => project.financialActors).flat()))
const thematics = computed(() => thematicsStore.thematics)

const resetFilters = () => {
    projectStore.resetFilters()
}
</script>