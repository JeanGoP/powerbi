import axios from 'axios';
const url = import.meta.env.VITE_API_URL_SITE;
const API_BASE_URL = url;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClient2 = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000,
  headers: { 'Content-Type': 'multipart/form-data' },
});

const apiClientArch = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000,
  headers: {},
});

// apiClient.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await obtenerToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error('Error al agregar el token:', error);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClientArch.interceptors.request.use(
  async (config) => {
    try {
      const token = await obtenerToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al agregar el token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// apiClientFormData.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await obtenerToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error('Error al agregar el token:', error);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default { apiClient, apiClientArch, apiClient2 };
