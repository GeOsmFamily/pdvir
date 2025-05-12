<template>
  <v-expansion-panels class="mt-5" multiple v-model="panel">
    <v-expansion-panel v-for="(item, index) in ServiceDatas" :key="index" class="mb-5">
      <v-expansion-panel-title>
        <ServiceTitle :title="item.title" :link="item.to" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <ServiceDescription :contents="item.contents" class="my-5" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import ServiceTitle from '@/views/services/components/ServiceTitle.vue'
import ServiceDescription from '@/views/services/components/ServiceDescription.vue'
import { ServiceDatas } from '@/models/interfaces/Service'
import { ref, onMounted } from 'vue'

const panel = ref<number[]>([])

function openByDefault() {
  if (ServiceDatas.length > 0) {
    panel.value = [0]
  } else {
    panel.value = []
  }
}

onMounted(() => {
  openByDefault()
})
</script>
