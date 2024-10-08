<template>
        <v-hover>
            <template v-slot:default="{ isHovering, props }">
                <v-card
                    v-bind="props"
                    variant="outlined"
                    class="InfoCard CardShadow"
                    @click="emit('click')"
                >
                    <span class="InfoCard__subTitle" :class="{ 'text-uppercase': isActorCard }" v-if="subTitle" >{{ subTitle }}</span>
                    <span class="InfoCard__title">{{ title }}</span>
                    <div class="InfoCard__content">
                        <slot name="content">
                        </slot>
                    </div>
                    <div class="InfoCard__footer mt-6">
                        <div class="d-flex">
                            <slot name="footer-left"></slot>
                        </div>
                        <div>
                            <slot name="footer-right" :isHovering="isHovering"></slot>
                        </div>
                    </div>
                </v-card>
            </template>
        </v-hover>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subTitle?: string
  isActorCard?: boolean
}>(), {
    isActorCard: false
})
const emit = defineEmits(['click'])
</script>

<style lang="scss">
.InfoCard {
    width: 100%;
    height: 330px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__subTitle {
        font-size: 14px;
        font-weight: 700;
        color: rgb(var(--v-theme-light-blue));
    }

    &__title {
        font-size: 18px;
        font-weight: 700;
        color: rgb(var(--v-theme-main-blue));
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>