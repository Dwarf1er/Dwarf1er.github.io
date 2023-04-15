import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface SectionProps {
  children: React.ReactNode;
}

function Section({ children }: SectionProps) {
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
    <>
      <Container id="home" fluid>
        <Row className="align-items-center" style={{ height: rowHeight }}>
          {children}
        </Row>
      </Container>
    </>
  );
}

export default Section;
