import { DialogKey } from '@/models/enums/DialogKey'
import { StoresList } from '@/models/enums/StoresList'
import type { SignInValues, SignUpValues } from '@/models/interfaces/auth/AuthenticationsValues'
import type { User } from '@/models/interfaces/auth/User'
import { AuthenticationService } from '@/services/auth/AuthenticationService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const useUserStore = defineStore(StoresList.USER, () => {
  const router = useRouter()
  const route = useRoute()
  const userIsLogged = ref(false)
  const errorWhileSignInOrSignUp = ref(false)
  const loggedUser = ref<User | null>(null)

  const signIn = async (values: SignInValues) => {
    try {
      await AuthenticationService.signIn(values)
      loggedUser.value = (await AuthenticationService.getAuthenticatedUser()).data
      userIsLogged.value = true
      errorWhileSignInOrSignUp.value = false
      router.replace({ query: { dialog: undefined }})
    } catch (error) {
        console.log(error)//TODO: Send to Sentry
        errorWhileSignInOrSignUp.value = true
    }
  }

  const signUp = async (values: SignUpValues) => {
    try {
      const signUp = await AuthenticationService.signUp(values)
      loggedUser.value = signUp.data as User
      router.replace({ query: { ...route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_THANKS } })
    } catch (error) {
        errorWhileSignInOrSignUp.value = true
        console.log(error)//TODO: Send to Sentry
    }
  }
  return { userIsLogged, errorWhileSignInOrSignUp, signIn, signUp }
})
