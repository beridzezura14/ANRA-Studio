import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CoursePage from "./pages/CoursePage";
import Header from "./components/Header";
import CourseDetail from "./pages/CourseDetail";

// ლამაზი Loader
const Loader = ({ onFadeOut }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#222831] z-50 transition-opacity duration-700" id="loader">
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
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 2 წამით ვაჩერებთ ლოდერს
    const timer = setTimeout(() => {
      setFadeOut(true);
      // fade-out ანიმაციის შემდეგ სრულად მოვხსნით
      setTimeout(() => setLoading(false), 700); // duration უნდა ემთხვეოდეს CSS transition
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader onFadeOut={fadeOut} />}
      {!loading && (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coursepage" element={<CoursePage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Routes>
        </Router>
      )}
      {/* fade-out ეფექტის CSS */}
      <style>{`
        #loader {
          opacity: ${fadeOut ? 0 : 1};
        }
      `}</style>
    </>
  );
}

export default App;
