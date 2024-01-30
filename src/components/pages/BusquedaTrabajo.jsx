import useForm from "../../hooks/useForm";

const BusquedaTrabajo = () => {

  const { formState, onInputChange } = useForm({
    searchSelect: '',
    search: '',
  });

  const { searchSelect, search } = formState;

  const searchOptions = [
    'Matricula',
    'CI',
    'KM',
    'Calular',
    'Fecha',
    'Reclamo',
    'Observaciones',
    'Repuestos',
    'Tecnico',
  ];

  return (
    <div className="container">
      <div className="row">

        <div className="text-center mt-2">
          <h1>Trabajo</h1>
          <select
            className="form-select"
            name="searchSelect"
            value={searchSelect}
            onChange={onInputChange}
          >
            <option>Buscar por...</option>
            {searchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Palabras claves..."
            name="search"
            value={search}
            onChange={onInputChange}
            className="form-control mt-2"
          />

          <button className="btn btn-primary mt-2">Buscar</button>


          <div>
            <h2>Lista de clientes</h2>
            <table className="table mt-2">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Matricula</th>
                  <th>Modelo</th>
                  <th>Tecnico</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>{ }</td>
                  <td>{ }</td>
                  <td>{ }</td>
                  <td>{ }</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BusquedaTrabajo
