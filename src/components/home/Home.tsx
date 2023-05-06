import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowDownSquare } from "react-bootstrap-icons";
import calculateRowHeight from "../../utils/calculateRowHeight";
import { Link } from "react-scroll";
import "./Home.css";

function Home() {
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
    <Container id="home" ref={rowsRef} fluid>
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
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col className="text-center mx-auto">
          <Link
            to="projects"
            spy={true}
            smooth={true}
            offset={-navHeight}
            duration={1000}
          >
            <ArrowDownSquare className="arrow-down-square" size={48} />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
