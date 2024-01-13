import { adminAxiosInstance } from "./Interceptor.jsx";

/*---------------Adminlogin-------------------*/
const Adminlogin = async (data) => {
  try {
    const response = await adminAxiosInstance.post("/login", { data });
    return response;
  } catch (error) {
    console.log(error);
  }
};
/*-----------------User View--------------------*/
const finduser = async (page, searchTerm) => {
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm); // Encode search term
    const response = await adminAxiosInstance.get(
      `/userlist?page=${page}&search=${encodedSearchTerm}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

/*--------------------statuschangeuser-----------------*/
const statuschangeuser = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/statuschange?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*----------------partnerdata----------------*/
const partnerdata = async () => {
  try {
    const response = await adminAxiosInstance.get("/partnerreq");
    return response;
  } catch (error) {
    console.log(error);
  }
};
/*-------------------------partnerreject----------------------*/
const partnerreject = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/rejectdata?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
/*-------------------------partnerAccept--------------------------*/
const partnerAccept = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/acceptdata?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
/*-------------------------partnerlist------------------------------*/
const partnerlist = async (searchTerm, page) => {
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await adminAxiosInstance.get(
      `/partnerdata?page=${page}&search=${encodedSearchTerm}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

/*--------------------------statuschangepartner---------------------------*/
const statuschangepartner = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/partnerstatus?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*------------------------bikerequst------------------------------------*/
const bikerequst = async (page) => {
  try {
    const response = await adminAxiosInstance.get(`/bikerequest?page=${page}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*---------------------------bikerequstview-------------------------*/
const bikerequstview = async (id) => {
  try {
    const response = await adminAxiosInstance.get(`/bikerequstview?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*---------------------------bikeacceptdata------------------------*/
const bikeacceptdata = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/acceptbike?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*----------------------------bikerejected-----------------------*/
const bikerejected = async (data) => {
  try {
    const response = await adminAxiosInstance.put(
      `/rejectbike?id=${data.id}&&message=${data.message}`
    );

    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*-------------------------bikepatnerlist----------------------*/
const bikepatnerlist = async (data) => {
  try {
    const response = await adminAxiosInstance.post("/bikepartnerlist", {
      data,
    });
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*-----------------------statuschangebike-----------------------*/
const statuschangebike = async (id) => {
  try {
    const response = await adminAxiosInstance.put(`/blockbike?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*------------------------AddCoupons-----------------------------*/
const AddCoupons = async (data) => {
  try {
    const response = await adminAxiosInstance.post("/coupon", { data });
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*-----------------------------findCoupons----------------------*/
const findCoupons = async (page) => {
  try {
    const response = await adminAxiosInstance.get(`/findcoupon?page=${page}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*-------------------------------couponsblock------------------------*/
const couponsblock = async (id) => {
  try {
    const response = await adminAxiosInstance.post(`/blockcoupon?id=${id}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*--------------------------------AdminChartView-----------------------*/
const AdminChartView = async () => {
  try {
    const response = await adminAxiosInstance.get("/chartview");
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};

const Rejectlists = async (page) => {
  try {
    console.log("work");
    const response = await adminAxiosInstance.get(`/rejectlist?page=${page}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};
/*------------------------Sales--------------------------*/
const Sales = async (page) => {
  try {
    const response = await adminAxiosInstance.get(`/adminsales?page=${page}`);
    return response;
  } catch (error) {
    console.log(error, "error from stataus change");
  }
};

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
  bikerejected,
  bikepatnerlist,
  statuschangebike,
  bikerequstview,
  AddCoupons,
  findCoupons,
  couponsblock,
  AdminChartView,
  Sales,
  Rejectlists,
};
