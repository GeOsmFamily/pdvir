<template>
    <PageBanner :text="$t('admin.title')" class="mt-10"  v-if="userStore.currentUser?.roles.includes(UserRoles.ADMIN)"/>
    <div class="AdminView mt-10" v-if="userStore.currentUser?.roles.includes(UserRoles.ADMIN)">
        <div class="AdminView__Left"><AdminPanelsSelector /></div>
        <div class="AdminView__Right"><router-view /></div>
    </div>
    <div v-else>Access denied</div>
</template>
<script setup lang="ts">
import PageBanner from '@/components/generic-components/banners/PageBanner.vue';
import AdminPanelsSelector from '@/components/views-components/admin/AdminPanelsSelector.vue';
import { UserRoles } from '@/models/enums/auth/UserRoles';
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
</script>
<style lang="scss">
.AdminView {
    display: flex;
    width: 100%;
}
.AdminView__Left {
    width: 30%;
}
.AdminView__Right {
    width: 70%;
    background-color: white;
}
</style>