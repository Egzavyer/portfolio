import { Navbar } from "./components/Navbar";
import "../i18n/i18n";
import { Hero } from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-primary text-text p-4">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
