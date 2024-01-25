import PropTypes from "prop-types";

const CheckBox = ({ id, label, checked, onChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="list-group">
          <div className="list-group-item m-2 col-sm-9 col-md-12 ">

          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="form-check-input m-2"
            />
          <label htmlFor={id}>{label}</label>

            </div>
        </div>
      </div>
    </div>
  )
}

CheckBox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,

};

CheckBox.defaultProps = {
  checked: false,
}

export default CheckBox

