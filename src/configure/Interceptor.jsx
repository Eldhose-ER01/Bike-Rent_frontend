import axios from "axios";
import { userApi, adminApi, partnerApi } from "./Api";

const TIMEOUT_DURATION = 110000;

const createAxiosInstanceWithInterceptor = (baseurl, tokenName) => {
  const axiosInstance = axios.create({
    baseURL: baseurl,
    timeout: TIMEOUT_DURATION,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const details = localStorage.getItem(tokenName);
      if (details) {
        config.headers["Authorization"] = `Bearer ${details}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("Error Response Data:", error.response.data);
      console.log("Error Response Headers:", error.response.headers);
      if (error.response) {
        if (error.response.status === 404) {
          window.location.href = "/error404";
        } else if (error.response.status === 500) {
          window.location.href = "/error500";
        } else {
          console.log("HTTP ERROR CODE:", error.response.status);
        }
      } else if (error.request) {
        console.log("Network Error:", error.message);
      } else {
        console.log("Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const userAxiosInstance = createAxiosInstanceWithInterceptor(userApi, "Usertoken");
const adminAxiosInstance = createAxiosInstanceWithInterceptor(
  adminApi,
  "token"
);
const partnerAxiosInstance = createAxiosInstanceWithInterceptor(
  partnerApi,
  "partnertoken"
);

export { userAxiosInstance, adminAxiosInstance, partnerAxiosInstance };
