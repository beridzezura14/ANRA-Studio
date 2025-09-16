import { useState } from "react";
import axios from "axios";
import { createHero } from "../api/heroApi";

const HeroForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");

  // სურათის ატვირთვა Cloudinary-ზე
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(res.data.url);
  };

  // hero creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHero({ title, subtitle, image }); // backend წყვეტს create/update
    alert("Hero saved!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Hero შექმნა</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="file"
        onChange={handleImageUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-black-700"
      />
      {image && (
        <img
          src={image}
          alt="preview"
          className="w-48 h-32 object-cover rounded-md mx-auto border"
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