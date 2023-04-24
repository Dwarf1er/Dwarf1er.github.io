import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
// import { ThemeProvider } from "styled-components";

function App() {
  return (
    // <ThemeProvider theme={undefined}>
    <div>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
    // </ThemeProvider>
  );
}

export default App;
