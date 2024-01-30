import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import '../styles/detalleDeTrabajo.css'
import AddClientModal from "../../modals/AddClientModal";
import AddModelModal from "../../modals/AddModelModal";
import AddBrandModal from "../../modals/AddBrandModal";
import { apiCall } from "../../utility/common";
import WorkForm from "../Work/WorkForm";

const DetalleTrabajo = () => {

  //#region FormData


  const { formState, onInputChange, resetForm } = useForm({

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
    handWork: '',
    priceAutoParts: '',
    total: '',
  });

  const {
    brandName,
    carName,
    name,
    lastname,
    ci,
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
    brandId: formState.brandId,
  }

  const brandData = {
    brandName: formState.brandName,
  }

  //#endregion

  //#region States

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [clients, setClients] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  const [showClientModal, setShowClientModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const [ciError, setCiError] = useState(null);

  const [works, setWorks] = useState([]);

  const [checkboxData, setCheckboxData] = useState({
    abs: false,
    engine: false,
    airbag: false,
    steer: false,
    ta: false,
    goodPayer: false,
    badPayer: false,
    normalPayer: false,
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
      onInputChange({ target: { name: 'brandId', value: selectedBrand.id } });

    } else {
      console.error(`Brand with id ${newBrandId} not found.`);
    }
  };

  const handleModelChange = (event) => {
    const newModelId = event.target.value;
    const selectedModel = models.find((model) => model.id === parseInt(newModelId));

    if (selectedModel) {
      onInputChange({ target: { name: 'carModelId', value: selectedModel.id } });

    } else {
      console.error(`Modelo with id ${newModelId} not found.`);
    }
  };

  const handleClientChange = (event) => {
    const newClientId = event.target.value;
    const selectedClient = clients.find((client) => client.id === parseInt(newClientId));

    if (selectedClient) {
      onInputChange({ target: { name: 'clientId', value: selectedClient.id } });
      onInputChange({ target: { name: 'name', value: selectedClient.name } });
      onInputChange({ target: { name: 'lastname', value: selectedClient.lastname } });
      onInputChange({ target: { name: 'ci', value: selectedClient.ci } });

    } else {
      console.error(`Cliente with id ${newClientId} not found.`);
    }
  };

  const handleMechanicChange = (event) => {
    const newMechanicId = event.target.value;
    const slectedMechanic = mechanics.find((mechanic) => mechanic.id === parseInt(newMechanicId));

    if (slectedMechanic) {
      onInputChange({ target: { name: 'mechanicId', value: slectedMechanic.id } });

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
      const response = await apiCall(
        "clients",
        "GET",
      );

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
    const existingClient = clients.find((client) => client.ci === ci);

    if (existingClient) {
      setCiError('Cedula ya ingresada');
      return
    }

    try {
      const response = await apiCall(
        "clients",
        "POST",
        JSON.stringify(clientData)
      );

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
      const response = await apiCall(
        "brands",
        "GET",
      );


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
      const response = await apiCall(
        "brands",
        "POST",
        JSON.stringify(brandData),
      );

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
      const response = await apiCall(
        "carsModels",
        "GET",
      );

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
    console.log("Before API Call:", modelData);
    try {
      const response = await apiCall(
        "carsModels",
        "POST",
        JSON.stringify(modelData),
      );

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
      const response = await apiCall(
        "mechanics",
        "GET",
      );

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
      const response = await apiCall(
        "works",
        "GET",
      );

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
    event.preventDefault();

    const updatedFormState = {
      ...formState,
      ...checkboxData,
      km: parseFloat(formState.km),
      cel: parseFloat(formState.cel),
      handWork: parseFloat(formState.handWork),
      priceAutoParts: parseFloat(formState.priceAutoParts),
      total: parseFloat(formState.total),
    };
    try {
      console.log(updatedFormState);
      const response = await apiCall(
        "works",
        "POST",
        JSON.stringify(updatedFormState),
      );
      if (response.ok) {
        console.log('Work created successfully.');
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

      <WorkForm
        brands={brands}
        models={models}
        clients={clients}
        mechanics={mechanics}
        handleBrandChange={handleBrandChange}
        handleModelChange={handleModelChange}
        handleAgregarBrand={handleAgregarBrand}
        handleAgregarModel={handleAgregarModel}
        handleTrabajoSubmit={handleTrabajoSubmit}
        formState={formState}
        handleCheckbox={handleCheckbox}
        onInputChange={onInputChange}
        handleAgregarClient={handleAgregarClient}
        handleClientChange={handleClientChange}
        handleMechanicChange={handleMechanicChange}
      />



      <AddClientModal
        show={showClientModal}
        handleClose={handleCloseClientModal}
        handleSaveClient={handleSaveClient}
        onInputChange={onInputChange}
        name={name}
        lastname={lastname}
        ci={ci}
        ciError={ciError}
      />

      <AddModelModal
        show={showModelModal}
        handleClose={handleCloseModelModal}
        handleSaveModels={handleSaveModels}
        onInputChange={onInputChange}
        carName={carName}
        brands={brands}
        handleBrandChange={handleBrandChange}
        modelData={modelData}
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

export default DetalleTrabajo;