import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="appNav w-100">
      <Container>
        <Navbar.Brand href="#home" className="fs-3 fw-bold">
          قرآنى
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ direction: "ltr" }}>
            <Link className="me-3 navbar-brand fs-6" to="/">
              الرئيسية
            </Link>
            <Link className="me-3 navbar-brand fs-6" to="/moshaph">
              المصحف
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
