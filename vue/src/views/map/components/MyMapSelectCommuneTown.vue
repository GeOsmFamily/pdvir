<template>
  <v-select
    class="City-Select"
    density="compact"
    variant="outlined"
    :placeholder="placeholder"
    :items="cities"
    item-title="name"
    item-value="value"
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
  default: 'douala'
})

const cities = [
  { name: 'Douala', value: 'douala' },
  { name: 'Batouri', value: 'batouri' }
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