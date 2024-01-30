import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DetalleTrabajo from "../pages/DetallaTrabajo";
import BusquedaTrabajo from '../pages/BusquedaTrabajo'
import AdministrarUsuario from '../pages/AdministrarUsuario'
import AdministrarTecnico from '../pages/AdministrarTecnico'
import LoginPage from "../pages/LoginPage";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

const Routing = () => {
 
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<WithNav value={<DetalleTrabajo />} />} />
        <Route path='/busqueda' element={<WithNav value={<BusquedaTrabajo />} />} />

        <Route path='/admi-user' element={<WithNav value={<AdministrarUsuario />} />} />

        <Route path='/admin-tecnico' element={<WithNav value={<AdministrarTecnico />} />} />
      </Route>
    </Routes>
  )
}

const WithNav = ({ value }) => {
  return (<div>
    <Navigation />
    {value}
  </div>)
}

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

WithNav.propTypes = {
  value: PropTypes.object.isRequired,
}


export default Routing;