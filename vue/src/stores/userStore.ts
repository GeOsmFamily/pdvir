import { StoresList } from '@/models/enums/StoresList'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useUserStore = defineStore(StoresList.USER, () => {
  const router = useRouter()
  const userIsLogged = ref(false)
  const errorInLogin = ref(false)
  const loginSuccess = () => {
    userIsLogged.value = true
    errorInLogin.value = false
    router.replace({ query: { dialog: undefined }})
  }
  return { userIsLogged, errorInLogin, loginSuccess }
})
