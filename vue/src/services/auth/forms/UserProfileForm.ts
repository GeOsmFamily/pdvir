import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { z } from "zod";

export class UserProfileForm {
    static getUserForm() {
        const validationSchema = toTypedSchema(
            z.object({
              firstName: z.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
              lastName: z.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
              organisation: z.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
              position: z.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
              phoneNumber: z.string().min(10).max(20, { message: 'Too long' }).optional().or(z.literal('')),
              email: z.string().email({ message: 'Must be a valid email' }),
              plainPassword: z.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
              confirmPassword: z.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
              acceptTerms: z.boolean().refine(val => val === true, {
                message: "Vous devez accepter les conditions d'utilisation",
              }),
              signUpMessage: z.string().min(10).max(300, { message: 'Too long' }).optional().or(z.literal('')),
            })
            .refine((data) => data.plainPassword === data.confirmPassword, {
              message: "Les mots de passe ne correspondent pas",
              path: ["confirmPassword"],
            })
          );
        
        const { errors, handleSubmit, isSubmitting } = useForm({validationSchema: validationSchema});
        const form = {
            firstName: useField('firstName', '', { validateOnValueUpdate: false }),
            lastName: useField('lastName', '', { validateOnValueUpdate: false }),
            organisation: useField('organisation', '', { validateOnValueUpdate: false }),
            position: useField('position', '', { validateOnValueUpdate: false }),
            phoneNumber: useField('phoneNumber', '', { validateOnValueUpdate: false }),
            email: useField('email', '', { validateOnValueUpdate: false }),
            plainPassword: useField('plainPassword', '', { validateOnValueUpdate: false }),
            confirmPassword: useField('confirmPassword', '', { validateOnValueUpdate: false }),
            acceptTerms: useField('acceptTerms', '', { validateOnValueUpdate: false }),
            signUpMessage: useField('signUpMessage', '', { validateOnValueUpdate: false }),
        }
        return {form, errors, handleSubmit, isSubmitting}
    }
}