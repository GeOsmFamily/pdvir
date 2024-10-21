<template>
    <InfoCard class="GenericInfoCard">
        <template #content>
            <div class="GenericInfoCard__imgCtn">
                <img class="GenericInfoCard__img" :src="image">
            </div>
            <div class="GenericInfoCard__infoCtn">
                <span class="InfoCard__title">{{ title }}</span>
                <span class="InfoCard__description" >{{ description }}</span>
            </div>
        </template>
        <template #footer-left>
            <v-chip class="mr-2">{{ type }}</v-chip>
            <ShareButton />
            <LikeButton />
        </template>
        <template #footer-right>
            <v-icon class="InfoCard__actionIcon" icon="mdi mdi-open-in-new" color="light-blue"></v-icon>
        </template>
    </InfoCard>
</template>

<script setup lang="ts">
import InfoCard from '@/components/global/InfoCard.vue';
import LikeButton from '@/components/global/LikeButton.vue';
import ShareButton from '@/components/global/ShareButton.vue';
defineProps<{
    title: string,
    description: string,
    image?: string,
    type: string,
}>();
</script>

<style lang="scss">
.GenericInfoCard {
    padding: 1rem 1.25rem !important;
    // max-width: 20rem;
    $dim-img-h: 11rem;
    $dim-text-max-h: 3rem;
    $dim-card-h: 23rem;
    $card-transition: all .15s ease-in;
    height: $dim-card-h;
    max-height: $dim-card-h;
    min-height: $dim-card-h;
    justify-content: space-between;
    
    &:hover {
        .GenericInfoCard__imgCtn {
            height: 0;
            min-height: 0;
        }
        .GenericInfoCard__infoCtn {
            transition: $card-transition;
            padding-top: 0;
            max-height: calc($dim-card-h);
            height: calc($dim-text-max-h + $dim-img-h + 2rem);
            min-height: calc($dim-text-max-h + $dim-img-h + 2rem);
        }
    }
    
    .GenericInfoCard__imgCtn {
        position: absolute;
        transition: $card-transition;
        height: $dim-img-h;
        background: #ddd;
        inset: 0;
        min-height: $dim-img-h;
        width: 100%;
        z-index: 1;

        .GenericInfoCard__img {
            max-width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .InfoCard__footer {
        margin-top: 0.5rem !important;
    }
    .GenericInfoCard__infoCtn {
        transition: $card-transition;
        padding-top: $dim-img-h;
        display: flex;
        flex-flow: column nowrap;
        gap: .5rem;
        background: white;
        .InfoCard__title {
            font-size: $font-size-h5 !important;
        }
        .InfoCard__description {
            max-height: $dim-text-max-h;
            font-size: $font-size-sm;
        }
        
        
        overflow-y: hidden;
        position: relative;
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(to bottom, transparent calc(100% - 2rem), white 100%);
        }
    }
}
</style>