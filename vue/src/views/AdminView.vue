<template>
    <div>I'm the admin panel</div>
    <RouterLink to="/administration/members">Members</RouterLink>
    <RouterLink to="/administration/content">Content</RouterLink>
    <router-view />
</template>
<script setup lang="ts">
</script>