import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Playground from "./pages/Playground/Playground";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}

export default App;
