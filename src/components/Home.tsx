import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowDownSquare } from "react-bootstrap-icons";

function Home() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  const numRows = document.querySelectorAll(".row").length;
  const rowHeight = `calc((100vh - ${navHeight}px) / ${numRows})`;

  return (
    <Container id="home" fluid>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h1 className="display-5 fw-bold">Antoine Poulin</h1>
          <h2>Full Stack Developer</h2>
          <p className="fs-4">
            Developing robust and simple software solutions
            <br />
            because oftentimes, it's as easy as turning it off and on again.
          </p>
        </Col>
      </Row>
      <Row
        id="about"
        className="align-items-center"
        style={{ height: rowHeight }}
      >
        <Col className="text-center mx-auto">
          <a href="#projects">
            <ArrowDownSquare color="" size={48} />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
