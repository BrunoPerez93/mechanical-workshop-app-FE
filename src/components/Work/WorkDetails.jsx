import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import checkMark from '../../assets/check-mark.png'
import crossMark from '../../assets/cross-mark.png'
import { apiCall, validateAdminRole } from "../../utility/common";
import { useAuth } from "../Context/AuthContext";

export const WorkDetails = ({
  mechanicDetails,
  clientDetails,
  work,
  carsModelDetails,
  isEditing,
  onEditClick,
  onSaveClick,
  handleSaveClick,
}) => {

  const [mechanicsData, setMechanicsData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [carsModelsData, setCarsModelsData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(work.total || 0);

  const { state } = useAuth();

  const fieldLabels = {
    matricula: 'Matricula',
    km: 'KM',
    abs: 'ABS',
    engine: 'Motor',
    airbag: 'Airbag',
    steer: 'Direccion',
    ta: 'TA',
    goodPayer: 'Buen Pagador',
    badPayer: 'Mal Pagador',
    normalPayer: 'Pagador Normal',
    cel: 'Celular',
    reclame: 'Reclamo',
    autoParts: 'Repuestos',
    observations: 'Observaciones',
    handWork: 'Mano de obra',
    priceAutoParts: 'Precio Repuestos',
    total: 'Total Presupuesto',
  }


  const displayStatus = (value) => (value
    ? <img src={checkMark} alt="Check Mark" style={{ width: '15px', height: '15px', marginLeft: '10px' }} />
    : <img src={crossMark} alt="Cross Mark" style={{ width: '15px', height: '15px', marginLeft: '10px' }} />);


  const displayStatusPayers = (value) => (value
    ? <img src={checkMark} alt="Check Mark" style={{ width: '15px', height: '15px', marginLeft: '10px' }} />
    : <img src={crossMark} alt="Cross Mark" style={{ width: '15px', height: '15px', marginLeft: '10px' }} />);

  const getStatusStyleGood = (value) => ({
    display: "inline-block",
    width: "15px",
    height: "15px",
    backgroundColor: value ? "green" : "transparent",
    marginLeft: "10px"
  });

  const getStatusStyleBad = (value) => ({
    display: "inline-block",
    width: "15px",
    height: "15px",
    backgroundColor: value ? "red" : "transparent",
    marginLeft: "10px"
  });

  const getStatusStyleNormal = (value) => ({
    display: "inline-block",
    width: "15px",
    height: "15px",
    backgroundColor: value ? "yellow" : "transparent",
    marginLeft: "10px"
  });

  const handleFieldChange = (fieldName, value) => {
    setEditedFields((prevEditedFields) => {
      const updatedFields = { ...prevEditedFields };
      updatedFields[fieldName] = value;

      if (fieldName === 'handWork' || fieldName === 'priceAutoParts') {
        const handWork = parseFloat(updatedFields['handWork']) || parseFloat(work.handWork) || 0;
        const priceAutoParts = parseFloat(updatedFields['priceAutoParts']) || parseFloat(work.priceAutoParts) || 0;
        const newTotal = handWork + priceAutoParts;
        setTotal(newTotal);
        updatedFields['total'] = newTotal;
      }
      return updatedFields;
    });
  };

  handleSaveClick = () => {
    const updatedWork = {
      ...work,
      ...editedFields,
    };

    console.log('Before onSaveClick:', updatedWork);
    onSaveClick(updatedWork);
  };

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const mechanicsResponse = await apiCall("mechanics", "GET");
        const clientsResponse = await apiCall("clients", "GET");
        const carsModelsResponse = await apiCall("carsModels", "GET");
        const brandsResponse = await apiCall("brands", "GET");


        const mechanicsList = await mechanicsResponse.json();
        const clientsList = await clientsResponse.json();
        const carsModelsList = await carsModelsResponse.json();
        const brandsList = await brandsResponse.json();

        setMechanicsData(mechanicsList);
        setClientsData(clientsList);
        setCarsModelsData(carsModelsList);
        setBrandsData(brandsList);

        const initialEditedFields = {
          ...work,
          mechanic: mechanicDetails || "",
          client: clientDetails || "",
          carsModel: carsModelDetails || "",
       
        };

        setEditedFields(initialEditedFields);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    fetchWorks();
  }, [work, carsModelDetails, clientDetails, mechanicDetails,]);


  if (isLoading) {
    return <p>Loaging...</p>
  }
  return (
    <div>
      <h3>Detalles del Trabajo</h3>
      {isEditing && (
        <div className="container ">
          <div className="row ">
            <form onSubmit={handleSaveClick} className="m-2">
              {Object.keys(work).map((fieldName) => {
                if (
                  [
                    "id",
                    "mechanicId",
                    "carModelId",
                    "clientId",
                    "createdAt",
                    "isEditing",
                  ].includes(fieldName)
                ) {
                  return null;
                }

                const label = fieldLabels[fieldName] || fieldName;
                if (fieldName === 'mechanic' && work[fieldName] && typeof work[fieldName] === 'object') {
                  return (
                    <div key={fieldName} className="form-group col-sm-12 col-md-12">
                      <label>Mecanico:</label>
                      <select
                        className="form-control"
                        value={editedFields[fieldName]?.id || ""}
                        onChange={(e) => handleFieldChange(fieldName, { ...work[fieldName], id: e.target.value })}
                      >
                        {mechanicsData.map((mechanic) => (
                          <option key={mechanic.id} value={mechanic.id}>
                            {mechanic.userName}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (fieldName === 'client' && work[fieldName] && typeof work[fieldName] === 'object') {
                  return (
                    <div key={fieldName} className="form-group col-sm-12 col-md-12">
                      <label>Cliente:</label>
                      <select
                        className="form-control"
                        value={editedFields[fieldName]?.id || ""}
                        onChange={(e) => handleFieldChange(fieldName, { ...work[fieldName], id: e.target.value })}
                      >
                        {clientsData.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name} {client.lastname}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (fieldName === 'carsModel' && work[fieldName] && typeof work[fieldName] === 'object') {
                  return (
                    <>
                      <div key={fieldName} className="form-group col-sm-12 col-md-12">
                        <label>Marca:</label>
                        <select
                          className="form-control"
                          value={editedFields[fieldName]?.id || ""}
                          onChange={(e) => handleFieldChange(fieldName, { ...work[fieldName], id: e.target.value })}
                        >
                          {brandsData.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {work.carsModel.brand.brandName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div key={`${fieldName}-model`} className="form-group col-sm-12 col-md-12">
                        <label>Modelo:</label>
                        <select
                          className="form-control"
                          value={editedFields[fieldName]?.id || ""}
                          onChange={(e) => handleFieldChange(fieldName, { ...work[fieldName], id: e.target.value })}
                        >
                          {carsModelsData.map((carModel) => (
                            <option key={carModel.id} value={carModel.id}>
                              {carModel.carName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  );
                }


                if (typeof work[fieldName] === "boolean") {
                  return (
                    <div key={fieldName} className="form-group">
                      <label>
                        {label}
                        <input
                          className="form-check-input m-2 "
                          type="checkbox"
                          checked={editedFields[fieldName] !== undefined ? editedFields[fieldName] : work[fieldName]}
                          onChange={(e) => handleFieldChange(fieldName, e.target.checked)}
                        />
                      </label>
                    </div>
                  );
                }

                return (

                  <div key={fieldName} className="form-group col-sm-12 col-md-12">
                    <label>{label}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedFields[fieldName] ?? work[fieldName]}
                      onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                    />
                  </div>

                );
              })}
              <button type="submit" className="btn btn-primary m-2">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
      {!isEditing && (
        <div>
          <p> <span style={{ fontWeight: 'bold' }}>Matricula:</span> {work.matricula}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Nombre Cliente:</span> {`${clientDetails.name} ${clientDetails.lastname}`}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Celular: </span>{work.cel}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Ci:</span> {clientDetails.ci}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Marca:</span> {carsModelDetails.brand.brandName}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Modelo:</span> {carsModelDetails.carName}</p>
          <p> <span style={{ fontWeight: 'bold' }}>KM:</span> {work.km}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Reclamo: </span>{work.reclame}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Repuestos:</span> {work.autoParts}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Observaciones: </span>{work.observations}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Nombre del Técnico:</span> {mechanicDetails.userName}</p>

          {validateAdminRole(state.user?.role) && (
            <>
              <p> <span style={{ fontWeight: 'bold' }}>Mano de obra: </span>$ {work.handWork}</p>
              <p > <span style={{ fontWeight: 'bold' }}>Precio de repuesto: </span>$ {work.priceAutoParts}</p>
            </>
          )}

          <p> <span style={{ fontWeight: 'bold' }}>Total Presupuesto:</span> $ {total}</p>
          <p> <span style={{ fontWeight: 'bold' }}>ABS:</span> {displayStatus(work.abs)}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Motor:</span> {displayStatus(work.engine)}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Airbag:</span> {displayStatus(work.airbag)}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Direccion:</span> {displayStatus(work.steer)}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Ta: </span>{displayStatus(work.ta)}</p>
          <p> <span style={{ fontWeight: 'bold' }}>Buen Pagador: </span>
            {displayStatusPayers(work.goodPayer)}
            <span style={getStatusStyleGood(work.goodPayer)}></span>
          </p>
          <p> <span style={{ fontWeight: 'bold' }}>Mal Pagador:</span>
            {displayStatusPayers(work.badPayer)}
            <span style={getStatusStyleBad(work.badPayer)}></span>
          </p>
          <p> <span style={{ fontWeight: 'bold' }}>Pagador Normal:</span>
            {displayStatusPayers(work.normalPayer)}
            <span style={getStatusStyleNormal(work.normalPayer)}></span>
          </p>
        </div>

      )}

      {!isEditing && validateAdminRole(state.user?.role) && (

        <button className="btn btn-primary" onClick={onEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

WorkDetails.propTypes = {
  mechanicDetails: PropTypes.object,
  clientDetails: PropTypes.object,
  carsModelDetails: PropTypes.object.isRequired,
  work: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
  onEditClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
};
