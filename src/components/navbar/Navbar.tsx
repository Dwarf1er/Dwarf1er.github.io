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

  const homeSection = document.getElementById("home");
  const aboutSection = document.getElementById("about");
  const projectsSection = document.getElementById("projects");
  const contactSection = document.getElementById("contact");
  const homeOffset = homeSection ? homeSection.offsetTop : -70;
  const aboutOffset = aboutSection ? aboutSection.offsetTop : -70;
  const projectsOffset = projectsSection ? projectsSection.offsetTop : -70;
  const contactOffset = contactSection ? contactSection.offsetTop : -70;

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
            <ul>
              <li className="nav-item">
                <Link
                  to="home"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={homeOffset}
                  onClick={handleLinkClick}
                  activeClass="active"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={aboutOffset}
                  onClick={handleLinkClick}
                  activeClass="active"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="projects"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={projectsOffset}
                  onClick={handleLinkClick}
                  activeClass="active"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={contactOffset}
                  onClick={handleLinkClick}
                  activeClass="active"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </Nav>
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}

export default Navbar;
