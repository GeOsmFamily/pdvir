<template>
    <div class="LikeButton">
        <v-btn
            variant="text"
            density="comfortable"
            :icon=" liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
            color="main-blue">
        </v-btn>
        {{ count }}
    </div>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/stores/applicationStore';
import { computed, onMounted } from 'vue';
const props = defineProps<{
  id: string
}>()
const appStore = useApplicationStore()

const liked = computed(() => appStore.likesList?.[props.id]?.liked)
const count = computed(() => appStore.likesList?.[props.id]?.count)
onMounted(() => {
    console.log(props.id)
})
</script>