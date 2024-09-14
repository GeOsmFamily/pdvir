import type { Actor } from "@/models/interfaces/Actor";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { i18n } from "@/assets/plugins/i18n";

export class ActorsFormService {
    static getActorsForm(actorToEdit: Actor | undefined) {
        const actorSchema  = z.object({
            acronym: z
                .string()
                .min(2, { message: i18n.t('actors.form.errorMessages.minlength', { min: 2 }) })
                .max(8, { message: i18n.t('actors.form.errorMessages.maxlength', { max: 8 }) }),
            name: z
                .string()
                .min(1, { message: i18n.t('actors.form.errorMessages.required') }),
            website: z
                .string()
                .refine((url) => {
                    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/;
                    return regex.test(url);
                }, {
                    message: i18n.t('actors.form.errorMessages.url'),
                }),
            email: z.string().email(i18n.t('actors.form.errorMessages.email')),
            phone: z.string().refine((phone) => {
                const regex = /^(?:\+?[1-9]\d{1,3}[ .-]?)?(?:[1-9]\d{8}|0[1-9]\d{8})$/;
                return regex.test(phone);
              }, {
                message: i18n.t('actors.form.errorMessages.phone'),
              })
        })
        const { errors, handleSubmit, isSubmitting } = useForm<Actor>({
            initialValues: actorToEdit,
            validationSchema: toTypedSchema(actorSchema),
        });
        const form = {
            acronym: useField('acronym', '', { validateOnValueUpdate: false }),
            name: useField('name', '', { validateOnValueUpdate: false }),
            website: useField('website', '', { validateOnValueUpdate: false }),
            email: useField('email', '', { validateOnValueUpdate: false }),
            phone: useField('phone', '', { validateOnValueUpdate: false })
        }
        return {form, errors, handleSubmit, isSubmitting}
    }
}