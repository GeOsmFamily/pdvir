<template>
  <v-select
    class="City-Select"
    density="compact"
    variant="outlined"
    :placeholder="placeholder"
    :items="cities"
    item-title="name"
    item-value="value"
    color="main-blue"
    v-model="selectedCity"
    :error-messages="errorMessages"
  >
    <template v-slot:prepend-inner>
      <v-icon :icon="icon" color="main-blue" class="opacity-100"></v-icon>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n';

// Définir le model avec defineModel
const selectedCity = defineModel<string | null>({
  default: 'cameroun'
})

const cities = [
  { name: 'Douala', value: 'LT01' },
  { name: 'Batouri', value: 'ES0401' },
  { name: 'Cameroun', value: null }
]

const props = withDefaults(
  defineProps<{
    icon?: string
    placeholder?: string
    errorMessages?: string
  }>(),
  {
    icon: 'mdi-map-marker-outline',
    placeholder: i18n.t('geocoding.placeholder')
  }
)


</script>