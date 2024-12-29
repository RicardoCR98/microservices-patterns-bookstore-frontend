import axios, { AxiosRequestConfig } from 'axios';

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080',
});

// ==============================|| INTERCEPTOR - REQUEST ||============================== //

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

// ==============================|| INTERCEPTOR - RESPONSE ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && !window.location.href.includes('/login') && !window.location.href.includes('/mantenimiento/500')) {
        console.warn('Unauthorized access. Redirecting...');
        window.location.pathname = '/mantenimiento/500';
      }
      return Promise.reject(error.response.data || 'Wrong Services');
    } else {
      console.error('No response from server:', error.message);
      return Promise.reject('No response from server');
    }
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

export const fetcherPost = async (
  args: string | [string, any, AxiosRequestConfig?] // Permitir datos en POST
) => {
  const [url, data, config] = Array.isArray(args) ? args : [args, null];

  try {
    const res = await axiosServices.post(url, data, { ...config });
    return res.data;
  } catch (error) {
    console.error('Error in fetcherPost:', error);
    throw error;
  }
};
