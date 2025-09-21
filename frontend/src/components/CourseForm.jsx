import { useState, useEffect } from "react";
import axios from "axios";
import CourseDeleteForm from "./CourseDeleteForm";

const CourseForm = () => {
  const [courses, setCourses] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState(""); 
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [topics, setTopics] = useState([{ title: "", videoUrl: "", description: "" }]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/courses");
        setCourses(data);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(data.url);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("სურათის ატვირთვა ვერ მოხერხდა!");
    }
  };

  const handleTopicChange = (index, field, value) => {
    const updated = [...topics];
    updated[index][field] = value;
    setTopics(updated);
  };

  const addTopic = () => {
    setTopics([...topics, { title: "", videoUrl: "", description: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validTopics = topics.filter(
      (t) => t.title.trim() && t.videoUrl.trim() && t.description.trim()
    );

    if (validTopics.length === 0) {
      alert("მინიმუმ ერთი თემა მაინც უნდა დაამატო!");
      return;
    }

    try {
      if (selectedCourse) {
        const { data } = await axios.post(
          `http://localhost:5000/api/courses/${selectedCourse}/topics`,
          {
            ...validTopics[0],
            password: "123",
          }
        );

        console.log("Updated course:", data);
        alert("თემა წარმატებით დაემატა კურსს!");
      } else {
        if (!title.trim()) {
          alert("გთხოვ, ჩაწერო კურსის სათაური!");
          return;
        }
        if (!image) {
          alert("გთხოვ, ატვირთო სურათი!");
          return;
        }

        const { data } = await axios.post("http://localhost:5000/api/courses", {
          title,
          image,
          topics: validTopics,
          password: "123"
        });

        console.log("Saved:", data);
        alert("კურსი წარმატებით დაემატა!");
      }

      setTitle("");
      setImage(null);
      setTopics([{ title: "", videoUrl: "", description: "" }]);
      setSelectedCourse("");
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert("შენახვისას მოხდა შეცდომა!");
    }
  };

  return (
    <div className="space-y-10">
      {/* კურსის დამატების ფორმა */}
      <form
        onSubmit={handleSubmit}
        className="max-w-[90%] mx-auto mt-20 bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">კურსის ფორმა</h2>

        <label className="block">
          <span className="font-semibold">აირჩიე კურსი (თუ გინდა ახალი თემის დამატება)</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">-- ახალი კურსის შექმნა --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        {!selectedCourse && (
          <>
            <input
              type="text"
              placeholder="კურსის სათაური"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />

            {image && (
              <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded-md mx-auto" />
            )}
          </>
        )}

        {topics.map((topic, index) => (
          <div key={index} className="border p-3 rounded-md space-y-2 bg-gray-50">
            <input
              type="text"
              placeholder="თემის სათაური"
              value={topic.title}
              onChange={(e) => handleTopicChange(index, "title", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="YouTube ლინკი"
              value={topic.videoUrl}
              onChange={(e) => handleTopicChange(index, "videoUrl", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="აღწერა"
              value={topic.description}
              onChange={(e) => handleTopicChange(index, "description", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        {!selectedCourse && (
          <button
            type="button"
            onClick={addTopic}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            თემა დამატება
          </button>
        )}

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          {selectedCourse ? "თემის დამატება კურსს" : "ახალი კურსის შექმნა"}
        </button>
      </form>

      {/* კურსების/თემების წაშლა */}
      <div className="max-w-[90%] mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
        <CourseDeleteForm />
      </div>
    </div>
  );
};

export default CourseForm;