import PropTypes from "prop-types";

const SelectComponent = ({ options, value, onChange }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange({
      target: {
        value: selectedValue,
      },
    });
  };

  return (
    <select value={value} onChange={handleSelectChange} className="form-select m-2">
      <option value="">Seleccione...</option>
      {options && options.length > 0 && (
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      )}
    </select>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),  
  onChange: PropTypes.func.isRequired
};

export default SelectComponent;
