
import { partnerAxiosInstance } from "./Interceptor";


const partnersignup=async(data)=>{
    try {
        const response=await partnerAxiosInstance.post('/signup',{data})
        return response
    } catch (error) {
        console.log(error.message);
    }
    
}
const partnerlogin = async (data) => {
    try {
      console.log(data, "kkkkkkkkkkkkkkkkkkkkkkk");
      const response = await partnerAxiosInstance.post("/login",{data} );
      return response;
    } catch (error) {
      console.log(error.message, "error form front");
    }
  };
  const findprofile=async()=>{
    try {
      const response=await partnerAxiosInstance.get('/partnerprofile')
      return response
    } catch (error) {
      console.log(error.message, "error form front");
    }
  }

  const imageprofile=async(id)=>{
    try{
      console.log("hiiiiiiiiiii");
      const response=await partnerAxiosInstance.post('/partnerprofileimg',{id})
      return response
     }
     catch(error){
      console.log(error.message, "error form front");
  
     }
  }
  const editpartnerprofiledata=async(data)=>{
    try {
      console.log("hiiiiiiiiiii");
      const response=await partnerAxiosInstance.post('/partnereditprofile',{data})
      return response
    } catch (error) {
      console.log(error.message, "error form front");
    }
  }

  const partnerbikeadd=async(data)=>{
    try {
      const response=await partnerAxiosInstance.post('/addbike',{data})
      return response
    } catch (error) {
      console.log(error.message, "error form front");
    }
  }
  const partnerbikefind=async()=>{
    try {
      const response=await partnerAxiosInstance.get('/findbikes')
      return response
    } catch (error) {
      console.log(error.message, "error form front");
    }
  }
export {partnersignup,
  partnerlogin,
  findprofile,
  imageprofile,
  editpartnerprofiledata,
  partnerbikeadd,
  partnerbikefind
}