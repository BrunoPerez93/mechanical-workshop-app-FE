import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import '../styles/detalleDeTrabajo.css'
import AddClientModal from "../../modals/AddClientModal";
import AddModelModal from "../../modals/AddModelModal";
import AddBrandModal from "../../modals/AddBrandModal";
import SelectComponent from "../SelectComponent";
import InputComponent from "../InputComponent";
import CheckboxGroup from "../CheckBoxGroup";

const DetallaTrabajo = () => {

  //#region FormData

  const currentDate = new Date();

  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`

  const { formState, onInputChange, resetForm } = useForm({
    brandName: '',
    carName: '',
    matricula: '',
    km: '',
    name: '',
    lastname: '',
    abs: false,
    engine: false,
    airbag: false,
    steer: false,
    ta: false,
    goodPayer: false,
    badPayer: false,
    normalPayer: false,
    ci: '',
    cel: '',
    reclame: '',
    autoParts: '',
    observations: '',
    userName: '',
    handWork: '',
    priceAutoParts: '',
    total: '',
  });

  const {
    brandName,
    carName,
    matricula,
    km,
    name,
    lastname,
    abs,
    engine,
    airbag,
    steer,
    ta,
    goodPayer,
    badPayer,
    normalPayer,
    ci,
    cel,
    reclame,
    autoParts,
    observations,
    userName,
    handWork,
    priceAutoParts,
    total,
  } = formState;

  const clientData = {
    name: formState.name,
    lastname: formState.lastname,
    ci: formState.ci,
  }

  const modelData = {
    carName: formState.carName,
  }

  const brandData = {
    brandName: formState.brandName,
  }

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

  //#endregion

  //#region States

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [clients, setClients] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  const [showClientModal, setShowClientModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const [works, setWorks] = useState([]);

  const [checkboxData, setCheckboxData] = useState(() => {
    const initialData = {};
    Object.keys(testigoData).forEach(key => {
      initialData[key] = false;
    });
    return initialData;
  });


  //#endregion


  //#region Precio Total 

  useEffect(() => {
    const newTotal = parseFloat(handWork) + parseFloat(priceAutoParts);
    const formattedTotal = isNaN(newTotal) ? '' : newTotal.toString();

    if (total !== formattedTotal) {
      onInputChange({ target: { name: 'total', value: formattedTotal } });
    }
  }, [handWork, priceAutoParts, total, onInputChange]);

  //#endregion

  //#region handleModal
  const handleBrandChange = (event) => {

    const newBrandId = event.target.value;
    const selectedBrand = brands.find((brand) => brand.id === parseInt(newBrandId));

    if (selectedBrand) {
      onInputChange({ target: { name: 'brandName', value: selectedBrand.brandName } });

    } else {
      console.error(`Modelo with id ${newBrandId} not found.`);
    }
  };

  const handleModelChange = (event) => {
    const newModelId = event.target.value;
    const selectedModel = models.find((model) => model.id === parseInt(newModelId));

    if (selectedModel) {
      onInputChange({ target: { name: 'carName', value: selectedModel.carName } });

    } else {
      console.error(`Modelo with id ${newModelId} not found.`);
    }
  };

  const handleClientChange = (event) => {
    const newClientCi = event.target.value;
    const selectedClient = clients.find((client) => client.ci === newClientCi);


    if (selectedClient) {
      onInputChange({ target: { name: 'name', value: selectedClient.name } });
      onInputChange({ target: { name: 'lastname', value: selectedClient.lastname } });
      onInputChange({ target: { name: 'ci', value: selectedClient.ci } });

    } else {
      console.error(`Cliente with ci ${newClientCi} not found.`);
    }
  };

  const handleMechanicChange = (event) => {
    const newMechanicId = event.target.value;
    const slectedMechanic = mechanics.find((mechanic) => mechanic.id === parseInt(newMechanicId));

    if (slectedMechanic) {
      onInputChange({ target: { name: 'userName', value: slectedMechanic.userName } });

    } else {
      console.error(`Tecnico with id ${newMechanicId} not found.`);
    }
  };

  const handleAgregarClient = () => {
    setShowClientModal(true);
  };

  const handleAgregarModel = () => {
    setShowModelModal(true);
  };

  const handleAgregarBrand = () => {
    setShowBrandModal(true);
  };

  const handleCloseClientModal = () => {
    setShowClientModal(false);
  };

  const handleCloseModelModal = () => {
    setShowModelModal(false);
  };

  const handleCloseBrandModal = () => {
    setShowBrandModal(false);
  };
  
  const handleCheckbox = (key, value) => {
    setCheckboxData(prevData => ({
      ...prevData,
      [key]: value,
    }));
    onInputChange({ target: { name: key, value } });
  };

  // #endregion

  //#region Fetch Clients

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const clientList = await response.json();
        setClients(clientList);
      } else {
        console.error(
          "Error en la respuesta del servidor al pedir el listado",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveClient = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/clients", {
        method: "POST",
        body: JSON.stringify(clientData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchClients();
        resetForm();
      } else {
        console.error(
          "Error en la respuesta del servidor al crear el usuario",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
    setShowClientModal(false);
  };

  //#endregion

  //#region Fetch Brands

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/brands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const brandList = await response.json();

        setBrands(brandList);
      } else {
        console.error(
          "Error en la respuesta del servidor al pedir el listado",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSaveBrand = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/brands", {
        method: "POST",
        body: JSON.stringify(brandData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchBrands();
        resetForm();
      } else {
        console.error(
          "Error en la respuesta del servidor al crear la marca",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
    setShowBrandModal(false);
  };


  //#endregion

  //#region Fetchs Models

  const fetchModels = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/carsModels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const carModelList = await response.json();
        setModels(carModelList);
      } else {
        console.error(
          "Error en la respuesta del servidor al pedir el listado",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSaveModels = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/carsModels", {
        method: "POST",
        body: JSON.stringify(modelData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchModels();
        resetForm();
      } else {
        console.error(
          "Error en la respuesta del servidor al crear el modelo",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
    setShowModelModal(false);
  };

  //#endregion

  //#region Fetch Mechanic

  const fetchMechanic = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/mechanics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const mechanicList = await response.json();
        setMechanics(mechanicList);
      } else {
        console.error(
          "Error en la respuesta del servidor al pedir el listado",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchMechanic();
  }, []);


  //#endregion

  //#region Fetch Work

  const fetchWorks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/works", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const workList = await response.json();
        setWorks(workList);
      } else {
        console.error(
          "Error en la respuesta del servidor al pedir el listado",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleTrabajoSubmit = async (event) => {
    const updatedFormState = { ...formState, ...checkboxData };

    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/works", {
        method: "POST",
        body: JSON.stringify(updatedFormState),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchWorks();
        resetForm();
      } else {
        console.error(
          "Error en la respuesta del servidor al crear el modelo",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };


  //#endregion

  return (
    <>
      <form onSubmit={handleTrabajoSubmit}>

        <div className="title">
          <h1>Detalles del trabajo</h1>
          <span>Fecha: {formattedDate}</span>
        </div>


        <div className="container">
          <div className="row" >

            {/* MARCA */}
            <div className="col-xs-6 col-md-6 d-flex required">
              <h2>Marca</h2>

              <SelectComponent
                options={brands.length > 0 ? brands.map((brand) => ({ value: brand.id, label: brand.brandName })) : []}
                onChange={handleBrandChange}
                value={brandName}
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
              />
            </div>

            {/* CLIENTE */}
            <div className="d-flex col-xs-6 col-md-6">
              <h2>Cliente</h2>

              <SelectComponent
                options={clients.map((client) => ({ value: client.ci, label: `${client.name} ${client.lastname} ${client.ci}` }))}
                value={clients.ci}
                onChange={handleClientChange}
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
              />
            </div>

            <CheckboxGroup
              options={Object.keys(testigoData).map(key => ({ key, label: key }))}
              onCheckboxChange={handleCheckbox}
            />

            {/* RECLAMOS */}
            <div className="form-floating">
              <h3>Fallos segun reclamacion del cliente</h3>
              <textarea
                className="form-control m-2"
                name="reclame"
                value={reclame}
                onChange={onInputChange}
                style={{ height: '100px' }}
              />
            </div>

            {/* REPUESTOS */}
            <div className="form-floating">
              <h3>Repuestos: nuevo, alternativo, original o subministrado por el cliente</h3>
              <textarea
                className="form-control m-2"
                name="autoParts"
                value={autoParts}
                onChange={onInputChange}
                style={{ height: '100px' }}
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
              />
            </div>

            {/* MECANICOS */}
            <h2>Tecnico</h2>

            <SelectComponent
              options={mechanics.map((mechanic) => ({ value: mechanic.id, label: mechanic.userName }))}
              value={mechanics.userName}
              onChange={handleMechanicChange}
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

      <AddClientModal
        show={showClientModal}
        handleClose={handleCloseClientModal}
        handleSaveClient={handleSaveClient}
        onInputChange={onInputChange}
        name={name}
        lastname={lastname}
        ci={ci}
      />

      <AddModelModal
        show={showModelModal}
        handleClose={handleCloseModelModal}
        handleSaveModels={handleSaveModels}
        onInputChange={onInputChange}
        carName={carName}
        brands={brands}
        handleBrandChange={handleBrandChange}
      />

      <AddBrandModal
        show={showBrandModal}
        handleClose={handleCloseBrandModal}
        handleSaveBrand={handleSaveBrand}
        onInputChange={onInputChange}
        brandName={brandName}
      />

    </>
  );
};

export default DetallaTrabajo;