<template>
    <div class="FooterCtn">
        <div class="FooterBlock FooterBlock--left">
            <div class="FooterBlock__contact">
                <span>{{ $t('footer.contact') }}</span>
                <div>
                    <img src="@/assets/images/footer/facebook.svg" alt="facebook" class="FooterBlock__contactImg ml-8">
                    <img src="@/assets/images/footer/linkedin.svg" alt="linkedin" class="FooterBlock__contactImg">
                    <img src="@/assets/images/footer/twitter.svg" alt="twitter" class="FooterBlock__contactImg">
                    <img src="@/assets/images/footer/instagram.svg" alt="instagram" class="FooterBlock__contactImg">
                </div>
            </div>
            <div class="FooterBlock__adressCtn">
                <v-icon icon="mdi-map-marker"></v-icon>
                <div class="FooterBlock__adress ml-2">
                    <span>Bureau d'Expertise France au Cameroun</span>
                    <span>Quartier Golf Bastos</span>
                    <span>Rue 6.083 Bld Jean Paul II</span>
                    <span>Yaoundé</span>
                </div>
            </div>
            <div class="FooterBlock__adressCtn">
                <v-icon icon="mdi-phone"></v-icon>
                <div class="FooterBlock__adress ml-2">
                    <span>00237 6 52 26 66 18</span>
                </div>
            </div>
            <v-btn color="main-blue" prepend-icon="mdi-email-outline">{{ $t('footer.email') }}</v-btn>
        </div>
        <div class="FooterBlock FooterBlock--right">
            <div class="FooterBlock__partner">
                <span>{{ $t('footer.partners') }}</span>
            </div>
            <div class="FooterBlock__partnersLogos">
                <a href="https://www.expertisefrance.fr/fiche-projet?id=882931" target="_blank"><img src="@/assets/images/footer/logo_ef.png" alt="expertise-france"></a>
                <a href="https://www.eeas.europa.eu/delegations/cameroun_fr?s=88" target="_blank"><img src="@/assets/images/footer/logo_ue.png" alt="union-europeenne" class="ml-4"></a>
            </div>
            <div class="FooterBlock__secondaryPartnersLogos">
                <a href="www.minhdhu.gov.cm" target="_blank"><img src="@/assets/images/footer/minhdu.png" alt="minhdu"></a>
                <a href="www.minddevel.gov.cm" target="_blank"><img src="@/assets/images/footer/mindevel.png" alt="minddevel" class="ml-2"></a>
                <a href="https://cvuc-uccc.com" target="_blank"><img src="@/assets/images/footer/cvuc.png" alt="cvuc" class="ml-2"></a>
                <a href="" target="_blank"><img src="@/assets/images/footer/asso_cameroun.png" alt="asso_cameroun" class="ml-2"></a>
                <a href="https://minepat.gov.cm/fr/accueil" target="_blank"><img src="@/assets/images/footer/minepat.png" alt="minepat" class="ml-2"></a>
                <a href="https://yaounde.cm" target="_blank"><img src="@/assets/images/footer/yaounde.png" alt="yaounde" class="ml-2"></a>
                <a href="https://tresorpublic.cm/fr/ministries/mindcaf" target="_blank"><img src="@/assets/images/footer/mindcaf.png" alt="mindcaf​" class="ml-2"></a>
                <a href="https://www.facebook.com/groups/2611030598941314" target="_blank"><img src="@/assets/images/footer/maroua.png" alt="maroua" class="ml-2"></a>
            </div>
        </div>
    </div>
    <div class="d-flex justify-center">
            {{ $t('footer.legal') }} | {{ $t('footer.plan') }} | {{ $t('footer.cookies') }}
        </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.FooterCtn {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-image: url('@/assets/images/Frise.svg');
    background-repeat: repeat-x;
    justify-content: space-between;
    padding: 3rem $desktop-side-padding;

    @media (max-width: $bp-sm){
        flex-direction: column-reverse;
        padding: 3rem $mobile-side-padding;
    }
}

.FooterBlock {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &--left {
        width: 40%;
        padding-right: 7%;

        @media (max-width: $bp-sm){
            width: 100%;
            padding-right: 0px;
        }
    }

    &--right {
        width: 60%;

        @media (max-width: $bp-sm){
            width: 100%;
        }
    }

    &__contact {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        color: rgb(var(--v-theme-main-blue));
        font-weight: 700;

        @media (max-width: $bp-sm){
            margin-top: 1rem;
            flex-direction: column;
            font-size: $font-size-h3;
            gap: 1rem;
        }
    }
    &__contactImg {
        width: 2rem;
        height: 2rem;
        margin: 0 .5rem;
        cursor: pointer;
    }
    &__adressCtn {
        display: flex;
        flex-direction: row;
        padding: 0 1rem;
    }
    &__adress {
        display: flex;
        flex-direction: column;
    }
    &__partner {
        height: 2.5rem;
        display: flex;
        align-items: center;
        color: rgb(var(--v-theme-main-blue));
        font-weight: 700;

        @media (max-width: $bp-sm){
            justify-content: center;
            font-size: $font-size-h3;
        }
    }

    &__partnersLogos{
        display: flex;
        img {
            height: 5rem;
            cursor: pointer;
        }
    }
    &__secondaryPartnersLogos {
        margin-top: auto;
        img {
            height: 3.5rem;
            cursor: pointer;
        }

        @media (max-width: $bp-sm){
            text-align: center;
            img {
                height: auto;
                width: 25%;
            }
        }
    }
}
</style>