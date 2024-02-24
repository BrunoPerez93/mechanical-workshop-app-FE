
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ModelEditModal = ({
  show,
  handleClose,
  handleSaveModelEdit,
  onCarNameChange,
  modelEditMessage,
  carName,
  modelEditMessageError
}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Modelo</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={handleSaveModelEdit}>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Nombre Modelo Nuevo"
            name="carName"
            value={carName || ''}
            onChange={onCarNameChange}
            required
          />
   
          {modelEditMessage && <div className="alert alert-success">{modelEditMessage}</div>}
          {modelEditMessageError && <div className="alert alert-danger">{modelEditMessageError}</div>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Modelo
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ModelEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveModelEdit: PropTypes.func.isRequired,
  onCarNameChange: PropTypes.func.isRequired,
  modelEditMessage: PropTypes.string,
  handleModelChange: PropTypes.func.isRequired,
  models: PropTypes.array.isRequired,
  carName: PropTypes.string,
  selectedModelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modelEditMessageError: PropTypes.string,
};

export default ModelEditModal;
