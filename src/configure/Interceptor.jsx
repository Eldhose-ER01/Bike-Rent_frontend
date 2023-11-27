import axios from 'axios'
import {userApi,adminApi,partnerApi} from'./Api'

const TIMEOUT_DURATION = 110000;


const createAxiosInstanceWithInterceptor=(baseurl,tokenName)=>{
    console.log(baseurl,tokenName,"baseeeeeeeeeeeeeeeeee");
    const axiosInstance =axios.create({
        baseURL:baseurl,
        timeout:TIMEOUT_DURATION
    })

 
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(baseurl,tokenName,"baseeeeeeeeeeeeeeeeee22222222");
      const details = localStorage.getItem(tokenName);
      if (details) {
        config.headers['Authorization'] = `Bearer ${details}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      console.log("error from axios instance--------------");
      return Promise.reject(error);
    }
  );
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Return the response as-is for successful responses
      return response;
    },
    (error) => {
      console.log("Error Response Data:", error.response.data);
      console.log("Error Response Headers:", error.response.headers);
      if (error.response) {
        // Handle specific HTTP error codes
        if (error.response.status === 401) {
          // Redirect to a 404 error page for unauthorized access
          window.location.href = '/error404';
        } else if (error.response.status === 500) {
          // Redirect to a 500 error page for server errors
          window.location.href = '/error500';
        } else {
          // Log other HTTP error codes
          console.log("HTTP ERROR CODE:", error.response.status);
        }
      } else if (error.request) {
        // Handle network errors
        console.log("Network Error:", error.message);
      } else {
        // Handle other errors
        console.log("Error:", error.message);
      }
      // Return a rejected Promise with the error
      return Promise.reject(error);
    }
  );
  
  return axiosInstance
}

const userAxiosInstance=createAxiosInstanceWithInterceptor(userApi,'token');
const adminAxiosInstance=createAxiosInstanceWithInterceptor(adminApi,'token');
const partnerAxiosInstance=createAxiosInstanceWithInterceptor(partnerApi,'token');




export{
  userAxiosInstance,
  adminAxiosInstance,
  partnerAxiosInstance
}