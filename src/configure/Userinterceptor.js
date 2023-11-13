import { userAxiosInstance } from "./Interceptor.jsx";

const Usersignup = async (data) => {
  try {
    console.log(data, "llllllllllllllllll");
    const response = await userAxiosInstance.post(`/signup`, { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const Otpform = async (data) => {
  try {
    const response = await userAxiosInstance.post("/otpsubmit", { data });
    console.log(response, "oooooooooooooooooooo");
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const ResendOTP = async (data) => {
  try {
    const response = await userAxiosInstance.post("/resendotp", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const Userlogin = async (data) => {
  try {
    console.log(data, "kkkkkkkkkkkkkkkkkkkkkkk");
    const response = await userAxiosInstance.post("/login", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const googleAuth = async (data) => {
  try {
    const response = await userAxiosInstance.post("/googleauth", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const userEmail=async(data)=>{
    try {
        const response = await userAxiosInstance.post("/provideemail", { data });
        return response;
    } catch (error) {
        console.log(error.message, "error form front");
    }
}
const forgetotp=async(data)=>{
    try {
        const response = await userAxiosInstance.post("/forgetveryfyotp", { data });
        return response;
    } catch (error) {
        console.log(error.message, "error form front");
    }
}
const resetpassword=async(data)=>{
    try {
        const response=await userAxiosInstance.post("/resetpassword",{data})
        return response;
    } catch (error) {
        console.log(error.message, "error form front");
    }
}
export { Usersignup, Otpform, ResendOTP, Userlogin, googleAuth,userEmail,forgetotp,resetpassword };
