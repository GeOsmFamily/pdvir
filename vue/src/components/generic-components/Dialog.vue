<template>
  <v-dialog v-model="showDialog" @click:outside="closeDialog" width="auto">
    <div class="Dialog">
      <div class="Dialog__header">
        <h2 class="Dialog__title"><slot name="title"></slot></h2>
        <div class="Dialog__subtitle"><slot name="subtitle"></slot></div>
      </div>
      <div class="Dialog__content">
        <slot name="content"></slot>
      </div>
      <div class="Dialog__bottomContent">
        <slot name="bottom-content"></slot>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/stores/applicationStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const applicationStore = useApplicationStore();
const showDialog = computed(() => applicationStore.activeDialog != null);
const closeDialog = () => router.replace({ query: { dialog: undefined }});
</script>

<style lang="scss">
.Dialog {
  background: #fff url(@/assets/images/Frise.svg)  no-repeat top center;
  padding: 5.5rem 2.5rem 3rem 2.5rem;
  width: $dim-dialog-w;
  height: 42rem;
  max-height: calc(100vh - 2rem);
  overflow-y: scroll;
  display: flex;
  flex-flow: column nowrap; 
  align-items: center;
  border-radius: $dim-radius;
  box-shadow: $mixin-shadow;
  white-space: pre-line;

  .Dialog__header {
    display: flex;
    flex-flow: column nowrap; 
    align-items: center;
    gap: .125rem;
    margin-bottom: 1.5rem;
    
    .Dialog__title {
      color: rgb(var(--v-theme-main-red));
    }
  
    .Dialog__subtitle {
      text-align: center
    }
  }

  .Dialog__content {
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-flow: column nowrap; 
    align-items: center;
    justify-content: center;

    button {
      min-width: 0;
      min-height: 2.75rem;
    }

    .Link--withoutUnderline {
      width: fit-content;
    }
  }

  .Dialog__bottomContent {
    display: flex;
    flex-flow: row wrap;
    gap: .5rem;
  }
}
</style>