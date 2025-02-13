import * as Yup from "yup";

 export const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });