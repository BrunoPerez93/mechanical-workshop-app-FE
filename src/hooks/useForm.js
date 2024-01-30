import { useState } from 'react';

const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);


  const onInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(`Updating ${name} to ${value}`);
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormState(initialForm);

  };

  return {
    formState,
    onInputChange,
    resetForm,
  };
};

export default useForm;
