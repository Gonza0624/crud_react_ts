import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { successToast, errorToast } from "../../toastAlerts/toastAlerts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../../validations/validation";
import UserInterface from "../../interface/interfaces";
import { users } from "../../api/users";

const CreateUsers = (): JSX.Element => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const initialValues: UserInterface = {
    id: "",
    first_name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: UserInterface) => {
    try {
      const { data } = await users.create(values);
      successToast("Usuario creado");
      console.log(data);
      setTimeout(() => {
        navigate(-1);
      }, 1800);
    } catch (error) {
      errorToast("Ha ocurrido un error en la peticion");
      console.log("error: ", error);
    }
  };

  return (
    <section className="flex">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const { isValid, dirty } = formik;
          return (
            <div className="container">
              <div className="row">
                <Form className="col m-3">
                  <h3 className="m-3">Crear usuarios</h3>
                  <fieldset className="form-group m-3">
                    <Field
                      name="first_name"
                      type="text"
                      className="form-control"
                      placeholder="First name"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="span"
                      className="error"
                    />
                  </fieldset>

                  <fieldset className="form-group m-3">
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error"
                    />
                  </fieldset>

                  <fieldset className="form-group m-3">
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error"
                    />
                  </fieldset>

                  <button type="submit" className="m-3 btn btn-primary">
                    Crear usuario
                  </button>
                  <Link to={"#"} onClick={back} className="ml-3 m-3">
                    Atras
                  </Link>
                  <ToastContainer />
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </section>
  );
};

export default CreateUsers;
