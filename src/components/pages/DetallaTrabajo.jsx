import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import '../styles/detalleDeTrabajo.css'
import AddClientModal from "../../modals/AddClientModal";
import AddModelModal from "../../modals/AddModelModal";
import AddBrandModal from "../../modals/AddBrandModal";
import { apiCall } from "../../utility/common";
import WorkForm from "../Work/WorkForm";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


const DetalleTrabajo = () => {
  const navigate = useNavigate();


  //#region FormData


  const { formState, onInputChange, resetForm } = useForm({

    matricula: '',
    km: '',
    abs: false,
    engine: false,
    airbag: false,
    steer: false,
    ta: false,
    goodPayer: false,
    badPayer: false,
    normalPayer: false,
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

  //#endregion

  //#region States

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [clients, setClients] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);
  const [ciError, setCiError] = useState(null);
  const [brandError, setBrandError] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


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
    const formattedTotal = isNaN(newTotal) ? 0 : newTotal;

    if (total !== formattedTotal) {
      onInputChange({ target: { name: 'total', value: formattedTotal } });
    }
  }, [handWork, priceAutoParts, total, onInputChange]);

  //#endregion

  const validateForm = () => {
    if (!formState.matricula || !formState.km || !formState.clientId || !formState.mechanicId) {
      setErrorMessage('Todos los campos son requeridos.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return false;
    }
    setErrorMessage('');
    return true;
  };

  //#region handleModal

  const handleBrandChange = async (event) => {
    const newBrandId = event.target.value;
    const selectedBrand = brands.find((brand) => brand.id === parseInt(newBrandId));

    if (selectedBrand) {
      const response = await apiCall(
        `carsModels?brandId=${selectedBrand.id}`,
        "GET",
      );

      if (response.ok) {
        const modelList = await response.json();
        setSelectedModels(modelList);

        onInputChange({ target: { name: 'carModelId', value: selectedBrand.id } });
        setSelectedBrandId(selectedBrand.id);
      } else {
        console.error(
          "Error in the server response when fetching models for the brand",
          response.statusText
        );
      }
    } else {
      console.error(`Brand with id ${newBrandId} not found.`);
    }
  };



  const handleModelChange = (event) => {
    const newModelId = event.target.value;
    const selectedModel = selectedModels.find((model) => model.id === parseInt(newModelId));

    if (selectedModel) {
      onInputChange({ target: { name: 'carModelId', value: selectedModel.id } });
    } else {
      console.error(`Model with id ${newModelId} not found.`);
    }
  };

  const handleClientChange = (event) => {
    const newClientId = event.target.value;
    const selectedClient = clients.find((client) => client.id === parseInt(newClientId));

    if (selectedClient) {
      onInputChange({ target: { name: 'clientId', value: selectedClient.id } });
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
    onInputChange({ target: { name: 'carModelId', value: '' } });
  };

  const handleAgregarBrand = () => {
    setShowBrandModal(true);
  };

  const handleCloseClientModal = () => {
    setShowClientModal(false);
    setCiError(null);
  };

  const handleCloseModelModal = () => {
    setShowModelModal(false);
    setModelError(null);
  };

  const handleCloseBrandModal = () => {
    setShowBrandModal(false);
    setBrandError(null);
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

    const existingClient = clients.find((client) => client.ci === clientData.ci);

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

    const existingBrand = brands.find((brand) => brand.brandName === brandData.brandName);

    if (existingBrand) {
      setBrandError('Marca ya ingresada')
      return
    }

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

    const existingModel = models.find(
      (model) => model.carName === modelData.carName);

    if (existingModel) {
      setModelError(`El modelo ya está ingresado`);
      return;
    }

    const updatedModelData = {
      ...modelData,
      brandId: selectedBrandId,
    };

    try {
      const response = await apiCall(
        "carsModels",
        "POST",
        JSON.stringify(updatedModelData),
      );

      if (response.ok) {
        const updatedModelsResponse = await apiCall(
          `carsModels?brandId=${selectedBrandId}`,
          "GET",
        );

        if (updatedModelsResponse.ok) {
          const updatedModelList = await updatedModelsResponse.json();
          setSelectedModels(updatedModelList);
        } else {
          console.error(
            "Error in the server response when fetching models for the brand",
            updatedModelsResponse.statusText
          );
        }
        resetForm();
        setShowModelModal(false);
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
    fetchModels();
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

    if (!validateForm()) {
      return;
    }

    const { ci, name, lastname, ...cleanedFormState } = formState;

    const updatedFormState = {
      ...cleanedFormState,
      ...checkboxData,
      km: parseFloat(formState.km),
      cel: parseFloat(formState.cel),
      handWork: parseFloat(formState.handWork),
      priceAutoParts: parseFloat(formState.priceAutoParts),
      total: parseFloat(formState.total),
    };
    try {
      const response = await apiCall(
        "works",
        "POST",
        JSON.stringify(updatedFormState),
      );

      if (response.ok) {
        fetchWorks();
        resetForm();
        navigate('/');
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
        models={selectedModels}
        clients={clients}
        mechanics={mechanics}
        handleModelChange={handleModelChange}
        handleAgregarBrand={handleAgregarBrand}
        handleBrandChange={handleBrandChange}
        handleAgregarModel={handleAgregarModel}
        handleTrabajoSubmit={handleTrabajoSubmit}
        formState={formState}
        handleCheckbox={handleCheckbox}
        onInputChange={onInputChange}
        handleAgregarClient={handleAgregarClient}
        handleClientChange={handleClientChange}
        handleMechanicChange={handleMechanicChange}
        errorMessage={errorMessage}
      />



      <AddClientModal
        show={showClientModal}
        handleClose={handleCloseClientModal}
        handleSaveClient={handleSaveClient}
        onInputChange={onInputChange}
        ciError={ciError}
      />

      <AddModelModal
        show={showModelModal}
        handleClose={handleCloseModelModal}
        handleSaveModels={(event) => handleSaveModels(event, selectedBrandId)}
        handleBrandChange={(e) => {
          handleBrandChange(e);
          setSelectedBrandId(e.target.value);
        }}
        onInputChange={onInputChange}
        brands={brands}
        modelData={modelData}
        selectedBrandId={selectedBrandId}
        modelError={modelError}
      />

      <AddBrandModal
        show={showBrandModal}
        handleClose={handleCloseBrandModal}
        handleSaveBrand={handleSaveBrand}
        onInputChange={onInputChange}
        brandName={brandName || ''}
        brandError={brandError}
      />

    </>
  );
};

DetalleTrabajo.propTypes = {

  selectedWork: PropTypes.object,
};


export default DetalleTrabajo;