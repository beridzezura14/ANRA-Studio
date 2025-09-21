import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
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
    <div className="pt-24 p-4 md:py-32 text-[#DFD0B8] min-h-screen bg-[#222831]">
      <div className="flex flex-col-reverse md:flex-row gap-6">
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
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#DFD0B8]">{selectedTopic.title}</h2>
              <p className="mb-4 text-base md:text-lg">{selectedTopic.description}</p>
            </div>
          ) : (
            <p>თემა აირჩიე სიიდან →</p>
          )}
        </div>
                <div className="md:w-1/4 space-y-4">
          <h1 className="text-xl md:text-2xl font-bold">{course.title}</h1>
          <img
            src={course.image}
            alt={course.title}
            className="w-full rounded-lg shadow-md object-cover max-h-48 md:max-h-64"
          />

          <h2 className="text-lg md:text-xl font-semibold mt-6">თემები</h2>
          <ul className="divide-y divide-gray-300">
            {course.topics.map((topic, idx) => (
              <li
                key={idx}
                className={`py-2 px-3 cursor-pointer transition
                  ${selectedTopic?.title === topic.title
                    ? "font-bold bg-[#DFD0B8] text-[#222831]"
                    : "bg-[#F3F4F6] hover:bg-[#e5e7eb] text-[#222831]"
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
  );
};

export default CourseDetail;