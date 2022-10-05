import * as Yup from 'yup'

/* -------------------------------------------------------------------------- */
/*                                 LOGIN USER                                 */
/* -------------------------------------------------------------------------- */

export const RegisterSchema = Yup.object().shape({
  userName: Yup.string().required('Nombre de usuario requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(8, 'La contraseña debe tener 8 caracteres como mínimo')
    .max(16, 'La contraseña debe tener 16 caracteres como máximo'),
  email: Yup.string().email('Email invalido').required('El email es requerido'),
  role: Yup.string().required('El rol es requerido'),
  continent: Yup.string().required('El continente es requerido'),
  region: Yup.string().required('La región es requerida'),
  teamID: Yup.string().when('hasTeam', {
    is: true,
    then: Yup.string().required('Team id no válido')
  })
})

export const registerInit = {
  userName: '',
  password: '',
  email: '',
  role: '',
  continent: '',
  region: '',
  hasTeam: false,
  teamID: '',
  region: '',
  email: ''
}
