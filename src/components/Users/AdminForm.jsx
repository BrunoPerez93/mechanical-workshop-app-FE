

import PropTypes from "prop-types";

export const AdminForm = ({ formState, onInputChange, handleSubmit }) => {
  const { userName, password, role } = formState;

  const searchOptions = {
    Admin: "Administrador",
    Operation: "Secretaria",
    Mechanic: "Mecanico",
  };

  return (
   
        <form className="text-center mt-2" onSubmit={handleSubmit}>

          <h1>Administrar Usuario</h1>
          <h2>Usuario</h2>

          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
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

          <h2>Rol</h2>
          <select
            className="form-select"
            onChange={onInputChange}
            name="role"
            required
            value={role}>
            <option value=''>Seleccione Rol...</option>
            {Object.entries(searchOptions).map(([key, value]) =>
            (<option key={key} value={key}>
              {value}
            </option>)
            )}
          </select>

          <button
            className="btn btn-primary mt-2 col-12"
            type="submit"
          > Crear </button>

        </form>
    
  )
}

export const UserList = ({ users, searchOptions }) => {
  return (
    <div>
      <h2 className="text-center mt-5">Lista de usuarios</h2>
      <table className="table text-center">
        <thead>
          <tr>
            <th className="col-sm-6 col-md-6" >Nombre</th>
            <th className="col-sm-6 col-md-6" >Rol</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{searchOptions[user.role]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

AdminForm.propTypes = {
  formState: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,  
  handleSubmit: PropTypes.func.isRequired,
  searchOptions: PropTypes.object.isRequired,
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  searchOptions: PropTypes.object.isRequired,
};
