<template>
        <v-hover>
            <template v-slot:default="{ isHovering, props }">
                <v-card
                    v-bind="props"
                    variant="outlined"
                    class="Card"
                    @click="emit('click')"
                >
                    <span class="Card__subTitle" :class="{ 'text-uppercase': isActorCard }" v-if="subTitle" >{{ subTitle }}</span>
                    <span class="Card__title">{{ title }}</span>
                    <div class="Card__content">
                        <slot name="content">
                        </slot>
                    </div>
                    <div class="Card__footer mt-6">
                        <div class="Card__footerBlock Card__footerBlock--left">
                            <slot name="footer-left"></slot>
                        </div>
                        <div class="Card__footerBlock Card__footerBlock--right">
                            <slot name="footer-right" :isHovering="isHovering"></slot>
                        </div>
                    </div>
                </v-card>
            </template>
        </v-hover>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  subTitle: string
  isActorCard?: boolean
}>(), {
    isActorCard: false
})
const emit = defineEmits(['click'])
</script>

<style lang="scss">
.Card {
    width: 100%;
    height: 330px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 2px 0px rgb(var(--v-theme-main-blue));
    border: 0.5px solid rgb(var(--v-theme-main-blue));

    &:hover {
        box-shadow: 0px 4px 0px rgb(var(--v-theme-main-blue));
        border: 2px solid rgb(var(--v-theme-main-blue));
        cursor: pointer;
    }

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