import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL = 'https://64e3e9debac46e480e794a97.mockapi.io/';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
