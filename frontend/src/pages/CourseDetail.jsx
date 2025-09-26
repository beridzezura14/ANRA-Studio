import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [open, setOpen] = useState(false); // collapse toggle (მხოლოდ mobile)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`https://anrastudio.onrender.com/api/courses/${id}`);
        setCourse(data);
        if (data.topics.length > 0) {
          setSelectedTopic(data.topics[0]);
        }
      } catch (err) {
        console.error("Error loading course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-[90%] m-auto py-24 md:py-24 text-[#DFD0B8] min-h-screen bg-[#222831]">

      <div className="mb-4">
        <Link to="/" className="font-pantonmtav3"> მთავარი </Link> 
        / {course.title}
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Video + description */}
        <div className="md:w-3/4 mb-8 md:mb-0">
          {selectedTopic ? (
            <div>
              <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden mb-4">
                <iframe
                  className="w-full h-full"
                  src={selectedTopic.videoUrl.replace("watch?v=", "embed/")}
                  title={selectedTopic.title}
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#DFD0B8]">
                {selectedTopic.title}
              </h2>
              <p className="mb-4 text-base md:text-lg">{selectedTopic.description}</p>
            </div>
          ) : (
            <p>თემა აირჩიე სიიდან →</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4 space-y-4">
          <h1 className="text-xl md:text-2xl font-bold">{course.title}</h1>
          <img
            src={course.image}
            alt={course.title}
            className="w-full rounded-lg shadow-md object-cover max-h-48 md:max-h-64"
          />

          {/* Mobile collapse */}
          <div className="mt-6 md:hidden">
            <button
              className="w-full flex justify-between items-center px-4 py-2 bg-[#DFD0B8] text-[#222831] font-semibold rounded-md"
              onClick={() => setOpen(!open)}
            >
              თემები
              <span>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
              <ul className="divide-y divide-gray-300 mt-2 bg-[#F3F4F6] rounded-md shadow">
                {course.topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className={`py-2 px-3 cursor-pointer transition ${
                      selectedTopic?.title === topic.title
                        ? "font-bold bg-[#DFD0B8] text-[#222831]"
                        : "hover:bg-[#e5e7eb] text-[#222831]"
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop always visible */}
          <div className="hidden md:block mt-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">თემები</h2>
            <ul className="divide-y divide-gray-300 bg-[#F3F4F6] rounded-md shadow">
              {course.topics.map((topic, idx) => (
                <li
                  key={idx}
                  className={`py-2 px-3 cursor-pointer transition ${
                    selectedTopic?.title === topic.title
                      ? "font-bold bg-[#DFD0B8] text-[#222831]"
                      : "hover:bg-[#e5e7eb] text-[#222831]"
                  }`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;