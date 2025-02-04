import { z } from 'zod'
import { CommonZodSchema } from '../forms/CommonZodSchema'
import { i18n } from '@/plugins/i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'

export class MapExportService {
  static getExportForm() {
    const zodModels = CommonZodSchema.getDefinitions()
    const formSchema = z.object({
      ///////// Main infos \\\\\\\\\
      title: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }),
      description: zodModels.description
    })
    const { errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: toTypedSchema(formSchema)
    })
    const form = {
      title: useField('title', '', { validateOnValueUpdate: false }),
      description: useField('description', '', { validateOnValueUpdate: false })
    }
    return { form, errors, handleSubmit, isSubmitting }
  }
}
