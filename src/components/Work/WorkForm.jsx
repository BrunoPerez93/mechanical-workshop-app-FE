import SelectComponent from "../SelectComponent";
import InputComponent from "../InputComponent";
import CheckboxGroup from "../CheckBoxGroup";
import PropTypes from "prop-types";
import { useAuth } from "../Context/AuthContext";
import { validateAdminRole } from "../../utility/common";

const WorkForm = ({
  brands,
  models,
  clients,
  mechanics,
  handleBrandChange,
  handleModelChange,
  handleAgregarBrand,
  handleAgregarModel,
  handleTrabajoSubmit,
  formState,
  handleCheckbox,
  onInputChange,
  handleAgregarClient,
  handleClientChange,
  handleMechanicChange,
  errorMessage,
  handleEditBrand,
  handleEditModel
}) => {
  const {
    matricula,
    km,
    cel,
    reclame,
    autoParts,
    observations,
    handWork,
    priceAutoParts,
    total,
  } = formState;

  const testigoData = {
    abs: formState.abs || false,
    engine: formState.engine || false,
    airbag: formState.airbag || false,
    steer: formState.steer || false,
    ta: formState.ta || false,
    goodPayer: formState.goodPayer || false,
    badPayer: formState.badPayer || false,
    normalPayer: formState.normalPayer || false,
    notAccepted: formState.notAccepted || false,
  };


  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const { state } = useAuth();

  //#region Sorted data

  const sortedBrands = brands.length > 0
    ? brands.map((brand) => ({ value: brand.id, label: brand.brandName })).sort((a, b) => a.label.localeCompare(b.label))
    : [];

  const sortedModels = models.map((model) => ({ value: model.id, label: model.carName })).sort((a, b) => a.label.localeCompare(b.label));

  const sortedClients = clients.map((client) => ({
    value: client.id,
    label: `${client.name} ${client.lastname}` + `${client.ci ? ' ' + client.ci : '' }`
  })).sort((a, b) => a.label.localeCompare(b.label));

  const sortedMechanics = mechanics.map((mechanic) => ({ value: mechanic.id, label: mechanic.userName })).sort((a, b) => a.label.localeCompare(b.label));

  //#endregion

  return (
    <form onSubmit={handleTrabajoSubmit}>
      <div className="title">
        <h1>Detalles del trabajo</h1>
        <span>Fecha: {formattedDate}</span>
      </div>

      <div className="container">
        <div className="row">
          {/* MARCA */}
          <div className="col-xs-6 col-md-6 d-flex required required">
            <h2>Marca</h2>
            <SelectComponent
              options={sortedBrands}
              value={brands.brandId}
              onChange={handleBrandChange}
            />
            <button className="btn btn-primary m-2" onClick={handleAgregarBrand}>Agregar</button>
            {validateAdminRole(state.user.role) && (
              <button className="btn btn-primary m-2" onClick={handleEditBrand}>Editar</button>
            )}
          </div>

          {/* MODELO */}
          <div className="col-xs-6 col-md-6 d-flex">
            <h2>Modelo</h2>
            <SelectComponent
              options={sortedModels}
              value={formState.carModelId}
              onChange={handleModelChange}

            />
            <button className="btn btn-primary m-2" onClick={handleAgregarModel}>Agregar</button>
            {validateAdminRole(state.user.role) && (
              <button className="btn btn-primary m-2" onClick={handleEditModel}>Editar</button>
            )}
          </div>

          {/* MATRICULA */}
          <div className="d-flex col-xs-6 col-md-6">
            <h2>Matriucla</h2>
            <InputComponent
              type="text"
              name="matricula"
              value={matricula}
              placeholder="matricula"
              onChange={onInputChange}

            />
          </div>

          {/* KM */}
          <div className="d-flex col-xs-6 col-md-6">
            <h2>KM</h2>
            <InputComponent
              type="number"
              placeholder="km"
              name="km"
              value={km}
              onChange={onInputChange}
              required
            />
          </div>

          {/* CLIENTE */}
          <div className="d-flex col-xs-6 col-md-6">
            <h2>Cliente</h2>
            <SelectComponent
              options={sortedClients}
              value={clients.id}
              onChange={handleClientChange}
              required
            />
            <button className="btn btn-primary m-2" onClick={handleAgregarClient}>Agregar</button>
          </div>

          {/* CELULAR */}
          <div className="d-flex col-xs-6 col-md-6">
            <h2>Celular</h2>
            <InputComponent
              type="number"
              placeholder="celular"
              name="cel"
              value={cel}
              onChange={onInputChange}
              required
            />
          </div>

          <CheckboxGroup
            options={Object.keys(testigoData).map(key => ({ key, label: key }))}
            onCheckboxChange={handleCheckbox}
          />

          {/* RECLAMOS */}
          <div className="form-floating">
            <h3>Fallos según reclamación del cliente</h3>
            <textarea
              className="form-control m-2"
              name="reclame"
              value={reclame}
              onChange={onInputChange}
              style={{ height: '100px' }}
              required
            />
          </div>

          {/* REPUESTOS */}
          <div className="form-floating">
            <h3>Repuestos: nuevo, alternativo, original o suministrado por el cliente</h3>
            <textarea
              className="form-control m-2"
              name="autoParts"
              value={autoParts}
              onChange={onInputChange}
              style={{ height: '100px' }}
              required
            />
          </div>

          {/* OBSERVACIONES */}
          <div className="form-floating">
            <h3>Observaciones</h3>
            <textarea
              className="form-control m-2"
              name="observations"
              value={observations}
              onChange={onInputChange}
              style={{ height: '100px' }}
              required
            />
          </div>

          {/* MECANICOS */}
          <h2>Técnico</h2>
          <SelectComponent
            options={sortedMechanics}
            value={mechanics.id}
            onChange={handleMechanicChange}
            required
          />

          {/* PRECIOS */}
          <h2>Precios</h2>
          <div>
            <h4>Mano de obra</h4>
            <InputComponent
              type="number"
              placeholder="Precio"
              name="handWork"
              value={handWork}
              onChange={onInputChange}
              required
            />
          </div>

          <div>
            <h4>Repuesto</h4>
            <InputComponent
              type="number"
              placeholder="Precio"
              name="priceAutoParts"
              value={priceAutoParts}
              onChange={onInputChange}
              required
            />
          </div>

          <div>
            <h4>Total</h4>
            <InputComponent
              type="number"
              placeholder="Total"
              name="total"
              value={total}
              onChange={onInputChange}
            />
          </div>
          {errorMessage && <div className="alert alert-danger error-message m-2">{errorMessage}</div>}

          <button type="submit" className="btn btn-primary m-2" >Registrar</button>

        </div>
      </div>
    </form>
  );
};

WorkForm.propTypes = {
  brands: PropTypes.array.isRequired,
  clients: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  mechanics: PropTypes.array.isRequired,
  handleBrandChange: PropTypes.func,
  handleModelChange: PropTypes.func.isRequired,
  handleAgregarBrand: PropTypes.func.isRequired,
  handleAgregarModel: PropTypes.func.isRequired,
  handleTrabajoSubmit: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleAgregarClient: PropTypes.func.isRequired,
  handleClientChange: PropTypes.func.isRequired,
  handleMechanicChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleEditBrand: PropTypes.func,
  handleEditModel: PropTypes.func,
};

export default WorkForm;
