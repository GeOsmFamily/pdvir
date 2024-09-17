import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { z } from "zod";

export class RegistrationForm {
    static getRegistrationForm() {
        const validationSchema = toTypedSchema(
            z.object({
              firstName: z.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
              lastName: z.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),          
              email: z.string().email({ message: 'Must be a valid email' }),
              password: z.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
              confirmPassword: z.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
              acceptTerms: z.boolean().refine(val => val === true, {
                message: "Vous devez accepter les conditions d'utilisation",
              }),
            })
            .refine((data) => data.password === data.confirmPassword, {
              message: "Les mots de passe ne correspondent pas",
              path: ["confirmPassword"],
            })
          );
        
        const { errors, handleSubmit, isSubmitting } = useForm({validationSchema: validationSchema});
        const form = {
            firstName: useField('firstName', '', { validateOnValueUpdate: false }),
            lastName: useField('lastName', '', { validateOnValueUpdate: false }),
            email: useField('email', '', { validateOnValueUpdate: false }),
            password: useField('password', '', { validateOnValueUpdate: false }),
            confirmPassword: useField('confirmPassword', '', { validateOnValueUpdate: false }),
            acceptTerms: useField('acceptTerms', '', { validateOnValueUpdate: false }),
        }
        return {form, errors, handleSubmit, isSubmitting}
    }
}