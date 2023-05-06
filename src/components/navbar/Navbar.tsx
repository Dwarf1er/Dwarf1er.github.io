import { Link } from "react-scroll";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactBootstrapNavbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { SwitchThemeFn } from "../../types";

interface NavbarProps {
  onSwitchTheme: SwitchThemeFn;
}

function Navbar({ onSwitchTheme }: NavbarProps) {
  const [navHeight, setNavHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <ReactBootstrapNavbar expand="lg" sticky="top" expanded={expanded}>
      <Container fluid>
        <ReactBootstrapNavbar.Brand href="#home">
          <svg className="logo" viewBox="0 0 30 65">
            <use xlinkHref="/src/assets/AntoinePoulinLogo.svg#logo"></use>
          </svg>
        </ReactBootstrapNavbar.Brand>
        <ReactBootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="home"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-navHeight}
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
                  offset={-navHeight}
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
                  offset={-navHeight}
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
                  offset={-navHeight}
                  onClick={handleLinkClick}
                  activeClass="active"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </Nav>
          <div>
            <Button className="border-0" onClick={onSwitchTheme}>
              Toggle Theme
            </Button>
          </div>
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}

export default Navbar;
