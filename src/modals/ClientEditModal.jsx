
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ClientEditModal = ({
  show,
  handleClose,
  clientEditMessage,
  onInputChange,
  selectedClientId,
  name,
  lastname,
  ci,
  cel,
  handleSaveClientEdit,
  clientEditMessageError,
}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Marca</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={(e) => handleSaveClientEdit(e, selectedClientId, name, lastname, ci, cel)}>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Nuevo Nombre Del Cliente"
            name="name"
            value={name || ''}
            onChange={onInputChange}
          />

          <input
            type="text"
            className="form-control m-2"
            placeholder="Nuevo Apellido Del Cliente"
            name="lastname"
            value={lastname || ''}
            onChange={onInputChange}
          />

          <input
            type="text"
            className="form-control m-2"
            placeholder="Nuevo Cedula Del Cliente"
            name="ci"
            value={ci || ''}
            onChange={onInputChange}
          />

          <input
            type="text"
            className="form-control m-2"
            placeholder="Nuevo Cel Del Cliente"
            name="cel"
            value={cel || ''}
            onChange={onInputChange}
          />

          {clientEditMessage && <div className="alert alert-success">{clientEditMessage}</div>}
          {clientEditMessageError && <div className="alert alert-danger">{clientEditMessageError}</div>}
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

ClientEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  clientEditMessage: PropTypes.string,
  selectedClientId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  lastname: PropTypes.string,
  ci: PropTypes.string,
  cel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleSaveClientEdit: PropTypes.func,
  clientEditMessageError: PropTypes.string,
};

export default ClientEditModal;
