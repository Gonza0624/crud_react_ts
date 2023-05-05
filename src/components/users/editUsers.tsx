import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { errorToast, successToast } from "../../toastAlerts/toastAlerts";
import { ToastContainer } from "react-toastify";
import { users } from "../../api/users";

const EditUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const [user, setUser] = useState({
    id: "",
    first_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    users
      .getById({ id })
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/api/users/${id}`, user)
      .then(() => {
        successToast("usuario editado");
        setTimeout(() => {
          navigate(-1);
        }, 1800);
      })
      .catch((error) => {
        console.log(error);
        errorToast("Ha ocurrido un error en la peticion");
      });
  };

  return (
    <div className="container margin">
      <div className="row">
        <form onSubmit={handleSubmit} className="col m-3">
          <h1 className="m-3">Editar usuario</h1>
          <div className="form-group col m-3">
            <input
              required
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="form-group col m-3">
            <input
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group col m-3">
            <input
              required
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Editar usuario
          </button>
          <Link to={"#"} onClick={back} className="ml-3 m-3">
            Atras
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default EditUser;
