import "./App.css";
import { SwitchThemeFn } from "./types";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import useLocalStorage from "use-local-storage";

function App() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");
  const switchTheme: SwitchThemeFn = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="app" data-theme={theme}>
      <Navbar onSwitchTheme={switchTheme} />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
