import { Routes, Route } from "react-router-dom";
import DetallaTrabajo from "../pages/DetallaTrabajo";
import BusquedaCliente from '../pages/BusquedaCliente'
import AdministrarUsuario from '../pages/AdministrarUsuario'
import AdministrarTecnico from '../pages/AdministrarTecnico'
import LoginPage from "../pages/LoginPage";
/* import Logout from "../Logout" */


const Routing = () => {
  return (
    <Routes>
      <Route path='/detalle' element={<DetallaTrabajo />} />
      <Route path='/busqueda' element={<BusquedaCliente />} />
      <Route path='/admi-user' element={<AdministrarUsuario />} />
      <Route path='/admin-tecnico' element={<AdministrarTecnico />} />
      <Route path='/' element={<LoginPage />} />
      {/* <Route path='/' element={<Logout />} /> */}
    </Routes>
  )
}

export default Routing;