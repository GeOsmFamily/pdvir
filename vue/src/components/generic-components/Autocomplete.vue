<template>
    <div class="Autocomplete bg-main-yellow">
        <v-autocomplete
            :items="items"
            variant="solo"
            bg-color="white"
            elevation="2"
            density="comfortable"
            :hide-details="true"
            menu-icon=""
            prepend-inner-icon="mdi-magnify"
            :placeholder="placeholder"
            :item-title="itemTitle"
            :item-value="itemValue"
        ></v-autocomplete>
    </div>
</template>
<script setup lang="ts">
defineProps({
    placeholder: String,
    items: Array,
    itemTitle: String, //String that will be displayed in the list
    itemValue: String //Value selected
})
</script>
<style lang="scss">
.Autocomplete {
    display: flex;
    align-items: center;
    width: 60%;
    border-radius: .5rem;
    padding: 1rem 1.5rem;

    .v-autocomplete {
        ::placeholder {
            opacity: 1;
            letter-spacing: .05rem;
        }
    }
}

@media screen and (max-width: 600px) {
    .Autocomplete {
        width: 100%;
    }
}
</style>