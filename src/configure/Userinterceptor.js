import toast from "react-hot-toast";
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
// const googleAuth = async (data) => {
//   try {
//     const response = await userAxiosInstance.post("/googleauth", { data });
    
//     return response;
//   } catch (error) {
//     console.log(error.message, "error form front");
//   }
// };
const userEmail = async (data) => {
  try {
    const response = await userAxiosInstance.post("/provideemail", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const forgetotp = async (data) => {
  try {
    const response = await userAxiosInstance.post("/forgetveryfyotp", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const resetpassword = async (data) => {
  try {
    const response = await userAxiosInstance.post("/resetpassword", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const Profiledata = async () => {
  try {
    const response = await userAxiosInstance.get("/profile");
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const editProfiledata = async (data) => {
  try {
    const response = await userAxiosInstance.post("/editprofile", { data });
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const imageupload = async (id) => {
  try {
    const response = await userAxiosInstance.post("/imageupload", { id });
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const imagelicencefront = async (id) => {
  try {
    const response = await userAxiosInstance.post("/licenseFrontSide", { id });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const imagelicenceback = async (id) => {
  try {
    const response = await userAxiosInstance.post("/licenseBackSide", { id });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const getbikes = async (page) => {
  try {

    const response = await userAxiosInstance.get(`/getbike?page=${page}`);
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const Datesfind=async(data)=>{
  try {
    const response = await userAxiosInstance.post("/datesfind",{data});
  if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");

  }
}

const Bookingsdatas=async(data)=>{
  try {
    const response = await userAxiosInstance.post("/create-checkout-session",{data});
    return response;
  } catch (error) {
    console.log(error.message, "error form front");

  }
}

const Bookinghistory=async(page)=>{
  try {
    const response = await userAxiosInstance.get(`/bookingview?page=${page}`);
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");

  }
}
const CancelBooking=async(id)=>{
  try{
    const response=await userAxiosInstance.post(`/cancelbooking?id=${id}`)
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  }catch (error) {
    console.log(error.message, "error form front");

  }
}
const usercoupon=async()=>{
  try {
    const response = await userAxiosInstance.get("/usercoupon");
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");

  }
}
const Applycoupon=async(data)=>{
  try {
    const response = await userAxiosInstance.post(`/Applycoupon`,{data});
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");

  }
}

const WalletHistorys=async(page)=>{
try {
  const response=await userAxiosInstance.get(`/wallethistory?page=${page}`)
 if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
} catch (error) {
  console.log(error.message, "error form front");

}
}


const BookingPartner=async()=>{
  try {
    const response=await userAxiosInstance.get('/bookingpartner')
   if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
  } catch (error) {
    console.log(error.message, "error form front");
  
  }
  }
  const getChat=async(id)=>{
    try {
      const response=await userAxiosInstance.get(`/getChat?id=${id}`)
    //  if(response.data.message=="partner is blocked"){
    //   localStorage.removeItem('token')
    //   toast.error("Partner is blocked")
    //   window.location.href ="/login";

    // }else{
    //   return response

    // }
    return response
    } catch (error) {
      console.log(error.message, "error form front");
    
    }
    }
    const saveChat=async(data)=>{
      try {

        const response=await userAxiosInstance.post('/saveChat',{data})

        return response
      } catch (error) {
        console.log(error.message, "error form front");
      
      }
      }

      const findBikes = async (page) => {
        try {
      
          const response = await userAxiosInstance.get(`/findbikes?page=${page}`);
         if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
        } catch (error) {
          console.log(error.message, "error form front");
        }
      };

      const alredybook = async (data) => {
        try {
      console.log('jjjjjjjjjjj')
          const response = await userAxiosInstance.post('/alredybooked',{data});
         if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href ="/login";

    }else{
      return response

    }
    return response
        } catch (error) {
          console.log(error.message, "error form front");
        }
      };
      


export {
  Usersignup,
  Otpform,
  ResendOTP,
  Userlogin,
  // googleAuth,
  userEmail,
  forgetotp,
  resetpassword,
  Profiledata,
  editProfiledata,
  imageupload,
  imagelicencefront,
  imagelicenceback,
  getbikes,
  Datesfind,
  Bookingsdatas,
  Bookinghistory,
  CancelBooking,
  usercoupon,
  Applycoupon,
  WalletHistorys,
  BookingPartner,
  getChat,
  saveChat,
  findBikes,
  alredybook
  };
