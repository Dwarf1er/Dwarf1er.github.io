import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowDownSquare } from "react-bootstrap-icons";
import calculateRowHeight from "../../utils/calculateRowHeight";
import { Link } from "react-scroll";

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
            offset={-70}
            duration={1000}
          >
            <ArrowDownSquare color="" size={48} />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
