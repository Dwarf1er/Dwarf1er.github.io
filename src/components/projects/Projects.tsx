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
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      demoLink: "",
      githubLink: "",
    },
    {
      title: "Project 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      demoLink: "",
      githubLink: "",
    },
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
        <a href={project.demoLink} className="btn btn-primary me-2 border-0">
          Live Demo
        </a>
        <a href={project.githubLink} className="btn btn-secondary border-0">
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Projects;
