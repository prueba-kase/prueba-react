import axios   from "axios"
import envVars from "./constans";

const customAxios = axios.create({
    baseURL: envVars.API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})


customAxios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) =>{ throw error; }
  );

export default customAxios;

