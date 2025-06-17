<template>
  <div class="Service_Container">
    <div class="Service_Container__Item" v-for="(item, index) in ServiceDatas" :key="index">
      <PageTitle :title="item.title" />
      <v-btn
        color="main-blue"
        class="px-2"
        append-icon="mdi-arrow-right"
        @click="openService(item.to)"
        >{{ $t('services.discover') }}</v-btn
      >
      <ServiceDescription :contents="item.contents" class="my-5" />
    </div>
    <!-- <div class="Service_Container__Item">
      <PageTitle :title="$t('services.risque')" />
    </div> -->
  </div>
  <!-- <v-expansion-panels class="mt-5" multiple v-model="panel">
    <v-expansion-panel v-for="(item, index) in ServiceDatas" :key="index" class="mb-5">
      <v-expansion-panel-title>
        <ServiceTitle :title="item.title" :link="item.to" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <ServiceDescription :contents="item.contents" class="my-5" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels> -->
</template>

<script setup lang="ts">
import PageTitle from '@/components/text-elements/PageTitle.vue'
import ServiceDescription from '@/views/services/components/ServiceDescription.vue'
import { ServiceDatas } from '@/models/interfaces/Service'
import { ref, onMounted } from 'vue'

const panel = ref<number[]>([])

function openService(link: string) {
  window.open(link, '_blank')
}

function openByDefault() {
  ServiceDatas.forEach((e, i) => {
    if (e.isExpanded) {
      panel.value = [i]
    }
  })
}

onMounted(() => {
  openByDefault()
})
</script>

<style lang="scss">
.Service_Container {
  display: flex;

  &__Item {
    width: 50%;
    margin: 5px 20px;
  }
}
</style>
