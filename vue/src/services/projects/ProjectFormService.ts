import type { Project, ProjectSubmission } from "@/models/interfaces/Project";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { z, ZodType } from "zod";
import { i18n } from "@/assets/plugins/i18n";
import { CommonZodSchema } from "../forms/CommonZodSchema";
import GeocodingService from "../map/GeocodingService";

export class ProjectFormService {
    static getForm(project: Project | null) {
        const zodModels = CommonZodSchema.getDefinitions()
        const projectSchema: z.ZodType<Partial<Project>> = z.object({
            name: z
                .string()
                .min(1, { message: i18n.t('forms.errorMessages.required') }),
            description: zodModels.description,
            calendar: z.string().optional(),
            deliverables: z.string().optional(),
            focalPointName: z.string().optional(),
            focalPointPosition: z.string().optional(),
            focalPointEmail: zodModels.email,
            interventionZone: z.string(),
            focalPointTel: zodModels.phone,
            osmData: zodModels.osmData,
            actor: zodModels.symfonyRelation,
            status: z.string(),
            donors: zodModels.symfonyRelations,
            contractingOrganisation: zodModels.symfonyRelation,
            thematics: zodModels.symfonyRelations,
            beneficiaryTypes: z.array(z.string()),
            website: z.string().url().optional(),
        })

        const { errors, handleSubmit, isSubmitting } = useForm<Partial<ProjectSubmission>>({
            initialValues: {
                ...project,
                osmData: project?.geoData ? GeocodingService.geoDataToGeocodingItem(project?.geoData) : null,
            },
            validationSchema: toTypedSchema(projectSchema),
        });

        const form = {
            name: useField('name'),
            description: useField('description'),
            deliverables: useField('deliverables'),
            calendar: useField('calendar'),
            contractingOrganisation: useField('contractingOrganisation'),
            donors: useField('donors'),
            interventionZone: useField('interventionZone'),
            focalPointName: useField('focalPointName'),
            focalPointPosition: useField('focalPointPosition'),
            focalPointEmail: useField('focalPointEmail'),
            focalPointTel: useField('focalPointTel'),
            beneficiaryTypes: useField('beneficiaryTypes'),
            actor: useField('actor'),
            status: useField('status'),
            osmData: useField('osmData'),
            thematics: useField('thematics'),
            website: useField('website'),
        }

        return {form, errors, handleSubmit, isSubmitting}
    }
}