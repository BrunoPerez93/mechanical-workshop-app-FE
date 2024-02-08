
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AddBrandModal = ({
  show,
  handleClose,
  handleSaveBrand,
  onInputChange,
  brandName,
  brandError,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Marca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSaveBrand}>
          <input
            type="text"
            className="form-control m-2"
            placeholder="Nombre del Marca"
            name="brandName"
            value={brandName}
            onChange={onInputChange}
            required
          />
           {brandError && <div className="alert alert-danger error-message">{brandError}</div>}
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

AddBrandModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveBrand: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  brandName: PropTypes.string,
  brandError: PropTypes.string,
};

export default AddBrandModal;
