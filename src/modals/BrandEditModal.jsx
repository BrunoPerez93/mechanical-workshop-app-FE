
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const BrandEditModal = ({
  show,
  handleClose,
  handleSaveBrandEdit,
  onInputChange,
  brandEditMessage,
  selectedBrandId,
  brandName,
  brandEditMessageError,
}) => {

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
     
          {brandEditMessage && <div className="alert alert-success">{brandEditMessage}</div>}
          {brandEditMessageError && <div className="alert alert-danger">{brandEditMessageError}</div>}
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
  brandName: PropTypes.string,
  brandEditMessageError: PropTypes.string,
};

export default BrandEditModal;
