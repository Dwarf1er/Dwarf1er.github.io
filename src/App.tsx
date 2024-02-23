import "./App.css";
import { useEffect } from "react";
import { SwitchThemeFn } from "./types";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import useLocalStorage from "use-local-storage";

function App() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");
  const [manuallyChanged, setManuallyChanged] = useLocalStorage<boolean>("manuallyChanged", false);
  const switchTheme: SwitchThemeFn = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setManuallyChanged(true);
  };

  useEffect(() => {
    if (!manuallyChanged) {
      const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDarkMode) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [manuallyChanged, setTheme]);

  return (
    <div className="app" data-theme={theme}>
      <Navbar currentTheme={theme} onSwitchTheme={switchTheme} />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
