import { DialogKey } from '@/models/enums/DialogKey'
import { StoresList } from '@/models/enums/StoresList'
import type { SignInValues, SignUpValues } from '@/models/interfaces/auth/AuthenticationsValues'
import { AuthenticationService } from '@/services/auth/AuthenticationService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const useUserStore = defineStore(StoresList.USER, () => {
  const router = useRouter()
  const route = useRoute()
  const userIsLogged = ref(false)
  const errorWhileSignInOrSignUp = ref(false)

  const signIn = async (values: SignInValues) => {
    try {
      const signIn = await AuthenticationService.signIn(values)
      if (signIn.status === 200) {
        userIsLogged.value = true
        errorWhileSignInOrSignUp.value = false
        router.replace({ query: { dialog: undefined }})
      } else {
        errorWhileSignInOrSignUp.value = true
      }
    } catch (error) {
        console.log(error)//TODO: Send to Sentry
        errorWhileSignInOrSignUp.value = true
    }
  }

  const signUp = async (values: SignUpValues) => {
    try {
      const signUp = await AuthenticationService.signUp(values)
      if (signUp.status === 201) {
        router.replace({ query: { ...route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_THANKS } })
      }
    } catch (error) {
        if ((error as any).status === 409) {
          errorWhileSignInOrSignUp.value = true
          alert("Cet email est déjà utilisé")
        }
        console.log(error)//TODO: Send to Sentry
    }
  }
  return { userIsLogged, errorWhileSignInOrSignUp, signIn, signUp }
})
