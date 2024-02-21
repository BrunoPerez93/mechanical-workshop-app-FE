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
  const [updateMessage, setUpdateMessage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const worksPerPage = 10;
  const totalPages = works.length > 0 ? Math.ceil(works.length / worksPerPage) : 0;

  const [editedWork, setEditedWork] = useState(null);


  const searchOptions = {
    matricula: 'Matricula',
    brandName: 'Marca',
    createdAt: 'Fecha',
    mechanicName: 'Tecnico',
    clientName: 'Cliente',
  };

  const handleSaveClick = async (e) => {
    try {
      e.preventDefault()
      const { ...workData } = editedWork;

      setEditedWork((prevEditedWork) => {
        const updatedWork = { ...prevEditedWork };
        return updatedWork;
      });

      const response = await apiCall(
        `works/${editedWork.id}`,
        'PUT',
        JSON.stringify(workData),
      );
      if (response.ok) {
        setEditedWork()
        setUpdateMessage('Trabajo Modificado')
        setTimeout(() => {
          setUpdateMessage('')
        }, 5000)

      } else {
        console.error('Error saving work:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error saving work:', error);
    }
  };

  useEffect(() => {
    if (editedWork !== null) {
      fetchWorks();
    }
  }, [editedWork]);


  const fetchWorks = async (filter) => {
    try {
      const response = await apiCall("works", "GET", null, filter);

      if (response.ok) {
        const workList = await response.json();
        setWorks(workList);

      } else {
        console.error(
          "Error in response when fetching works:",
          response.statusText
        );

      }
    } catch (error) {
      console.error("Error fetching works:", error);

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


    await fetchWorks(filter);

  };

  const handleRowClick = (work) => {
    setSelectedWork((prevSelectedWork) => (prevSelectedWork === work ? null : work));
    setEditedWork(null);
  };

  const handleEditClick = (work) => {
    setEditedWork({ ...work, isEditing: true });
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedWork((prevEditedWork) => ({
      ...prevEditedWork,
      [fieldName]: value,
    }));
  };


  useEffect(() => {
    fetchWorks();
  }, [currentPage]);



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
        <div className="row mt-4">
          <div className="text-center">
            <h2>Lista de trabajos</h2>
            {updateMessage && <div className="alert alert-success">{updateMessage}</div>}
            <table className="table table-striped m-3">
              <thead>
                <tr>
                  <th>Matricula</th>
                  <th>Cliente</th>
                  <th>Marca</th>
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
                        <td>{work.carsModel?.brand?.brandName || "N/A"}</td>
                        <td>{work.createdAt ? format(new Date(work.createdAt), 'yyyy-MM-dd', { timeZone: 'UTC' }) : "N/A"}</td>
                        <td>{work.mechanic?.userName || "N/A"}</td>
                      </tr>


                      {(selectedWork === work || (editedWork && editedWork.id === work.id)) && (
                        <tr>
                          <td colSpan="8">
                            <WorkDetails
                              mechanicDetails={editedWork?.mechanicDetails || selectedWork?.mechanic}
                              clientDetails={editedWork?.clientDetails || selectedWork?.client}
                              carsModelDetails={editedWork?.carsModelDetails || selectedWork?.carsModel}
                              work={editedWork || selectedWork}
                              isEditing={editedWork?.isEditing}
                              onEditClick={() => handleEditClick(work)}
                              onSaveClick={handleSaveClick}
                              onFieldChange={(fieldName, value) => handleFieldChange(fieldName, value)}

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
        <div className="container">
          <div className="row text-center">
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary m-3"
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1 || totalPages === 0}
              >
                Anterior
              </button>
              <span>Página {totalPages > 0 ? currentPage : 0} de {totalPages}</span>
              <button
                className="btn btn-primary m-3"
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default BusquedaTrabajo
