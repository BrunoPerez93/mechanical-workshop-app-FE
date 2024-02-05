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


  const [mechanicDetails, setMechanicDetails] = useState({});
  const [clientDetails, setClientDetails] = useState({});

  const searchOptions = {
    matricula: 'Matricula',
    ci: 'CI',
    createdAt: 'Fecha',
    mechanicName: 'Tecnico',
    clientName: 'Cliente',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worksResponse, mechanicsResponse, clientsResponse] = await Promise.all([
          apiCall("works", "GET"),
          apiCall("mechanics", "GET"),
          apiCall("clients", "GET"),
        ]);

        if (worksResponse.ok) {
          const workList = await worksResponse.json();
          setWorks(workList);
        } else {
          console.error("Error in works response", worksResponse.statusText);
        }

        if (mechanicsResponse.ok) {
          const mechanicsList = await mechanicsResponse.json();
          const mechanicsDetailsMap = {};
          mechanicsList.forEach((mechanic) => {
            mechanicsDetailsMap[mechanic.id] = mechanic;
          });
          setMechanicDetails(mechanicsDetailsMap);
        } else {
          console.error("Error in mechanics response", mechanicsResponse.statusText);
        }

        if (clientsResponse.ok) {
          const clientList = await clientsResponse.json();
          const clientDetailsMap = {};
          clientList.forEach((client) => {
            clientDetailsMap[client.id] = client;
          });
          setClientDetails(clientDetailsMap);
        } else {
          console.error("Error in clients response", clientsResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

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

  const fetchMechanicDetails = async (mechanicId) => {
    try {
      const mechanicResponse = await apiCall("mechanics", "GET");
      if (mechanicResponse.ok) {
        const mechanicDetail = await mechanicResponse.json();

        return { [mechanicId]: mechanicDetail };
      } else {
        console.error("Error fetching mechanic details", mechanicResponse.statusText);
      }
    } catch (error) {
      console.error("Error fetching mechanic details", error);
    }
  };

  const fetchClientDetails = async (clientId) => {
    try {
      const clientResponse = await apiCall("clients", "GET", null, { id: clientId });
      if (clientResponse.ok) {
        const clientDetail = await clientResponse.json();
        return { [clientId]: clientDetail };
      } else {
        console.error("Error fetching client details", clientResponse.statusText);
      }
    } catch (error) {
      console.error("Error fetching client details", error);
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

    await fetchWorks({ [searchSelect]: searchSelect === "createdAt" ? formattedDate : search });

   /*  await fetchWorks({ [searchSelect]: search }); */
    /* await fetchWorks({ [searchSelect]: '2024-01-31T00:00:00Z' }); */

  };

  const handleRowClick = async (work) => {
    setSelectedWork((prevSelectedWork) => (prevSelectedWork === work ? null : work));

    const fetchClientPromise = work.clientId ? fetchClientDetails(work.clientId) : Promise.resolve();
    const fetchMechanicPromise = work.mechanicId ? fetchMechanicDetails(work.mechanicId) : Promise.resolve();

    await Promise.all([fetchClientPromise, fetchMechanicPromise]);
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
                {works.map((work) => (
                  <React.Fragment key={work.id}>
                    <tr onClick={() => handleRowClick(work)}>
                      <td>{work.matricula}</td>
                      <td>{`${clientDetails[work.clientId]?.name || "N/A"} ${clientDetails[work.clientId]?.lastname || "N/A"}`}</td>
                      <td>{clientDetails[work.clientId]?.ci || "N/A"}</td>
                      <td>{work.createdAt ? format(new Date(work.createdAt), 'yyyy-MM-dd', { timeZone: 'UTC' }) : "N/A"}</td>
                      <td>{mechanicDetails[work.mechanicId]?.userName || "N/A"}</td>
                    </tr>
                    {selectedWork === work && (
                      <tr>
                        <td colSpan="8">
                          <WorkDetails
                            mechanicDetails={mechanicDetails[selectedWork.mechanicId]}
                            clientDetails={clientDetails[selectedWork.clientId]}
                            work={selectedWork}
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
      </div>
    </div>
  )
}



export default BusquedaTrabajo
