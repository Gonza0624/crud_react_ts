import { useNavigate } from "react-router-dom";
import UserInterface from "../../interface/interfaces";

export const CardComponent: React.FC<UserInterface> = ({
  id,
  first_name,
  email,
  password,
}) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div className="card col-md-12">
      <h5 className="card-header">ID: {id}</h5>
      <div className="card-body">
        <h5 className="card-title">Nombre: {first_name}</h5>
        <p className="card-text">Email: {email}</p>
        <p className="card-text">Password: {password}</p>
        <button onClick={back} className="btn btn-primary">
          Atras
        </button>
      </div>
    </div>
  );
};
