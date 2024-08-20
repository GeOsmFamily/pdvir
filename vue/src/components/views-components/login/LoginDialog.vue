<template>
    <v-dialog
      v-model="userStore.showLogingDialog"
      width="auto"
      class="font-ojuju"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="WIP - Patience you must have"
        title="Update in progress"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="userStore.showLogingDialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>