<template>
    <PageBanner :text="content.name" :subtitle="content.acronym" class="mt-10" />
    <div class="ActorPage__shareBar mt-3">
        <ShareButton />
        <LikeButton />
    </div>
    <div class="ActorPage__contact mt-4">
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
    content: Actor
}>()
</script>