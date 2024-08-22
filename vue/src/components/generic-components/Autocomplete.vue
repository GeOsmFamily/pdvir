<template>
    <div class="Autocomplete__Container pa-3 bg-main-yellow">
        <v-autocomplete
            :items="items"
            variant="outlined"
            bg-color="white"
            density="compact"
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
<style>
.Autocomplete__Container{
    display: flex;
    align-items: center;
    width: 60%;
}
@media screen and (max-width: 600px) {
    .Autocomplete__Container{
        width: 100%;
    }
}
</style>