<script setup lang="ts">
import CardContainer from './CardContainer.vue'

defineProps<{
  label: string
  description: string
  icon?: string
}>()
</script>

<template>
  <CardContainer>
    <div class="border-effect-container" >
      <div class="content-wrapper">
        <div class="icon-container">
          <div :v-if="icon" class="icon-wrapper">
            <v-icon class="icon" :icon="icon"></v-icon>
          </div>
          <p class="title">
            {{label}}
          </p>
        </div>
        
        <div class="description">
          {{ description }}
        </div>
      </div>
    </div>
  </CardContainer>
</template>

<style lang="scss" scoped>
.icon-container{
  display: flex;
  align-items: center;
}
.border-effect-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem 1rem;
  gap: 1rem;
  border-radius: 0.75rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
}

.content-wrapper {
  position: relative;
}

.link {
  &:focus {
    outline: none;
  }
}

.link-overlay {
  position: absolute;
  inset: 0;
}

.icon-wrapper {
  width: fit-content;
  margin-bottom: 0.5rem;
  pointer-events: none;
}

.icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  color: #111827;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  font-size: 0.9375rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

:root.dark {
  .border-effect-container {
    background-color: rgba(17, 24, 39, 0.5);
  }

  .icon {
    color: white;
  }

  .title {
    color: white;
  }

  .description {
    color: #9ca3af;
  }
}
</style>