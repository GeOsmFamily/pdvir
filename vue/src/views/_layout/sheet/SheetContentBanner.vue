<template>
  <div class="SheetContentBanner">
    <PageBanner :title="title" :subtitle="subtitle" :isEditable="isEditable" :updatedAt="updatedAt">
      <template #actions>
        <div class="SheetContentBanner__actionsBar mt-1">
          <div class="SheetContentBanner__shareBar">
            <slot name="custom-actions"></slot>

            <v-tooltip location="bottom" v-if="mapRoute">
              <template v-slot:activator="{ props }">
                <v-btn
                  :to="mapRoute"
                  variant="text"
                  v-bind="props"
                  density="comfortable"
                  icon="mdi-map-outline"
                  class="hide-sm"
                  color="main-blue"
                />
              </template>
              <span v-if="mapBtnTooltip">{{ mapBtnTooltip }}</span>
            </v-tooltip>
            <ShareButton :additionnal-path="''" />
            <HighlightButton :item-id="id" />
            <LikeButton :id="id" />
            <slot name="mapButton"></slot>
            <UpdatedAtLabel :date="updatedAt" class="show-sm" />
          </div>
          <div class="SheetContentBanner__editBar">
            <v-btn
              class="PageBanner__editBtn fixed-btn"
              prepend-icon="mdi-pencil-outline"
              color="main-red"
              variant="flat"
              v-if="isEditable"
              @click="$emit('edit')"
            >
              {{ $t('content.edit') }}
            </v-btn>
          </div>
        </div>
      </template>
    </PageBanner>
    <SheetContactActions :website="website" :email="email" :phone="phone" />
  </div>
</template>

<script setup lang="ts">
import PageBanner from '@/components/banners/PageBanner.vue'
import UpdatedAtLabel from '@/views/_layout/sheet/UpdatedAtLabel.vue'
import ShareButton from '@/components/global/ShareButton.vue'
import LikeButton from '@/components/global/LikeButton.vue'
import SheetContactActions from './SheetContactActions.vue'
import HighlightButton from '@/components/global/HighlightButton.vue'
import type { RouteLocationAsRelative } from 'vue-router'

defineProps<{
  id: string
  slug: string
  title: string
  subtitle: string | null
  email: string
  phone: string
  website: string
  updatedAt: string | Date
  isEditable?: boolean
  mapRoute: RouteLocationAsRelative | null
  mapBtnTooltip?: string
}>()
</script>

<style lang="scss">
.SheetContentBanner {
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;
  height: fit-content;

  .SheetContentBanner__actionsBar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .SheetContentBanner__shareBar {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    .SheetContentBanner__editBar {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }
  }

  > * {
    height: fit-content;
  }
}
</style>
