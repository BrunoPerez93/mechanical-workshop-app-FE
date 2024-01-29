import SelectComponent from "../SelectComponent";
import InputComponent from "../InputComponent";
import CheckboxGroup from "../CheckBoxGroup";
import PropTypes from "prop-types";

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
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

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
              options={brands.length > 0 ? brands.map((brand) => ({ value: brand.id, label: brand.brandName })) : []}
              value={brands.brandName}
              onChange={handleBrandChange}
            />
            <button className="btn btn-primary m-2" onClick={handleAgregarBrand}>Agregar</button>
          </div>

          {/* MODELO */}
          <div className="col-xs-6 col-md-6 d-flex">
            <h2>Modelo</h2>
            <SelectComponent
              options={models.map((model) => ({ value: model.id, label: model.carName }))}
              value={models.carName}
              onChange={handleModelChange}
              required
            />
            <button className="btn btn-primary m-2" onClick={handleAgregarModel}>Agregar</button>
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
              required
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
              options={clients.map((client) => ({ value: client.ci, label: `${client.name} ${client.lastname} ${client.ci}` }))}
              value={clients.ci}
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
            options={mechanics.map((mechanic) => ({ value: mechanic.id, label: mechanic.userName }))}
            value={mechanics.userName}
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
  handleBrandChange: PropTypes.func.isRequired,
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
};

export default WorkForm;
