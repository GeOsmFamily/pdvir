import { DialogKey } from '@/models/enums/app/DialogKey'
import { StoresList } from '@/models/enums/app/StoresList'
import type { SignInValues, SignUpValues } from '@/models/interfaces/auth/AuthenticationsValues'
import type { User } from '@/models/interfaces/auth/User'
import { AuthenticationService } from '@/services/auth/AuthenticationService'
import JwtCookie from '@/services/auth/JWTCookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const useUserStore = defineStore(StoresList.USER, () => {
  const router = useRouter()
  const route = useRoute()
  const userIsLogged = ref(false)
  const currentUser = ref<User | null>(null)
  const errorWhileSignInOrSignUp = ref(false)

  const signIn = async (values: SignInValues, hideDialog = true) => {
    try {
      await AuthenticationService.signIn(values)
      setCurrentUser()
      errorWhileSignInOrSignUp.value = false
      if (hideDialog) {
        router.replace({ query: { dialog: undefined }})
      }
    } catch (error) {
        console.log(error)//TODO: Send to Sentry
        errorWhileSignInOrSignUp.value = true
    }
  }

  const setCurrentUser = async () => {
    currentUser.value = (await AuthenticationService.getAuthenticatedUser()).data
    userIsLogged.value = true
  }

  const signUp = async (values: SignUpValues) => {
    try {
      await AuthenticationService.signUp(values)
      signIn({
          email: values.email,
          password: values.plainPassword
        }, false
      )
      router.replace({ query: { ...route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_THANKS } })
    } catch (error) {
        errorWhileSignInOrSignUp.value = true
        console.log(error)//TODO: Send to Sentry
    }
  }

  const signOut = async () => {
    currentUser.value = null
    userIsLogged.value = false
    JwtCookie.clearCookies()
  }

  const checkAuthenticated = async () => {
    const jwtCookieIsValid = JwtCookie.isValid()
    if (jwtCookieIsValid) {
      setCurrentUser()
    }
  }

  const patchUser = async (values: Partial<User>) => {
    await AuthenticationService.patchUser(values, currentUser.value!.id)
    setCurrentUser()
    router.replace({ query: { dialog: undefined }})
  }
  return { userIsLogged, currentUser, errorWhileSignInOrSignUp, signIn, signUp, signOut, checkAuthenticated, patchUser }
})
