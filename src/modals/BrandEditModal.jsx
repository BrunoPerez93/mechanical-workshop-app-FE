
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import SelectComponent from "../components/SelectComponent";

const BrandEditModal = ({
  show,
  handleClose,
  handleSaveBrandEdit,
  onInputChange,
  brandEditMessage,
  selectedBrandId,
  handleBrandChange,
  brands,
  brandName,
}) => {

  const sortedBrands = brands.length > 0
  ? brands.map((brand) => ({ value: brand.id, label: brand.brandName })).sort((a, b) => a.label.localeCompare(b.label))
  : [];


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Marca</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={(e) => handleSaveBrandEdit(e, selectedBrandId, brandName)}>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Nuevo Nombre De La Marca"
            name="brandName"
            value={brandName || ''}
            onChange={onInputChange}
            required
          />
          <div className="form-group">
            <label>Marca</label>
            <SelectComponent
              options={sortedBrands}
              value={selectedBrandId || ''}
              onChange={handleBrandChange}
              required
            />
          </div>
          {brandEditMessage && <div className="alert alert-success">{brandEditMessage}</div>}
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

BrandEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveBrandEdit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  brandEditMessage: PropTypes.string,
  selectedBrandId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleBrandChange: PropTypes.func.isRequired,
  brands: PropTypes.array.isRequired,
  brandName: PropTypes.string,
};

export default BrandEditModal;
