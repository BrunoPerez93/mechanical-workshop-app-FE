import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";

const AdministrarTecnico = () => {

  const [mechanics, setMechanics] = useState([]);

  const { formState, onInputChange, resetForm } = useForm({
    userName: '',
    password: '',
  });

  const { userName, password } = formState;

  const fetchMechanic = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/mechanics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const mechanicsList = await response.json();
        setMechanics(mechanicsList);
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
    fetchMechanic();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/mechanics", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchMechanic();
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
          <h1>Administrar Tecnico</h1>
          <h2>Usuario</h2>

          <input
            type="username"
            className="form-control"
            placeholder="Nombre Completo"
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

          <button
            className="btn btn-primary mt-2 col-12"
            type="submit"
          > Crear </button>

          <h2 className="text-center mt-5">Lista de Tecnicos</h2>
          <table  className="table text-center">
            <thead>
              <tr>
                <th className="col-sm-6 col-md-6">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {mechanics && mechanics.length ? (
                mechanics.map((mechanic) => (
                  <tr key={mechanic.id}>
                    <td>{mechanic.userName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay usuarios</td>
                </tr>
              )}
            </tbody>
          </table>

        </form>
      </div>
    </div>
  )
}

export default AdministrarTecnico
