<template>
    <AdminActorsPanel v-if="adminStore.selectedAdminItem === AdministrationPanels.CONTENT_ACTORS" />
</template>
<script setup lang="ts">
import { AdministrationPanels } from '@/models/enums/AdministrationPanels';
import { useAdminStore } from '@/stores/adminStore';
import AdminActorsPanel from './admin-content/AdminActorsPanel.vue';
const adminStore = useAdminStore();
</script>