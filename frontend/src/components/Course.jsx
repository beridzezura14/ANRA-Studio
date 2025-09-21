import { useEffect, useState } from "react";
import { getCourses } from "../api/coursApi";
import { Link } from "react-router-dom";

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await getCourses();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (

    <div className="max-w-[90%] lg:max-w-[1000px] 2xl:max-w-[1300px] m-auto py-16">
      <h1 className="text-4xl font-pantonmtav3 text-[#DFD0B8]">კურსები</h1>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="rounded-lg transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold p-2 text-[#DFD0B8]">{course.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Course;
