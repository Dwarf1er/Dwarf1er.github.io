import { Link } from "react-scroll";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactBootstrapNavbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/AntoinePoulinLogo.svg";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <ReactBootstrapNavbar
      bg="light"
      expand="lg"
      sticky="top"
      expanded={expanded}
    >
      <Container fluid>
        <ReactBootstrapNavbar.Brand href="#home">
          <Image
            src={Logo}
            alt="Antoine Poulin logo"
            className="d-inline-block align-top logo"
          />
        </ReactBootstrapNavbar.Brand>
        <ReactBootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <Link
                to="home"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={handleLinkClick}
                activeClass="active"
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#about">
              <Link
                to="about"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={handleLinkClick}
                activeClass="active"
              >
                About
              </Link>
            </Nav.Link>
            <Nav.Link href="#projects">
              <Link
                to="projects"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={handleLinkClick}
                activeClass="active"
              >
                Projects
              </Link>
            </Nav.Link>
            <Nav.Link href="#contact">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={handleLinkClick}
                activeClass="active"
              >
                Contact
              </Link>
            </Nav.Link>
          </Nav>
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}

export default Navbar;
