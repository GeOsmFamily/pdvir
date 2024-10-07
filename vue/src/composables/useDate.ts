import { ref } from "vue"

export function useDate(date: Date) {
  const localeDate = ref('')

  localeDate.value = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return { localeDate }
}