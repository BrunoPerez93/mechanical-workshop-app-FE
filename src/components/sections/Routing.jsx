import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DetalleTrabajo from "../pages/DetallaTrabajo";
import AdministrarUsuario from '../pages/AdministrarUsuario'
import AdministrarTecnico from '../pages/AdministrarTecnico'
import BusquedaTrabajo from '../pages/BusquedaTrabajo'
import LoginPage from "../pages/LoginPage";
import Navigation from "./Navigation";
import PropTypes from "prop-types";
import { useAuth } from "../Context/AuthContext";
import { validateAdminRole, validateManagementMinimumRole } from "../../utility/common";


const Routing = () => {
  const { state } = useAuth();

  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<WithNav value={<BusquedaTrabajo />} />} />
        <Route path='/detalle-trabajo' element={<WithNav value={validateManagementMinimumRole(state.user?.role) ? <DetalleTrabajo /> : <Navigate to="/login" />} />} />
        <Route path='/admi-user' element={<WithNav value={validateAdminRole(state.user?.role) ? <AdministrarUsuario /> : <Navigate to="/login" />} />} />
        <Route path='/admin-tecnico' element={<WithNav value={validateAdminRole(state.user?.role) ? <AdministrarTecnico /> : <Navigate to="/login" />} />} />
        <Route path="/*" element={<WithNav value={<BusquedaTrabajo />} />} />
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