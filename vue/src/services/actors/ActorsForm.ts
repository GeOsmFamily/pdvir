import type { Actor } from "@/models/interfaces/Actor";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { z, ZodType } from "zod";
import { i18n } from "@/assets/plugins/i18n";
import type { SymfonyRelation } from "@/models/interfaces/SymfonyRelation";

export class ActorsFormService {
    static getActorsForm(actorToEdit: Actor | null) {
        const SymfonyRelationSchema = z.object({
            "@id": z.string(),
            name: z.string()
        }) satisfies ZodType<SymfonyRelation>

        const actorSchema  = z.object({
            ///////// Main infos \\\\\\\\\
            name: z
                .string()
                .min(1, { message: i18n.t('forms.errorMessages.required') }),
            acronym: z
                .string()
                .min(2, { message: i18n.t('forms.errorMessages.minlength', { min: 2 }) })
                .max(8, { message: i18n.t('forms.errorMessages.maxlength', { max: 8 }) }),
            category: z.string()
                
            .min(1, { message: i18n.t('forms.errorMessages.required') }),
            expertises: z.array(SymfonyRelationSchema).nonempty({
                message: i18n.t('forms.errorMessages.required'),
            }),
            thematics: z.array(SymfonyRelationSchema).nonempty({
                message: i18n.t('forms.errorMessages.required'),
            }),
            administrativeScopes: z.array(SymfonyRelationSchema).nonempty({
                message: i18n.t('forms.errorMessages.required'),
            }),
            description: z.string()
                .min(1, { message: i18n.t('forms.errorMessages.required') })
                .min(50, { message: i18n.t('forms.errorMessages.minlength', { min: 50 }) }),

            ///////// Contact \\\\\\\\\
            officeName: z.string().nullable(),
            officeAddress: z.string().nullable(),
            contactName: z.string().nullable(),
            contactPosition: z.string().nullable(),
            website: z
                .string()
                .refine((url) => {
                    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/;
                    return regex.test(url);
                }, {
                    message: i18n.t('forms.errorMessages.url'),
                }),
            email: z.string().email(i18n.t('forms.errorMessages.email')),
            phone: z.string().refine((phone) => {
                const regex = /^(?:\+?[1-9]\d{1,3}[ .-]?)?(?:[1-9]\d{8}|0[1-9]\d{8})$/;
                return regex.test(phone);
              }, {
                message: i18n.t('forms.errorMessages.phone'),
              })
        })
        const { errors, handleSubmit, isSubmitting } = useForm<Actor>({
            initialValues: actorToEdit,
            validationSchema: toTypedSchema(actorSchema),
        });
        const form = {
            name: useField('name', '', { validateOnValueUpdate: false }),
            acronym: useField('acronym', '', { validateOnValueUpdate: false }),
            category: useField('category', '', { validateOnValueUpdate: false }),
            expertises: useField('expertises', '', { validateOnValueUpdate: false }),
            thematics: useField('thematics', '', { validateOnValueUpdate: false }),
            administrativeScopes: useField('administrativeScopes', '', { validateOnValueUpdate: false }),
            description: useField('description', '', { validateOnValueUpdate: false }),
            officeName: useField('officeName', '', { validateOnValueUpdate: false }),
            officeAddress: useField('officeAddress', '', { validateOnValueUpdate: false }),
            contactName: useField('contactName', '', { validateOnValueUpdate: false }),
            contactPosition: useField('contactPosition', '', { validateOnValueUpdate: false }),
            website: useField('website', '', { validateOnValueUpdate: false }),
            email: useField('email', '', { validateOnValueUpdate: false }),
            phone: useField('phone', '', { validateOnValueUpdate: false }),
        }
        return {form, errors, handleSubmit, isSubmitting}
    }
}