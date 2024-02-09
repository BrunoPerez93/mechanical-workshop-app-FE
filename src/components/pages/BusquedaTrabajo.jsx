import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { apiCall } from "../../utility/common";
import InputComponent from "../InputComponent";
import { WorkDetails } from "../Work/WorkDetails";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, formatISO } from 'date-fns';


const BusquedaTrabajo = () => {

  const { formState, onInputChange } = useForm({
    searchSelect: '',
    search: '',
    datePickerValue: null,
  });

  const { searchSelect, search, datePickerValue } = formState;

  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const worksPerPage = 10;
  const totalPages = Math.ceil(works.length / worksPerPage);

  const [editedWork, setEditedWork] = useState(null);


  const searchOptions = {
    matricula: 'Matricula',
    ci: 'CI',
    createdAt: 'Fecha',
    mechanicName: 'Tecnico',
    clientName: 'Cliente',
  };


  useEffect(() => {
    fetchWorks()
  }, [currentPage])

  const fetchWorks = async (filter) => {
    try {
      const response = await apiCall(
        "works",
        "GET",
        null,
        filter,
      );

      if (response.ok) {
        const workList = await response.json();
        setWorks(workList);
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

  const handleSearchSelectChange = (value) => {

    onInputChange({ target: { name: "searchSelect", value } });
    if (value !== "createdAt") {
      onInputChange({ target: { name: "datePickerValue", value: null } });
    }
  };

  const handleSearch = async () => {
    let formattedDate = datePickerValue;

    if (searchSelect === "createdAt" && datePickerValue) {
      formattedDate = formatISO(datePickerValue);
    }

    const filter = { [searchSelect]: searchSelect === "createdAt" ? formattedDate : search };


    if (searchSelect === "ci") {
      console.log(searchSelect);
      filter.ci = search;
      console.log(search);
    }

    if (searchSelect === "mechanicName") {
      console.log(searchSelect);
      filter.userName = search;
      console.log(search);
    }

    if (searchSelect === "clientName") {
      console.log(searchSelect);
      filter.name = search;
      console.log(search);
    }

    await fetchWorks(filter);

  };

  const handleRowClick = (work) => {
    setSelectedWork((prevSelectedWork) => (prevSelectedWork === work ? null : work));
    setEditedWork(null);
  };

  const handleEditClick = (work) => {
    setEditedWork({ ...work, isEditing: true });
  };


  const handleSaveClick = async (work) => {

    try {
      const response = await apiCall(
        `works/${work.id}`,
        "PUT",
        JSON.stringify(work),

      );
      if (response.ok) {
        console.log('Work updated successfully.');
        fetchWorks();
      } else {
        console.error('Error updating work:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating work:', error.message);
    }

    setEditedWork((prevEditedFields) => ({
      ...prevEditedFields,
      [work.id]: { ...prevEditedFields[work.id], isEditing: false },
    }));
  };

  return (
    <div className="container">
      <div className="row">

        <div className="text-center mt-2">
          <h1>Trabajo</h1>

          <select
            className="form-select"
            name="searchSelect"
            value={searchSelect}
            onChange={(e) => handleSearchSelectChange(e.target.value)}
          >
            <option>Buscar por...</option>
            {Object.entries(searchOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {searchSelect === "createdAt" ? (
            <DatePicker
              className="form-control mt-2"
              placeholderText="Seleccione la fecha"
              selected={datePickerValue}
              onChange={(date) => onInputChange({ target: { name: "datePickerValue", value: date } })}
            />
          ) : (
            <InputComponent
              type="text"
              placeholder="Palabras claves..."
              name="search"
              value={search}
              onChange={onInputChange}
            />
          )}

          <div>

            <button className="btn btn-primary mt-2" onClick={handleSearch}>Buscar</button>
          </div>

        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2>Lista de trabajos</h2>
            <table className="table m-3 col-6 ">
              <thead>
                <tr>
                  <th>Matricula</th>
                  <th>Cliente</th>
                  <th>CI</th>
                  <th>Fecha</th>
                  <th>Tecnico</th>
                </tr>
              </thead>
              <tbody>

                {works
                  .slice((currentPage - 1) * worksPerPage, currentPage * worksPerPage)
                  .map((work) => (
                    <React.Fragment key={work.id}>
                      <tr onClick={() => handleRowClick(work)}>
                        <td>{work.matricula}</td>
                        <td>{`${work.client?.name || "N/A"} ${work.client?.lastname || "N/A"}`}</td>
                        <td>{work.client?.ci || "N/A"}</td>
                        <td>{work.createdAt ? format(new Date(work.createdAt), 'yyyy-MM-dd', { timeZone: 'UTC' }) : "N/A"}</td>
                        <td>{work.mechanic?.userName || "N/A"}</td>
                      </tr>


                      {(selectedWork === work || (editedWork && editedWork.id === work.id)) && (
                        <tr>
                          <td colSpan="8">
                            <WorkDetails
                              mechanicDetails={editedWork?.mechanicDetails || work.mechanic}
                              clientDetails={editedWork?.clientDetails || work.client}
                              carsModelDetails={editedWork?.carsModelDetails || work.carsModel}
                              work={editedWork || work}
                              isEditing={editedWork?.isEditing}
                              onEditClick={() => handleEditClick(work)}
                              onSaveClick={() => handleSaveClick(work)}
                              handleSaveClick={handleSaveClick}
                            />

                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary m-3"
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            className="btn btn-primary m-3"
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}



export default BusquedaTrabajo
