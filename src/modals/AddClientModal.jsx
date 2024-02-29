
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
// import InputComponent from "../components/InputComponent";

const AddClientModal = ({
  show,
  handleClose,
  handleSaveClient,
  onInputChange,
  ciError,
  clientErrorMessage,
  name,
  lastname,
  ci,
  cel,
}) => {

  const handleInvalid = (e) => {
    e.target.setCustomValidity('El parametro es requerido.');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={handleSaveClient}>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Nombre del Cliente"
            name="name"
            value={name || ''}
            onChange={onInputChange}
            onInvalid={handleInvalid}

          />
          <input
            type="text"
            className="form-control m-2"
            placeholder="Apellido del Cliente"
            name="lastname"
            value={lastname || ''}
            onChange={onInputChange}
            onInvalid={handleInvalid}

          />        
          <input
            type="text"
            className="form-control m-2"
            placeholder="Cedula o RUT"
            name="ci"
            value={ci || ''}
            onChange={onInputChange}
          />
            <div>
            <input
             className="form-control m-2"
              type="number"
              placeholder="Celular"
              name="cel"
              value={cel || ''}
              onChange={onInputChange}

            />
          </div>

          {ciError && <div className="alert alert-danger error-message">{ciError}</div>}
          {clientErrorMessage && <div className="alert alert-danger error-message">{clientErrorMessage}</div>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cliente
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

AddClientModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveClient: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  lastname: PropTypes.string,
  ci: PropTypes.string,
  ciError: PropTypes.string,
  clientErrorMessage: PropTypes.string,
  cel: PropTypes.number,
  // formState: PropTypes.object.isRequired,
};

export default AddClientModal;
