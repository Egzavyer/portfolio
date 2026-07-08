import "../i18n/i18n";
import { Hero } from "./components/Hero";
import { About } from "./components/About";

function App() {
  return (
    <div className="min-h-screen bg-primary text-text font-saira">
      <Hero />
      <About />
    </div>
  );
}

export default App;
