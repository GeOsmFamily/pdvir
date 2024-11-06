import type { Project } from "@/models/interfaces/Project";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { z, ZodType } from "zod";
import { i18n } from "@/assets/plugins/i18n";
import { CommonZodSchema } from "../forms/CommonZodSchema";

export class ProjectFormService {
    static getForm(project: Project | null) {
        const zodModels = CommonZodSchema.getDefinitions()
        const projectSchema: z.ZodType<Partial<Project>> = z.object({
            name: z
                .string()
                .min(1, { message: i18n.t('forms.errorMessages.required') }),
            description: zodModels.description,
            focalPointName: z.string().optional(),
            focalPointPosition: z.string().optional(),
            focalPointEmail: zodModels.email,
            focalPointTel: zodModels.phone,
            thematics: zodModels.symfonyRelations,
            website: z.string().url().optional(),
        })

        const { errors, handleSubmit, isSubmitting } = useForm<Partial<Project>>({
            initialValues: project,
            validationSchema: toTypedSchema(projectSchema),
        });

        const form = {
            name: useField('name'),
            description: useField('description'),
            focalPointName: useField('focalPointName'),
            focalPointPosition: useField('focalPointPosition'),
            focalPointEmail: useField('focalPointEmail'),
            focalPointTel: useField('focalPointTel'),
            thematics: useField('thematics'),
            website: useField('website'),
        }

        return {form, errors, handleSubmit, isSubmitting}
    }
}