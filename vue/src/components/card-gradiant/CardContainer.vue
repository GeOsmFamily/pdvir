<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cover = ref<HTMLElement | null>(null),
  x = ref(-350),
  y = ref(-350)

function mouseMoveGradient(e: MouseEvent) {
  if (cover.value) {
    const rect = cover.value.getBoundingClientRect()
    const diffX = e.clientX - rect.x
    const diffY = e.clientY - rect.y
    x.value = diffX
    y.value = diffY
  }
}

onMounted(() => {
  document.addEventListener('mousemove', mouseMoveGradient, false)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', mouseMoveGradient, false)
})
</script>
<template>
  <div
    ref="cover"
    class="cover"
    :style="{ '--x': x + 'px', '--y': y + 'px' }"
  >
    <div class="cover-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$gray-200: #e5e7eb;
$gray-700: #374151;
$gray-800: #1f2937;
$gray-900: #111827;

// Mixins
@mixin dark {
  @at-root .dark & {
    @content;
  }
}

.cover {
  position: relative;
  isolation: isolate;
  border-radius: 0.75rem; // rounded-xl
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
  border: 1px solid $gray-200;
  
  @include dark {
    border-color: $gray-800;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: -2px;
    height: calc(100% + 4px);
    width: calc(100% + 4px);
    z-index: -1;
    border-radius: 13px;
    background: radial-gradient(250px circle at var(--x) var(--y), rgb(var(--v-theme-main-blue)) 0, transparent 100%);
    
    @media (min-width: 1024px) { // lg breakpoint
      display: block;
    }
  }
  
  .cover-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0.75rem;
    background-color: white;
    transition: background-color 0.2s;
    border-top: 1px solid $gray-200;
    
    &:not(:first-child) {
      border-top: 1px solid $gray-200;
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
    
    @include dark {
      background: linear-gradient(to bottom, rgba($gray-700, 0.5), rgba($gray-900, 0.5));
      border-color: $gray-800;
      
      &:not(:first-child) {
        border-color: $gray-800;
      }
      
      &:hover {
        background-color: rgba($gray-900, 0.9);
      }
    }
  }
}
</style>