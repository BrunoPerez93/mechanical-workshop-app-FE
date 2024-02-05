import PropTypes from "prop-types";

export const WorkDetails = ({ mechanicDetails, clientDetails, work }) => {
  const {
    matricula,
    km,
    cel,
    reclame,
    autoParts,
    observations,
    handWork,
    priceAutoParts,
    total,
    abs,
    engine,
    airbag,
    steer,
    ta,
    goodPayer,
    badPayer,
    normalPayer,
  } = work;

  console.log('mechanicDetails',mechanicDetails);
  console.log('clientDetails',clientDetails);

  const displayStatus = (value) => (value ? " TIENE" : " NO TIENE");

  
  const displayStatusPayers = (value) => (value ? " ES" : " NO ES");

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


  return (
    <div>
      <h3>Detalles del Trabajo</h3>
      <p> <span style={{ fontWeight: 'bold' }}>Matricula:</span> {matricula}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Nombre Cliente:</span> {clientDetails.name}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Ci:</span> {clientDetails.ci}</p>
      <p> <span style={{ fontWeight: 'bold' }}>KM:</span> {km}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Celular: </span>{cel}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Reclamo: </span>{reclame}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Repuestos:</span> {autoParts}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Observaciones: </span>{observations}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Nombre del Técnico:</span> {mechanicDetails.userName}</p>
      <p> <span style={{ fontWeight: 'bold' }}>ABS:</span> {displayStatus(abs)}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Motor:</span> {displayStatus(engine)}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Airbag:</span> {displayStatus(airbag)}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Direccion:</span> {displayStatus(steer)}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Ta: </span>{displayStatus(ta)}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Buen Pagador: </span>
        {displayStatusPayers(goodPayer)}
        <span style={getStatusStyleGood(goodPayer)}></span>
      </p>
      <p> <span style={{ fontWeight: 'bold' }}>Mal Pagador:</span>
        {displayStatusPayers(badPayer)}
        <span style={getStatusStyleBad(badPayer)}></span>
      </p>
      <p> <span style={{ fontWeight: 'bold' }}>Normal Pagador:</span>
        {displayStatusPayers(normalPayer)}
        <span style={getStatusStyleNormal(normalPayer)}></span>
      </p>
      <p> <span style={{ fontWeight: 'bold' }}>Mano de obra: </span>{handWork}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Precio de repuesto: </span>{priceAutoParts}</p>
      <p> <span style={{ fontWeight: 'bold' }}>Total:</span> {total}</p>
    </div>
  );
};

WorkDetails.propTypes = {
  mechanicDetails: PropTypes.object,
  clientDetails: PropTypes.object,
  work: PropTypes.object.isRequired
};
