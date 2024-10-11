<template>
    <PageBanner :text="content.name" :subtitle="content.acronym" class="mt-10" />
    <div class="ContentPage__shareBar mt-3">
        <v-btn 
            prepend-icon="mdi-pencil"
            color="main-red"
            v-if="isEditable && editFunction"
            @click="editFunction(content)"
        >
            {{ $t("content.edit") }}
        </v-btn>
        <ShareButton class="ml-2"/>
        <LikeButton />
    </div>
    <div class="ContentPage__contact mt-4">
        <BasicCard icon="mdi-open-in-new">
            <a :href="content.website" target="_blank" class="ml-2">{{ $t('content.website') }}</a>
        </BasicCard>
        <BasicCard icon="mdi-email-plus-outline">
            <a :href="`mailto:${content.email}`" class="ml-2">{{ $t('content.mail') }}</a>
        </BasicCard>
        <BasicCard icon="mdi-phone">
            <span class="ml-2">{{content.phone }}</span>
        </BasicCard>
    </div>
</template>

<script setup lang="ts">
import PageBanner from '@/components/generic-components/banners/PageBanner.vue';
import LikeButton from '@/components/generic-components/global/LikeButton.vue';
import ShareButton from '@/components/generic-components/global/ShareButton.vue';
import BasicCard from '@/components/generic-components/global/BasicCard.vue';
import type { Actor } from '@/models/interfaces/Actor';

defineProps<{
    content: Actor,
    isEditable: boolean,
    editFunction?: (content: Actor) => void,
}>()
</script>

<style scoped lang="scss">
.ContentPage {
    &__shareBar {
        display: flex;
        align-items: center;
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