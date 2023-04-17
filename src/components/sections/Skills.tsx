import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import calculateRowHeight from "../../utils/calculateRowHeight";

function Skills() {
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
    <Container id="skills" ref={rowsRef} fluid>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h1 className="display-5 fw-bold">Skills</h1>
        </Col>
      </Row>
      <Row
        className="align-items-center justify-content-center"
        style={{ height: rowHeight }}
      >
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg"
            />
          </Card>
        </Col>
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg"
            />
          </Card>
        </Col>
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg"
            />
          </Card>
        </Col>
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg"
            />
          </Card>
        </Col>
      </Row>
      <Row
        className="align-items-center justify-content-center"
        style={{ height: rowHeight }}
      >
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg"
            />
          </Card>
        </Col>
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/csharp-original.svg"
            />
          </Card>
        </Col>
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/dotnetcore.png"
            />
          </Card>
        </Col>
        <Col md={2}>
          <Card className="border-0" style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg"
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Skills;
