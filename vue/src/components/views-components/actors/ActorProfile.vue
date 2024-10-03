<template>
    <template v-if="actor">
        <div class="ActorPage">
            <div class="ActorPage__leftBlock">
                <ContentBanner :content="actor" :isEditable="isEditable" :editFunction="editActor"/>
                <SectionTitle :text="$t('actorPage.description')" class="mt-12"/>
                <ContentDivider class="mt-4"/>
                <p class="mt-6 mr-8">{{actor.description}}</p>
                <SectionBanner :text="$t('actorPage.projects')" class="mt-12"/>
                {{ actor.projects }}
                <SectionBanner :text="$t('actorPage.data')" class="mt-12"/>
                <SectionBanner :text="$t('actorPage.resources')" class="mt-12"/>
                <SectionBanner :text="$t('actorPage.services')" class="mt-12"/>
                <SectionBanner :text="$t('actorPage.images')" class="mt-12"/>
            </div>
            <div class="ActorPage__rightBlock">
                <img :src="actor.logo" alt="" v-if="!appStore.mobile" class="mt-4">
                <div class="mt-6">
                    <ThematicChip v-for="thematic in actor.thematics" :text="thematic" class="mt-1"/>
                </div>
                <SectionTitle :text="$t('actorPage.adminScope')" class="mt-12"/>
                <ContentDivider class="mt-4"/>
                {{ actor.administrativeScopes }}
                <div class="ActorPage__contentCard">
                    <v-icon icon="mdi-map-marker-outline" color="main-black" />
                    <div class="ml-1">
                        <p class="font-weight-bold">{{ actor.officeName }}</p>
                        <p>{{ actor.officeAdress}}</p>
                    </div>
                </div>
                <div class="ActorPage__contentCard flex-column mt-8">
                    <SectionTitle :text="$t('actorPage.contact')"/>
                    <span class="font-weight-bold mt-3">{{ actor.contactName }}</span>
                    <span>{{ actor.contactPosition }}</span>
                </div>
            </div>
        </div>
    </template>
    
</template>
<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ContentBanner from '@/components/generic-components/content/ContentBanner.vue';
import SectionTitle from '@/components/generic-components/text-elements/SectionTitle.vue';
import ContentDivider from '@/components/generic-components/content/ContentDivider.vue';
import SectionBanner from '@/components/generic-components/banners/SectionBanner.vue';
import ThematicChip from '@/components/generic-components/content/ThematicChip.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { useUserStore } from '@/stores/userStore';

const appStore = useApplicationStore();
const userStore = useUserStore();
const actorsStore = useActorsStore();
const actor = computed(() => actorsStore.selectedActor)
// Handle page openened directly by url
onMounted(() => {
    const route = useRoute();
    watchEffect(() => {
        if (actorsStore.dataLoaded) {
            if (actorsStore.selectedActor === null) {
                const actor: Actor | undefined = actorsStore.actors.find(actor => actor.name === route.params.name);
                console.log(actor)
                actorsStore.setSelectedActor(actor?.id as string);
            }
        }
    });
})

const isEditable = computed(() => {
    return userStore.userIsAdmin() || actor.value?.createdBy.id === userStore.currentUser?.id
})

function editActor(id: string) {
    actorsStore.activateActorEdition(id)
}
</script>
<style lang="scss">
.ActorPage {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
}
.ActorPage__leftBlock {
    display: flex;
    flex-direction: column;
    width: 70%;
    flex-wrap: wrap;
    padding-right: 1em;
}
.ActorPage__rightBlock {
    display: flex;
    flex-direction: column;
    width: 30%;
    flex-wrap: wrap;
}
.ActorPage {
    &__contentCard {
        display: flex;
        padding: 1.5em;
        width: 100%;
        background-color: rgb(var(--v-theme-light-yellow));
    }
}
</style>