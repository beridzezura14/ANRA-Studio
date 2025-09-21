import Hero from "../components/Hero";
import Map from "../components/Map";
import Course from "../components/Course";

const Home = () => {
  return (
    <div className="pt-24 overflow-x-hidden">
      <Hero />
      <Map />
      <Course />
    </div>
  );
};

export default Home;
