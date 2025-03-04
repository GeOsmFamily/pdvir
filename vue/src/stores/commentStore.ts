import { StoresList } from '@/models/enums/app/StoresList'
import type { AppComment } from '@/models/interfaces/Comment'
import { CommentsService } from '@/services/comments/CommentsService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore(StoresList.COMMENT, () => {
  const isAppCommentActive = ref(false)
  async function createComment(commentSubmission: AppComment) {
    await CommentsService.createComment(commentSubmission)
    isAppCommentActive.value = false
  }

  return {
    isAppCommentActive,
    createComment
  }
})
