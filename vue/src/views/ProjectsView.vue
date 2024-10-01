<template>
    <div class="ProjectsView">
        <div class="ProjectsView__listCtn">
            <div class="ProjectsView__listHeader">
                <h3 class="ProjectsView__projectCount">{{ $t('projects.title') }}</h3>
                <v-autocomplete
                    label="Autocomplete"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                ></v-autocomplete>
                <v-select
                    :label="$t('filters.sortBy')"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                ></v-select>
            </div>
        </div>
        <div class="ProjectsView__mapCtn"></div>
    </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
    .v-breadcrumbs {
        display: none;
    }
</style>