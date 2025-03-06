<template>
  <div class="AdminPanel">
    <AdminTopBar
      page="Comments"
      :items="commentStore.comments.filter((x) => x.origin === origin)"
      :sortingListItems="[
        { sortingKey: 'readByAdmin', text: 'Non lus en premiers' },
        { sortingKey: 'nameAZ', text: 'Nom A-Z' },
        { sortingKey: 'nameZA', text: 'Nom Z-A' }
      ]"
      searchKey="name"
      @updateSortingKey="sortingCommentsSelectedMethod = $event"
      @update-search-query="searchQuery = $event"
    >
      <template #right-buttons>
        <v-btn
          prepend-icon="mdi-folder-edit-outline"
          color="main-red"
          :disabled="selectedComments.length === 0"
        >
          {{ $t('admin.comments.actionsButton') }}
          <v-menu activator="parent" location="left">
            <v-list>
              <v-list-item @click="markAsRead()">
                <v-icon icon="mdi mdi-email-open-outline"></v-icon>
                <span class="ml-4">{{ $t('admin.comments.markAsRead') }}</span>
              </v-list-item>
              <v-list-item @click="deleteComments()">
                <v-icon icon="mdi mdi-delete-outline"></v-icon>
                <span class="ml-4">{{ $t('admin.comments.delete') }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </AdminTopBar>
    <div v-for="comment in filteredItems" :key="comment.id">
      <div
        class="AdminTable__row h-auto"
        :class="{ 'AdminTable__row--overlay': !comment.readByAdmin }"
        :style="{ gridTemplateColumns: ['5%', '20%', 'auto', '5%'].join(' ') }"
      >
        <div class="AdminTable__item d-flex align-center">
          <v-checkbox
            :value="comment.id"
            v-model="selectedComments"
            hide-details
            @update:model-value="toggleSelection(comment)"
          >
          </v-checkbox>
        </div>
        <div class="AdminTable__item d-flex align-center pl-3">
          <span class="text-uppercase font-weight-bold">{{ comment.createdBy.lastName }}</span>
          <span class="ml-2">{{ comment.createdBy.firstName }}</span>
        </div>
        <div class="AdminTable__item d-flex align-center pl-3 text-wrap">
          <p>{{ comment.message }}</p>
        </div>
        <div class="AdminTable__item d-flex align-center justify-center">
          <v-icon icon="mdi-magnify" @click="showEntity(comment.originURL as string)"></v-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AdminTopBar from '@/components/admin/AdminTopBar.vue'
import type {
  AdminCommentsSortingValues,
  AppComment,
  CommentOrigin
} from '@/models/interfaces/Comment'
import { useCommentStore } from '@/stores/commentStore'
import { computed, ref, watch, type Ref } from 'vue'
const commentStore = useCommentStore()
const props = defineProps<{ origin: CommentOrigin }>()

const sortingCommentsSelectedMethod: Ref<AdminCommentsSortingValues> = ref('readByAdmin')
const sortedComments: Ref<AppComment[]> = ref(
  commentStore.getSortedComments(props.origin, sortingCommentsSelectedMethod.value)
)
watch(
  () => sortingCommentsSelectedMethod.value,
  () => {
    sortedComments.value = commentStore.getSortedComments(
      props.origin,
      sortingCommentsSelectedMethod.value
    )
  }
)
const searchQuery = ref('')
const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return sortedComments.value
  }
  return sortedComments.value.filter((item: AppComment) => {
    return (
      item.message.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.createdBy.lastName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.createdBy.firstName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.createdBy.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const selectedComments = ref<AppComment[]>([])
const toggleSelection = (comment: AppComment) => {
  console.log(comment)
  const index = selectedComments.value.findIndex((c) => c.id === comment.id)
  if (index === -1) {
    selectedComments.value.push(comment)
  } else {
    selectedComments.value.splice(index, 1)
  }
}
function markAsRead() {
  commentStore.markAsRead(selectedComments.value)
  selectedComments.value = []
}
function deleteComments() {
  console.log(selectedComments.value)
}
function showEntity(url: string) {
  window.open(url, '_blank')
}
</script>
