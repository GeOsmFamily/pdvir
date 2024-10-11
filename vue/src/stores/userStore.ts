import { DialogKey } from '@/models/enums/app/DialogKey'
import { StoresList } from '@/models/enums/app/StoresList'
import type { SignInValues, SignUpValues } from '@/models/interfaces/auth/AuthenticationsValues'
import type { User } from '@/models/interfaces/auth/User'
import { AuthenticationService } from '@/services/auth/AuthenticationService'
import JwtCookie from '@/services/auth/JWTCookie'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as Sentry from "@sentry/browser";
import { UserRoles } from '@/models/enums/auth/UserRoles'


export const useUserStore = defineStore(StoresList.USER, () => {
  const router = useRouter()
  const route = useRoute()
  const currentUser = ref<User | null>(null)
  const errorWhileSignInOrSignUp = ref(false)
  const userIsLogged = computed(() => currentUser.value !== null)
  const userIsAdmin = () => userIsLogged.value && currentUser.value?.roles.includes(UserRoles.ADMIN)
  const userIsEditor = () => userIsLogged.value && 
    currentUser.value?.roles.includes(UserRoles.EDITOR_PROJECTS) ||
    currentUser.value?.roles.includes(UserRoles.EDITOR_ACTORS) ||
    currentUser.value?.roles.includes(UserRoles.EDITOR_RESOURCES) ||
    currentUser.value?.roles.includes(UserRoles.EDITOR_DATA)
  const userHasRole = (role: UserRoles) => userIsLogged.value && currentUser.value?.roles.includes(role)

  const signIn = async (values: SignInValues, hideDialog = true) => {
    try {
      await AuthenticationService.signIn(values)
      setCurrentUser()
      errorWhileSignInOrSignUp.value = false
      if (hideDialog) {
        router.replace({ query: { ...route.query, dialog: undefined } })
      }
    } catch (err) {
        Sentry.captureException(err);
        errorWhileSignInOrSignUp.value = true
    }
  }

  const setCurrentUser = async () => {
    currentUser.value = (await AuthenticationService.getAuthenticatedUser()).data
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
    } catch (err) {
        errorWhileSignInOrSignUp.value = true
        Sentry.captureException(err);
    }
  }

  const signOut = async () => {
    currentUser.value = null
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
    router.replace({ query: { ...route.query, dialog: undefined } })
  }
  return { userIsLogged, userIsAdmin, userIsEditor, userHasRole, currentUser, errorWhileSignInOrSignUp, signIn, signUp, signOut, checkAuthenticated, patchUser }
})
