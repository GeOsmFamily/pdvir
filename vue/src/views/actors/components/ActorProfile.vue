<template>
    <template v-if="actor">
        <div class="ActorPage">
            <div class="ActorPage__leftBlock">
                <img :src="actor.logo.contentUrl" alt="" v-if="appStore.mobile && actor.logo" class="mt-4 mb-4 ActorPage__logo">
                <SheetContentBanner
                    :title="actor.name"
                    :subtitle="actor.acronym"
                    :phone="actor.phone"
                    :email="actor.email"
                    :website="actor.website"
                    :isEditable="isEditable"
                    :updatedAt="actor.lastUpdate"
                    @edit="editActor"/>
                <SectionTitle :title="$t('actorPage.description')" class="mt-12"/>
                <ContentDivider class="mt-4"/>
                <p class="mt-6 mr-8">{{ actor.description }}</p>
                <ActorRelatedContent :actor="actor" v-if="!appStore.mobile"/>
            </div>
            <div class="ActorPage__rightBlock">
                <img :src="actor.logo.contentUrl" alt="" v-if="!appStore.mobile && actor.logo" class="ActorPage__logo">
                <div class="mt-6">
                    <ChipList :items="actor.thematics" />
                </div>
                <SectionTitle :title="$t('actorPage.adminScope')" class="mt-12"/>
                <ContentDivider class="mt-4"/>
                {{ actor.administrativeScopes.map(x => x.name).join(", ") }}
                <div class="ActorPage__contentCard">
                    <v-icon icon="mdi-map-marker-outline" color="main-black" />
                    <div class="ml-1">
                        <p class="font-weight-bold">{{ actor.officeName }}</p>
                        <p>{{ actor.officeAddress}}</p>
                    </div>
                </div>
                <div class="ActorPage__contentCard flex-column mt-8">
                    <SectionTitle :title="$t('actorPage.contact')"/>
                    <span class="font-weight-bold mt-3">{{ actor.contactName }}</span>
                    <span>{{ actor.contactPosition }}</span>
                </div>
                <ActorRelatedContent :actor="actor" v-if="appStore.mobile"/>
            </div>
        </div>
    </template>
    
</template>
<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import SheetContentBanner from '@/views/_layout/sheet/SheetContentBanner.vue';
import SectionTitle from '@/components/text-elements/SectionTitle.vue';
import ContentDivider from '@/components/content/ContentDivider.vue';
import ActorRelatedContent from './ActorRelatedContent.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { useUserStore } from '@/stores/userStore';
import ChipList from '@/components/content/ChipList.vue';

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
                actorsStore.setSelectedActor(actor?.id as string);
            }
        }
    });
})

const isEditable = computed(() => {
    return userStore.userIsAdmin() || actor.value?.createdBy.id === userStore.currentUser?.id
})

function editActor() {
    actorsStore.setActorEditionMode(actor.value)
}
</script>
<style lang="scss">
@import '@/assets/styles/views/SheetView';

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
@media (max-width: 600px) {
    .ActorPage__leftBlock {
        width: 100%;
    }
}
.ActorPage__rightBlock {
    display: flex;
    flex-direction: column;
    width: 30%;
    flex-wrap: wrap;
}
@media (max-width: 600px) {
    .ActorPage__rightBlock {
        width: 100%;
    }
}
.ActorPage {
    &__logo {
        max-width: 100%;
    }
    &__contentCard {
        display: flex;
        padding: 1.5em;
        width: 100%;
        background-color: rgb(var(--v-theme-light-yellow));
    }
}
</style>