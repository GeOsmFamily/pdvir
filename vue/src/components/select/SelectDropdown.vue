<template>
  <v-select
    class="custom-select"
    v-model="internalValue"
    :items="filteredItems"
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
    color="main-blue"
    v-bind="$attrs"
    v-on="$listeners"
    variant="outlined"
    item-title="name"
    item-value="value"
  >
    <template v-slot:prepend-item>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-model="searchTerm"
            :placeholder="searchPlaceholder"
            prepend-inner-icon="mdi-magnify"
            clearable
            dense
            hide-details
            @input="filterItems"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2" />
    </template>

    <!-- Pass through other slots except prepend-item -->
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope" :key="slot">
      <slot v-if="slot !== 'prepend-item'" :name="slot" v-bind="scope" />
    </template>
  </v-select>
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
    
    // Chip configuration - removed since single select
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
      searchTerm: '',
      filteredItems: []
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
    items: {
      handler() {
        this.initializeItems()
      },
      immediate: true
    }
  },
  
  methods: {
    initializeItems() {
      this.filteredItems = [...this.items]
    },
    
    filterItems() {
      if (!this.searchTerm || this.searchTerm.trim() === '') {
        this.filteredItems = [...this.items]
        return
      }
      
      const searchLower = this.searchTerm.toLowerCase().trim()
      
      this.filteredItems = this.items.filter(item => {
        let searchText = ''
        
        if (typeof item === 'string') {
          searchText = item
        } else if (typeof item === 'object' && item !== null) {
          if (typeof this.itemText === 'function') {
            searchText = this.itemText(item)
          } else {
            // For objects, get the property specified by itemText (default: 'name')
            searchText = item[this.itemText] || item.name || ''
          }
        }
        
        return searchText.toString().toLowerCase().includes(searchLower)
      })
    },
    
    clearSearch() {
      this.searchTerm = ''
      this.filterItems()
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here if needed */
 .custom-select{
    width: 100%;
    max-height: 20px;
    margin-top: 16px;
    margin-bottom: 32px;
  }
</style>