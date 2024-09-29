import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import View from "./pages/View";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path={import.meta.env.VITE_ACCESS_ROUTE} element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
