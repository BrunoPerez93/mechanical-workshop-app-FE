import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import checkMark from '../../assets/check-mark.png'
import crossMark from '../../assets/cross-mark.png'
import { validateAdminRole, validateManagementMinimumRole, validateMechanicRole } from "../../utility/common";
import { useAuth } from "../Context/AuthContext";
import InputComponent from "../InputComponent";
import PrintButton from "../PrintButton";

export const WorkDetails = ({
  mechanicDetails,
  clientDetails,
  work,
  carsModelDetails,
  isEditing,
  onEditClick,
  onSaveClick,
  onFieldChange,
}) => {

  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
    notAccepted: 'No Aceptado',
    cel: 'Celular',
    reclame: 'Reclamo',
    autoParts: 'Repuestos',
    observations: 'Observaciones',
    handWork: 'Mano de obra',
    priceAutoParts: 'Precio Repuestos',
    total: 'Total Presupuesto',
  }

  //#region Styles

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

  //#endregion

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const editedFieldsData = {
          ...work,
          mechanic: work.mechanicId ? work.mechanicId.userName || "" : "",
          client: work.clientId ? work.clientId.name || "" : "",
          carsModel: work.carsModelId ? work.carsModelId.carName || "" : "",
          brand: work.carsModel && work.carsModel.brand ? work.carsModel.brand.brandName || "" : ""
        };

        setEditedFields(editedFieldsData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);

    };
    fetchWorks();
  }, [work]);

  if (isLoading) {
    return <p>Loaging...</p>
  }
  return (
    <div>
      <h3>Detalles del Trabajo</h3>
      {isEditing && (validateAdminRole(state.user?.role) || validateMechanicRole(state.user?.role)) && (
        <div className="container ">
          <div className="row ">
            <form onSubmit={onSaveClick} className="m-2">
              {Object.keys(work).map((fieldName) => {
                if (
                  [
                    "id",
                    "mechanicId",
                    "carModelId",
                    "clientId",
                    "createdAt",
                    "isEditing",
                     "mechanic",
                    "carsModel",
                    "client"
                  ].includes(fieldName)
                ) {
                  return null;
                }

                const label = fieldLabels[fieldName] || fieldName;


                if (validateAdminRole(state.user?.role) || (validateMechanicRole(state.user?.role) && (fieldName === "observations" || fieldName === "autoParts"))) {
                  if (typeof work[fieldName] === "boolean") {
                    return (
                      <div key={fieldName} className="form-group mt-2 mb-2">
                        <label>
                          {label}
                          <input
                            className="form-check-input m-2"
                            type="checkbox"
                            checked={editedFields[fieldName] !== undefined ? editedFields[fieldName] : work[fieldName]}
                            onChange={(e) => onFieldChange(fieldName, e.target.checked)}
                          />
                        </label>
                      </div>
                    );
                  } else {
                    return (
                      <div key={fieldName} className="form-group col-sm-12 col-md-12 mt-2 mb-2">
                        <label>{label}</label>
                        <InputComponent
                          type="text"
                          className="form-control"
                          value={editedFields[fieldName] ?? work[fieldName]}
                          onChange={(e) => onFieldChange(fieldName, e.target.value)}
                        />
                      </div>
                    );
                  }
                } else {
                  return null;
                }
              })}
              <button type="submit" className="btn btn-primary m-2">
                Save
              </button>
            </form>
          </div>
        </div >
      )}
      {
        !isEditing && (
          <div>
            <p> <span style={{ fontWeight: 'bold' }}>Matricula:</span> {work.matricula}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Nombre Cliente:</span> {`${clientDetails.name} ${clientDetails.lastname}`}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Celular: </span>{clientDetails.cel}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Ci:</span> {clientDetails.ci}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Marca:</span> {carsModelDetails.brand.brandName}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Modelo:</span> {carsModelDetails.carName}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Año:</span> {work.year}</p>
            <p> <span style={{ fontWeight: 'bold' }}>KM:</span> {work.km}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Reclamo: </span>{work.reclame}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Repuestos:</span> {work.autoParts}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Observaciones: </span>{work.observations}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Nombre del Técnico:</span> {mechanicDetails ? mechanicDetails.userName || "N/A" : "N/A"}</p>

            {validateAdminRole(state.user?.role) && (
              <>
                <p> <span style={{ fontWeight: 'bold' }}>Mano de obra: </span>$ {work.handWork}</p>
                <p > <span style={{ fontWeight: 'bold' }}>Precio de repuesto: </span>$ {work.priceAutoParts}</p>
              </>
            )}

            {validateManagementMinimumRole(state.user?.role) && (
              <>
                <p> <span style={{ fontWeight: 'bold' }}>Total Presupuesto:</span> $ {work.total || 0}</p>
              </>
            )}

            <p> <span style={{ fontWeight: 'bold' }}>ABS:</span> {displayStatus(work.abs)}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Motor:</span> {displayStatus(work.engine)}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Airbag:</span> {displayStatus(work.airbag)}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Direccion:</span> {displayStatus(work.steer)}</p>
            <p> <span style={{ fontWeight: 'bold' }}>Ta: </span>{displayStatus(work.ta)}</p>
            <p> <span style={{ fontWeight: 'bold' }}>No Aceptado: </span>{displayStatus(work.notAccepted)}</p>
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

        )
      }

      {
        !isEditing && (validateAdminRole(state.user?.role) || validateMechanicRole(state.user?.role)) && (

          <div>
            <PrintButton />
            <button className="btn btn-primary" onClick={onEditClick}>
              Edit
            </button>
          </div>
        )

      }
    </div >
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
  onFieldChange: PropTypes.func.isRequired,
};
