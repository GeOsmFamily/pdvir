<template>
    <v-icon icon="mdi mdi-share-variant" @click.stop="copyURL"></v-icon>
</template>

<script setup lang="ts">
const props =defineProps<{
    additionnalPath?: string
}>()
function copyURL() {
    if (props.additionnalPath) {
        navigator.clipboard.writeText(encodeURI(window.location.href + '/' +props.additionnalPath))
    } else {
        navigator.clipboard.writeText(window.location.href);
    }
    alert('URL copied to clipboard');
}
</script>