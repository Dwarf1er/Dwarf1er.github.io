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
            style={{ textAlign: "justify", textJustify: "auto" }}
          >
            Hello, I'm Antoine, a Full Stack Developer passionate about creating exceptional web experiences. I approach life with a positive and light-hearted attitude, infusing professionalism and dedication into my work as a software developer. With expertise in both front-end and back-end development, I'm dedicated to crafting scalable and user-friendly applications. My constant drive for learning keeps me at the forefront of the latest technologies. Let's connect and explore tech collaborations or share insights. Let's build the future together, one line of code at a time!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
