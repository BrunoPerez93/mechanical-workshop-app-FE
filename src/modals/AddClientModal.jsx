
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AddClientModal = ({
  show,
  handleClose,
  handleSaveClient,
  onInputChange,
  name,
  lastname,
  ci,
  ciError,
  clientErrorMessage,
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
            value={name}
            onChange={onInputChange}
            onInvalid={handleInvalid}
            required
          />
          <input
            type="text"
            className="form-control m-2"
            placeholder="Apellido del Cliente"
            name="lastname"
            value={lastname}
            onChange={onInputChange}
            onInvalid={handleInvalid}
            required
          />
          <input
            type="text"
            className="form-control m-2"
            placeholder="Cedula o RUT"
            name="ci"
            value={ci}
            onChange={onInputChange}
          />
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
};

export default AddClientModal;
