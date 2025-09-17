import { useEffect, useState } from "react";
import { getHero } from "../api/heroApi";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHero()
      .then((res) => setHero(res.data))
      .catch(() => setError("ვერ მოხერხდა მონაცემების ჩატვირთვა."));
  }, []);

  if (error) return <h2 className="text-red-500 text-center my-10">{error}</h2>;
  if (!hero) return <h2 className="text-center my-10">იტვირთება...</h2>;

  return (
    <section className="max-w-[90%] mx-auto py-24 text-center">
      <div className="flex-1">
        <h1 className="text-4xl mb-4 font-pantonmtav3">{hero.title}</h1>
        <p className="text-lg">{hero.subtitle}</p>
      </div>
      <img
        className="hero_image w-[35%] m-auto py-6"
        src={hero.image}
        alt="hero"
      />
    </section>
  );
};

export default Hero;