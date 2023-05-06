import { useState, useEffect, useRef } from "react";
import { EnvelopeFill, Github, Linkedin } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import calculateRowHeight from "../../utils/calculateRowHeight";

function Contact() {
  const [navHeight, setNavHeight] = useState(0);
  const rowsRef = useRef(null);
  const rowHeight = calculateRowHeight(navHeight, rowsRef);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  return (
    <Container id="contact" ref={rowsRef} fluid>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h1 className="display-5 fw-bold">Contact</h1>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ height: rowHeight }}>
        <Col xs={4} md={1} className="text-start">
          <a
            className="contact-icon"
            href="mailto:antoine.poulin@protonmail.com"
          >
            <EnvelopeFill size={50} />
          </a>
        </Col>
        <Col xs={4} md={1} className="text-start">
          <a
            className="contact-icon"
            href="https://www.linkedin.com/in/antoine-poulin/"
          >
            <Linkedin size={50} />
          </a>
        </Col>
        <Col xs={4} md={1} className="text-start">
          <a className="contact-icon" href="http://www.github.com/Dwarf1er">
            <Github size={50} />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
