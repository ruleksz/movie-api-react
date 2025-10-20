import axios from "axios";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

export const omdb = axios.create({
    baseURL: baseURL,
    params: {
        apikey: apiKey
    }
});
