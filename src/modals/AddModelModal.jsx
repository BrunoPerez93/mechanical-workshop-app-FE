
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
  handleBrandChange={handleBrandChange},
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Modelo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSaveModels}>
          <div className="form-group">
            <label>Nombre del Modelo</label>
            <input
              type="text"
              className="form-control m-2"
              placeholder="Nombre del Model"
              name="carName"
              value={carName}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>Marca</label>
            <SelectComponent
              options={brands && brands.map((brand) => ({ value: brand.id, label: brand.brandName }))}
              onChange={handleBrandChange}
              value={brands && brands.brandName} // Assuming carName represents the selected brand ID
            />
          </div>
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
  carName: PropTypes.string.isRequired,
  handleBrandChange: PropTypes.func.isRequired,
  brands: PropTypes.array.isRequired,

};

export default AddModelModal;
