<template>
    <div class="LikeButton">
        <v-btn
            variant="text"
            density="comfortable"
            :icon=" liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"
            color="main-blue"
            @click.stop="switchLike()"
            >
        </v-btn>
        {{ count > 0 ? count : '' }}
    </div>
</template>

<script setup lang="ts">
import { LikeService } from '@/services/likeSystem/LikeService';
import { useApplicationStore } from '@/stores/applicationStore';
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted, ref } from 'vue';
const props = defineProps<{
  id: string
}>()
const appStore = useApplicationStore()
const userStore = useUserStore()

const liked = ref(false)
const count = ref(0)
onMounted(() => {
    liked.value = appStore.likesList?.[props.id]?.liked || false
    count.value = appStore.likesList?.[props.id]?.count || 0
})

function switchLike() {
    if (userStore.userIsLogged) {
        liked.value = !liked.value
        if (liked.value) {
            count.value++
            LikeService.addLike(props.id)
        } else {
            count.value--
        }
    }
}
</script>