<template>
  <v-autocomplete
    class="custom-select"
    v-model="internalValue"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    :chips="chips"
    :small-chips="smallChips"
    :deletable-chips="deletableChips"
    :attach="attach"
    :disabled="disabled"
    :readonly="readonly"
    :dense="dense"
    :outlined="outlined"
    :filled="filled"
    :solo="solo"
    :flat="flat"
    :hide-details="hideDetails"
    :persistent-hint="persistentHint"
    :hint="hint"
    :item-text="itemText"
    :item-value="itemValue"
    :return-object="returnObject"
    :no-data-text="noDataText"
    :search-input.sync="searchInput"
    color="main-blue"
    variant="outlined"
    item-title="name"
    item-value="value"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- Pass through all slots -->
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope" :key="slot">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'SearchableSingleSelect',
  
  props: {
    // Core v-model
    value: {
      type: [String, Number, Object],
      default: null
    },
    
    // Items and their configuration
    items: {
      type: Array,
      required: true
    },
    itemText: {
      type: [String, Function],
      default: 'name'
    },
    itemValue: {
      type: [String, Function],
      default: 'value'
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    
    // Basic select props
    label: {
      type: String,
      default: 'Select Item'
    },
    placeholder: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    
    // Search configuration
    searchPlaceholder: {
      type: String,
      default: 'Search...'
    },
    searchable: {
      type: Boolean,
      default: true
    },
    noDataText: {
      type: String,
      default: 'Aucun résultat trouvé'
    },
    
    // Chip configuration
    chips: {
      type: Boolean,
      default: false
    },
    smallChips: {
      type: Boolean,
      default: false
    },
    deletableChips: {
      type: Boolean,
      default: false
    },
    
    // Appearance props
    attach: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    
    // Details and hints
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    persistentHint: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      searchInput: null
    }
  },
  
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  },
  
  watch: {
    searchInput(val) {
      // Émets l'événement de recherche si nécessaire
      this.$emit('search-input', val)
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here if needed */
.custom-select {
  width: 100%;
  max-height: 20px;
  margin-top: 16px;
  margin-bottom: 32px;
}
</style>