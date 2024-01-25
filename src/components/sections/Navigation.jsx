import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

const Navigation = () => {




  return (
    <Navbar bg="light" expand="lg" className="ps-3">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/detalle">

          </Link>
        </Nav>

        <Nav className="mx-auto">
          <Link className="nav-link" to="/detalle">
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
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
