import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'
import { i18n } from '@/plugins/i18n'
import { CommonZodSchema } from '@/services/forms/CommonZodSchema'
import type { QgisMap } from '@/models/interfaces/QgisMap'

export class QgisMapFormService {
  static getForm(qgisMap: QgisMap | null) {
    const zodModels = CommonZodSchema.getDefinitions()
    // @ts-ignore
    const qgisMapSchema: z.ZodType<Partial<QgisMap>> = z.object({
      name: z.string().min(1, { message: i18n.t('forms.errorMessages.required') }),
      qgisProject: zodModels.qgisProject
    })

    const { errors, handleSubmit, isSubmitting, setFieldValue } = useForm<Partial<QgisMap>>({
      initialValues: qgisMap,
      validationSchema: toTypedSchema(qgisMapSchema)
    })

    const form: any = {
      name: useField('name'),
      qgisProject: useField('qgisProject')
    }

    return { form, errors, handleSubmit, isSubmitting, setFieldValue }
  }
}
