import axios from "axios";

const API = axios.create({ baseURL: "https://anra-academy-ii.onrender.com/api" }); // backend URL

// Courses
export const getCourses = () => API.get("/courses");
export const getCourseById = (id) => API.get(`/courses/${id}`);



const API_URL = "https://anra-academy-ii.onrender.com/api/courses"; // ან render-ის url

// კურსის წაშლა
export const deleteCourse = (courseId, password) => {
  return axios.delete(`${API_URL}/${courseId}`, {
    data: { password },
  });
};

// თემის წაშლა კურსიდან
export const deleteTopic = (courseId, topicId, password) => {
  return axios.delete(`${API_URL}/${courseId}/topics/${topicId}`, {
    data: { password },
  });
};


// coursApi.js

// კურსის განახლება
export const updateCourse = (courseId, updatedData, password) => {
  return axios.put(`${API_URL}/${courseId}`, { ...updatedData, password });
};

// თემის განახლება
export const updateTopic = (courseId, topicId, updatedData, password) => {
  return axios.put(`${API_URL}/${courseId}/topics/${topicId}`, { ...updatedData, password });
};
