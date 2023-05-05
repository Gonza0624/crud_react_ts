import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("* Firstname is required"),
  email: Yup.string()
    .email("* The email is not valid")
    .required("* Email is required"),
  password: Yup.string().required("* The password is required"),
});
