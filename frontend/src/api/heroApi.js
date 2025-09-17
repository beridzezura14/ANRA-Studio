import axios from "axios";

const API = "https://anra-academy-ii.onrender.com/api/hero"; // შენი backend URL

export const getHero = () => axios.get(API);
export const createHero = (data) => axios.post(API, data);
export const updateHero = (id, data) => axios.put(`${API}/${id}`, data);
