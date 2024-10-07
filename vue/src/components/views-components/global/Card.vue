<template>
    <v-card
        variant="outlined"
        class="Card"
        :to="to"
    >
        <div class="Card__content">
            <span class="Card__subTitle" v-if="subTitle" >{{ subTitle }}</span>
            <span class="Card__title">{{ title }}</span>
            <slot name="content"></slot>
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
    background: white;
    padding: 25px;
    display: flex;
    flex-direction: column;
    box-shadow:  0px 0px 0px 1px rgb(var(--v-theme-main-blue)), 0px 2px 0px 1px rgb(var(--v-theme-main-blue));
    transition: all .1s ease-in;
    border: none;

    &:hover, &[active="true"] {
        box-shadow: 0px 0px 0px 2px rgb(var(--v-theme-main-blue)), 0px 4px 0px 2px rgb(var(--v-theme-main-blue));

        .Card__actionIcon {
            background-color: rgb(var(--v-theme-main-blue));
            color: white !important;
        }
    }

    .Card__content {
        display: flex;
        flex-flow: column nowrap;

        .Card__subTitle {
            font-size: 14px;
            font-weight: 700;
            color: rgb(var(--v-theme-light-blue));
        }

        .Card__title {
            font-size: 18px;
            font-weight: 700;
            color: rgb(var(--v-theme-main-blue));
        }
    }

    .Card__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    

    .Card__actionIcon {
        background-color: transparent;
        padding: 1rem;
        border-radius: 50%;
        transition: all .1s ease-in;
    }
}
</style>