import { adminAxiosInstance } from "./Interceptor.jsx";

const Adminlogin = async (data) => {
  try {
    const response = await adminAxiosInstance.post("/login", { data });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const finduser = async () => {
  try {
    const response = await adminAxiosInstance.get("/userlist");
    return response;
  } catch (error) {
    console.log(error);
  }
};
const statuschangeuser = async (id) => {
  try {
    console.log("heloooo");
    const response = await adminAxiosInstance.put(`/statuschange?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
const partnerdata = async () => {
  try {
    console.log("hiiiiiiiiiiiiiiiiiii");
    const response = await adminAxiosInstance.get("/partnerreq");
    return response;
  } catch (error) {
    console.log(error);
  }
};
const partnerreject = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/rejectdata?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const partnerAccept = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/acceptdata?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const partnerlist = async () => {
  try {
    const response = await adminAxiosInstance.get("/partnerdata");
    return response;
  } catch (error) {
    console.log(error);
  }
};
const statuschangepartner = async (id) => {
  try {
    console.log("heloooo");
    const response = await adminAxiosInstance.put(`/partnerstatus?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
const bikerequst = async () => {
  try {
    const response = await adminAxiosInstance.get("/bikerequest");
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};

const bikeacceptdata=async(id)=>{
  try {
    const response=await adminAxiosInstance.put(`/acceptbike?id=${id}`)
    return response
  } catch (error) {
    console.log(error, "error from stataus change");
  }
}
const bikerejected=async(data)=>{
  try {
    console.log(data,"iddddddddddddddddd");
    const response=await adminAxiosInstance.put(`/rejectbike?id=${data.id}&&message=${data.message}`);
    
    return response
  } catch (error) {
    console.log(error, "error from stataus change");

  }
}

export {
  Adminlogin,
  finduser,
  statuschangeuser,
  partnerdata,
  partnerAccept,
  partnerreject,
  partnerlist,
  statuschangepartner,
  bikerequst,
  bikeacceptdata,
  bikerejected
};
