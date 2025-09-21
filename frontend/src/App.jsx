import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import CourseDetail from "./pages/CourseDetail";


function App() {
  return (
    <Router>
      {/* <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/admin/hero">Admin Hero</Link>
      </nav> */}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
