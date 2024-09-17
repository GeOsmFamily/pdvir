import { DialogKey } from '@/models/enums/DialogKey'
import { StoresList } from '@/models/enums/StoresList'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const useUserStore = defineStore(StoresList.USER, () => {
  const router = useRouter()
  const route = useRoute()
  const userIsLogged = ref(false)
  const errorWhileSignInOrSignUp = ref(false)
  const signInSuccess = () => {
    userIsLogged.value = true
    errorWhileSignInOrSignUp.value = false
    router.replace({ query: { dialog: undefined }})
  }
  const signUpSuccess = () => {
    router.replace({ query: { ...route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_THANKS } })
  }
  return { userIsLogged, errorWhileSignInOrSignUp, signInSuccess, signUpSuccess }
})
