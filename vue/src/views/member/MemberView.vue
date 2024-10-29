<template>
    <div class="UserAccount">
        <SectionBanner :text="$t('account.title')"/>
        <div class="UserBlock UserBlock--left">
            <div class="UserAccount__avatarBlock">
                <img src="@/assets/images/user/default_avatar.png" alt="">
                <div class="d-flex flex-column flex-grow-1 ml-8">
                    <v-text-field :label="$t('auth.becomeMember.form.firstName')" />
                    <v-text-field :label="$t('auth.becomeMember.form.lastName')" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
</script>
<style lang="scss">
.UserAccount {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
}
.UserBlock{
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    &--left {
        width: 70%;
        padding-right: 10%;
        @media (max-width: $bp-sm){
            width: 100%;
        }
    }
    &--right {
        width: 30%;
        background-color: red;
        @media (max-width: $bp-sm){
            width: 100%;
        }
    }
}
.UserAccount{
    &__avatarBlock {
        display: flex;
        flex-direction: row;
        img {
            height: 8rem;
        }
        @media (max-width: $bp-sm){
            flex-direction: column;
        }
    }
}
</style>