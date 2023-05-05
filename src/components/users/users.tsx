import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import UserInterface from "../../interface/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../../api/users";

const UserList = () => {
  const [user, setUser] = useState<UserInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(5);

  useEffect(() => {
    users
      .getAll()
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Obtener los usuarios que se van a mostrar en la página actual
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(user.length / userPerPage);

  // Funciones para manejar el cambio de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // redirigir a otro componente
  const navigate = useNavigate();
  const create = () => {
    navigate("/create");
  };

  // funcion para eliminar usuario
  const handleDelete = (id: string) => {
    if (window.confirm("¿Eliminar usuario?")) {
      users
        .delete(id)
        .then(() => {
          setUser(user.filter((api) => api.id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container2">
      <div className="row">
        <div className="col text-center m-3">
          <h1 className="display-4">CRUD DE USUARIOS</h1>
        </div>
        <div>
          <button onClick={create} className="m-3 btn btn-primary">
            Crear Usuario
          </button>
          <Table className="m-3 table table-light table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Email</th>
                <th>Detalle</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`userDetail/${user.id}`}>
                      <button className="btn btn-info">Detalle</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`update/${user.id}`}>
                      <button className="btn btn-warning">Editar</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="m-3">
            <Button className="" onClick={prevPage}>
              Previous
            </Button>
            <Button className="m-2">{currentPage}</Button>
            <Button className="" onClick={nextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
