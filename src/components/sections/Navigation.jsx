import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import { logout, validateAdminRole, validateManagementMinimumRole } from "../../utility/common";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const Navigation = () => {

  const [expanded, setExpanded] = useState(false);
  const { state } = useAuth();

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="light" expand="lg" className="ps-3 ">
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />

      <Navbar.Collapse id="basic-navbar-nav" in={expanded}>
        <Nav className="mx-auto">

          {validateManagementMinimumRole(state.user?.role) && (
            <>
              <Link className="nav-link" style={{ fontWeight: 'bold', fontSize: '20px' }} to="/detalle-trabajo" onClick={handleLinkClick}>
                Detalle Trabajo
              </Link>
            </>
          )}

          <Link className="nav-link" style={{ fontWeight: 'bold', fontSize: '20px' }} to="/" onClick={handleLinkClick}>
            Busqueda Trabajo
          </Link>

          {validateAdminRole(state.user?.role) && (
            <>
              <Link className="nav-link" style={{ fontWeight: 'bold', fontSize: '20px' }} to="/admi-user" onClick={handleLinkClick}>
                Administrar Usuario
              </Link>
            </>
          )}

          {validateAdminRole(state.user?.role) &&(
            <>
              <Link className="nav-link" style={{ fontWeight: 'bold', fontSize: '20px' }} to="/admin-tecnico" onClick={handleLinkClick}>
                Administrar Tecnico
              </Link>
            </>
          )}

          <Link className="nav-link" style={{ fontWeight: 'bold', fontSize: '20px' }} to="/login" onClick={() => { logout(); }}>
            Logout
          </Link>

        </Nav>
      </Navbar.Collapse>


    </Navbar >
  )
}

export default Navigation
