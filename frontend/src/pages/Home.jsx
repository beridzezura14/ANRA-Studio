import Hero from "../components/Hero";
import Map from "../components/Map";
import Course from "../components/Course";
import Contact from "../components/Contact"

const Home = () => {
  return (
    <div className="pt-24 overflow-x-hidden">
      <Hero />
      <Map />
      <Course />
      <Contact />
    </div>
  );
};

export default Home;
