import { ref } from "vue"

export function useDate(date: Date, format: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) {
  const localeDate = ref('')

  localeDate.value = date.toLocaleDateString('fr-FR', format)

  return { localeDate }
}