<template>
    <div>Members Administration Component</div>
</template>
<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore';
import { onMounted } from 'vue';
const adminStore = useAdminStore();
onMounted(() => {
    console.log(adminStore.getMembers())
})
</script>