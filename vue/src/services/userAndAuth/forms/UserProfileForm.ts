import { UserRoles } from '@/models/enums/auth/UserRoles'
import type { User } from '@/models/interfaces/auth/User'
import { i18n } from '@/plugins/i18n'
import { CommonZodSchema } from '@/services/forms/CommonZodSchema'
import { UserValidator } from '@/services/userAndAuth/forms/UserValidator'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'

export class UserProfileForm {
  static getSchema() {
    const zodModels = CommonZodSchema.getDefinitions()

    return z.object({
      firstName: z
        .string({ required_error: i18n.t('forms.errorMessages.required') })
        .min(2, { message: i18n.t('forms.errorMessages.minlength', { min: 2 }) })
        .max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) }),
      lastName: z
        .string({ required_error: i18n.t('forms.errorMessages.required') })
        .min(2, { message: i18n.t('forms.errorMessages.minlength', { min: 2 }) })
        .max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) }),
      organisation: z
        .string()
        .max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) })
        .optional(),
      position: z
        .string()
        .max(255, { message: i18n.t('forms.errorMessages.maxlength', { max: 255 }) })
        .optional(),
      phone: zodModels.phone,
      email: z
        .string({ required_error: i18n.t('forms.errorMessages.required') })
        .email({ message: i18n.t('forms.errorMessages.email') }),
      ...UserValidator.passwordsObject(),
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: i18n.t('auth.becomeMember.form.privacyPolicy.error')
      }),
      signUpMessage: z
        .string()
        .max(500, { message: i18n.t('forms.errorMessages.maxlength', { max: 500 }) })
        .optional()
        .or(z.literal('')),
      description: z
        .string()
        .max(500, { message: i18n.t('forms.errorMessages.maxlength', { max: 500 }) })
        .optional()
    })
  }

  static getRolesList() {
    return [
      {
        label: i18n.t('auth.becomeMemberAskRoles.form.actionsRequest.addActors'),
        value: UserRoles.EDITOR_ACTORS,
        selected: ref(false),
        requested: ref(false),
        givenByAdmin: ref(false),
        newlyRequested: ref(false)
      },
      {
        label: i18n.t('auth.becomeMemberAskRoles.form.actionsRequest.addProjects'),
        value: UserRoles.EDITOR_PROJECTS,
        selected: ref(false),
        requested: ref(false),
        givenByAdmin: ref(false),
        newlyRequested: ref(false)
      },
      {
        label: i18n.t('auth.becomeMemberAskRoles.form.actionsRequest.addResources'),
        value: UserRoles.EDITOR_RESSOURCES,
        selected: ref(false),
        requested: ref(false),
        givenByAdmin: ref(false),
        newlyRequested: ref(false)
      }
    ]
  }

  static getSignUpForm() {
    const baseSchema = this.getSchema().pick({
      firstName: true,
      lastName: true,
      email: true,
      plainPassword: true,
      confirmPassword: true,
      acceptTerms: true
    })

    const signUpSchema = UserValidator.refinePasswordMatch<typeof baseSchema>(baseSchema)

    const { errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: toTypedSchema(signUpSchema)
    })
    const form = {
      firstName: useField('firstName', '', { validateOnValueUpdate: false }),
      lastName: useField('lastName', '', { validateOnValueUpdate: false }),
      email: useField('email', '', { validateOnValueUpdate: false }),
      plainPassword: useField('plainPassword', '', { validateOnValueUpdate: false }),
      confirmPassword: useField('confirmPassword', '', { validateOnValueUpdate: false }),
      acceptTerms: useField('acceptTerms', '', { validateOnValueUpdate: false })
    }
    return { form, errors, handleSubmit, isSubmitting }
  }

  static getSignUpThanksForm() {
    const baseSchema = this.getSchema().pick({
      organisation: true,
      position: true,
      phone: true,
      signUpMessage: true
    })

    const { errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: toTypedSchema(baseSchema)
    })
    const form = {
      organisation: useField('organisation', '', { validateOnValueUpdate: false }),
      position: useField('position', '', { validateOnValueUpdate: false }),
      phone: useField('phone', '', { validateOnValueUpdate: false }),
      signUpMessage: useField('signUpMessage', '', { validateOnValueUpdate: false })
    }
    return { form, errors, handleSubmit, isSubmitting }
  }

  static getUserEditionForm(userToEdit: User | null) {
    const baseSchema = this.getSchema().pick({
      firstName: true,
      lastName: true,
      email: true,
      organisation: true,
      position: true,
      phone: true,
      description: true
    })
    const { errors, handleSubmit, isSubmitting } = useForm({
      initialValues: userToEdit,
      validationSchema: toTypedSchema(baseSchema)
    })

    const form = {
      firstName: useField('firstName', '', { validateOnValueUpdate: false }),
      lastName: useField('lastName', '', { validateOnValueUpdate: false }),
      email: useField('email', '', { validateOnValueUpdate: false }),
      organisation: useField('organisation', '', { validateOnValueUpdate: false }),
      position: useField('position', '', { validateOnValueUpdate: false }),
      phone: useField('phone', '', { validateOnValueUpdate: false }),
      description: useField('description', '', { validateOnValueUpdate: false })
    }
    return { form, errors, handleSubmit, isSubmitting }
  }
}
