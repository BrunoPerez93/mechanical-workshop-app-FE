
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; 

const FetchBrand = ({ value, onChange }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
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

    fetchBrands();
  }, []);

  const handleBrandChange = (event) => {
    onChange(event);
  };

  return (
    <select
      className="form-select m-2"
      name="brandName"
      value={value}
      onChange={handleBrandChange}
    >
      <option value="">Seleccione Marca...</option>
      {brands && brands.length > 0 && (
        brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.brandName}
          </option>
        ))
      )}
    </select>
  );
};

FetchBrand.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired

};

export default FetchBrand;
