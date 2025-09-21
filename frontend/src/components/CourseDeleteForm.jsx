import { useEffect, useState } from "react";
import axios from "axios";
import { deleteCourse, deleteTopic, updateCourse, updateTopic } from "../api/coursApi";
import { toast } from "react-hot-toast";

const CourseDeleteForm = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({ courseId: null, topicId: null });
  const [formData, setFormData] = useState({ title: "", videoUrl: "", description: "" });
  const [openCourseId, setOpenCourseId] = useState(null);

  // ყველა კურსის წამოღება
  useEffect(() => {
    axios
      .get("https://anra-academy-ii.onrender.com/api/courses")
      .then((res) => setCourses(res.data))
      .catch(() => setError("ვერ მოხერხდა კურსების ჩატვირთვა."))
      .finally(() => setLoading(false));
  }, []);

  // კურსის წაშლა
  const handleDeleteCourse = async (courseId) => {
    const password = prompt("შეიყვანე admin პაროლი კურსის წასაშლელად:");
    if (!password) return;

    try {
      await deleteCourse(courseId, password);
      toast.success("კურსი წარმატებით წაიშალა!");
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      toast.error(err.response?.data?.message || "ვერ წაიშალა კურსი");
    }
  };

  // თემის წაშლა
  const handleDeleteTopic = async (courseId, topicId) => {
    const password = prompt("შეიყვანე admin პაროლი თემის წასაშლელად:");
    if (!password) return;

    try {
      const { data } = await deleteTopic(courseId, topicId, password);
      toast.success("თემა წაიშალა!");
      setCourses(courses.map((c) => (c._id === courseId ? data : c)));
    } catch (err) {
      toast.error(err.response?.data?.message || "ვერ წაიშალა თემა");
    }
  };

  // ედითის გახსნა
  const handleEdit = (courseId, topic = null) => {
    setEditMode({ courseId, topicId: topic?._id || null });
    setFormData({
      title: topic ? topic.title : courses.find((c) => c._id === courseId).title,
      videoUrl: topic?.videoUrl || "",
      description: topic?.description || "",
    });
  };

  // ედითის შენახვა
  const handleSave = async () => {
    const password = prompt("შეიყვანე admin პაროლი შესაცვლელად:");
    if (!password) return;

    try {
      if (editMode.topicId) {
        const { data } = await updateTopic(editMode.courseId, editMode.topicId, formData, password);
        setCourses(courses.map((c) => (c._id === editMode.courseId ? data : c)));
        toast.success("თემა განახლდა!");
      } else {
        const { data } = await updateCourse(editMode.courseId, { title: formData.title }, password);
        setCourses(courses.map((c) => (c._id === editMode.courseId ? data : c)));
        toast.success("კურსი განახლდა!");
      }
      setEditMode({ courseId: null, topicId: null });
    } catch (err) {
      toast.error(err.response?.data?.message || "ვერ განახლდა");
    }
  };

  if (loading) return <h2 className="text-center my-10">იტვირთება...</h2>;
  if (error) return <h2 className="text-red-500 text-center my-10">{error}</h2>;

  return (
    <div className="max-w-full mx-autorounded-lg flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left text-gray-800">
        კურსების მართვა
      </h2>

      {courses.map((course) => (
        <div key={course._id} className="border rounded-md p-3 sm:p-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 items-start sm:items-center">
            {editMode.courseId === course._id && !editMode.topicId ? (
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border p-1 rounded w-full sm:w-auto"
              />
            ) : (
              <h3 className="text-lg sm:text-xl font-semibold">{course.title}</h3>
            )}
            <div className="flex flex-wrap gap-2">
              {editMode.courseId === course._id && !editMode.topicId ? (
                <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(course._id)}
                  className="bg-[#222831] text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  setOpenCourseId(openCourseId === course._id ? null : course._id)
                }
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                {openCourseId === course._id ? "დახურვა" : "თემების ნახვა"}
              </button>
            </div>
          </div>

          {/* Topics - მხოლოდ გახსნისას */}
          {openCourseId === course._id && (
            <ul className="mt-3 space-y-2">
              {course.topics.map((topic) => (
                <li
                  key={topic._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 gap-2"
                >
                  {editMode.courseId === course._id && editMode.topicId === topic._id ? (
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border p-1 rounded w-full"
                        placeholder="Topic title"
                      />
                      <input
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="border p-1 rounded w-full"
                        placeholder="Video URL"
                      />
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="border p-1 rounded w-full"
                        placeholder="Description"
                      />
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-base sm:text-lg">{topic.title}</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(course._id, topic)}
                          className="bg-[#222831] text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTopic(course._id, topic._id)}
                          className="bg-red-400 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseDeleteForm;
