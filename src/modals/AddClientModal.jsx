
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
}) => {
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
          />
          <input
            type="text"
            className="form-control m-2"
            placeholder="Apellido del Cliente"
            name="lastname"
            value={lastname}
            onChange={onInputChange}
          />
          <input
            type="text"
            className="form-control m-2"
            placeholder="Cedula del Cliente sin puntos ni guiones"
            name="ci"
            value={ci}
            onChange={onInputChange}
          />
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
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  ci: PropTypes.string.isRequired,
};

export default AddClientModal;
