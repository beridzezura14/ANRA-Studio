import { useState, useEffect } from "react";
import { getAbout, upsertAbout } from "../api/aboutApi";
import axios from "axios";
import { toast } from "react-hot-toast";

const AboutForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    getAbout()
      .then(res => {
        if (res.data) {
          setTitle(res.data.title || "");
          setDescription(res.data.description || "");
          setVideoUrl(res.data.videoUrl || "");
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleVideoUpload = async () => {
    if (!videoFile) return toast.error("Select a video first");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await axios.post("/api/upload/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideoUrl(res.data.url);
      toast.success("Video uploaded!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Video upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await upsertAbout({ title, description, videoUrl, password });
      toast.success("About saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving About");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-2">About Section</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2"
        required
      />

      <div>
        <input
          type="file"
          accept="video/*"
          onChange={e => setVideoFile(e.target.files[0])}
        />
        <button
          type="button"
          onClick={handleVideoUpload}
          className="ml-2 bg-green-500 text-white p-2"
        >
          Upload Video
        </button>
        {videoUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <video
              src={videoUrl}
              controls
              className="w-full max-h-60 border"
            />
          </div>
        )}
      </div>

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Save About</button>
    </form>
  );
};

export default AboutForm;
