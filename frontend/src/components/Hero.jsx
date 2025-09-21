import { useEffect, useState, useRef } from "react";
import { getHero } from "../api/heroApi";
import { gsap } from "gsap";

import bgHeroDecor from "../assets/img/bg-hero-decor.png";
import bgHeroDecorMirror from "../assets/img/bg-hero-decor-mirror.png";


let didAnimate = false;

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !hero) return;
    if (didAnimate) return;

    const targets = containerRef.current.querySelectorAll(".word");

    gsap.fromTo(
      targets,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    didAnimate = true;
  }, [hero]);

  useEffect(() => {
    getHero()
      .then((res) => setHero(res.data))
      .catch(() => setError("ვერ მოხერხდა მონაცემების ჩატვირთვა."));
  }, []);

  if (error) return <h2 className="py-24 xl:py-32 h-[40dvh] text-red-500 text-center">{error}</h2>;
  if (!hero) return <h2 className="py-24 xl:py-32 h-[40dvh] text-center"></h2>;

  const heroWords = hero.title.split(" ");

  return (

    <div className="relative">
      <div >
        <img src={bgHeroDecor} alt="hero decor" className="absolute top-0 right-0 w-[70%] h-[350px] lg:w-[50%] lg:h-full 2xl:w-[30%] object-cover -z-10"
            style={{
              filter: "brightness(0) saturate(100%) invert(22%) sepia(13%) saturate(468%) hue-rotate(178deg) brightness(101%) contrast(94%)"
            }}
        />    

        <img src={bgHeroDecorMirror} alt="hero decor" className="absolute top-0 left-0 w-[70%] h-[350px] lg:w-[50%] lg:h-full 2xl:w-[30%] object-cover -z-10"
            style={{
              filter: "brightness(0) saturate(100%) invert(22%) sepia(13%) saturate(468%) hue-rotate(178deg) brightness(101%) contrast(94%)"
            }}
        />  
      </div>
      <div className="max-w-[90%] mx-auto py-24 xl:py-32 h-[40dvh] text-center relative">
        <div className="flex-1">
          <div ref={containerRef} className="inline-block overflow-hidden">
            {heroWords.map((word, index) => (
              <span
                key={index}
                className="word text-4xl mb-4 font-pantonmtav3 lg:text-5xl inline-block mr-2 text-[#DFD0B8]"
                aria-hidden="true"
              >
                {word}
              </span>
            ))}
          </div>

          <h1 className="sr-only">{hero.title}</h1>
          <p className="hero-subtitle text-lg lg:w-[600px] m-auto mt-4 font-[Poppins]">{hero.subtitle}</p>
        </div>

        <img
          className="hero_image w-[35%] m-auto py-6"
          src={hero.image}
          alt={hero.title || "hero image"}
        />
      </div>
    </div>

  );
};

export default Hero;
