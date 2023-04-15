import { Link } from "react-scroll";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactBootstrapNavbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "../assets/AntoinePoulinLogo.svg";

function Navbar() {
  return (
    <ReactBootstrapNavbar bg="light" expand="lg">
      <Container fluid>
        <ReactBootstrapNavbar.Brand href="#home">
          <Image
            src={Logo}
            alt="Antoine Poulin logo"
            className="d-inline-block align-top logo"
          />
        </ReactBootstrapNavbar.Brand>
        <ReactBootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#socials">Socials</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}

export default Navbar;
