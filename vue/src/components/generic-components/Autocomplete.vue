<template>
    <div class="Autocomplete__container pa-3 bg-main-yellow">
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
.Autocomplete__container{
    display: flex;
    align-items: center;
    width: 60%;
}
@media screen and (max-width: 600px) {
    .Autocomplete__container{
        width: 100%;
    }
}
</style>