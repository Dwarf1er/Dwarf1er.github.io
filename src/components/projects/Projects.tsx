import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import calculateRowHeight from "../../utils/calculateRowHeight";

interface Project {
  title: string;
  description: string;
  demoLink: string;
  githubLink: string;
}

function Projects() {
  const [navHeight, setNavHeight] = useState(0);
  const rowsRef = useRef(null);
  const rowHeight = calculateRowHeight(navHeight, rowsRef);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  const projects = [
    {
      title: "PerlFuck Transpiler",
      description: "The PerlFuck Transpiler is a simple Perl transpiler that translates a string of code into a series of Perl expressions using only 9 sybmols ({/.=~+}). It is designed to be an educational project that pushes the limits of the language",
      demoLink: "https://antoinepoulin.com/perlfuck",
      githubLink: "https://github.com/Dwarf1er/perlfuck",
    },
    {
      title: "VaxiCode Parser",
      description: "The Vaxicode Parser extracts information from vaccination QR codes using the SHC standard, making it easy for anyone to access their vaccination records",
      demoLink: "https://antoinepoulin.com/vaxicode-parser",
      githubLink: "https://github.com/Dwarf1er/vaxicode-parser",
    }
  ];

  return (
    <Container id="projects" ref={rowsRef} fluid>
      <Row className="align-items-center" style={{ height: rowHeight }}>
        <Col md={4} className="text-start mx-auto">
          <h1 className="display-5 fw-bold">Projects</h1>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card mb-3 border-0">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <a
          href={project.demoLink}
          id="primary-button"
          className="btn btn-primary me-2 border-0"
          target="_blank"
        >
          Live Demo
        </a>
        <a
          href={project.githubLink}
          className="btn btn-secondary border-0"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Projects;
