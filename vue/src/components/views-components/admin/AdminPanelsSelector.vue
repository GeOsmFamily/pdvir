<template>
    <div class="Admin__PanelSelector_Container">
        <v-expansion-panels 
            variant="accordion"
            v-model="adminStore.selectedAdminPanel"
            elevation="0"
        >
            <v-expansion-panel
                :readonly="true"
                :value="AdministrationPanels.MEMBERS"
                @click="adminStore.selectedAdminPanel = AdministrationPanels.MEMBERS"
                class="text-main-blue"
                :class="{'Admin__SelectedPanel': adminStore.selectedAdminPanel === AdministrationPanels.MEMBERS}"
            >
                <v-expansion-panel-title>
                    {{$t('admin.panelMembers')}}
                    <template v-slot:actions="{ expanded }">
                        <v-icon color="main-blue" icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-expansion-panel-title>
            </v-expansion-panel>
            <v-expansion-panel
                :title="$t('admin.panelContent')"
                :value="AdministrationPanels.CONTENT"
                @click="adminStore.selectedAdminPanel = AdministrationPanels.CONTENT"
                :class="{'Admin__SelectedPanel': adminStore.selectedAdminPanel === AdministrationPanels.CONTENT}"
                class="text-main-blue"
            >
                <v-expansion-panel-text>
                    <div class="Admin__Item__Selector"
                        :class="{'Admin__Item__Selected': adminStore.selectedAdminItem === AdministrationPanels.CONTENT_ACTORS}"
                        @click="adminStore.selectedAdminItem = AdministrationPanels.CONTENT_ACTORS"
                    >
                        <v-icon icon="mdi mdi-circle-small" size="large"></v-icon>
                        {{ $t('admin.panelContentActors') }}
                    </div>
                    <div class="Admin__Item__Selector"
                        :class="{'Admin__Item__Selected': adminStore.selectedAdminItem === AdministrationPanels.CONTENT_PROJECTS}"
                        @click="adminStore.selectedAdminItem = AdministrationPanels.CONTENT_PROJECTS"
                    >
                        <v-icon icon="mdi mdi-circle-small" size="large"></v-icon>
                        {{ $t('admin.panelContentProjects') }}
                    </div>
                    <div class="Admin__Item__Selector"
                        :class="{'Admin__Item__Selected': adminStore.selectedAdminItem === AdministrationPanels.CONTENT_RESOURCES}"
                        @click="adminStore.selectedAdminItem = AdministrationPanels.CONTENT_RESOURCES"
                    >
                        <v-icon icon="mdi mdi-circle-small" size="large"></v-icon>
                        {{ $t('admin.panelContentResources') }}
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
                :readonly="true"
                :value="AdministrationPanels.COMMENTS"
                @click="adminStore.selectedAdminPanel = AdministrationPanels.COMMENTS"
                class="text-main-blue"
                :class="{'Admin__SelectedPanel': adminStore.selectedAdminPanel === AdministrationPanels.COMMENTS}"
            >
                <v-expansion-panel-title>
                    {{$t('admin.panelComments')}}
                    <template v-slot:actions="{ expanded }">
                        <v-icon color="main-blue" icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-expansion-panel-title>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script setup lang="ts">
import { AdministrationPanels } from '@/models/enums/AdministrationPanels';
import { useAdminStore } from '@/stores/adminStore';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
const adminStore = useAdminStore();
const router = useRouter();
watch(() => adminStore.selectedAdminPanel, () => {
    if (adminStore.selectedAdminPanel === AdministrationPanels.MEMBERS) {
        router.push({ path: "/administration/membersPanel" })
        adminStore.selectedAdminItem = null
    }
    else if (adminStore.selectedAdminPanel === AdministrationPanels.CONTENT) {
        router.push({ path: "/administration/contentPanel" })
        adminStore.selectedAdminItem = AdministrationPanels.CONTENT_ACTORS
    } else {
        router.push({ path: "/administration/resourcesPanel" })
        adminStore.selectedAdminItem = null
    }
})
</script>

<style lang="scss">
.Admin__PanelSelector_Container {
    width: 100%;
}
.Admin__SelectedPanel{
    border-left: 4px solid rgb(var(--v-theme-main-blue)); 
    font-weight: 700;
}
.Admin__Item__Selector{
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
    height: 40px;
}
.Admin__Item__Selector:hover{
    background-color: rgb(var(--v-theme-main-yellow));
}
.Admin__Item__Selected{
    font-weight: 700;
    background-color: rgb(var(--v-theme-light-yellow));
}
</style>