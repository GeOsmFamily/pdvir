<template>
    <PageBanner :title="title" :subtitle="subtitle" :isEditable="isEditable" :updatedAt="updatedAt">
        <template #actions>
            <div class="SheetContentBanner__shareBar mt-1">
                <v-btn 
                    class="PageBanner__editBtn fixed-btn"
                    prepend-icon="mdi-pencil-outline"
                    color="main-red"
                    variant="flat"
                    v-if="isEditable"
                    @click="$emit('edit')"
                >
                    {{ $t("content.edit") }}
                </v-btn>
                <v-icon v-if="isMapButtonShown" icon="mdi-map-outline" class="hide-sm" color="main-blue"></v-icon>
                <ShareButton />
                <LikeButton />
                <v-btn class="text-main-blue hide-sm" variant="flat" ><img src="@/assets/images/icons/add_location_alt.svg" class="mr-1">{{ $t("content.createAMap") }}</v-btn>
                <UpdatedAtLabel :date="updatedAt" class="show-sm" />
            </div>
        </template>
    </PageBanner>
    <div class="SheetContentBanner__contact my-4">
        <BasicCard icon="mdi-open-in-new">
            <a :href="website" target="_blank" class="ml-2">{{ $t('content.website') }}</a>
        </BasicCard>
        <BasicCard icon="mdi-email-plus-outline">
            <a :href="`mailto:${email}`" class="ml-2">{{ $t('content.mail') }}</a>
        </BasicCard>
        <BasicCard icon="mdi-phone">
            <span class="ml-2">{{ phone }}</span>
        </BasicCard>
    </div>
</template>

<script setup lang="ts">
import PageBanner from '@/components/banners/PageBanner.vue';
import BasicCard from '@/components/global/BasicCard.vue';
import UpdatedAtLabel from '@/views/_layout/sheet/UpdatedAtLabel.vue';
import ShareButton from '@/components/global/ShareButton.vue';
import LikeButton from '@/components/global/LikeButton.vue';

defineProps<{
    title: string,
    subtitle: string,
    email: string,
    phone: string,
    website: string,
    updatedAt: string | Date,
    isEditable?: boolean,
    isMapButtonShown?: boolean
}>()
</script>

<style scoped lang="scss">
.SheetContentBanner {
    &__contact {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    &__shareBar {
        display: flex;
        align-items: center;
        gap: .75rem;
    }
}
</style>