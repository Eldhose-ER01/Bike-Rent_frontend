import { userAxiosInstance } from "./Interceptor.jsx";

const Usersignup = async (data) => {
  try {
    const response = await userAxiosInstance.post(`/signup`, { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const Otpform = async (data) => {
  try {
    const response = await userAxiosInstance.post("/otpsubmit", { data });
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
const Profiledata=async()=>{
  try {
    const response=await userAxiosInstance.get('/profile')
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
}
const editProfiledata=async(data)=>{
  try {
    const response=await userAxiosInstance.post('/editprofile',{data})
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
}
const imageupload=async(id)=>{
  try {
    const response=await userAxiosInstance.post('/imageupload',{id})
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
}
const imagelicencefront=async(id)=>{
  try{
    console.log("hiiiiiiiiiii");
    const response=await userAxiosInstance.post('/licenseFrontSide',{id})
    return response
   }
   catch(error){
    console.log(error.message, "error form front");

   }
}
const imagelicenceback=async(id)=>{
  try{
    console.log("hiiiiiiiiiii");
    const response=await userAxiosInstance.post('/licenseBackSide',{id})
    return response
   }
   catch(error){
    console.log(error.message, "error form front");

   }
}
const getbikes=async()=>{
  try {
    const response=await userAxiosInstance.get('/getbike')
    return response
  } catch (error) {
    console.log(error.message, "error form front");

  }
}


  export { 
      Usersignup,
      Otpform,
      ResendOTP, 
      Userlogin,
      googleAuth,
      userEmail,
      forgetotp,
      resetpassword,
      Profiledata,
      editProfiledata,
      imageupload,
      imagelicencefront,
      imagelicenceback,
      getbikes
    };
