import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import calculateRowHeight from "../../utils/calculateRowHeight";

function About() {
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
    <Container id="about" ref={rowsRef} fluid>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h1 className="display-5 fw-bold">About</h1>
          <h2>Hello there! Welcome to my portfolio!</h2>
          <br />
          <p
            className="fs-4"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            I'm a recent computer science graduate with a passion for process
            automation. Alongside my skills in .NET, C#, Blazor, and databases
            like SQL and MySQL. I believe in approaching life with a positive
            and light-hearted attitude, while bringing professionalism and
            dedication to my work as a software developer. My ultimate goal is
            to streamline processes through the development of web applications.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
