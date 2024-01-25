import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";

const AdministrarUsuario = () => {
  const [users, setUsers] = useState([]);
  const { formState, onInputChange, resetForm } = useForm({
    userName: "",
    password: "",
    role: "",
  });

  const { userName, password, role } = formState;

  const searchOptions = {
    Admin: "Administrador",
    Operation: "Secretaria",
    Mechanic: "Mecanico",
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userList = await response.json();
        setUsers(userList);
      } else {
        console.error(
          "Error en la respuesta del servidor al pedir el listado",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchUsers();
        resetForm();
      } else {
        console.error(
          "Error en la respuesta del servidor al crear el usuario",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container">
      <div className="row">

        <form className="text-center mt-2" onSubmit={handleSubmit}>
          <h1>Administrar Usuario</h1>
          <h2>Usuario</h2>

          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="userName"
            value={userName}
            onChange={onInputChange}
            autoComplete="userName"
          />

          <h2>Contraseña</h2>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={password}
            onChange={onInputChange}
            autoComplete="current-password"
          />

          <h2>Rol</h2>
          <select
            className="form-select"
            onChange={onInputChange}
            name="role"
            value={role}>
            <option value=''>Seleccione Rol...</option>
            {Object.entries(searchOptions).map(([key, value]) =>
              (<option key={key} value={key}>
                {value}
              </option>)
            )}
          </select>

          <button
            className="btn btn-primary mt-2 col-12"
            type="submit"
          > Crear </button>

        </form>

        <h2 className="text-center mt-5">Lista de usuarios</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th className="col-sm-6 col-md-6" >Nombre</th>
              <th className="col-sm-6 col-md-6" >Rol</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>{searchOptions[user.role]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay usuarios</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdministrarUsuario
