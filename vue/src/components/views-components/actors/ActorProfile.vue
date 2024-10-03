<template>
    <!-- Edit right to setup -->
    <v-btn @click="editActor(actorsStore.selectedActor?.id as string)" color="main-red">{{ $t("actors.form.editTitle")}}</v-btn>
    <!-- Edit right to setup -->
    <template v-if="actor">
        <div class="ActorPage">
            <div class="ActorPage__leftBlock">
                <PageBanner :text="actor.name" :subtitle="actor.acronym" class="mt-10" />
                <div class="ActorPage__shareBar mt-3">
                    <ShareButton />
                    <LikeButton />
                </div>
                <div class="ActorPage__contact mt-4">
                    <BasicCard icon="mdi-open-in-new">
                        <a :href="actor.website" target="_blank" class="ml-2">{{ $t('content.website') }}</a>
                    </BasicCard>
                    <BasicCard icon="mdi-email-plus-outline">
                        <a :href="`mailto:${actor.email}`" class="ml-2">{{ $t('content.mail') }}</a>
                    </BasicCard>
                    <BasicCard icon="mdi-phone">
                        <span class="ml-2">{{actor.phone }}</span>
                    </BasicCard>
                </div>
            </div>
            <div class="ActorPage__rightBlock">Coucou</div>
        </div>
    </template>
    
</template>
<script setup lang="ts">
import type { Actor }  from '@/models/interfaces/Actor';
import { useActorsStore } from '@/stores/actorsStore';
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import PageBanner from '@/components/generic-components/banners/PageBanner.vue';
import LikeButton from '@/components/generic-components/global/LikeButton.vue';
import ShareButton from '@/components/generic-components/global/ShareButton.vue';
import BasicCard from '@/components/generic-components/global/BasicCard.vue';

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
    &__shareBar {
        display: flex;
        margin-left: 50px;
    }
    &__contact {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
    }
}
</style>