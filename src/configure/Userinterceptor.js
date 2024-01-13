import toast from "react-hot-toast";
import { userAxiosInstance } from "./Interceptor.jsx";

/*------------------Usersignup----------------------*/
const Usersignup = async (data) => {
  try {
    const response = await userAxiosInstance.post(`/signup`, { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*----------------------Otpform---------------------*/
const Otpform = async (data) => {
  try {
    const response = await userAxiosInstance.post("/otpsubmit", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*--------------------ResendOTP--------------------------*/
const ResendOTP = async (data) => {
  try {
    const response = await userAxiosInstance.post("/resendotp", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------Userlogin-----------------------------*/
const Userlogin = async (data) => {
  try {
    const response = await userAxiosInstance.post("/login", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*----------------------userEmail--------------------------*/
const userEmail = async (data) => {
  try {
    const response = await userAxiosInstance.post("/provideemail", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*---------------------------forgetotp---------------------------*/
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
/*----------------------Profiledata-------------------*/
const Profiledata = async () => {
  try {
    const response = await userAxiosInstance.get("/profile");
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*--------------------editProfiledata--------------------*/
const editProfiledata = async (data) => {
  try {
    const response = await userAxiosInstance.post("/editprofile", { data });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------------imageupload-------------------------*/
const imageupload = async (id) => {
  try {
    const response = await userAxiosInstance.post("/imageupload", { id });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-----------------------imagelicencefront--------------------*/
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

/*--------------------------getbikes----------------------------*/
const getbikes = async (page) => {
  try {
    const response = await userAxiosInstance.get(`/getbike?page=${page}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*--------------------------findBikes--------------------------*/
const findBikes = async (page) => {
  try {
    const response = await userAxiosInstance.get(`/findbikes?page=${page}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

/*-------------------Datesfind-------------------------*/
const Datesfind = async (data) => {
  try {
    const response = await userAxiosInstance.post("/datesfind", { data });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

/*-------------------------Bookingsdatas-------------------------*/
const Bookingsdatas = async (data) => {
  try {
    const response = await userAxiosInstance.post("/create-checkout-session", {
      data,
    });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*---------------------------Bookinghistory--------------------------*/
const Bookinghistory = async (page) => {
  try {
    const response = await userAxiosInstance.get(`/bookingview?page=${page}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

const CancelBooking = async (id) => {
  try {
    const response = await userAxiosInstance.post(`/cancelbooking?id=${id}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------------usercoupon---------------------*/
const usercoupon = async () => {
  try {
    const response = await userAxiosInstance.get("/usercoupon");
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*----------------------Applycoupon-----------------------*/
const Applycoupon = async (data) => {
  try {
    const response = await userAxiosInstance.post(`/Applycoupon`, { data });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------WalletHistorys------------------------*/
const WalletHistorys = async (page) => {
  try {
    const response = await userAxiosInstance.get(`/wallethistory?page=${page}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

/*----------------------BookingPartner-------------------------*/
const BookingPartner = async () => {
  try {
    const response = await userAxiosInstance.get("/bookingpartner");
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/login";
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*------------------getChat------------------------------*/
const getChat = async (id) => {
  try {
    const response = await userAxiosInstance.get(`/getChat?id=${id}`);
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------------saveChat------------------------------------*/
const saveChat = async (data) => {
  try {
    const response = await userAxiosInstance.post("/saveChat", { data });

    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

export {
  Usersignup,
  Otpform,
  ResendOTP,
  Userlogin,
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
};
