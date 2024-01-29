import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { apiCall } from "../../utility/common";
import { MechanicForm, MechanicList } from "../Mechanics/MechanicForm";

const AdministrarTecnico = () => {

  const [mechanics, setMechanics] = useState([]);

  const { formState, onInputChange, resetForm } = useForm({
    userName: '',
    password: '',
  });

  const fetchMechanic = async () => {
    try {
      const response = await apiCall(
        "mechanics",
        "GET",
      );

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
      const response = await apiCall(
        "mechanics",
        "POST",
        JSON.stringify(formState),
      );

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
      <MechanicForm
          formState={formState}
          onInputChange={onInputChange}
          resetForm={resetForm}
          handleSubmit={handleSubmit}
        />

        <MechanicList mechanics={mechanics} />
      </div>
    </div>
  )
}

export default AdministrarTecnico
