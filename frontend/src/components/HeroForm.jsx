import { useState, useEffect } from "react";
import axios from "axios";
import { createHero, getHero } from "../api/heroApi";
import { toast } from 'react-hot-toast';

const HeroForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hero-ს წამოღება backend-დან
  useEffect(() => {
    getHero()
      .then((res) => {
        const hero = res.data;
        setTitle(hero.title || "");
        setSubtitle(hero.subtitle || "");
        setImage(hero.image || "");
      })
      .catch(() => setError("ვერ მოხერხდა hero-ს ჩატვირთვა."))
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("https://anrastudio.onrender.com/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(res.data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHero({ title, subtitle, image });
      toast.success("Hero წარმატებით შეინახა!");
    } catch (err) {
      console.error(err);
      toast.error("Hero-ს შენახვა ვერ მოხერხდა.");
    }
  };

  if (loading) return <h2 className="text-center my-10">იტვირთება...</h2>;
  if (error) return <h2 className="text-red-500 text-center my-10">{error}</h2>;

  return (
    <form onSubmit={handleSubmit} className="max-w-[90%] mx-auto lg:w-[1000px] bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4 text-left text-gray-800">Hero სექცია</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border text-[#222831] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        type="text"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="border text-[#222831] border-gray-300 rounded-md px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="file"
        onChange={handleImageUpload}
        className="text-[#222831] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-black-700"
      />

      {image && (
        <img
          src={image}
          alt="preview"
          className="w-48 h-32 object-cover rounded-md border"
        />
      )}

      <button
        type="submit"
        className="bg-black text-white py-2 rounded-md font-semibold hover:bg-black-700 transition"
      >
        Save Hero
      </button>
    </form>
  );
};

export default HeroForm;
