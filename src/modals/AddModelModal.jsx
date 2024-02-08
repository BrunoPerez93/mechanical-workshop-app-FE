
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import SelectComponent from "../components/SelectComponent";

const AddModelModal = ({
  show,
  handleClose,
  handleSaveModels,
  onInputChange,
  carName,
  brands,
  handleBrandChange,
  modelData,
  selectedBrandId,
  modelError,

}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Modelo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => handleSaveModels(e, modelData.brandId)}>
          <div className="form-group">
            <label>Nombre del Modelo</label>
            <input
              type="text"
              className="form-control m-2"
              placeholder="Nombre del Model"
              name="carName"
              value={carName}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Marca</label>
            <SelectComponent
              options={
                brands.length > 0
                  ? brands.map((brand) => ({
                    value: brand.id,
                    label: brand.brandName
                  }))
                  : []}
              value={selectedBrandId || ''}
              onChange={handleBrandChange}
              required
            />
          </div>
          {modelError && <div className="error-message">{modelError}</div>}
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

AddModelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveModels: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  carName: PropTypes.string,
  handleBrandChange: PropTypes.func,
  brands: PropTypes.array.isRequired,
  selectedBrandId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modelData: PropTypes.object,
  modelError: PropTypes.string,
};

export default AddModelModal;
