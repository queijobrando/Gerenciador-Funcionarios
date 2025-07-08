import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestePage from "./pages/testePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<TestePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;