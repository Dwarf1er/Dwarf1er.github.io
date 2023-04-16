import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowDownSquare } from "react-bootstrap-icons";

function About() {
  const rowsRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  let numRows = 0;
  let rowHeight = `calc((100vh - ${navHeight}px) / ${numRows})`;

  if (rowsRef.current) {
    numRows = rowsRef.current.querySelectorAll(".row").length;
    rowHeight = `calc((100vh - ${navHeight}px) / ${numRows})`;
  }

  return (
    <Container id="about" fluid>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h1 className="display-5 fw-bold">About</h1>
        </Col>
      </Row>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h2>Hello there! I'm Antoine, welcome to my portfolio!</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
