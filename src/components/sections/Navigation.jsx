import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import { logout } from "../../utility/common";

const Navigation = () => {

  return (
    <Navbar bg="light" expand="lg" className="ps-3">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Link className="nav-link" to="/">
            Detalla Trabajo
          </Link>
          <Link className="nav-link" to="/busqueda">
            Busqueda Cliente
          </Link>
          <Link className="nav-link" to="/admi-user">
            Administrar Usuario
          </Link>
          <Link className="nav-link" to="/admin-tecnico">
            Administrar Tecnico
          </Link>
          <Link className="nav-link" onClick={logout}>
            Logout
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
