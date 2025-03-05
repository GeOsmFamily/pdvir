import { StoresList } from '@/models/enums/app/StoresList'
import type {
  AdminCommentsSortingValues,
  AppComment,
  CommentOrigin
} from '@/models/interfaces/Comment'
import { CommentsService } from '@/services/comments/CommentsService'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCommentStore = defineStore(StoresList.COMMENT, () => {
  const comments: Ref<AppComment[]> = ref([])
  const isAppCommentActive = ref(false)

  async function getAll(): Promise<void> {
    if (comments.value.length === 0) {
      comments.value = await CommentsService.getAll()
    }
  }
  async function createComment(commentSubmission: AppComment) {
    const comment = await CommentsService.createComment(commentSubmission)
    isAppCommentActive.value = false
    if (comment) {
      comments.value.push(comment)
    }
  }

  const markAsRead = (comments: AppComment[]) => {
    CommentsService.markAsRead(comments)
  }
  const getSortedComments = (origin: CommentOrigin, sortingMethod: AdminCommentsSortingValues) => {
    const filteredComments = comments.value.filter((x) => x.origin === origin)

    if (sortingMethod === 'readByAdmin') {
      return filteredComments.sort((a, b) => {
        if (a.readByAdmin !== b.readByAdmin) {
          return Number(a.readByAdmin) - Number(b.readByAdmin)
        }
        return a.createdBy.lastName?.localeCompare(b.createdBy.lastName)
      })
    }

    if (sortingMethod === 'nameAZ') {
      return filteredComments.sort((a, b) => {
        return a.createdBy.lastName?.localeCompare(b.createdBy.lastName)
      })
    }

    if (sortingMethod === 'nameZA') {
      return filteredComments.sort((a, b) => {
        return b.createdBy.lastName?.localeCompare(a.createdBy.lastName)
      })
    }
    return filteredComments
  }
  return {
    comments,
    isAppCommentActive,
    getAll,
    createComment,
    markAsRead,
    getSortedComments
  }
})
