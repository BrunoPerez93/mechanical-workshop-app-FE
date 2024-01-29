import PropTypes from "prop-types";

export const MechanicForm = ({ formState, onInputChange, handleSubmit }) => {
  const { userName, password } = formState;
  

  return (
    <form className="text-center mt-2" onSubmit={handleSubmit}>
      <h1>Administrar Tecnico</h1>
      <h2>Usuario</h2>

      <input
        type="username"
        className="form-control"
        placeholder="Nombre Completo"
        name="userName"
        value={userName}
        onChange={onInputChange}
        autoComplete="userName"
        required
      />

      <h2>Contraseña</h2>
      <input
        type="password"
        className="form-control"
        placeholder="password"
        name="password"
        value={password}
        onChange={onInputChange}
        autoComplete="current-password"
        required
      />

      <button
        className="btn btn-primary mt-2 col-12"
        type="submit"
      > Crear </button>

    </form>
  )
}

export const MechanicList = ({ mechanics }) => {
  return (
    <>
      <h2 className="text-center mt-5">Lista de Técnicos</h2>
      <table className="table text-center">
        <thead>
          <tr>
            <th className="col-sm-6 col-md-6">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {mechanics && mechanics.length ? (
            mechanics.map((mechanic) => (
              <tr key={mechanic.id}>
                <td>{mechanic.userName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay técnicos</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

MechanicForm.propTypes = {
  formState: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

MechanicList.propTypes = {
  mechanics: PropTypes.array.isRequired,
};