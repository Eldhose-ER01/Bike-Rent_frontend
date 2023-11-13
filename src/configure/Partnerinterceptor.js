
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
export {partnersignup,partnerlogin}