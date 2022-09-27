import * as Yup from "yup";

/* -------------------------------------------------------------------------- */
/*                                 LOGIN USER                                 */
/* -------------------------------------------------------------------------- */

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Nombre de usuario requerido"),
  password: Yup.string()
    .required("Contraseña requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(16, "La contraseña debe tener 16 caracteres como maximo"),
});

export const loginInit = {
  username: "",
  password: "",
};
