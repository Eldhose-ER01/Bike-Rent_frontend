import toast from "react-hot-toast";
import { partnerAxiosInstance } from "./Interceptor";

/*----------------------partnersignup-----------------------*/
const partnersignup = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/signup", { data });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
/*----------------------partnerlogin------------------------*/
const partnerlogin = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/login", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*----------------------findprofile---------------------------------*/
const findprofile = async () => {
  try {
    const response = await partnerAxiosInstance.get("/partnerprofile");
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*------------------------imageprofile--------------------*/
const imageprofile = async (id) => {
  try {
    const response = await partnerAxiosInstance.post("/partnerprofileimg", {
      id,
    });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-----------------------------------editpartnerprofiledata----------------*/
const editpartnerprofiledata = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/partnereditprofile", {
      data,
    });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------partnerbikeadd-------------------*/
const partnerbikeadd = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/addbike", { data });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-----------------partnerbikefind---------------*/
const partnerbikefind = async (page) => {
  try {
    const response = await partnerAxiosInstance.get(`/findbikes?page=${page}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*------------------------editbike-------------------*/
const editbike = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/updatebike", { data });
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*----------------------deletebike----------------------*/
const deletebike = async (id) => {
  try {
    const response = await partnerAxiosInstance.put(`/deletebike?id=${id}`);
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*------------------Getbooking------------------*/
const Getbooking = async (page) => {
  try {
    const response = await partnerAxiosInstance.get(`/getbooking?page=${page}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const BookingChange = async (id) => {
  try {
    const response = await partnerAxiosInstance.post(`/bookingchange?id=${id}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*-------------------Cancelbooking-------------------------*/
const Cancelbooking = async (id) => {
  try {
    const response = await partnerAxiosInstance.post(`/cancelbooking?id=${id}`);
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*------------------Chartbooking----------------*/
const Chartbooking = async () => {
  try {
    const response = await partnerAxiosInstance.get("/chartbooking");
    if (response.data.message == "partner is blocked") {
      localStorage.removeItem("token");
      toast.error("Partner is blocked");
      window.location.href = "/partner/login";
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

/*------------------Uniquechatuser-------------*/
const Uniquechatuser = async () => {
  try {
    const response = await partnerAxiosInstance.get("/chatuser");

    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

/*------------------getChat-----------------*/
const getChat = async (id) => {
  try {
    const response = await partnerAxiosInstance.get(`/getChat?id=${id}`);

    console.log(response, "response");
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
/*--------------------saveChat----------------------*/
const saveChat = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/saveChat", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

export {
  partnersignup,
  partnerlogin,
  findprofile,
  imageprofile,
  editpartnerprofiledata,
  partnerbikeadd,
  partnerbikefind,
  editbike,
  deletebike,
  Getbooking,
  BookingChange,
  Cancelbooking,
  Chartbooking,
  Uniquechatuser,
  saveChat,
  getChat,
};
