<template>
  <div class="KPI">
    <div class="KPI__block KPI__block--data">
      <div class="KPI__icon">
        <v-icon
          :icon="'mdi mdi-' + icon"
          size="x-large"
          color="main-green" />
      </div>
      <div class="KPI__infoCtn">
        <div class="KPI__count">{{ count }}</div>
        <div class="KPI__label">{{ label }}</div>
      </div>
    </div>
    <div class="KPI__block KPI__block--description" v-if="description">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  count: number;
  label: string;
  description?: string;
}>();
</script>

<style lang="scss">
.KPI {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  align-items: flex-start;

  .KPI__block {
    &--data {
      display: flex;
      width: 100%;
      flex-flow: row nowrap;
      gap: 1.5rem;

      .KPI__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        $dim-icon: 3.5rem;
        background-color: rgb(var(--v-theme-light-yellow));
        width: $dim-icon;
        height: $dim-icon;
        border-radius: 50%;
      }
    
      .KPI__infoCtn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .25rem;
    
        .KPI__count {
          font-family: $font-primary;
          font-size: 2.75rem;
          line-height: 2rem;
          font-weight: 700;
          color: rgb(var(--v-theme-main-blue));
        }
      
        .KPI__label {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>