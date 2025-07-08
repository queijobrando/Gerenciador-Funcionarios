import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestePage from "./pages/testePage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="ml-56">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teste" element={<TestePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
