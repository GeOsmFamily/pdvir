import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField, type TypedSchema } from "vee-validate";
import { z } from "zod";
import { i18n } from "@/assets/plugins/i18n";

export class UserProfileForm {
    static getSchema() {
      return z.object({
        firstName: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }).min(2, { message: i18n.t('forms.errorMessages.minlength', { min: 2 }) }).max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) }),
        lastName: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }).min(2, { message: i18n.t('forms.errorMessages.minlength', { min: 2 }) }).max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) }),
        organisation: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }).max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) }),
        position: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }).min(2, { message: i18n.t('forms.errorMessages.minlength', { min: 2 }) }).max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) }),
        phone: z.string().refine((phone) => {
          const regex = /^(?:\+?[1-9]\d{1,3}[ .-]?)?(?:[1-9]\d{8}|0[1-9]\d{8})$/;
          return regex.test(phone);
        }, {
          message: i18n.t('forms.errorMessages.phone'),
        }).optional().or(z.literal('')),
        email: z.string().email({ message: i18n.t('forms.errorMessages.email') }),
        plainPassword: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }).min(8, { message: i18n.t('forms.errorMessages.minlength', { min: 8 }) }),
        confirmPassword: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }).min(8, { message: i18n.t('forms.errorMessages.minlength', { min: 8 }) }),
        acceptTerms: z.boolean().refine(val => val === true, {
          message: i18n.t('auth.becomeMember.form.privacyPolicy.error'),
        }),
        signInMessage: z.string().min(10).max(500, { message: i18n.t('forms.errorMessages.maxlength', { max: 500 }) }).optional().or(z.literal('')),
      })
    }

    static getSignUpForm() {
      const baseSchema = this.getSchema().pick({
        firstName: true,
        lastName: true,
        email: true,
        plainPassword: true,
        confirmPassword: true,
        acceptTerms: true,
      })

      const signUpSchema = baseSchema.refine((data) => data.plainPassword === data.confirmPassword, {
        message: i18n.t('auth.becomeMember.form.passwordMatchError'),
        path: ["confirmPassword"],
      })
      
      const { errors, handleSubmit, isSubmitting } = useForm({validationSchema: toTypedSchema(signUpSchema)});
      const form = {
        firstName: useField('firstName', '', { validateOnValueUpdate: false }),
        lastName: useField('lastName', '', { validateOnValueUpdate: false }),
        email: useField('email', '', { validateOnValueUpdate: false }),
        plainPassword: useField('plainPassword', '', { validateOnValueUpdate: false }),
        confirmPassword: useField('confirmPassword', '', { validateOnValueUpdate: false }),
        acceptTerms: useField('acceptTerms', '', { validateOnValueUpdate: false }),
      }
      return {form, errors, handleSubmit, isSubmitting}
    }

    static getSignUpThanksForm() {
      const baseSchema = this.getSchema().pick({
        organisation: true,
        position: true,
        phone: true,
        signInMessage: true
      })

      const { errors, handleSubmit, isSubmitting } = useForm({validationSchema: toTypedSchema(baseSchema)});
      const form = {
        organisation: useField('organisation', '', { validateOnValueUpdate: false }),
        position: useField('position', '', { validateOnValueUpdate: false }),
        phone: useField('phone', '', { validateOnValueUpdate: false }),
        signInMessage: useField('signInMessage', '', { validateOnValueUpdate: false })
      }
      return {form, errors, handleSubmit, isSubmitting}
    }
}