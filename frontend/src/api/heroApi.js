import axios from "axios";

const API = "http://localhost:5000/api/hero"; // შენი backend URL

export const getHero = () => axios.get(API);
export const createHero = (data) => axios.post(API, data);
export const updateHero = (id, data) => axios.put(`${API}/${id}`, data);
