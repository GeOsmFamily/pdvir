<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <v-card
                v-bind="props"
                variant="outlined"
                class="Card"
                :to="to"
            >
                <span class="Card__subTitle" v-if="subTitle" >{{ subTitle }}</span>
                <span class="Card__title">{{ title }}</span>
                <div class="Card__content">
                    <slot name="content">
                    </slot>
                </div>
                <div class="Card__footer mt-6">
                    <div class="Card__footerBlock Card__footerBlock--left">
                        <slot name="footer-left">
                            <LikeButton />
                        </slot>
                    </div>
                    <div class="Card__footerBlock Card__footerBlock--right">
                        <slot name="footer-right"></slot>
                    </div>
                </div>
            </v-card>
        </template>
    </v-hover>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    subTitle: string,
    to: string
}>()
</script>

<style lang="scss">
.Card {
    width: 100%;
    height: 330px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 0px rgb(var(--v-theme-main-blue));
    border: 0.5px solid rgb(var(--v-theme-main-blue));

    &:hover {
        box-shadow: 0px 4px 0px rgb(var(--v-theme-main-blue));
        border: 2px solid rgb(var(--v-theme-main-blue));
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

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>