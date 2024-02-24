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
import BrandEditModal from "../../modals/BrandEditModal";
import ModelEditModal from "../../modals/ModelEditModal";


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
    notAccepted: false,
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
  const [clients, setClients] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showBrandModalEdit, setShowBrandModalEdit] = useState(false);
  const [showModelModalEdit, setShowModelModalEdit] = useState(false);

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);

  const [ciError, setCiError] = useState(null);
  const [brandError, setBrandError] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [brandEditMessage, setBrandEditMessage] = useState(null);
  const [modelEditMessage, setModelEditMessage] = useState(null);
  const [brandEditMessageError, setBrandEditMessageError] = useState(null);
  const [modelEditMessageError, setModelEditMessageError] = useState(null);
  const [clientErrorMessage, setClientErrorMessage] = useState(null);

  const [checkboxData, setCheckboxData] = useState({
    abs: false,
    engine: false,
    airbag: false,
    steer: false,
    ta: false,
    goodPayer: false,
    badPayer: false,
    normalPayer: false,
    notAccepted: false,
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

        onInputChange({ target: { name: 'carModelId', value: '' } });
        setSelectedBrandId(selectedBrand.id);
      } else {
        console.error(
          "Error in the server response when fetching models for the brand",
          response.statusText
        );
      }
    } else {
      onInputChange({ target: { name: 'carModelId', value: '' } });
      setSelectedModels([]);
      console.error(`Brand with id ${newBrandId} not found.`);
    }
  };

  const handleModelChange = (event) => {
    const newModelId = event.target.value;
    const selectedModel = selectedModels.find((model) => model.id === parseInt(newModelId));

    if (selectedModel) {
      onInputChange({ target: { name: 'carModelId', value: selectedModel.id } });
      setSelectedModelId(selectedModel.id)
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

  const handleEditBrand = () => {
    setShowBrandModalEdit(true);
  };

  const handleEditModel = () => {
    setSelectedModelId(selectedModelId)
    onInputChange({ target: { name: 'carName', value: carName } });
    setShowModelModalEdit(true);
  };

  const handleCloseClientModal = () => {
    setShowClientModal(false);
    setCiError(null);
    setClientErrorMessage(null)
  };

  const handleCloseModelModal = () => {
    setShowModelModal(false);
    setModelError(null);
  };

  const handleCloseBrandModal = () => {
    setShowBrandModal(false);
    setBrandError(null);
  };

  const handleCloseBrandModalEdit = () => {
    setShowBrandModalEdit(false);
    setBrandEditMessage(null);
    setBrandEditMessageError(null)
  };

  const handleCloseModelModalEdit = () => {
    setShowModelModalEdit(false);
    setModelEditMessage(null);
    setModelEditMessageError(null);
  };


  const handleCheckbox = (key, value) => {
    setCheckboxData(prevData => ({
      ...prevData,
      [key]: value,
    }));
    onInputChange({ target: { name: key, value } });
  };


  const handleSaveBrandEdit = async (e, selectedBrandId, brandName) => {
    try {
      e.preventDefault();

      const updatedBrandData = {
        id: selectedBrandId,
        brandName: brandName,
      };

      const response = await apiCall(
        `brands/${selectedBrandId}`,
        'PUT',
        JSON.stringify(updatedBrandData),
      );

      if (response.ok) {
        setShowBrandModalEdit(false);
        setBrandEditMessage('Marca Modificada')
        setTimeout(() => {
          setBrandEditMessage('')
        }, 5000)
        fetchBrands();
        resetForm();
      } else {
        setBrandEditMessageError('Seleccione una marca antes de editar')
        setTimeout(() => {
          setBrandEditMessageError('')
        }, 5000)
        console.error('Error saving brand:', response.status, response.statusText);
      }

    } catch (error) {
      console.error('Error saving brand:', error);
    }
  }


  const handleSaveModelEdit = async (e, selectedModelId, carName) => {
    try {
      e.preventDefault();

      const updateModelData = {
        id: selectedModelId,
        carName: carName,
      };

      const response = await apiCall(
        `carsModels/${selectedModelId}`,
        'PUT',
        JSON.stringify(updateModelData),
      );

      if (response.ok) {
        setShowModelModalEdit(false);
        setModelEditMessage('Modelo Modificada')
        setTimeout(() => {
          setModelEditMessage('')
        }, 5000);

        const updatedModelsResponse = await apiCall(
          `carsModels?brandId=${selectedBrandId}`,
          'GET'
        );

        if (updatedModelsResponse.ok) {
          const updatedModelList = await updatedModelsResponse.json();
          setSelectedModels(updatedModelList);
        } else {
          console.error(
            'Error in the server response when fetching models for the brand',
            updatedModelsResponse.statusText
          );
        }
        resetForm();
      } else {
        console.error('Error saving model:', response.status, response.statusText);
        setModelEditMessageError('Seleccione un modelo antes de editar')
        setTimeout(() => {
          setModelEditMessageError('')
        }, 5000);
      }
    } catch (error) {
      console.error('Error saving model:', error);
    }
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

    try {
      const response = await apiCall(
        "clients",
        "POST",
        JSON.stringify(clientData)
      );

      if (response.ok) {
        fetchClients();
        resetForm();
        setShowClientModal(false);
      } else {

        setClientErrorMessage('Cliente con Ci o Rut ya ingresado.')
        setTimeout(() => {
          setClientErrorMessage('')
        }, 5000);

        console.error(
          "Error en la respuesta del servidor al crear el usuario",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }

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
        setShowBrandModal(false)
      } else {

        setBrandError('Marca ya ingresada')
        setTimeout(() => {
          setBrandError('')
        }, 5000);

        console.error(
          "Error en la respuesta del servidor al crear la marca",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
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

        if (brands.length > 0) {
          const updatedModelsResponse = await apiCall(
            `carsModels?brandId=${selectedBrandId}`,
            "GET"
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
        }
      } else {
        console.error(
          "Error in the server response when fetching models",
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
          const updatedCarModelName = await updatedModelsResponse.json();
          setSelectedModels(updatedCarModelName);
        } else {
          console.error(
            "Error in the server response when fetching models for the brand",
            updatedModelsResponse.statusText
          );
        }
        resetForm();
        setShowModelModal(false);
      } else {

        setModelError('Modelo ya ingresado')
        setTimeout(() => {
          setModelError('')
        }, 5000);

        console.error(
          "Error en la respuesta del servidor al crear el modelo",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
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

  const handleTrabajoSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { ...cleanedFormState } = formState;

    const updatedFormState = {
      ...cleanedFormState,
      ...checkboxData,
      km: parseFloat(formState.km),
      cel: parseFloat(formState.cel),
      handWork: parseFloat(formState.handWork),
      priceAutoParts: parseFloat(formState.priceAutoParts),
      total: parseFloat(formState.total),
      carModelId: selectedModelId,
    };
    try {
      const response = await apiCall(
        "works",
        "POST",
        JSON.stringify(updatedFormState),
      );

      if (response.ok) {
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
        handleEditBrand={handleEditBrand}
        handleEditModel={handleEditModel}
      />



      <AddClientModal
        show={showClientModal}
        handleClose={handleCloseClientModal}
        handleSaveClient={handleSaveClient}
        onInputChange={onInputChange}
        ciError={ciError}
        clientErrorMessage={clientErrorMessage}
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

      <BrandEditModal
        show={showBrandModalEdit}
        handleClose={handleCloseBrandModalEdit}
        brandEditMessage={brandEditMessage}
        onInputChange={onInputChange}
        selectedBrandId={selectedBrandId}
        handleBrandChange={handleBrandChange}
        brands={brands}
        brandName={brandName}
        handleSaveBrandEdit={(e) => handleSaveBrandEdit(e, selectedBrandId, brandName)}
        brandEditMessageError={brandEditMessageError}

      />

      <ModelEditModal
        show={showModelModalEdit}
        handleClose={handleCloseModelModalEdit}
        modelEditMessage={modelEditMessage}
        onCarNameChange={onInputChange}
        selectedModelId={selectedModelId}
        handleModelChange={(e) => {
          handleModelChange(e);
          setSelectedModelId(e.target.value);
        }}
        models={selectedModels}
        handleSaveModelEdit={(e) => handleSaveModelEdit(e, selectedModelId, carName)}
        carName={carName}
        modelEditMessageError={modelEditMessageError}

      />

    </>
  );
};

DetalleTrabajo.propTypes = {

  selectedWork: PropTypes.object,
};


export default DetalleTrabajo;