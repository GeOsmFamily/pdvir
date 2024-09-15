<template>
  <Dialog v-bind="$attrs">
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
    <template #bottom-content>
      <slot name="bottom-content">
        <span>{{ $t('auth.becomeMember.question') }}</span>
        <router-link
          append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_SIGN_IN } }">
          {{ $t('auth.signIn.title') }}
        </router-link>
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/generic-components/Dialog.vue';
import { DialogKey } from '@/models/enums/DialogKey';
</script>