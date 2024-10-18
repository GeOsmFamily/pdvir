<template>
    <div class="Autocomplete bg-main-yellow">
        <v-autocomplete
            :items="items"
            variant="solo"
            bg-color="white"
            density="comfortable"
            :hide-details="true"
            menu-icon=""
            :placeholder="placeholder"
            :item-title="itemTitle"
            :item-value="itemValue"
            :custom-filter="customFilter"
            v-model="selectedItem"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-magnify" color="main-blue"></v-icon>
            </template>
        </v-autocomplete>
    </div>
</template>
<script setup lang="ts">
import type { Actor } from '@/models/interfaces/Actor';
import { ref, watch } from 'vue';

const selectedItem = ref(null);
const emit = defineEmits(['updateSelect'])
watch(selectedItem, () => {
    emit('updateSelect', selectedItem.value)
})

type FilterFunction = (value: string, query: string, item?: InternalItem) => FilterMatch;
interface InternalItem<T = any> {
    value: any;
    raw: T;
}
type FilterMatch = boolean | number | [number, number] | [number, number][];

const props = defineProps<{
    placeholder: string,
    items: Actor[],
    itemTitle: string,
    itemValue: string,
    customFilter: FilterFunction
}>()
</script>
<style lang="scss">
.Autocomplete {
    display: flex;
    align-items: center;
    width: 60%;
    border-radius: .5rem;
    padding: 1rem 1.5rem;

    .v-input {
        box-shadow: 0 .2rem .25rem -.125rem rgba(0, 0, 0, 0.3);
    }

    .v-autocomplete {
        ::placeholder {
            opacity: 1;
            letter-spacing: .05rem;
        }
    }

    .v-field__prepend-inner > .v-icon {
        opacity: 1;
    }
}

@media screen and (max-width: 600px) {
    .Autocomplete {
        width: 100%;
    }
}
</style>