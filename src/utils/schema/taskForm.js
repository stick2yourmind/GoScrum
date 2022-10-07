import * as Yup from 'yup'

/* --------------------------------------------------------------------------- */
/*                               TASK FORM                                     */
/* --------------------------------------------------------------------------- */

export const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Título requerido').min(3, 'El título debe tener 3 caracteres como mínimo'),
  priority: Yup.string().required('Prioridad requerida'),
  status: Yup.string().required('Estado requerido'),
  description: Yup.string()
    .required('Descripción requerida')
    .min(5, 'La descripción debe tener 5 caracteres como mínimo')
})

export const loginInit = {
  title: '',
  priority: '',
  status: '',
  description: ''
}
