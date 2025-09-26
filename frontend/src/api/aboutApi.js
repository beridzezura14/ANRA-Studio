import axios from "axios";

const API = "https://anrastudio.onrender.com/api/about"; // შენი backend URL

// GET About
export const getAbout = () => axios.get(API);

// CREATE or UPDATE About (backend upsert)
export const upsertAbout = (data) => axios.post(API, data);
