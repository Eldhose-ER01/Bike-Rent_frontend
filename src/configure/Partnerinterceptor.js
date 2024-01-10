import toast from "react-hot-toast";
import { partnerAxiosInstance } from "./Interceptor";

const partnersignup = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/signup", { data });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
const partnerlogin = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/login", { data });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const findprofile = async () => {
 
  try {
    const response = await partnerAxiosInstance.get("/partnerprofile")
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

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
const editpartnerprofiledata = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/partnereditprofile", {
      data,
    });
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

const partnerbikeadd = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/addbike", { data });
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const partnerbikefind = async (page) => {
  try {
    const response = await partnerAxiosInstance.get(`/findbikes?page=${page}`);
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

const editbike = async (data) => {
  try {
    const response = await partnerAxiosInstance.post("/updatebike", { data });
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const deletebike = async (id) => {
  try {
    const response = await partnerAxiosInstance.put(`/deletebike?id=${id}`);
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};
const Getbooking=async(page)=>{
  try {
    const response=await partnerAxiosInstance.get(`/getbooking?page=${page}`);
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");

  }
}
const BookingChange = async (id) => {
  try {
    const response = await partnerAxiosInstance.post(`/bookingchange?id=${id}`);
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

const Cancelbooking = async (id) => {
  try {
    const response = await partnerAxiosInstance.post(`/cancelbooking?id=${id}`);
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

const Chartbooking = async () => {
  try {
    const response = await partnerAxiosInstance.get('/chartbooking');
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};



const Uniquechatuser = async () => {
  try {
    const response = await partnerAxiosInstance.get('/chatuser');
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  }
};


const getChat=async(id)=>{
  try {
    const response=await partnerAxiosInstance.get(`/getChat?id=${id}`)
    if(response.data.message=="partner is blocked"){
      localStorage.removeItem('token')
      toast.error("Partner is blocked")
      window.location.href = "/partner/login";

    }else{
      return response

    }
  } catch (error) {
    console.log(error.message, "error form front");
  
  }
  }
  const saveChat=async(data)=>{
    try {
      const response=await partnerAxiosInstance.post('/saveChat',{data})
      return response
    } catch (error) {
      console.log(error.message, "error form front");
    
    }
    }
  

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
  getChat
};
