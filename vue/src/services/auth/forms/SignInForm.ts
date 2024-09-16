import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { z } from "zod";

export class SignInForm {
    static getSignInForm() {
        const validationSchema = toTypedSchema(
            z.object({
              email: z.string().email({ message: 'Must be a valid email' }),
              password: z.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' })
            })
          );
        
        const { errors, handleSubmit, isSubmitting } = useForm({validationSchema: validationSchema});
        const form = {
            email: useField('email', '', { validateOnValueUpdate: false }),
            password: useField('password', '', { validateOnValueUpdate: false }),
        }
        return {form, errors, handleSubmit, isSubmitting}
    }
}