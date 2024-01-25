import PropTypes from "prop-types";
import { useState } from 'react';
import Checkbox from './CheckBox';

const CheckboxGroup = ({ options, onCheckboxChange }) => {
  const [checkboxValues, setCheckboxValues] = useState(() => {
    const initialState = {};
    Object.keys(options).forEach(key => {
      initialState[key] = false;
    });
    return initialState;
  });

  const handleCheckboxChange = (key) => {
    const updatedCheckboxValues = { ...checkboxValues, [key]: !checkboxValues[key] };
    setCheckboxValues(updatedCheckboxValues);
    onCheckboxChange(key, updatedCheckboxValues[key]);
  };

  return (
    <div className="container">

      <div className="row">

        <div className="">
          <h2 className="mt-3">Testigos</h2>
          {options.map(({ key, label }) => (
            <Checkbox
              key={key}
              id={key}
              label={label}
              checked={checkboxValues[key]}
              onChange={() => handleCheckboxChange(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};


export default CheckboxGroup;
