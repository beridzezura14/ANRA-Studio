import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CoursePage from "./pages/CoursePage";
import Header from "./components/Header";
import CourseDetail from "./pages/CourseDetail";

// ლამაზი Loader
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#222831]">
      <div className="relative w-32 h-32">
        <div className="absolute w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
          ANRA Studio
        </span>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // დავამატოთ 2 წამი ლოდერი
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
