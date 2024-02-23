import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { apiCall } from "../../utility/common";
import { AdminForm, UserList } from "../Users/AdminForm";

const AdministrarUsuario = () => {


  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const { formState, onInputChange, resetForm } = useForm({
    userName: "",
    password: "",
    role: "",
  });

  const searchOptions = {
    Admin: "Administrador",
    Management: "Secretaria",
    Mechanic: "Mecanico",
  };

  const fetchUsers = async () => {
    try {
      const response = await apiCall(
        "users",
        "GET",
      );

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
      const response = await apiCall(
        "users",
        "POST",
        JSON.stringify(formState),
      );

      if (response.ok) {
        fetchUsers();
        resetForm();
        setSuccessMessage('Usuario creado.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setFailMessage('Usuario ya ingresado utilice otro nombre.');
        setTimeout(() => {
          setFailMessage('');
        }, 5000);
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

        <AdminForm
          formState={formState}
          onInputChange={onInputChange}
          resetForm={resetForm}
          handleSubmit={handleSubmit}
        />

        {successMessage && (
          <div className="alert alert-success mt-2">{successMessage}</div>
        )}

        {failMessage && (
          <div className="alert alert-danger mt-2">{failMessage}</div>
        )}

        <UserList
          users={users}
          searchOptions={searchOptions}
        />

      </div>
    </div>
  )
}

export default AdministrarUsuario
