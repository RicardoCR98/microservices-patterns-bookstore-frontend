import axios, { AxiosRequestConfig } from 'axios';

const axiosServices = axios.create({ 
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080' 
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn('Unauthorized: Ensure your backend is running and properly configured.');
//       // Evitar redirigir automáticamente durante el desarrollo
//       if (!window.location.href.includes('/login') && import.meta.env.MODE !== 'development') {
//         window.location.pathname = '/mantenimiento/500';
//       }
//     } else if (error.response) {
//       console.error('Error in response:', error.response.data);
//     } else {
//       console.error('Error: ', error.message);
//     }
//     return Promise.reject((error.response && error.response.data) || 'Wrong Services');
//   }
// );

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/mantenimiento/500';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);
export default axiosServices;

// ==============================|| FETCHER FUNCTIONS ||============================== //

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  try {
    const res = await axiosServices.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error('Error in fetcher:', error);
    throw error;
  }
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  try {
    const res = await axiosServices.post(url, { ...config });
    return res.data;
  } catch (error) {
    console.error('Error in fetcherPost:', error);
    throw error;
  }
};
