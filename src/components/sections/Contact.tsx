import { useState, useEffect, useRef } from "react";
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
          <h2>CONTACT</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
