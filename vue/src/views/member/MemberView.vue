<template>
    <div class="UserAccount">
        <SectionBanner :text="$t('account.title')"/>
        <v-form @submit.prevent="submitForm">
            <div class="UserBlock UserBlock--left">
                <div class="UserAccount__avatarBlock">
                    <div class="UserAccount__avatarCtn" @click="triggerFileInput">
                        <div class="UserAccount__avatar">
                            <img v-if="selectedProfileImage.length > 0" :src="selectedProfileImage[0].preview">
                            <img v-else src="@/assets/images/user/default_avatar.png" alt="">
                        </div>
                        <v-btn icon="mdi-pencil" class="UserAccount__avatarEdit" @click.stop="triggerFileInput"></v-btn>
                    </div>
                    <div class="UserAccount__avatar--rightInputs">
                        <v-text-field 
                            v-model="form.firstName.value.value"
                            :error-messages="form.firstName.errorMessage.value" 
                            :label="$t('auth.becomeMember.form.firstName')"
                            @submit="form.firstName.handleChange"  
                        />
                        <v-text-field 
                            v-model="form.lastName.value.value"
                            :error-messages="form.lastName.errorMessage.value" :label="$t('auth.becomeMember.form.lastName')"
                            @submit="form.lastName.handleChange" 
                        />
                    </div>
                </div>
                <span class="UserAccount--avatarErrorMessage"> {{avatarErrorMessage}} </span>
                <v-text-field
                    v-model="form.email.value.value"
                    :error-messages="form.email.errorMessage.value"
                    :label="$t('auth.becomeMember.form.email')"
                    @submit="form.email.handleChange" 
                />
                <v-text-field 
                    v-model="form.organisation.value.value"
                    :error-messages="form.organisation.errorMessage.value"
                    :label="$t('auth.becomeMemberThanks.form.organization')"
                    @submit="form.organisation.handleChange" 
                />
                <v-text-field
                    v-model="form.position.value.value"
                    :error-messages="form.position.errorMessage.value"
                    :label="$t('auth.becomeMemberThanks.form.functions')"
                    @submit="form.position.handleChange" 
                />
                <v-text-field
                    v-model="form.phone.value.value"
                    :error-messages="form.phone.errorMessage.value"
                    :label="$t('auth.becomeMemberThanks.form.telephone')"
                    @submit="form.phone.handleChange" 
                />
                <a href="#">{{ $t('account.changePassword')}}</a>
                <div class="UserAccount__rolesBlock">
                    <span>{{ $t("account.roles") }}</span>
                    <div class="UserAccount__rolesItem" v-for="(role, index) in requestedRoles" :key="index">
                        <v-checkbox v-model="role.selected.value" :label="role.label" hide-details="auto" />
                        <Chip bg-color="main-yellow" :text="$t('auth.editForm.waitingValidation')" v-if="role.requested.value" class="ml-2"/>
                    </div>
                </div>
                <a href="#">{{ $t('account.deleteAccount')}}</a>
                <v-btn type="submit" color="main-red" :loading="isSubmitting" class="w-100">{{ $t('account.save') }}</v-btn>
            </div>
        </v-form>
    </div>
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileChange" 
      accept="image/*" 
      style="display: none;"
    />
</template>
<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
import { ContentImageType } from '@/models/enums/app/ContentImageType';
import { UserProfileForm } from '@/services/auth/forms/UserProfileForm';
import { InputImageValidator } from '@/services/files/InputImageValidator';
import { useUserStore } from '@/stores/userStore';
import { reactive, ref } from 'vue';
const userStore = useUserStore();
const requestedRoles = UserProfileForm.getRolesList()
const me = userStore.currentUser
const { form, handleSubmit, isSubmitting } = UserProfileForm.getUserEditionForm(me);
requestedRoles.map(x => {
    if (me && me.roles.includes(x.value)) {
        x.selected.value = true
    }
    if (me && me.requestedRoles && me.requestedRoles.includes(x.value)) {
        x.requested.value = true
    }
})

const selectedProfileImage: Ref<ContentImageFromUserFile[]> = ref([])
const fileInput = ref<HTMLInputElement | null>(null);
const avatarErrorMessage = ref('')
const triggerFileInput = () => {
    fileInput.value?.click();
};
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const fileStatus = InputImageValidator.validateImageFromFile(file)
        if (fileStatus.isValid) {
            selectedProfileImage.value = []
            const preview = URL.createObjectURL(file)
            selectedProfileImage.value.push({ 
                type: ContentImageType.CONTENT_IMAGE_FROM_USER_FILE,
                name: (file).name,
                preview: preview, 
                file: file
            })
        } else {
            avatarErrorMessage.value = fileStatus.message
            window.setTimeout(() => {
                avatarErrorMessage.value = ''
            }, 3000)
        }
    } else {
        selectedProfileImage.value = []
    }
};

const submitForm = handleSubmit(
    values => {
        console.log(values)
    },
    errors => {
        console.error('Form validation failed:', errors);
    }
);
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
        align-items: center;
        @media (max-width: $bp-sm){
            flex-direction: column;
            align-items: center;
        }
    }
    &__avatarCtn{
        position: relative;
    }
    &__avatar{
        height: 8rem;
        width: 8rem;
        border-radius: 50%;
        border-color: 1px solid rgb(var(--v-theme-main-blue));
        overflow: hidden;
        @media (max-width: $bp-sm){
            width: 8rem;
            margin-bottom: 1rem;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &--rightInputs{
            display: flex;
            flex-direction: column;
            margin-left: 3rem;
            flex-grow: 1;
            @media (max-width: $bp-sm){
                margin-left: 0;
                width: 100%;
            }
        }
    }
    &--avatarErrorMessage{
        color: rgb(var(--v-theme-main-red));
        font-size: $font-size-xs;
    }
    &__avatarEdit{
        position: absolute;
        bottom: 0rem;
        right:0rem;
        z-index: 1000;
    }
    &__rolesBlock {
        background-color: rgb(var(--v-theme-light-yellow));
        padding: 1rem;
    }
    &__rolesItem {
        display: flex;
        align-items: center;
    }
}
</style>