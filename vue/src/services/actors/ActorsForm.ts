import type { Actor } from "@/models/interfaces/Actor";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { i18n } from "@/main";

export class ActorsFormService {
    static getActorsForm(actorToEdit: Actor | undefined) {
        const actorSchema  = z.object({
            name: z
                .string()
                .min(1, { message: i18n.t('actors.form.errorMessages.required') }),
            acronym: z
                .string()
                .min(2, { message: i18n.t('actors.form.errorMessages.minlength', { min: 2 }) })
                .max(8),
            email: z.string().email(i18n.t('actors.form.errorMessages.email')),
        })
        const { errors } =useForm<Actor>({
            initialValues: actorToEdit,
            validationSchema: toTypedSchema(actorSchema),
        });
        const form = {
            name: {...useField('name', '', { validateOnValueUpdate: false })},
            acronym: {...useField('acronym', '', { validateOnValueUpdate: false })},
            email: {...useField('email', '', { validateOnValueUpdate: false })},
        }
        return {form, errors}
    }
}