import { useEffect, useState } from "react";
import { getAbout } from "../api/aboutApi";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    getAbout()
      .then(res => setAbout(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!about) return <p>Loading...</p>;

  return (
    <section className="max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4">{about.title}</h2>
      <p className="mb-4">{about.description}</p>

      {about.videoUrl && (
        <div className="mb-4">
          <video
            src={about.videoUrl}
            controls
            className="w-full max-h-96 border"
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      )}
    </section>
  );
};

export default About;
