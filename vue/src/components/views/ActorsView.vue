<template>
    <div class="Actors__header">
        <img src="@/assets/images/Mosaic_actors_page.svg" alt="">
        <div class="Actors__header__description">
            <PageTitle :text="$t('actors.title')"/>
            <PageTitle :text="$t('actors.subtitle')"/>
            <span class="mt-6">{{ $t('actors.desc') }}</span>
            <Autocomplete 
                :placeholder="$t('actors.search')"
                :items="actorsStore.actors"
                :customFilter="searchActors"
                item-title="name"
                item-value="id"
                class="mt-6"
                @updateSelect="updateSelectedActor"
            />
        </div>
    </div>
    <div class="Actors__filters">
        <SectionTitle :text="$t('actors.filtersTitle')" />
        <Wip />
        <div class="mt-3" v-if="userStore.userIsAdmin || userStore.userHasRole(UserRoles.EDITOR_ACTORS)">
            <v-btn color="main-red" prepend-icon="mdi-plus" @click="addActor()">{{ $t('actors.add') }}</v-btn>
        </div>
    </div>
    <div class="Actors__content mt-4">
        <v-container class="pa-0">
            <v-row>
                <v-col v-for="actor in paginatedActors" cols="12" md="4">
                    <ActorCard :actor="actor"/>
                </v-col>
            </v-row>
            <v-pagination
                v-model="page"
                :length="totalPages"
                :total-visible="5"
                class="mt-4"
            ></v-pagination>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import { useActorsStore } from '@/stores/actorsStore';
import Autocomplete from '@/components/generic-components/global/Autocomplete.vue';
import PageTitle from '@/components/generic-components/text-elements/PageTitle.vue';
import SectionTitle from '@/components/generic-components/text-elements/SectionTitle.vue';
import Wip from '@/components/generic-components/global/Wip.vue';
import ActorCard from '@/components/views-components/actors/ActorCard.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { useUserStore } from '@/stores/userStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserRoles } from '@/models/enums/auth/UserRoles';

const router = useRouter();
const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const userStore = useUserStore();

// const validatedActors = computed(() => actorsStore.actors.filter(x => x.isValidated));

const page = ref(1);
const itemsPerPage = appStore.mobile ? 5 : 15
const paginatedActors = computed(() => {
      const start = (page.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return actorsStore.actors.slice(start, end);
    })
const totalPages = computed(() => Math.ceil(actorsStore.actors.length / itemsPerPage));

function addActor() {
    actorsStore.activateActorEdition(null);
}

function searchActors(value: string, queryText: string, itemText: any) {
    const searchText = queryText.toLowerCase();    
    return (
        itemText.raw.name.toLowerCase().indexOf(searchText) > -1 ||
        itemText.raw.acronym.toLowerCase().indexOf(searchText) > -1 ||
        itemText.raw.categories.some((cat: string) => cat.toLowerCase().includes(searchText)) ||
        itemText.raw.expertises.some((exp: string) => exp.toLowerCase().includes(searchText))
    )
}
function updateSelectedActor(id: string) {
    actorsStore.setSelectedActor(id);
}
</script>