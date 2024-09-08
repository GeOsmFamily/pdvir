<template>
    <PageBanner :text="$t('admin.title')" class="mt-10" />
    <div class="AdminView mt-10">
        <div class="AdminView__Left">
            <AdminPanelsSelector />
        </div>
        <div class="AdminView__Right"><router-view /></div>
    </div>
</template>
<script setup lang="ts">
import PageBanner from '@/components/generic-components/banners/PageBanner.vue';
import AdminPanelsSelector from '@/components/views-components/admin/AdminPanelsSelector.vue';
import { ref, watch } from 'vue';
const selectedTab = ref('members');
watch(selectedTab, () => {
    console.log(selectedTab.value);
})
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