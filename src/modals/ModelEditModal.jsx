
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import SelectComponent from "../components/SelectComponent";

const ModelEditModal = ({
  show,
  handleClose,
  handleSaveModelEdit,
  onCarNameChange,
  modelEditMessage,
  handleModelChange,
  selectedModelId,
  models,
  carName,
}) => {

  const sortedModels = models.map((model) => ({ value: model.id, label: model.carName })).sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Marca</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={handleSaveModelEdit}>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Nombre del Cliente"
            name="carName"
            value={carName || ''}
            onChange={onCarNameChange}
            required
          />
          <div className="form-group">
            <label>Modelo</label>
            <SelectComponent
              options={sortedModels}
              value={selectedModelId || ''}
              onChange={handleModelChange}
              required
            />
          </div>
          {modelEditMessage && <div className="alert alert-success">{modelEditMessage}</div>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Marca
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
};

export default ModelEditModal;
